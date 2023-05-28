// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as entityFiles from "../entities";

const entities = Object.keys(entityFiles)
  .filter((n) => n !== "ClaimStatuses")
  // @ts-ignore
  .map((key) => entityFiles[key]);

const config = {
  clientUrl: process.env.DATABASE_URL,
  port: 3306,
  type: "postgresql",
  debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
  entities: Object.values(entities),
  entitiesTs: [`${__dirname}/../entities/**/*.ts`],
  debug: true,
};

export default config;
