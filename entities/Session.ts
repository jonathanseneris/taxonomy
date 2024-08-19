import { User } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel, Unique } from "@mikro-orm/core"

@Entity()
export class Session extends BaseEntity {
  @Unique() @Property() sessionToken!: string

  @ManyToOne(() => User) user!: Rel<User>

  @Property() expires!: Date
}
