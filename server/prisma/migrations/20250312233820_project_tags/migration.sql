-- DropForeignKey
ALTER TABLE `PostTag` DROP FOREIGN KEY `PostTag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectTag` DROP FOREIGN KEY `ProjectTag_tagId_fkey`;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTag` ADD CONSTRAINT `ProjectTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
