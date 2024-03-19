/*
  Warnings:

  - Added the required column `teamId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Player_name_key` ON `Player`;

-- AlterTable
ALTER TABLE `Player` ADD COLUMN `teamId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `abv` VARCHAR(191) NOT NULL,
    `wins` INTEGER NOT NULL,
    `losses` INTEGER NOT NULL,
    `pa` INTEGER NOT NULL,
    `pf` INTEGER NOT NULL,
    `tie` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Team_name_key`(`name`),
    UNIQUE INDEX `Team_abv_key`(`abv`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerMatchStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `playerId` INTEGER NOT NULL,
    `targets` INTEGER NOT NULL,
    `receptions` INTEGER NOT NULL,
    `yards` INTEGER NOT NULL,
    `touchdowns` INTEGER NOT NULL,
    `carries` INTEGER NOT NULL,
    `passes` INTEGER NOT NULL,
    `completions` INTEGER NOT NULL,
    `passingYards` INTEGER NOT NULL,
    `passingTds` INTEGER NOT NULL,
    `interceptions` INTEGER NOT NULL,
    `fumbles` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `matchDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerMatchStats` ADD CONSTRAINT `PlayerMatchStats_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerMatchStats` ADD CONSTRAINT `PlayerMatchStats_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
