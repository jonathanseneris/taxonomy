-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "submittedOn" DROP NOT NULL,
ALTER COLUMN "viewedOn" DROP NOT NULL,
ALTER COLUMN "statusChangedOn" DROP NOT NULL;
