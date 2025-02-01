/*
  Warnings:

  - You are about to drop the column `address_type` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `parent_category_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `ProductAttribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_product_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address_type";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parent_category_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ProductAttribute";
