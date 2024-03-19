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
  migrations: {
    tableName: "mikro_orm_migrations", // name of database table with log of executed transactions
    path: "./migrations", // path to the folder with migrations
    // pathTs: './migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: false, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: false, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save Snapshot when creating new migrations
    emit: "ts", // migration generation mode
    // generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  seeder: {
    path: "./dist/seeders", // path to the folder with seeders
    pathTs: "./seeders", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: "DatabaseSeeder", // default seeder class name
    glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: "ts", // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
})

export default config
