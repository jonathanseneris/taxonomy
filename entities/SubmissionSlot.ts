import { Submission, User, Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class SubmissionSlot extends BaseEntity {
  @ManyToOne(() => Workshop) workshop!: Rel<Workshop>

  @Property() dueDate!: Date

  @Property() workshopDate!: Date

  @ManyToOne(() => Submission) submission!: Rel<Submission>

  @ManyToOne(() => User) user!: Rel<User>
}
