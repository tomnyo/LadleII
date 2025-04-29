/**
 * API functions for creating recipes
 */
import { API_BASE_URL } from "../config/apiConfig";
import { generateUUID } from "../utils/uuid";

// API Key for authentication
const API_KEY = "os5rLyTzFwt5cfioD1025o16PNQ5Wx1F";

/**
 * Interface for recipe data that matches the API schema
 */
export interface RecipeCreateData {
  title: string;
  description: string;
  cooking_time: number;
  servings: number;
  image_url: string;
  source_url: string;
  ingredients: string[];
  instructions: {
    title: string;
    steps: string[];
  }[];
}

/**
 * Creates a new recipe
 * @param recipeData The recipe data to create
 * @returns Promise with the created recipe
 */
export const createRecipe = async (recipeData: RecipeCreateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": generateUUID(),
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};
