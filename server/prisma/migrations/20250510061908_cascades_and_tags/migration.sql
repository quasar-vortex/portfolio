/*
  Warnings:

  - You are about to drop the column `authorId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_authorId_fkey`;

-- DropIndex
DROP INDEX `Project_authorId_fkey` ON `Project`;

-- DropIndex
DROP INDEX `Tag_authorId_fkey` ON `Tag`;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `authorId`,
    DROP COLUMN `isActive`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
