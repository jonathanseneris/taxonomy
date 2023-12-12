import {
  Entity,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { User } from "./User"
import { Workshop } from "./Workshop"

@Entity()
export class Application {
  [OptionalProps]?: "about" | "sample" | "statement" | "status"

  @PrimaryKey({ columnType: "text" }) id!: string

  @Property({ nullable: true }) submittedOn?: Date

  @Property({ nullable: true }) viewedOn?: Date

  @Property({ nullable: true }) statusChangedOn?: Date

  @Property({ default: "Draft" }) status: string = ""

  @Property({ columnType: "text" }) statement: string = ""

  @Property({ columnType: "text" }) about: string = ""

  @Property({ columnType: "text" }) sample: string = ""

  @ManyToOne(() => User) user!: User

  @ManyToOne(() => Workshop) workshop!: Workshop
}
