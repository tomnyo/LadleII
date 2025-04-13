import { Clock, User, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  id: number;
  title: string;
  cookTime: string;
  servings: number;
  description: string;
  imageUrl: string;
}

const RecipeCard = ({
  id,
  title,
  cookTime,
  servings,
  description,
  imageUrl,
}: RecipeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div
      className="flex justify-between bg-white rounded-[6px] shadow-sm border border-gray-100 overflow-hidden mb-4 w-full cursor-pointer"
      style={{ height: "171px", gap: "55px" }}
      onClick={handleClick}
    >
      <div className="pl-[18px] pr-4 py-4 flex flex-col justify-between flex-grow overflow-hidden">
        <div>
          <h3 className="font-['Source_Serif_Pro'] font-semibold text-[20px] leading-[100%] tracking-[0%] line-clamp-2 w-[200px]">
            {title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" color="#4A4A4A" />
              <span className="font-inter font-normal text-[10px] leading-[100%] tracking-[0%] text-[#4A4A4A] w-[53] whitespace-nowrap overflow-hidden text-ellipsis">
                {cookTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" color="#4A4A4A" />
              <span className="font-inter font-normal text-[10px] leading-[100%] tracking-[0%] text-[#4A4A4A] w-[53] whitespace-nowrap overflow-hidden text-ellipsis">
                {servings} Servings
              </span>
            </div>
          </div>
          <p className="mt-2 font-inter font-normal text-[12px] leading-[100%] tracking-[0%] text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-3">
          <a
            href="#"
            className="flex items-center gap-1 text-purple-600 text-sm font-medium"
          >
            <Instagram className="h-4 w-4" />
            <span className="font-inter font-normal text-[10px] leading-[100%] tracking-[0%]">
              InstaRecipes
            </span>
          </a>
        </div>
      </div>
      <div className="w-[117px] h-[171px] flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[6px]"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
