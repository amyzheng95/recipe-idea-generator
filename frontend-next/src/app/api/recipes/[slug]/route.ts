import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CamelCaseRecipe } from "@/types/recipe";
import { snakeToCamel } from "@/utils/caseConversion";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    const recipeName = decodedSlug.replace(/-/g, " ");

    const recipe = await prisma.recipe.findFirst({
      where: {
        name: {
          equals: recipeName,
          mode: 'insensitive',
        },
      },
      include: {
        video: true,
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    // Convert to camelCase for frontend
    const camelCaseRecipe = snakeToCamel<CamelCaseRecipe>(recipe);
    return NextResponse.json(camelCaseRecipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Error fetching recipe" },
      { status: 500 }
    );
  }
} 