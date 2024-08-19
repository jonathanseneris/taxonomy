import { User, Work } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToMany, PrimaryKey, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Tag extends BaseEntity {
  @PrimaryKey() name!: string

  @Property({ nullable: true }) category?: string

  @Property() displayName!: string

  @ManyToMany(() => User) user!: Rel<User>

  @ManyToMany(() => Work) submission!: Rel<User>
}
