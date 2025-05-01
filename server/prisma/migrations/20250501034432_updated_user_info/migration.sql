-- AlterTable
ALTER TABLE `User` ADD COLUMN `dateUpdated` DATETIME(3) NULL,
    ADD COLUMN `updatedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
