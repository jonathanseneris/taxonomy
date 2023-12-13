import { Application, Meeting, Submission, User } from "@/entities"
import { BaseEntity } from "@/modules/common/base.entity"
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from "@mikro-orm/core"

@Entity()
export class Workshop extends BaseEntity {
  @Property()
  targetSize!: number

  @Property()
  startDate!: Date

  @Property()
  paid: boolean = false

  @Property({ columnType: "numeric(10,2)", nullable: true })
  price?: string

  @Property()
  submissionLength!: string

  @Property()
  name!: string

  @Property({ columnType: "text" })
  description: string = ""

  @Property()
  open: boolean = true

  @Property()
  archived: boolean = false

  @ManyToOne(() => User)
  createdBy!: Rel<User>

  @OneToMany(() => Meeting, (meeting) => meeting.workshop)
  meetings = new Collection<Meeting>(this)

  @OneToMany(() => Application, (application) => application.workshop)
  applications = new Collection<Application>(this)

  @OneToMany(() => Submission, (submission) => submission.workshop)
  submissions = new Collection<Submission>(this)

  @ManyToMany(() => User, "workshops", { owner: true })
  participants = new Collection<User>(this)
}
