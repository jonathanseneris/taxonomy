import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
  types,
} from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class Applications {
  [OptionalProps]?: "about" | "sample" | "statement" | "status"

  @PrimaryKey()
  id: string = v4()

  @ManyToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  user!: "Users"

  @ManyToOne({ entity: () => "Workshops", onUpdateIntegrity: "cascade" })
  workshop!: "Workshops"

  @Property()
  submittedOn?: Date

  @Property()
  viewedOn?: Date

  @Property()
  statusChangedOn?: Date

  @Property()
  status: ApplicationStatus = ApplicationStatus.DRAFT

  @Property({ type: types.text })
  statement = ""

  @Property({ type: types.text })
  about = ""

  @Property({ type: types.text })
  sample = ""
}

enum ApplicationStatus {
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  WAITLISTED = "Waitlisted",
  PENDING = "Pending",
  WITHDRAWN = "Withdrawn",
  SUBMITTED = "Submitted",
  DRAFT = "Draft",
}
