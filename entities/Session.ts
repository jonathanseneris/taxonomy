import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class Session {
  @PrimaryKey() id: string = v4()

  @Unique() @Property() sessionToken!: string

  @ManyToOne(() => "User") user!: "User"

  @Property() expires!: Date
}
