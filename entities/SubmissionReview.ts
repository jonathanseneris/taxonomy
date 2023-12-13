import { Submission, User, Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class SubmissionReview extends BaseEntity {
  @Property()
  date!: Date

  @ManyToOne(() => Submission)
  submission!: Rel<Submission>

  @ManyToOne(() => User)
  user!: Rel<User>

  @ManyToOne(() => Workshop)
  workshop!: Rel<Workshop>
}
