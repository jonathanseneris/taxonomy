import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class Workshop {
  @PrimaryKey()
  id: string = v4()

  @Property()
  targetSize!: number

  @Property()
  startDate!: Date

  @Property()
  paid: boolean = false

  @Property({ columnType: "numeric(10,2)", nullable: true })
  price?: string

  @Property()
  submissionLength!: string

  @Property()
  name!: string

  @ManyToMany(() => "User")
  participants = new Collection<"User">(this)

  @Property({ columnType: "text" })
  description: string = ""

  @Property()
  open: boolean = true

  @Property()
  archived: boolean = false

  @ManyToOne(() => "User")
  createdBy!: "User"

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt!: Date
}
