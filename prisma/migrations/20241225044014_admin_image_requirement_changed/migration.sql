-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_imageId_fkey";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "imageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
