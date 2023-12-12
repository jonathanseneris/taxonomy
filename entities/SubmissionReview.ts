import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from "uuid"

import { Submission } from "./Submission"
import { User } from "./User"
import { Workshop } from "./Workshop"

@Entity()
export class SubmissionReview {
  @PrimaryKey() id: string = v4()

  @Property() date!: Date

  @Property() lastUpdate!: Date

  @ManyToOne(() => Submission) submission!: Submission

  @ManyToOne(() => User) user!: User

  @ManyToOne(() => Workshop) workshop!: Workshop
}
