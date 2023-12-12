import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from "uuid"

import { Workshop } from "./Workshop"

@Entity()
export class Meeting {
  @PrimaryKey() id: string = v4()

  @Property() startTime!: Date

  @ManyToOne(() => Workshop) workshop!: Workshop
}
