import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const cuisine = searchParams.get("cuisine");
    const mealType = searchParams.get("mealType");
    const difficulty = searchParams.get("difficulty");
    const maxTime = searchParams.get("maxTime"); // Total cook + prep time
    const minRating = searchParams.get("minRating");
    const tags = searchParams.get("tags")?.split(",");

    const filters: Prisma.RecipeWhereInput = {
      ...(category && { category }),
      ...(cuisine && { cuisine }),
      ...(mealType && { mealType }),
      ...(difficulty && { difficulty }),
      ...(maxTime && { 
        prepTime: { 
          lte: parseInt(maxTime)
        }
      }),
      ...(minRating && { rating: { gte: parseFloat(minRating) } }),
      ...(tags && { tags: { hasEvery: tags } }),
    };

    const recipes = await prisma.recipe.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        rating: true,
        category: true,
        cuisine: true,
        mealType: true,
        prepTime: true,
        cookTime: true,
        difficulty: true,
        servings: true,
        tags: true,
        description: true,
        calories: true,
        ingredients: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Error fetching recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const recipe = await prisma.recipe.create({
      data: {
        name: body.name,
        ingredients: body.ingredients,
        instructions: body.instructions,
        category: body.category || 'uncategorized',
        cuisine: body.cuisine || 'other',
        mealType: body.mealType || 'other',
        imageUrl: body.imageUrl,
        rating: body.rating || 0,
        prepTime: body.prepTime || 0,
        cookTime: body.cookTime || 0,
        difficulty: body.difficulty || 'easy',
        servings: body.servings || 1,
        tags: body.tags || [],
        description: body.description || '',
        calories: body.calories || 0,
      },
    });
    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { message: "Error creating recipe" },
      { status: 500 }
    );
  }
} 