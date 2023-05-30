import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  types,
} from "@mikro-orm/core"

@Entity()
export class EmailsSent {
  [OptionalProps]?: "html"

  @PrimaryKey()
  id!: number

  @Property()
  to?: string

  @Property()
  subject?: string

  @Property({ type: types.text })
  html = ""

  @Property()
  createdAt: Date = new Date()
}
