"use client";

import { useEffect, useState } from "react";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeSearch from "@/components/recipe/RecipeSearch";

type Recipe = {
  id: string;
  name: string;
  imageUrl: string | null;
  rating: number | null;
  category: string;
  cuisine: string;
  mealType: string;
  prepTime: number | null;
  cookTime: number | null;
  difficulty: string | null;
  servings: number | null;
  tags: string[];
  description: string | null;
  calories: number | null;
  ingredients: string[];
  instructions: string[];
};

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/recipes");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch recipes");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-pink/5 to-brand-yellow/5 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* <RecipeSearch onSearch={() => {}} isLoading={false} /> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {isLoading ? (
            <div className="col-span-3 text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-pink border-r-transparent align-[-0.125em]" />
            </div>
          ) : error ? (
            <div className="col-span-3 text-center py-8 text-red-500">
              {error}
            </div>
          ) : recipes.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No recipes found
            </div>
          ) : (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                href={`/recipes/${encodeURIComponent(
                  recipe.name.toLowerCase().replace(/ /g, "-")
                )}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
