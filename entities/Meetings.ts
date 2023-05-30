import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { Submissions } from "./Submissions"
import { Users } from "./Users"

@Entity()
export class Meetings {
  @PrimaryKey()
  id!: number

  @ManyToOne({ entity: () => "Workshops", onUpdateIntegrity: "cascade" })
  workshop!: "Workshops"

  @Property()
  startTime: Date

  @OneToMany(() => Submissions, (s) => s.meeting)
  slots = new Collection<Submissions>(this)

  @ManyToMany(() => Users)
  invitees = new Collection<Users>(this)

  @ManyToMany(() => Users)
  attendees = new Collection<Users>(this)
}
