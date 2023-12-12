import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from "uuid"

import { Meeting } from "./Meeting"
import { User } from "./User"
import { Workshop } from "./Workshop"

@Entity()
export class Submission {
  @PrimaryKey() id: string = v4()

  @Property() title!: string

  @Property() submissionDueDate!: Date

  @Property() submissionDate!: Date

  @Property({ nullable: true }) password?: string

  @Property({ columnType: "text", default: "" }) content!: string

  @ManyToOne(() => Meeting) meeting?: Meeting

  @ManyToOne(() => User) user?: User

  @ManyToOne(() => Workshop) workshop?: Workshop
}
