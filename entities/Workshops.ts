import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  types,
} from "@mikro-orm/core"
import { v4 } from "uuid"

import { SubmissionSlots } from "./SubmissionSlots"
import { Submissions } from "./Submissions"
import { Tags } from "./Tags"
import { Users } from "./Users"

@Entity()
export class Workshops {
  [OptionalProps]?: "archived" | "description" | "leaderBio" | "open" | "paid"

  @PrimaryKey()
  id: string = v4()

  @Property()
  targetSize?: number

  @Property()
  startDate?: Date

  @Property()
  paid: boolean = false

  @Property({ type: types.decimal })
  price?: number

  // nextSubmissionDate?: Date;
  // nextSubmissionDueDate?: Date;
  // feedbackDueDate?: Date;
  // nextSubmitter: User[];

  @Property()
  submissionLength?: string

  @Property()
  name: string = ""

  @Property({ type: types.text })
  description = ""

  @Property()
  open: boolean = true

  @Property()
  archived: boolean = false

  @ManyToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  leader: "Users"

  @Property()
  leaderBio: string = ""

  @ManyToMany(() => Tags)
  tags = new Collection<Tags>(this)

  @ManyToMany(() => Users)
  users = new Collection<Users>(this)

  @OneToMany(() => Submissions, (s) => s.workshop)
  submissions = new Collection<Submissions>(this)

  @OneToMany(() => SubmissionSlots, (s) => s.workshop)
  submissionSlots = new Collection<SubmissionSlots>(this)

  // @Property({ persist: false })
  // get participants() {
  //   return (this.participants || []).filter((p) => p !== this.leader);
  // }
}
