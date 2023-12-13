import { Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Meeting extends BaseEntity {
  @Property() startTime!: Date

  @ManyToOne(() => Workshop) workshop!: Rel<Workshop>
}
