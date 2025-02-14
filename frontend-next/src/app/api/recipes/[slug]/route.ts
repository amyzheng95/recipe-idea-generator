import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Error fetching recipe" },
      { status: 500 }
    );
  }
} 