import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // First, search existing recipes
    const existingRecipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { ingredients: { hasSome: [query] } },
        ],
      },
    });

    if (existingRecipes.length > 0) {
      return NextResponse.json({ recipes: existingRecipes });
    }

    // If no existing recipes, call DeepSeek API
    const deepseekResponse = await fetch('https://api.deepseek.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Generate a recipe for ${query}. Include name, ingredients, and instructions.`,
      }),
    });

    const aiRecipe = await deepseekResponse.json();

    // Save the AI-generated recipe
    const newRecipe = await prisma.recipe.create({
      data: {
        name: aiRecipe.name,
        ingredients: aiRecipe.ingredients,
        instructions: aiRecipe.instructions,
        category: aiRecipe.category || 'AI Generated',
        cuisine: aiRecipe.cuisine || 'other',
        mealType: aiRecipe.mealType || 'other',
        rating: aiRecipe.rating || 0,
        prepTime: aiRecipe.prepTime || 0,
        cookTime: aiRecipe.cookTime || 0,
        difficulty: aiRecipe.difficulty || 'easy',
        servings: aiRecipe.servings || 1,
        tags: aiRecipe.tags || [],
        description: aiRecipe.description || '',
        calories: aiRecipe.calories || 0,
      },
    });

    return NextResponse.json({ recipes: [newRecipe] });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
} 