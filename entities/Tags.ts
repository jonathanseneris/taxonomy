import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core"

import { Workshops } from "./Workshops"

@Entity()
export class Tags {
  @PrimaryKey()
  name!: string

  @Property()
  displayName!: string

  @Property()
  category?: string

  @ManyToMany(() => Workshops, (ur) => ur.tags)
  workshops? = new Collection<Workshops>(this)
}
