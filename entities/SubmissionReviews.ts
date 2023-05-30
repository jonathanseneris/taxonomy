import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { Submissions } from "./Submissions"
import { Users } from "./Users"
import { Workshops } from "./Workshops"

@Entity()
export class SubmissionReviews {
  @PrimaryKey()
  id!: number

  @ManyToOne({ entity: () => "Submissions", onUpdateIntegrity: "cascade" })
  submission!: "Submissions"

  @ManyToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  reviewer!: "Users"

  @ManyToOne({ entity: () => "Workshops", onUpdateIntegrity: "cascade" })
  workshop!: "Workshops"

  @Property()
  date: Date

  @Property()
  lastUpdate: Date

  @OneToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  submitter!: "Users"
}
