export type Recipe = {
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