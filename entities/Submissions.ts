import { SubmissionReviews } from "@/entities/SubmissionReviews"
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  types,
} from "@mikro-orm/core"
import { v4 } from "uuid"

@Entity()
export class Submissions {
  [OptionalProps]?: "content"

  @PrimaryKey()
  id: string = v4()

  @Property()
  title?: string

  @ManyToOne({ entity: () => "Users", onUpdateIntegrity: "cascade" })
  author!: "Users"

  @ManyToOne({ entity: () => "Workshops", onUpdateIntegrity: "cascade" })
  workshop!: "Workshops"

  @OneToMany(() => SubmissionReviews, (s) => s.submission)
  reviews = new Collection<SubmissionReviews>(this)

  @Property()
  submissionDueDate?: Date

  @Property()
  submissionDate?: Date

  @ManyToOne({ entity: () => "Meetings", onUpdateIntegrity: "cascade" })
  meeting: "Meetings"

  @Property({ nullable: true })
  password?: string

  @Property({ type: types.text })
  content = ""
}
