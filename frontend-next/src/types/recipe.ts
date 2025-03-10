type Video = {
  id: string;
  videoUrl: string;
  videoId: string;
};

export type Recipe = {
  id: string;
  name: string;
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
  video?: Video;
  createdAt: Date;
  updatedAt: Date;
};

// Add a utility type for camelCase conversion in components
export type CamelCaseRecipe = {
  id: string;
  name: string;
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
  video?: {
    id: string;
    videoUrl: string;
    videoId: string;
  };
  createdAt: Date;
  updatedAt: Date;
}; 