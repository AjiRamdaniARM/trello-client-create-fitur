-- DropIndex
DROP INDEX `Member_clerkId_key` ON `member`;

-- AlterTable
ALTER TABLE `member` MODIFY `clerkId` VARCHAR(191) NULL;
