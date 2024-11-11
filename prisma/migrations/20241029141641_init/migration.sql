/*
  Warnings:

  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_listId_fkey`;

-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_boardId_fkey`;

-- DropTable
DROP TABLE `file`;

-- DropTable
DROP TABLE `message`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `clerkId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_clerkId_key`(`clerkId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
