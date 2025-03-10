/*
  Warnings:

  - You are about to drop the column `cookTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `favorites` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `meal_type` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookTime",
DROP COLUMN "createdAt",
DROP COLUMN "favorites",
DROP COLUMN "isPublished",
DROP COLUMN "mealType",
DROP COLUMN "prepTime",
DROP COLUMN "updatedAt",
DROP COLUMN "videoId",
DROP COLUMN "videoUrl",
DROP COLUMN "views",
ADD COLUMN     "cook_time" INTEGER,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "meal_type" TEXT NOT NULL,
ADD COLUMN     "prep_time" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_recipe_id_key" ON "Video"("recipe_id");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
