/*
  Warnings:

  - The primary key for the `ProjectTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `ProjectTag` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `ProjectTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProjectTag` DROP FOREIGN KEY `ProjectTag_postId_fkey`;

-- DropIndex
DROP INDEX `ProjectTag_postId_fkey` ON `ProjectTag`;

-- AlterTable
ALTER TABLE `ProjectTag` DROP PRIMARY KEY,
    DROP COLUMN `postId`,
    ADD COLUMN `projectId` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`tagId`, `projectId`);

-- AddForeignKey
ALTER TABLE `ProjectTag` ADD CONSTRAINT `ProjectTag_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
