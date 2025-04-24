-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_updatedById_fkey`;

-- DropIndex
DROP INDEX `Post_updatedById_fkey` ON `Post`;

-- DropIndex
DROP INDEX `Project_updatedById_fkey` ON `Project`;

-- AlterTable
ALTER TABLE `Post` MODIFY `updatedById` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Project` MODIFY `updatedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
