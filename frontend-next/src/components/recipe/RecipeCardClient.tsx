"use client";

import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

type Recipe = {
  id: string;
  name: string;
  imageUrl?: string;
  rating?: number;
  ingredients: string[];
  instructions: string[];
};

export default function RecipeCardClient({ recipe }: { recipe: Recipe }) {
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

  return <RecipeCard recipe={recipe} />;
}
