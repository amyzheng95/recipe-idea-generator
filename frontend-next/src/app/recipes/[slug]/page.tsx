"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, FireIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

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
  videoUrl?: string;
  videoInstructions?: {
    timestamp: number;
    instruction: string;
  }[];
};

type VideoInstruction = {
  text: string;
  timestamp: number;
  videoId: string;
};

function getYouTubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function RecipeDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null);
  const [videoInstructions, setVideoInstructions] = useState<
    VideoInstruction[]
  >([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/api/recipes");
        const recipes = await response.json();

        // Find recipe by matching the slug with the recipe name
        const decodedSlug = decodeURIComponent(params.slug);
        const foundRecipe = recipes.find(
          (r: Recipe) => r.name.toLowerCase().replace(/ /g, "-") === decodedSlug
        );

        if (foundRecipe) {
          setRecipe(foundRecipe);

          // Set up video instructions if video exists
          if (foundRecipe.videoUrl) {
            const videoId = foundRecipe.videoUrl;
            const instructions = foundRecipe.instructions.map(
              (text: string, index: number) => ({
                text,
                timestamp:
                  foundRecipe.videoInstructions?.[index]?.timestamp ||
                  index * 30,
                videoId,
              })
            );
            setVideoInstructions(instructions);
          }
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [params.slug]);

  const VideoPlayer = () => (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoInstructions[0]?.videoId}${
          currentTimestamp ? `?start=${currentTimestamp}` : ""
        }`}
        title="Recipe Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Recipe not found
      </div>
    );
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-pink/5 to-brand-yellow/5 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-8">
          {/* Left Column - Image and Quick Info */}
          <div className="space-y-6">
            {/* Hero Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={
                  recipe.videoUrl
                    ? `https://img.youtube.com/vi/${getYouTubeVideoId(
                        recipe.videoUrl
                      )}/maxresdefault.jpg`
                    : recipe.imageUrl || "/images/default-recipe.jpg"
                }
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-brand-pink" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Time
                    </p>
                    <p className="font-medium">{totalTime} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-brand-pink" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Servings
                    </p>
                    <p className="font-medium">{recipe.servings || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FireIcon className="h-5 w-5 text-brand-pink" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Calories
                    </p>
                    <p className="font-medium">{recipe.calories || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Difficulty
                    </p>
                    <p className="font-medium">{recipe.difficulty || "Easy"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-pink/10 text-brand-pink rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Recipe Details */}
          <div className="space-y-6">
            {/* Recipe Title and Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {recipe.name}
              </h1>
            </div>

            {/* Ingredients */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Ingredients</h2>
              <ul className="grid grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="text-gray-600 dark:text-gray-300 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-brand-pink rounded-full flex-shrink-0" />
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Instructions</h2>
                {recipe.videoUrl && (
                  <div className="flex items-center">
                    <label className="mr-3 text-sm text-gray-600 dark:text-gray-300">
                      Show Video
                    </label>
                    <Switch
                      checked={showVideo}
                      onChange={setShowVideo}
                      className={`${
                        showVideo ? "bg-brand-pink" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${
                          showVideo ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                )}
              </div>

              {showVideo && <VideoPlayer />}

              <ol className="list-decimal list-inside space-y-2 mt-4 overflow-y-auto">
                {recipe.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="text-gray-600 dark:text-gray-300 pl-2"
                  >
                    {showVideo && recipe.videoUrl && (
                      <button
                        onClick={() => setCurrentTimestamp(index * 30)}
                        className="flex items-center text-brand-pink hover:text-brand-orange transition-colors mt-1"
                      >
                        <PlayCircleIcon className="h-5 w-5 mr-1" />
                        <span className="text-sm">
                          {Math.floor((index * 30) / 60)}:
                          {((index * 30) % 60).toString().padStart(2, "0")}
                        </span>
                      </button>
                    )}
                    <span className={showVideo ? "flex-1 text-sm" : "text-sm"}>
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Keep existing mobile layout */}
        <div className="md:hidden">
          {/* ... existing mobile layout code ... */}
        </div>
      </div>
    </div>
  );
}
