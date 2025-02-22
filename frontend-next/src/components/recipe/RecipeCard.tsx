import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { slugify } from "@/utils/slugify";
import { ClockIcon, UserIcon, FireIcon } from "@heroicons/react/24/outline";
import { Recipe } from "@/types/recipe";

type RecipeCardProps = {
  recipe: Omit<
    Recipe,
    "ingredients" | "instructions" | "videoUrl" | "videoInstructions" | "tags"
  >;
  href: string;
};

export default function RecipeCard({ recipe, href }: RecipeCardProps) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <Link href={href} className="group">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
        hover:shadow-lg transition-all duration-300"
      >
        <div className="relative h-48">
          <Image
            src={recipe.imageUrl || "/images/default-recipe.jpg"}
            alt={recipe.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-xl font-semibold text-white mb-1">
              {recipe.name}
            </h2>
            <p className="text-gray-200 text-sm">
              {recipe.cuisine} • {recipe.mealType}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              {totalTime} min
            </div>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {recipe.servings || "-"}
            </div>
            <div className="flex items-center">
              <FireIcon className="h-4 w-4 mr-1" />
              {recipe.calories || "-"} cal
            </div>
          </div>
          {recipe.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {recipe.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="px-2 py-1 text-xs rounded-full bg-brand-pink/10 text-brand-pink">
              {recipe.difficulty || "Easy"}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-brand-orange/10 text-brand-orange">
              {recipe.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
