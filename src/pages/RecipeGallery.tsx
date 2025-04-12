import RecipeList from "../components/RecipeList";

const RecipeGallery = () => {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-[0px_2px_6px_0px_#00000014]">
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
      <main className="max-w-3xl mx-auto p-4 flex flex-col">
        <div className="mb-6">
          <h1 className="font-serif font-semibold text-[24px] leading-none tracking-[0%] text-[#1A1A1A] inline-block">
            Recipes{" "}
          </h1>
          <span className="font-serif font-semibold text-[24px] leading-none tracking-[0%] text-[#6A6A6A] ml-1">
            ({recipes.length})
          </span>
        </div>

        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
};

export default RecipeGallery;
