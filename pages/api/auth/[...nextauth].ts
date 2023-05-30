import withORM from "@/orm/withORM"
import NextAuth from "next-auth"

import { authOptions } from "@/lib/auth"

// @see ./lib/auth
export default withORM(NextAuth(authOptions))
