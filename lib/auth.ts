import { MikroOrmAdapter } from "@next-auth/mikro-orm-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import { Client } from "postmark";

import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log(
  "----********************************",
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  process.env.DATABASE_URL
);

// TODO: Move env vars to env a la t3.
const postmarkClient = new Client(process.env.POSTMARK_API_TOKEN || "");

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: MikroOrmAdapter({
    // MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver
    clientUrl: process.env.DATABASE_URL,
    type: "postgresql",
    debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
  }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

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
          ? process.env.POSTMARK_SIGN_IN_TEMPLATE
          : process.env.POSTMARK_ACTIVATION_TEMPLATE;
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
};
