"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useRecipes } from "@/hooks/useRecipes";
import { slugify } from "@/utils/slugify";
import RecipeCardClient from "@/components/recipe/RecipeCardClient";

export default function RecipeGenerator() {
  const { recipes, loading, error, fetchSingleRecipe } = useRecipes();
  const [singleRecipe, setSingleRecipe] = useState(null);

  const handleFetchSingleRecipe = async (id: string) => {
    try {
      const recipe = await fetchSingleRecipe(id);
      setSingleRecipe(recipe);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <RecipeCardClient key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </Card>
    </div>
  );
}
