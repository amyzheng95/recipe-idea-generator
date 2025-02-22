import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch recipe");
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return { recipes, loading, error, fetchSingleRecipe };
} 