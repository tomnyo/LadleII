import {
  ArrowLeft,
  MoreHorizontal,
  Clock,
  User,
  Instagram,
  Pencil,
  Trash2,
  Share,
  Send,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import ShareRecipeModal from "../components/ShareRecipeModal";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const recipeUrl = window.location.href;

  // Sample recipe data - in a real app, this would be fetched based on the ID
  const recipe = {
    id: 1,
    title: "Pasta Carbonara",
    cookTime: "45 minutes",
    servings: 4,
    description:
      "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and oh-so-delicious—ready in minutes but tastes like a gourmet masterpiece. 🍝🥓 #CarbonaraLovers #FoodieGram #EasyRecipes #PastaNight #SoulFood",
    imageUrl:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    ingredients: [
      "220g spaghetti",
      "50g pecorino",
      "4 egg yolks",
      "80g guanciale",
      "Salt to taste",
      "Pepper as needed",
      "Add water as needed",
    ],
    steps: [
      {
        title: "Getting started",
        instructions: [
          "Crack eggs into a bowl",
          "Grate your cheese",
          "Chop your bacon into small pieces",
        ],
      },
      {
        title: "Cooking the pasta",
        instructions: [
          "Boil water in a large pot",
          "Add salt to the water",
          "Cook pasta according to package instructions",
        ],
      },
      {
        title: "Preparing the sauce",
        instructions: [
          "Fry the bacon until crispy",
          "Mix eggs, cheese, and pepper in a bowl",
          "Reserve some pasta water",
        ],
      },
      {
        title: "Finishing",
        instructions: [
          "Drain pasta and return to pot",
          "Add bacon and fat",
          "Add egg mixture and stir quickly",
          "Add pasta water if needed to create a creamy sauce",
        ],
      },
    ],
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <ShareRecipeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        recipeUrl={recipeUrl}
      />
      <header className="bg-white p-4 shadow-[0px_2px_6px_0px_#00000014] sticky top-0 z-10 h-16">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>

          <h1 className="font-['Source_Serif_Pro'] font-semibold text-[24px] leading-[100%] tracking-[0%] text-center">
            {recipe.title}
          </h1>

          <div className="flex gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Send className="h-5 w-5 text-gray-600" />
            </button>

            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[120px]">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/edit-recipe/${id}`)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-8 pt-4">
          <div className="max-w-3xl mx-auto px-4">
            <div className="w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="flex items-center gap-4 mb-4 text-[12px] text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" color="#4A4A4A" />
                <span className="font-inter font-normal text-[12px] leading-[100%] tracking-[0%] text-[#4A4A4A]">
                  {recipe.cookTime}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" color="#4A4A4A" />
                <span className="font-inter font-normal text-[12px] leading-[100%] tracking-[0%] text-[#4A4A4A]">
                  {recipe.servings} Servings
                </span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Instagram className="h-4 w-4" color="#9333ea" />
                <span className="font-inter font-normal text-[12px] leading-[100%] tracking-[0%] text-[#9333ea]">
                  InstaRecipes
                </span>
              </div>
            </div>

            <p className="mb-6 font-inter font-normal text-[12px] leading-[150%] text-gray-700">
              {recipe.description}
            </p>

            <Accordion
              type="multiple"
              defaultValue={["ingredients", "steps"]}
              className="mb-6"
            >
              <AccordionItem value="ingredients">
                <AccordionTrigger className="font-serif font-semibold text-[18px]">
                  Ingredients
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="font-inter text-[12px]">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="steps">
                <AccordionTrigger className="font-serif font-semibold text-[18px]">
                  Step by step
                </AccordionTrigger>
                <AccordionContent>
                  {recipe.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="mb-4">
                      <h3 className="text-[12px] mb-2 font-bold">{`${stepIndex + 1}. ${step.title}`}</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        {step.instructions.map((instruction, instrIndex) => (
                          <li
                            key={instrIndex}
                            className="font-inter text-[12px]"
                          >
                            {instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
