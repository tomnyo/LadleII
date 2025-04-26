import { ArrowLeft, Check, X, Clock, User, Camera } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface Ingredient {
  id: number;
  name: string;
}

interface Step {
  id: number;
  title: string;
  instructions: string[];
}

interface RecipeFormData {
  title: string;
  cookTime: string;
  servings: number;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
}

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Sample recipe data - in a real app, this would be fetched based on the ID
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "Pasta Carbonara",
    cookTime: "45 minutes",
    servings: 4,
    description:
      "The ultimate comfort food: Pasta Carbonara! Creamy, cheesy, and oh-so-delicious—ready in minutes but tastes like a gourmet masterpiece. 🍝🥓 #CarbonaraLovers #FoodieGram #EasyRecipes #PastaNight #SoulFood",
    imageUrl:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    ingredients: [
      { id: 1, name: "220g spaghetti" },
      { id: 2, name: "50g pecorino" },
      { id: 3, name: "4 egg yolks" },
      { id: 4, name: "80g guanciale" },
      { id: 5, name: "Salt to taste" },
      { id: 6, name: "Pepper as needed" },
      { id: 7, name: "Add water as needed" },
    ],
    steps: [
      {
        id: 1,
        title: "Getting started",
        instructions: [
          "Crack eggs into a bowl",
          "Grate your cheese",
          "Chop your bacon into small pieces",
        ],
      },
      {
        id: 2,
        title: "Cooking the pasta",
        instructions: [
          "Boil water in a large pot",
          "Add salt to the water",
          "Cook pasta according to package instructions",
        ],
      },
      {
        id: 3,
        title: "Preparing the sauce",
        instructions: [
          "Fry the bacon until crispy",
          "Mix eggs, cheese, and pepper in a bowl",
          "Reserve some pasta water",
        ],
      },
      {
        id: 4,
        title: "Finishing",
        instructions: [
          "Drain pasta and return to pot",
          "Add bacon and fat",
          "Add egg mixture and stir quickly",
          "Add pasta water if needed to create a creamy sauce",
        ],
      },
    ],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServingsChange = (newValue: number) => {
    setFormData((prev) => ({
      ...prev,
      servings: newValue,
    }));
  };

  const handleIngredientChange = (id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, name: value } : ing,
      ),
    }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: Date.now(), name: "" }],
    }));
  };

  const handleRemoveIngredient = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const handleStepTitleChange = (id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, title: value } : step,
      ),
    }));
  };

  const handleStepInstructionChange = (
    stepId: number,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => {
        if (step.id === stepId) {
          const newInstructions = [...step.instructions];
          newInstructions[index] = value;
          return { ...step, instructions: newInstructions };
        }
        return step;
      }),
    }));
  };

  const handleAddInstruction = (stepId: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => {
        if (step.id === stepId) {
          return { ...step, instructions: [...step.instructions, ""] };
        }
        return step;
      }),
    }));
  };

  const handleRemoveInstruction = (stepId: number, index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => {
        if (step.id === stepId) {
          const newInstructions = [...step.instructions];
          newInstructions.splice(index, 1);
          return { ...step, instructions: newInstructions };
        }
        return step;
      }),
    }));
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { id: Date.now(), title: "New Step", instructions: [""] },
      ],
    }));
  };

  const handleRemoveStep = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
  };

  const handleSave = () => {
    // In a real app, you would save the data to your backend here
    console.log("Saving recipe:", formData);
    // Navigate to recipe details page and replace the current history entry
    // This prevents the back button from returning to the edit page
    navigate(`/recipe/${id}`, { replace: true });
  };

  const handleCancel = () => {
    navigate(`/recipe/${id}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            imageUrl: event.target.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <header className="bg-white p-4 shadow-[0px_2px_6px_0px_#00000014] sticky top-0 z-10 h-16">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>

          <h1 className="font-['Source_Serif_Pro'] font-semibold text-[24px] leading-[100%] tracking-[0%] text-center">
            Edit recipe
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="p-2 rounded-full hover:bg-gray-100 text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 rounded-full hover:bg-gray-100 text-green-500"
            >
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto pb-8 pt-4">
          <div className="px-4 py-4 space-y-6">
            {/* Name field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Photo field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo
              </label>
              <div className="w-full h-[200px] bg-gray-200 rounded-lg overflow-hidden relative">
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="recipe-image-upload"
                  className="hidden"
                  onChange={handleImageChange}
                  capture={
                    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                      ? "environment"
                      : undefined
                  }
                />
                <button
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("recipe-image-upload")?.click();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            {/* Servings and Cook Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cooking time and Servings
              </label>
              <div className="flex items-center">
                <div className="flex items-center gap-2 mr-6">
                  <Clock className="h-4 w-4" color="#4A4A4A" />
                  <div className="flex items-center">
                    <span className="mr-2">{formData.cookTime}</span>
                    <div className="flex items-center" style={{ gap: "10px" }}>
                      <button
                        onClick={() => {
                          // Parse current time
                          let currentMinutes = 0;
                          let currentHours = 0;

                          // Check if we have an hour format
                          const hourMatch =
                            formData.cookTime.match(/(\d+)\s*hour/);
                          if (hourMatch) {
                            currentHours = parseInt(hourMatch[1]);
                            // Also check for minutes in hour format
                            const minuteMatch =
                              formData.cookTime.match(/(\d+)\s*min/);
                            if (minuteMatch) {
                              currentMinutes = parseInt(minuteMatch[1]);
                            }
                          } else {
                            // Just minutes format
                            const minuteMatch =
                              formData.cookTime.match(/(\d+)\s*minutes?/);
                            if (minuteMatch) {
                              currentMinutes = parseInt(minuteMatch[1]);
                            }
                          }

                          // Convert to total minutes for calculation
                          let totalMinutes = currentHours * 60 + currentMinutes;

                          // Decrease by 5 minutes, minimum 5
                          totalMinutes = Math.max(5, totalMinutes - 5);

                          // Convert back to hours and minutes
                          if (totalMinutes >= 60) {
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;
                            setFormData((prev) => ({
                              ...prev,
                              cookTime: `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`,
                            }));
                          } else {
                            // If we're coming down from an hour to 55 minutes
                            if (currentHours > 0 && totalMinutes === 55) {
                              setFormData((prev) => ({
                                ...prev,
                                cookTime: `55 minutes`,
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                cookTime: `${totalMinutes} minutes`,
                              }));
                            }
                          }
                        }}
                      >
                        <img src="/minus.svg" alt="-" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          // Parse current time
                          let currentMinutes = 0;
                          let currentHours = 0;

                          // Check if we have an hour format
                          const hourMatch =
                            formData.cookTime.match(/(\d+)\s*hour/);
                          if (hourMatch) {
                            currentHours = parseInt(hourMatch[1]);
                            // Also check for minutes in hour format
                            const minuteMatch =
                              formData.cookTime.match(/(\d+)\s*min/);
                            if (minuteMatch) {
                              currentMinutes = parseInt(minuteMatch[1]);
                            }
                          } else {
                            // Just minutes format
                            const minuteMatch =
                              formData.cookTime.match(/(\d+)\s*minutes?/);
                            if (minuteMatch) {
                              currentMinutes = parseInt(minuteMatch[1]);
                            }
                          }

                          // Convert to total minutes for calculation
                          let totalMinutes = currentHours * 60 + currentMinutes;

                          // Increase by 5 minutes
                          totalMinutes += 5;

                          // Convert back to hours and minutes
                          if (totalMinutes >= 60) {
                            const hours = Math.floor(totalMinutes / 60);
                            const minutes = totalMinutes % 60;
                            setFormData((prev) => ({
                              ...prev,
                              cookTime: `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`,
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              cookTime: `${totalMinutes} minutes`,
                            }));
                          }
                        }}
                      >
                        <img src="/plus.svg" alt="+" className="w-5 h-5 flex" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" color="#4A4A4A" />
                  <div className="flex items-center">
                    <span className="mr-2">{formData.servings} Servings</span>
                    <div className="flex items-center" style={{ gap: "10px" }}>
                      <button
                        onClick={() =>
                          handleServingsChange(
                            Math.max(1, formData.servings - 1),
                          )
                        }
                      >
                        <img src="/minus.svg" alt="-" className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleServingsChange(formData.servings + 1)
                        }
                      >
                        <img src="/plus.svg" alt="+" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-serif font-semibold text-[18px] mb-2">
                Ingredients
              </h3>
              <ul className="space-y-2">
                {formData.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        handleIngredientChange(ingredient.id, e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => handleRemoveIngredient(ingredient.id)}
                      className="text-red-500 p-1"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleAddIngredient}
                className="text-[#3B81F6] mt-2"
              >
                Add ingredient
              </button>
            </div>

            {/* Steps */}
            <div>
              <h3 className="font-serif font-semibold text-[18px] mb-2">
                Step by step
              </h3>
              <div className="space-y-6">
                {formData.steps.map((step, stepIndex) => (
                  <div
                    key={step.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stepIndex + 1}</span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) =>
                            handleStepTitleChange(step.id, e.target.value)
                          }
                          className="font-medium p-1 border-b border-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveStep(step.id)}
                        className="text-red-500 p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <ul className="space-y-2 pl-8">
                      {step.instructions.map((instruction, instrIndex) => (
                        <li key={instrIndex} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-2">•</span>
                          <input
                            type="text"
                            value={instruction}
                            onChange={(e) =>
                              handleStepInstructionChange(
                                step.id,
                                instrIndex,
                                e.target.value,
                              )
                            }
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <button
                            onClick={() =>
                              handleRemoveInstruction(step.id, instrIndex)
                            }
                            className="text-red-500 p-1 mt-1"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleAddInstruction(step.id)}
                      className="text-[#3B81F6] mt-2 ml-8"
                    >
                      Add instruction
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleAddStep} className="text-[#3B81F6] mt-4">
                Add step
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditRecipe;
