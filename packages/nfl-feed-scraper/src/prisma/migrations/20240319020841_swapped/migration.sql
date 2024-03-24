-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `PlayerMatchStats` DROP FOREIGN KEY `PlayerMatchStats_opponentTeamId_fkey`;

-- AlterTable
ALTER TABLE `Player` MODIFY `teamId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PlayerMatchStats` MODIFY `opponentTeamId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`abv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerMatchStats` ADD CONSTRAINT `PlayerMatchStats_opponentTeamId_fkey` FOREIGN KEY (`opponentTeamId`) REFERENCES `Team`(`abv`) ON DELETE RESTRICT ON UPDATE CASCADE;
