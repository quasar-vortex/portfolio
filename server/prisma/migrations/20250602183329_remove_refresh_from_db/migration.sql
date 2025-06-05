/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_refreshToken_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `refreshToken`;
