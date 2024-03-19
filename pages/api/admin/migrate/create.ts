import { NextApiRequest, NextApiResponse } from "next"
import { MikroORM } from "@mikro-orm/core"
import { TSMigrationGenerator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/postgresql"

import { env } from "@/env.mjs"

import * as entities from "../../../../entities"
import withORM from "../../../../orm/withORM"
import handleErrors from "../../../../utils/handleErrors"

async function create(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("db:", env.DATABASE_URL)
    const orm = await MikroORM.init(
      defineConfig({
        clientUrl: env.DATABASE_URL,
        // metadataProvider: TsMorphMetadataProvider,
        entities: Object.values(entities),
        entitiesTs: [`${__dirname}/../entities/**/*.ts`],
        debug: true,
        migrations: {
          tableName: "mikro_orm_migrations", // name of database table with log of executed transactions
          path: "./migrations", // path to the folder with migrations
          // pathTs: './migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
          glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
          transactional: false, // wrap each migration in a transaction
          disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
          allOrNothing: false, // wrap all migrations in master transaction
          dropTables: true, // allow to disable table dropping
          safe: false, // allow to disable table and column dropping
          snapshot: true, // save Snapshot when creating new migrations
          emit: "ts", // migration generation mode
          // generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
        },
        seeder: {
          path: "./dist/seeders", // path to the folder with seeders
          pathTs: "./seeders", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
          defaultSeeder: "DatabaseSeeder", // default seeder class name
          glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
          emit: "ts", // seeder generation mode
          fileName: (className: string) => className, // seeder file naming convention
        },
      })
    )
    console.log("connected")
    const migrator = orm.getMigrator()
    console.log("migrator initialized")
    await migrator.createMigration()
    console.log("migration created")
    // await migrator.up();
    // console.log('migration complete');

    res.status(200).end()
  } catch (err) {
    await handleErrors({ err, req, res })
  }
}

export default withORM(create)
