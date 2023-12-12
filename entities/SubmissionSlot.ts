import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"

import { Submission } from "./Submission"
import { User } from "./User"
import { Workshop } from "./Workshop"

@Entity()
export class SubmissionSlot {
  @PrimaryKey() id!: number

  @ManyToOne(() => Workshop) workshop!: Workshop

  @Property() dueDate!: Date

  @Property() workshopDate!: Date

  @Property() createdAt!: Date

  @Property() lastModifiedAt!: Date

  @ManyToOne(() => Submission) submission?: Submission

  @ManyToOne(() => User) user?: User
}
