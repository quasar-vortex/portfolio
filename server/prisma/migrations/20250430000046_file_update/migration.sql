-- AlterTable
ALTER TABLE `File` ADD COLUMN `updatedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
