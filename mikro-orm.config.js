// import { env } from "@/env.mjs"

import { Applications } from "@/entities/Applications"
import { EmailsSent } from "@/entities/EmailsSent"
import { Meetings } from "@/entities/Meetings"
import { SubmissionReviews } from "@/entities/SubmissionReviews"
import { SubmissionSlots } from "@/entities/SubmissionSlots"
import { Submissions } from "@/entities/Submissions"
import { Tags } from "@/entities/Tags"
import { Users } from "@/entities/Users"
import { UsersLogins } from "@/entities/UsersLogins"
import { Workshops } from "@/entities/Workshops"

import * as entityFiles from "./entities"

const entities = Object.keys(entityFiles).map((key) => entityFiles[key])

const config = {
  clientUrl: "postgresql://jonathanseneris@localhost:5432/madge", //env.DATABASE_URL,
  type: "postgresql",
  entities: [
    Applications,
    EmailsSent,
    Meetings,
    SubmissionReviews,
    Workshops,
    SubmissionSlots,
    Submissions,
    Tags,
    Users,
    UsersLogins,
  ],
  entitiesTs: [`${__dirname}/entities/**/*.ts`],
  debug: true,
}

export default config
