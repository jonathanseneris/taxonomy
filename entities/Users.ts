import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  Unique,
  types,
} from "@mikro-orm/core"
import { v4 } from "uuid"

import { Submissions } from "./Submissions"
import { Workshops } from "./Workshops"

@Entity()
export class Users {
  [OptionalProps]?:
    | "active"
    | "bio"
    | "confirmed"
    | "createdAt"
    | "isLockedOut"
    | "lastModifiedAt"
    | "location"
    | "updatedAt"

  @PrimaryKey()
  id: string = v4()

  @Property({ columnType: "text", nullable: true })
  image?: string

  @Unique({ name: "users_stripe_customer_id_key" })
  @Property({ columnType: "text", nullable: true })
  stripeCustomerId?: string

  @Unique({ name: "users_stripe_subscription_id_key" })
  @Property({ columnType: "text", nullable: true })
  stripeSubscriptionId?: string

  @Property({ columnType: "text", nullable: true })
  stripePriceId?: string

  @Property({ length: 3, nullable: true })
  stripeCurrentPeriodEnd?: Date

  @Unique({ name: "user_email_unique" })
  @Property()
  email!: string

  @Property({ fieldName: "emailVerified", nullable: true })
  emailVerified?: Date

  @Property({ type: types.text })
  bio = ""

  @Property()
  name: string = ""

  @Property()
  firstName: string = ""

  @Property()
  middleName: string = ""

  @Property()
  lastName: string = ""

  @Property()
  active: boolean = true

  @Property()
  confirmed: boolean = false

  @Property()
  location?: string = ""

  @Property()
  phone?: string = ""

  @Property()
  createdAt?: Date = new Date()

  @Property()
  lastModifiedAt?: Date = new Date()

  @OneToMany(() => Submissions, (submission) => submission.author)
  submissions = new Collection<Submissions>(this)

  @ManyToMany(() => Workshops)
  workshops = new Collection<Workshops>(this)
}
