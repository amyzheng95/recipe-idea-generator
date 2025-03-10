import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Recipe } from "@/types/recipe";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const cuisine = searchParams.get("cuisine");
    const mealType = searchParams.get("mealType");
    const difficulty = searchParams.get("difficulty");
    const maxTime = searchParams.get("maxTime");
    const minRating = searchParams.get("minRating");
    const tags = searchParams.get("tags")?.split(",");

    const recipes = await prisma.recipe.findMany({
      where: {
        ...(category && { category }),
        ...(cuisine && { cuisine }),
        ...(mealType && { mealType }),
        ...(difficulty && { difficulty }),
        ...(maxTime && {
          OR: [
            { prepTime: { lte: parseInt(maxTime) } },
            { cookTime: { lte: parseInt(maxTime) } },
          ],
        }),
        ...(minRating && { rating: { gte: parseFloat(minRating) } }),
        ...(tags && { tags: { hasEvery: tags } }),
      },
      include: {
        video: true,
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Convert camelCase to snake_case for database
    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        rating: body.rating || 0,
        category: body.category,
        cuisine: body.cuisine,
        meal_type: body.mealType,
        prep_time: body.prepTime || 0,
        cook_time: body.cookTime || 0,
        difficulty: body.difficulty || 'easy',
        servings: body.servings || 1,
        tags: body.tags || [],
        description: body.description || '',
        calories: body.calories || 0,
        ingredients: body.ingredients,
        instructions: body.instructions,
        ...(body.video && {
          video: {
            create: {
              video_url: body.video.videoUrl,
              video_id: body.video.videoId,
            },
          },
        }),
      },
      include: {
        video: true,
      },
    });

    // Convert back to camelCase for response
    const camelCaseRecipe = snakeToCamel<CamelCaseRecipe>(recipe);
    return NextResponse.json(camelCaseRecipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}