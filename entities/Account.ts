import { User } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core"

@Entity()
export class Account extends BaseEntity {
  @ManyToOne(() => User) user!: Rel<User>

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
}
