import { Account } from "@/entities/Account"
import { Session } from "@/entities/Session"
import { defaultEntities } from "@auth/mikro-orm-adapter"
import {
  Cascade,
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class User implements defaultEntities.User {
  @PrimaryKey() id: string = v4()

  @Property({ nullable: true }) image?: string

  @Unique()
  @Property({ columnType: "text", nullable: true })
  stripeCustomerId?: string

  @Unique()
  @Property({ columnType: "text", nullable: true })
  stripeSubscriptionId?: string

  @Property({ columnType: "text", nullable: true }) stripePriceId?: string

  @Property({ nullable: true }) stripeCurrentPeriodEnd?: Date

  @Unique() @Property({ nullable: true }) email?: string

  @Property({ type: "Date", nullable: true }) emailVerified: Date | null = null

  @Property({ nullable: true }) image?: string

  @Property({ columnType: "text" }) bio: string = ""

  @Property({ nullable: true }) name?: string = ""

  @Property() firstName?: string = ""

  @Property() middleName?: string = ""

  @Property() lastName?: string = ""

  @Property() active: boolean = true

  @Property() confirmed: boolean = false

  @Property() location: string = ""

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) createdAt!: Date

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) updatedAt!: Date

  @Property({ defaultRaw: `CURRENT_TIMESTAMP` }) lastModifiedAt!: Date

  @Property() isLockedOut: boolean = false

  @OneToMany({
    entity: () => Session,
    mappedBy: (session) => session.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  sessions = new Collection<Session>(this)

  @OneToMany({
    entity: () => Account,
    mappedBy: (account) => account.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  accounts = new Collection<Account>(this)
}
