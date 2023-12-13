import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export class Tag extends BaseEntity {
  @PrimaryKey() name!: string

  @Property({ nullable: true }) category?: string

  @Property() displayName!: string
}
