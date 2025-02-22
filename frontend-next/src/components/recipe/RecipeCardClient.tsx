"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/types/recipe";

type RecipeCardClientProps = {
  recipe: Recipe;
};

export default function RecipeCardClient({ recipe }: RecipeCardClientProps) {
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

  const href = `/recipes/${encodeURIComponent(
    recipe.name.toLowerCase().replace(/ /g, "-")
  )}`;

  return <RecipeCard recipe={recipe} href={href} />;
}
