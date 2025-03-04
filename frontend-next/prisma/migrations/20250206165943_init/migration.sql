-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "category" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "difficulty" TEXT,
    "servings" INTEGER,
    "tags" TEXT[],
    "description" TEXT,
    "calories" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "videoUrl" TEXT,
    "videoInstructions" JSONB,
    "isPublished" BOOLEAN,
    "views" INTEGER,
    "favorites" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
