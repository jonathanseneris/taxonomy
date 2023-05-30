import { Users } from "@/entities"
import getEM from "@/orm/getEM"
import { MikroOrmAdapter } from "@next-auth/mikro-orm-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { Client } from "postmark"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  adapter: MikroOrmAdapter({
    // MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver
    clientUrl: env.DATABASE_URL,
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
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log("-----start", identifier, url, provider)
        const em = await getEM()
        console.log(40)
        const user = await em.findOne(
          Users,
          {
            email: identifier,
          }
          // select: {
          //   emailVerified: true,
          // },
        )

        console.log("user", user)
        // const msg = {
        //   to: identifier, // Change to your recipient
        //   dynamic_template_data: {
        //     login_url: url,
        //   },
        //   template_id: "d-4929bc32e1b74438879784171dbff8d5",
        //
        //   // from: 'hi@madge.io', // Change to your verified sender
        //   // subject: 'Login to Madge',
        //   // text: 'and easy to do anywhere, even with Node.js',
        //   // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        // }

        const templateId = user?.emailVerified
          ? env.POSTMARK_SIGN_IN_TEMPLATE
          : env.POSTMARK_ACTIVATION_TEMPLATE
        if (!templateId) {
          throw new Error("Missing template id")
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: provider.from as string, //env.SMTP_FROM,
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
        })

        if (result.ErrorCode) {
          throw new Error(result.Message)
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }) {
      const em = await getEM()
      const dbUser = await em.findOne(Users, {
        email: token?.email ? token.email : "",
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
  // secret: "moop",
}
