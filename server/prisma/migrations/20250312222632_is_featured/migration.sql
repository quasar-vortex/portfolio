/*
  Warnings:

  - Added the required column `isFeatured` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFeatured` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `isFeatured` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `isFeatured` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `ProjectTag` (
    `postId` VARCHAR(36) NOT NULL,
    `tagId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`tagId`, `postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectTag` ADD CONSTRAINT `ProjectTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTag` ADD CONSTRAINT `ProjectTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
