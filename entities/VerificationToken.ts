import { Entity, PrimaryKey, Property } from "@mikro-orm/core"

@Entity()
export class VerificationToken {
  @PrimaryKey() token!: string

  @Property() identifier!: string

  @Property() expires!: Date
}
