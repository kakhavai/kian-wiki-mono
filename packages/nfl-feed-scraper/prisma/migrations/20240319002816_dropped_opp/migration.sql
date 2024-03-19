/*
  Warnings:

  - You are about to drop the column `teamId` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - Added the required column `opponentTeamId` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PlayerMatchStats` DROP FOREIGN KEY `PlayerMatchStats_teamId_fkey`;

-- AlterTable
ALTER TABLE `PlayerMatchStats` DROP COLUMN `teamId`,
    ADD COLUMN `opponentTeamId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PlayerMatchStats` ADD CONSTRAINT `PlayerMatchStats_opponentTeamId_fkey` FOREIGN KEY (`opponentTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
