import path from "path"
import { fileURLToPath } from "url"
import {
  Account,
  Application,
  EmailSent,
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
import { Options } from "@mikro-orm/core"
import { defineConfig } from "@mikro-orm/postgresql"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"

import { env } from "@/env.mjs"

const entities = [
  Account,
  Application,
  EmailSent,
  Meeting,
  Session,
  Submission,
  SubmissionReview,
  SubmissionSlot,
  Tag,
  User,
  VerificationToken,
  Workshop,
]

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const config: Options = defineConfig({
  // clientUrl: "postgresql://jonathanseneris@localhost:5432/madgemikroorm",
  clientUrl: env.DATABASE_URL,
  metadataProvider: TsMorphMetadataProvider,
  baseDir: process.cwd(),
  discovery: { disableDynamicFileAccess: true },
  entities,
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
})

export default config
