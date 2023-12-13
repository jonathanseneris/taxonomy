import { User } from "@/entities"
import config from "@/mikro-orm.config"
import getEM from "@/orm/getEM"
import withORM from "@/orm/withORM"
import { MikroOrmAdapter } from "@auth/mikro-orm-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"

import { env } from "@/env.mjs"
import { sendVerificationEmail } from "@/lib/mail"

const jwt = withORM(async ({ token, user }) => {
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
})

const signIn = withORM(async ({ user, account, email }) => {
  const em = await getEM()
  const userExists = await em.findOne(User, {
    email: user?.email, //the user object has an email property, which contains the email the user entered.
  })
  if (userExists) {
    return true //if the email exists in the User collection, email them a magic login link
  } else {
    return "/register"
  }
})

const sendVerificationRequest = withORM(
  async ({ identifier, url, provider }) => {
    console.log("-----start", identifier, url, provider)

    const em = await getEM()
    const user = await em.findOne(User, {
      email: identifier,
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
  }
)

export const authOptions: NextAuthOptions = {
  adapter: MikroOrmAdapter(config),
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
      sendVerificationRequest,
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
    }, // signIn,
    jwt,
  }, // secret: "moop",
}
