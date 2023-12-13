import { Meeting, User, Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Submission extends BaseEntity {
  @Property() title!: string

  @Property() submissionDueDate!: Date

  @Property() submissionDate!: Date

  @Property({ nullable: true }) password?: string

  @Property({ columnType: "text", default: "" }) content!: string

  @ManyToOne(() => Meeting) meeting?: Rel<Meeting>

  @ManyToOne(() => User) user!: Rel<User>

  @ManyToOne(() => Workshop) workshop!: Rel<Workshop>
}
