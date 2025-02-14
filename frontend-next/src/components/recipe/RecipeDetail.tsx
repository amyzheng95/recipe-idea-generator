"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/Card";

type RecipeDetailProps = {
  recipe: {
    id: string;
    name: string;
    imageUrl?: string;
    rating?: number;
    ingredients: string[];
    instructions: string[];
  };
};

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="text-blue-500 hover:text-blue-700 mb-4 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to recipes
          </button>

          <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-3">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
}
