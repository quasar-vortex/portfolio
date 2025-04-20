/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `File` ADD COLUMN `url` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `File_url_key` ON `File`(`url`);
