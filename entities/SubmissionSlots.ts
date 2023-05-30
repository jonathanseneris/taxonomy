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
export class SubmissionSlots {
  @PrimaryKey()
  id!: number

  @ManyToOne({ entity: () => "Workshops", onUpdateIntegrity: "cascade" })
  workshop!: "Workshops"

  @Property()
  dueDate!: Date

  @Property()
  workshopDate!: Date

  @OneToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  submitter?: "Users"

  @OneToOne({ entity: () => "Submissions", onUpdateIntegrity: "cascade" })
  submission?: "Submissions"

  @Property()
  createdAt: Date

  @Property()
  lastModifiedAt: Date
}
