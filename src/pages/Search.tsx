import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import { X } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  cookTime: string;
  servings: number;
  description: string;
  imageUrl: string;
  ingredients?: string[];
}

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Sample recipe data with ingredients added
  const recipes = [
    {
      id: 1,
      title: "Decadent Creamy Garlic Bacon Carbonara",
      cookTime: "45 minutes",
      servings: 4,
      description:
        "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and loaded with bacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&q=80",
      ingredients: [
        "pasta",
        "eggs",
        "guanciale",
        "garlic",
        "pecorino cheese",
        "black pepper",
      ],
    },
    {
      id: 2,
      title: "Pesto pasta",
      cookTime: "45 minutes",
      servings: 4,
      description:
        "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and loaded with bacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80",
      ingredients: [
        "pasta",
        "basil",
        "pine nuts",
        "garlic",
        "parmesan cheese",
        "olive oil",
      ],
    },
    {
      id: 3,
      title: "Chickpea salad",
      cookTime: "45 minutes",
      servings: 4,
      description:
        "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and loaded with bacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      ingredients: [
        "chickpeas",
        "cucumber",
        "tomato",
        "red onion",
        "feta cheese",
        "olive oil",
      ],
    },
    {
      id: 4,
      title: "Eggs on toast",
      cookTime: "45 minutes",
      servings: 4,
      description:
        "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and loaded with bacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80",
      ingredients: ["eggs", "bread", "butter", "salt", "pepper"],
    },
    {
      id: 5,
      title: "Blueberry pancakes",
      cookTime: "45 minutes",
      servings: 4,
      description:
        "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and loaded with bacon.",
      imageUrl:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&q=80",
      ingredients: [
        "flour",
        "eggs",
        "milk",
        "blueberries",
        "sugar",
        "baking powder",
      ],
    },
  ];

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Filter recipes based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRecipes([]);
      return;
    }

    const filtered = recipes.filter((recipe) => {
      const titleMatch = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const ingredientsMatch = recipe.ingredients?.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return titleMatch || ingredientsMatch;
    });

    setFilteredRecipes(filtered);
  }, [searchTerm]);

  const handleClear = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <header className="bg-[#F9FBFF] p-4 sticky top-0 z-10">
        <div
          className="max-w-3xl mx-auto"
          style={{
            paddingTop: "60px",
            paddingLeft: "20px",
            paddingRight: "20px",
            gap: "10px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="w-full h-[60px] rounded-[6px] border border-[#E5E5E5] text-[16px] outline-none focus:border-[#7D4CDB] focus:border px-[40px] py-[14px]"
                autoFocus
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="18"
                  height="18"
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
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button onClick={handleClear} className="h-[60px] text-[#4A4A4A]">
              Cancel
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="max-w-3xl mx-auto">
          {filteredRecipes.length > 0 ? (
            <RecipeList recipes={filteredRecipes} />
          ) : searchTerm ? (
            <div className="text-center py-8 text-gray-500">
              No recipes found matching "{searchTerm}"
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Search;
