/**
 * API functions for retrieving recipes
 */
import { API_BASE_URL } from "../config/apiConfig";
import { generateUUID } from "../utils/uuid";

// API Key for authentication
const API_KEY = "os5rLyTzFwt5cfioD1025o16PNQ5Wx1F";

/**
 * Interface for recipe data that matches the API schema
 */
export interface RecipeData {
  uuid: string;
  created_at: string;
  title: string;
  description: string;
  cooking_time: number;
  servings: number;
  image_url: string;
  source_url: string;
  author_name?: string;
  ingredients: string[];
  instructions: {
    title: string;
    steps: string[];
  }[];
  created_by?: number;
}

/**
 * Retrieves a recipe by UUID
 * @param uuid The UUID of the recipe to retrieve
 * @returns Promise with the recipe data
 */
export const getRecipe = async (uuid: string): Promise<RecipeData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipe/${uuid}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": generateUUID(),
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error retrieving recipe:", error);
    throw error;
  }
};
