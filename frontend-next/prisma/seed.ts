import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.recipe.createMany({
    data: [
      {
        name: "Pasta Carbonara",
        rating: 4.5,
        category: "Main Course",
        cuisine: "Italian",
        mealType: "Dinner",
        prepTime: 15,
        cookTime: 20,
        difficulty: "Medium",
        servings: 4,
        tags: ["pasta", "pork", "eggs", "quick"],
        description: "Classic Roman pasta dish made with eggs, cheese, pancetta, and black pepper",
        calories: 650,
        ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Pancetta", "Black Pepper"],
        instructions: [
          "Cook pasta in salted water",
          "Fry pancetta until crispy",
          "Mix eggs and cheese",
          "Combine all ingredients"
        ]
      },
      {
        name: "Chicken Curry",
        rating: 4.2,
        category: "Main Course",
        cuisine: "Indian",
        mealType: "Dinner",
        prepTime: 20,
        cookTime: 40,
        difficulty: "Medium",
        servings: 6,
        tags: ["curry", "chicken", "spicy", "gluten-free"],
        description: "Rich and creamy coconut-based curry with tender chicken pieces",
        calories: 450,
        ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Onion", "Garlic"],
        instructions: [
          "Sauté onion and garlic",
          "Add chicken and cook until browned",
          "Stir in curry powder and coconut milk",
          "Simmer until chicken is cooked through"
        ]
      },
      {
        name: "Pancakes",
        rating: 4.2,
        category: "Breakfast",
        cuisine: "American",
        mealType: "Breakfast",
        prepTime: 10,
        cookTime: 15,
        difficulty: "Easy",
        servings: 8,
        tags: ["breakfast", "pancakes", "gluten-free"],
        description: "Fluffy pancakes made with simple ingredients",
        calories: 200,
        ingredients: ["Flour", "Eggs", "Milk", "Baking Powder", "Sugar"],
        instructions: [
          "Mix all ingredients",
          "Cook on a hot griddle",
          "Serve with butter and syrup"
        ]
      },
      {
        name: "Chocolate Chip Cookies",
        rating: 4.5,
        category: "Dessert",
        cuisine: "American",
        mealType: "Snack",
        prepTime: 15,
        cookTime: 10,
        difficulty: "Easy",
        servings: 24,
        tags: ["dessert", "cookies", "chocolate", "gluten-free"],
        description: "Classic chocolate chip cookies",
        calories: 200,
        ingredients: ["Butter", "Sugar", "Eggs", "Flour", "Chocolate Chips"],
        instructions: [
          "Mix all ingredients",
          "Bake at 350°F for 10 minutes"
        ]
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 