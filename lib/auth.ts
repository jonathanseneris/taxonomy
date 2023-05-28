import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { Client } from "postmark";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

const postmarkClient = new Client(env.POSTMARK_API_TOKEN);

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(
  "----********************************",
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  env.DATABASE_URL
);

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log("-----start", identifier, url, provider);
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

        if (!user) {
          throw new Error("no user");
        }

        const msg = {
          to: user.email, // Change to your recipient
          dynamic_template_data: {
            login_url: url,
          },
          template_id: "d-4929bc32e1b74438879784171dbff8d5",

          // from: 'hi@madge.io', // Change to your verified sender
          // subject: 'Login to Madge',
          // text: 'and easy to do anywhere, even with Node.js',
          // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };

        const templateId = user?.emailVerified
          ? env.POSTMARK_SIGN_IN_TEMPLATE
          : env.POSTMARK_ACTIVATION_TEMPLATE;
        if (!templateId) {
          throw new Error("Missing template id");
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: "hi@madge.io", //provider.from as string,
          TemplateModel: {
            action_url: url,
            product_name: siteConfig.name,
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        });

        if (result.ErrorCode) {
          throw new Error(result.Message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log("token", token);
      console.log("session", session);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log("session105", session);
      return session;
    },
    async jwt({ token, user }) {
      console.log("token", token);
      console.log("user", user);
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      console.log("user", user);
      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      console.log("dbUser", dbUser);
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  secret: "moop",
};
