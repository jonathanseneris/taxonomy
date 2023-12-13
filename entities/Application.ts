import { User, Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Application extends BaseEntity {
  @Property({ nullable: true }) submittedOn?: Date

  @Property({ nullable: true }) viewedOn?: Date

  @Property({ nullable: true }) statusChangedOn?: Date

  @Property({ default: "Draft" }) status: string = ""

  @Property({ columnType: "text" }) statement: string = ""

  @Property({ columnType: "text" }) about: string = ""

  @Property({ columnType: "text" }) sample: string = ""

  @ManyToOne(() => User) user!: Rel<User>

  @ManyToOne(() => Workshop) workshop!: Rel<Workshop>
}
