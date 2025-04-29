/**
 * API functions for recipe-related operations
 */
import { API_BASE_URL } from "../config/apiConfig";
import { generateUUID } from "../utils/uuid";

// API Key for authentication
const API_KEY = "os5rLyTzFwt5cfioD1025o16PNQ5Wx1F";

/**
 * Triggers an asynchronous recipe extraction from a URL
 * @param sourceUrl The URL of the recipe to extract
 * @returns Promise with the extraction response
 */
export const triggerRecipeExtraction = async (sourceUrl: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipe/extract/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-session-id": generateUUID(),
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ source_url: sourceUrl }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error triggering recipe extraction:", error);
    throw error;
  }
};

/**
 * Checks the status of an extraction process
 * @param extractionId The UUID of the extraction process
 * @returns Promise with the extraction status
 */
export const checkExtractionStatus = async (extractionId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/recipe/update-extraction-status/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": generateUUID(),
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          extraction_id: extractionId,
          status: "completed",
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking extraction status:", error);
    throw error;
  }
};
