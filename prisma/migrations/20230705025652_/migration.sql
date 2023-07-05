-- CreateTable
CREATE TABLE "_WorkshopParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkshopParticipants_AB_unique" ON "_WorkshopParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkshopParticipants_B_index" ON "_WorkshopParticipants"("B");

-- AddForeignKey
ALTER TABLE "_WorkshopParticipants" ADD CONSTRAINT "_WorkshopParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkshopParticipants" ADD CONSTRAINT "_WorkshopParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
