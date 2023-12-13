import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, Property } from "@mikro-orm/core"

@Entity()
export class EmailSent extends BaseEntity {
  @Property() to!: string

  @Property() subject!: string

  @Property({ columnType: "text", default: "" }) html!: string
}
