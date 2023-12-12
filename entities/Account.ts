import { ManyToOne, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core"
import { v4 } from "uuid"

import { User } from "./User"

export class Account {
  @PrimaryKey() id: string = v4()

  @ManyToOne(() => User) user!: User

  @Property() type!: string

  @Property() provider!: string

  @Property() providerAccountId!: string

  @Property({ nullable: true }) refreshToken?: string

  @Property({ nullable: true }) accessToken?: string

  @Property({ nullable: true }) expiresAt?: number

  @Property({ nullable: true }) tokenType?: string

  @Property({ nullable: true }) scope?: string

  @Property({ nullable: true }) idToken?: string

  @Property({ nullable: true }) sessionState?: string

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) createdAt!: Date

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) updatedAt!: Date
}
