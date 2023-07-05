import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import sgMail from "@sendgrid/mail"
// import mail from "@sendgrid/mail"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"

// import { Client } from "postmark"

import { env } from "@/env.mjs"
// import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"

// const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
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
      server: env.EMAIL_SERVER,
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log("-----start", identifier, url, provider)

        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        // console.log("identifier", identifier)
        // console.log("provider", provider)
        // console.log("user", user)
        // //
        // const templateId = user?.emailVerified
        //   ? env.POSTMARK_SIGN_IN_TEMPLATE
        //   : env.POSTMARK_ACTIVATION_TEMPLATE
        // if (!templateId) {
        //   throw new Error("Missing template id")
        // }

        const result = await sendVerificationEmail({
          to: identifier,
          url,
        })

        if (result.error) {
          throw new Error(result.error)
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
      const dbUser = await db.user.findFirst({
        where: {
          email: token?.email ? token.email : "",
        },
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
