"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RecipeSearch from "./RecipeSearch";

const categories = [
  {
    id: "lunch-dinner",
    name: "Lunch & Dinner",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg",
    count: 12,
  },
  {
    id: "breakfast",
    name: "Breakfast",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg",
    count: 8,
  },
  {
    id: "baked-goods",
    name: "Baked Goods",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg",
    count: 6,
  },
];

export default function RecipeCategories() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setShowResults(true);
    try {
      const response = await fetch("/api/recipes/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setSearchResults(data.recipes || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-pink to-brand-yellow dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <RecipeSearch onSearch={handleSearch} isLoading={isSearching} />

        {showResults ? (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h2 className="text-xl font-bold text-white mb-1">
                          {recipe.name}
                        </h2>
                        <p className="text-gray-200 text-sm">
                          {recipe.ingredients.length} ingredients •{" "}
                          {recipe.instructions.length} steps
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No recipes found. Try another search!
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/recipes/category/${category.id}`}
                className="group"
              >
                <div
                  className="bg-brand-yellow backdrop-blur-sm dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                    hover:shadow-[0_0_15px_rgba(247,95,7,0.3)] dark:hover:shadow-[0_0_20px_rgba(247,95,7,0.15)] 
                    transition-all duration-300 relative
                    before:absolute before:inset-0 before:z-0 before:transition-colors before:duration-300
                    hover:border-brand-orange/20 border-2 border-transparent
                    hover:before:bg-gradient-to-r hover:before:from-brand-yellow/5 hover:before:to-brand-pink/5
                    dark:hover:before:from-brand-orange/10 dark:hover:before:to-brand-pink/10"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-4 border-t border-brand-orange/10 dark:border-gray-700">
                    <p className="text-black dark:text-gray-300">
                      {category.count} recipes
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
