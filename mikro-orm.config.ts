import path from "path"
import { fileURLToPath } from "url"
import { Options } from "@mikro-orm/core"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"

import { env } from "@/env.mjs"

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
} from "./entities"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const config: Options = {
  // clientUrl: "postgresql://jonathanseneris@localhost:5432/madgemikroorm",
  clientUrl: env.DATABASE_URL,
  type: "postgresql",
  metadataProvider: TsMorphMetadataProvider,
  baseDir: process.cwd(),
  discovery: { disableDynamicFileAccess: true },
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
  entitiesTs: [
    `${__dirname}/entities/Account.ts`,
    `${__dirname}/entities/Applications.ts`,
    `${__dirname}/entities/EmailsSent.ts`,
    `${__dirname}/entities/Meetings.ts`,
    `${__dirname}/entities/Workshops.ts`,
    `${__dirname}/entities/Session.ts`,
    `${__dirname}/entities/SubmissionReviews.ts`,
    `${__dirname}/entities/SubmissionSlots.ts`,
    `${__dirname}/entities/Submissions.ts`,
    `${__dirname}/entities/Tags.ts`,
    `${__dirname}/entities/Users.ts`,
    `${__dirname}/entities/UsersLogins.ts`,
    `${__dirname}/entities/VerificationToken.ts`,
  ],
  debug: true,
}

export default config
