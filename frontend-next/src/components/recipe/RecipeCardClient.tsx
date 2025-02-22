"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

// First, define the expected recipe type
type RecipeCardProps = {
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
  calories: number | null;
  description: string | null;
};

export default function RecipeCardClient({
  recipe,
}: {
  recipe: RecipeCardProps;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="mt-2 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
            ))}
          </div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  // Ensure all required properties are present
  const recipeWithDefaults: RecipeCardProps = {
    ...recipe,
    category: recipe.category || "uncategorized",
    cuisine: recipe.cuisine || "other",
    mealType: recipe.mealType || "other",
    prepTime: recipe.prepTime || 0,
    cookTime: recipe.cookTime || 0,
    difficulty: recipe.difficulty || null,
    servings: recipe.servings || null,
    calories: recipe.calories || null,
    description: recipe.description || null,
  };

  return <RecipeCard recipe={recipeWithDefaults} />;
}
