import RecipeCard from "./RecipeCard";

interface Recipe {
  id: number;
  title: string;
  cookTime: string;
  servings: number;
  description: string;
  imageUrl: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          cookTime={recipe.cookTime}
          servings={recipe.servings}
          description={recipe.description}
          imageUrl={recipe.imageUrl}
        />
      ))}
    </div>
  );
};

export default RecipeList;
