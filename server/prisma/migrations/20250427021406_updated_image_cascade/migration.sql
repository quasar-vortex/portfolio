-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_coverImageId_fkey`;

-- DropIndex
DROP INDEX `Project_coverImageId_fkey` ON `Project`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_coverImageId_fkey` FOREIGN KEY (`coverImageId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
