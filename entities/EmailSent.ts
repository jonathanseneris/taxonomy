import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export class EmailSent {
  @PrimaryKey() id!: number

  @Property() to!: string

  @Property() subject!: string

  @Property({ columnType: "text", default: "" }) html!: string

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) createdAt!: Date
}
