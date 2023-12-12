import {
  Account,
  Application,
  Meeting,
  Session,
  Submission,
  SubmissionReview,
  SubmissionSlot,
  Tag,
  User,
  VerificationToken,
  Workshop,
} from "@/entities"
import getEM from "@/orm/getEM"
import { MikroOrmAdapter } from "@auth/mikro-orm-adapter"
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

// #Xcm5gB!EhN37x3e
// 8jQbDtj5bMyj
// S8M@&!8RYXd82xsN
// nhoGLs1zr5oImy6
// #Xcm5gB!EhN37x3e
// 8jQbDtj5bMyj
// S8M@&!8RYXd82xsN
// nhoGLs1zr5oImy6
// nhoGLs1zr5oImy6

export const authOptions: NextAuthOptions = {
  adapter: MikroOrmAdapter(
    {
      // MikroORM options object. Ref: https://mikro-orm.io/docs/next/configuration#driver
      dbName: process.env.DB_NAME,
      type: "postgresql",
      debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
    },
    {
      entities: [
        Account,
        Application,
        Meeting,
        Workshop,
        Session,
        SubmissionReview,
        SubmissionSlot,
        Submission,
        Tag,
        User,
        VerificationToken,
      ],
    }
  ),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
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
    // async signIn({ user, account, email }) {
    //   const userExists = await db.user.findUnique({
    //     email: user?.email, //the user object has an email property, which contains the email the user entered.
    //   })
    //   if (userExists) {
    //     return true //if the email exists in the User collection, email them a magic login link
    //   } else {
    //     return "/register"
    //   }
    // },
    async jwt({ token, user }) {
      const em = await getEM()
      const dbUser = token?.email
        ? await em.findOne("User", {
            email: token.email,
          })
        : null
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
