import { Tag, User } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
  Rel,
} from "@mikro-orm/core"

@Entity()
export class Work extends BaseEntity {
  @Property() title!: string

  @Property({ nullable: true }) password?: string

  @Property({ nullable: true }) url?: string

  @Property({ columnType: "text", default: "" }) content!: string

  @ManyToOne(() => User) user!: Rel<User>

  @ManyToMany(() => User, (u) => u.worksGranted)
  sharedWith = new Collection<User>(this)

  @ManyToMany(() => Tag)
  tags = new Collection<Tag>(this)
}
