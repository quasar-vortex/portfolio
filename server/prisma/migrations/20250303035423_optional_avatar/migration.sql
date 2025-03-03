-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_avatarFileId_fkey`;

-- DropIndex
DROP INDEX `User_avatarFileId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `avatarFileId` VARCHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_avatarFileId_fkey` FOREIGN KEY (`avatarFileId`) REFERENCES `File`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
