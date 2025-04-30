import RecipeList from "../components/RecipeList";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Edit, Camera, Link, Sparkles } from "lucide-react";
import AddViaLinkModal from "../components/AddViaLinkModal";
import RecipeCard from "../components/RecipeCard";
import { getAllRecipes } from "../api/recipeApi";
import { RecipeData } from "../api/getRecipe";

const RecipeGallery = () => {
  const navigate = useNavigate();
  const [isSubButtonsVisible, setIsSubButtonsVisible] = useState(false);
  const [isAddViaLinkModalOpen, setIsAddViaLinkModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<
    Array<{
      id: string;
      title: string;
      cookTime: string;
      servings: number;
      description: string;
      imageUrl: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const apiRecipes = await getAllRecipes();

        // Transform API data to match the expected format for RecipeCard
        const transformedRecipes = apiRecipes.map((recipe) => ({
          id: recipe.uuid,
          title: recipe.title,
          cookTime: `${recipe.cooking_time} minutes`,
          servings: recipe.servings,
          description: recipe.description,
          imageUrl: recipe.image_url,
        }));

        setRecipes(transformedRecipes);
        setError(null);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Failed to load recipes. Please try again later.");
        // Fallback to empty array if API fails
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const toggleSubButtons = () => {
    setIsSubButtonsVisible(!isSubButtonsVisible);
  };

  const handleSubButtonClick = (action: string) => {
    console.log(`${action} clicked`);
    setIsSubButtonsVisible(false);

    if (action === "Add recipe link") {
      setIsAddViaLinkModalOpen(true);
    } else if (action === "Upload a photo") {
      // Create a file input element
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      // Important: Do NOT set the capture attribute at all to allow both camera and gallery access

      // Handle file selection
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          console.log("Photo selected:", file.name);
          // Here you would process the image file
          // For example, upload it to a server or extract recipe data
        }
      };

      // Trigger the file input click
      fileInput.click();
    }
  };

  const handleAddViaLinkSubmit = (link: string) => {
    console.log("Recipe link submitted:", link);
    // The extraction is handled in the modal component
    setIsAddViaLinkModalOpen(false);
  };

  // Custom recipe list component that overrides the default navigation
  const CustomRecipeList = ({
    recipes,
  }: {
    recipes: Array<{
      id: string;
      title: string;
      cookTime: string;
      servings: number;
      description: string;
      imageUrl: string;
    }>;
  }) => {
    const navigate = useNavigate();

    const handleRecipeClick = (id: string) => {
      navigate(`/recipe/${id}`);
    };

    return (
      <div className="space-y-4 pb-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
            <RecipeCard
              id={recipe.id}
              title={recipe.title}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden relative">
      {/* Background dim overlay */}
      {isSubButtonsVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out z-20"
          onClick={toggleSubButtons}
          aria-hidden="true"
        />
      )}

      <header className="bg-white p-4 shadow-[0px_2px_6px_0px_#00000014] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center">
          <div className="flex items-center text-orange-500 font-bold text-2xl">
            <img
              src="/ladle-icon.svg"
              alt="Ladle icon"
              style={{
                width: 23.66079330444336,
                height: 30,
                top: 42,
                left: 21.1,
              }}
              className="mr-1"
            />
            <span className="font-serif font-normal text-[32px] leading-none tracking-[0%]">
              Ladle
            </span>
          </div>
        </div>
      </header>

      <div className="sticky top-[72px] bg-gray-50 pt-4 pb-4 max-w-3xl mx-auto w-full px-4">
        <div className="mb-6">
          <h1 className="font-serif font-semibold text-[24px] leading-none tracking-[0%] text-[#1A1A1A] inline-block">
            Recipes{" "}
          </h1>
          <span className="font-serif font-semibold text-[24px] leading-none tracking-[0%] text-[#6A6A6A] ml-1">
            ({recipes.length})
          </span>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full h-[44px] rounded-[6px] border border-[#E5E5E5] py-[14px] px-[16px] pl-[40px] text-[14px] outline-none focus:border-[#7D4CDB] focus:border"
              onClick={() => navigate("/search")}
              readOnly
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Loading recipes...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-600 text-center">
              {error}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No recipes found. Add your first recipe!
              </p>
            </div>
          ) : (
            <CustomRecipeList recipes={recipes} />
          )}
        </div>
      </main>

      {/* Floating Add Recipe Button with Sub-buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end">
        {/* Sub-buttons container */}
        {isSubButtonsVisible && (
          <div className="flex flex-col-reverse gap-4 mb-4 items-end">
            {/* Write from scratch */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 text-sm font-medium bg-white px-2 py-1 rounded-md shadow-sm">
                Write from scratch
              </span>
              <button
                className="bg-white hover:bg-gray-50 text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
                onClick={() => {
                  setIsSubButtonsVisible(false);
                  navigate("/create-recipe");
                }}
                aria-label="Write from scratch"
              >
                <Edit size={24} />
              </button>
            </div>

            {/* Add from photo */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 text-sm font-medium bg-white px-2 py-1 rounded-md shadow-sm">
                Upload a photo/image
              </span>
              <button
                className="bg-white hover:bg-gray-50 text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
                onClick={() => handleSubButtonClick("Upload a photo")}
                aria-label="Add from photo"
              >
                <Camera size={24} />
              </button>
            </div>

            {/* Add recipe link */}
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 text-sm font-medium bg-white px-2 py-1 rounded-md shadow-sm">
                Add via link
              </span>
              <button
                className="bg-white hover:bg-gray-50 text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
                onClick={() => handleSubButtonClick("Add recipe link")}
                aria-label="Add recipe link"
              >
                <Link size={24} />
              </button>
            </div>

            {/* AI Generate Recipe - Hidden for now */}
          </div>
        )}

        {/* Main Add Recipe Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label="Add recipe"
          onClick={toggleSubButtons}
        >
          {isSubButtonsVisible ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5v14m-7-7h14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Add via Link Modal */}
      <AddViaLinkModal
        isOpen={isAddViaLinkModalOpen}
        onClose={() => setIsAddViaLinkModalOpen(false)}
        onSubmit={handleAddViaLinkSubmit}
      />
    </div>
  );
};

export default RecipeGallery;
