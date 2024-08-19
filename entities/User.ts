import { Account, Feedback, Session, Tag, Work } from "@/entities"
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
  @Unique()
  @Property({ columnType: "text", nullable: true })
  stripeCustomerId?: string

  @Unique()
  @Property({ columnType: "text", nullable: true })
  stripeSubscriptionId?: string

  @Property({ columnType: "text", nullable: true }) stripePriceId?: string

  @Property({ nullable: true }) stripeCurrentPeriodEnd?: Date

  @Unique() @Property() email: string

  @Property({ type: "Date", nullable: true }) emailVerified: Date | null = null

  @Property({ nullable: true }) image?: string

  @Property({ columnType: "text" }) bio: string = ""

  @Property({ columnType: "text" }) workingOn: string = ""

  @Property({ columnType: "text" }) lookingFor: string = ""

  @Property({ nullable: true }) name?: string = ""

  @Property() firstName?: string = ""

  @Property() middleName?: string = ""

  @Property() lastName?: string = ""

  @Property() active: boolean = true

  @Property() isAvailable: boolean = true

  @Property() isSetUp: boolean = false

  @Property() confirmed: boolean = false

  @Property() location: string = "Online"

  @Property() isLockedOut: boolean = false

  @OneToMany(() => Session, (session) => session.user) sessions! =
    new Collection<Session>(this)

  @OneToMany(() => Account, (account) => account.user) accounts =
    new Collection<Account>(this)

  @OneToMany(() => Work, (submission) => submission.user) works =
    new Collection<Work>(this)

  @OneToMany(() => Feedback, (submission) => submission.user)
  feedbackGiven = new Collection<Feedback>(this)

  @ManyToMany(() => Tag, (tag) => tag.user) tags = new Collection<Tag>(this)

  @ManyToMany(() => Work)
  worksGranted = new Collection<Work>(this)
}
