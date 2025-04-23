import RecipeList from "../components/RecipeList";
import { useNavigate } from "react-router-dom";

const RecipeGallery = () => {
  const navigate = useNavigate();
  // Sample recipe data
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
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
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

      <div className="sticky top-[72px] z-10 bg-gray-50 pt-4 pb-4 max-w-3xl mx-auto w-full px-4">
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

      <main className="flex-1 overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto">
          <RecipeList recipes={recipes} />
        </div>
      </main>

      {/* Floating Add Recipe Button */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label="Add recipe"
          onClick={() => console.log("Add recipe clicked")}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeGallery;
