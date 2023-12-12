import {
  Entity,
  PrimaryKey,
  PrimaryKeyProp,
  PrimaryKeyType,
  Property,
} from "@mikro-orm/core"

@Entity()
export class Tag {
  @PrimaryKey() name!: string

  @Property({ nullable: true }) category?: string

  @Property() displayName!: string
}
