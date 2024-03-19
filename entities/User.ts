import { Account, Session, Submission, Workshop } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import { defaultEntities } from "@auth/mikro-orm-adapter"
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core"

@Entity()
export class User extends BaseEntity implements defaultEntities.User {
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

  @Property() isLockedOut: boolean = false

  @OneToMany(() => Session, (session) => session.user)
  sessions! = new Collection<Session>(this)

  @OneToMany(() => Account, (account) => account.user)
  accounts = new Collection<Account>(this)

  @OneToMany(() => Submission, (submission) => submission.user)
  submissions = new Collection<Submission>(this)

  @ManyToMany(() => Workshop, (workshop) => workshop.participants)
  workshops = new Collection<Workshop>(this)
}
