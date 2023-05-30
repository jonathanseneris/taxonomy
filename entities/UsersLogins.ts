import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { Users } from "./Users"

@Entity()
export class UsersLogins {
  [OptionalProps]?: "ipAddress" | "source"

  @PrimaryKey({ columnType: "bigint" })
  id!: string

  @Property()
  loginTime!: Date

  @Property({ length: 255 })
  ipAddress: string = ""

  @ManyToOne({ entity: () => "Users", index: "user_id" })
  user!: "Users"
}
