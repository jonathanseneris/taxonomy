import { Work, User } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Feedback extends BaseEntity {
  @Property()
  date!: Date

  @ManyToOne(() => Work)
  submission!: Rel<Work>

  @ManyToOne(() => User)
  user!: Rel<User>

  @Property({ columnType: "text" })
  body: string = ""
}
