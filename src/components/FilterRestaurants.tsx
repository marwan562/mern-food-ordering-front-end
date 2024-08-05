import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cuisineList as cuisines } from "@/config/restaurant-options-config";

type TProps = {
  selectedCuisines: string[];
  onToggleCuisine: (cuisine: string) => void;
};

const FilterRestaurants = ({ selectedCuisines, onToggleCuisine }: TProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayedCuisines = showAll ? cuisines : cuisines.slice(0, 7);

  return (
    <div className="flex flex-col">
      {displayedCuisines.map((cuisine, i) => (
        <div
          key={i}
          onClick={() => onToggleCuisine(cuisine)}
          className={`flex items-center gap-1 border-2 border-gray-200/60 rounded-full p-1 cursor-pointer ${
            selectedCuisines.includes(cuisine) ? "bg-green-300" : ""
          }`}
        >
          <span>
            <Check
              className={`${
                selectedCuisines.includes(cuisine) ? "text-green-500" : "hidden"
              }`}
            />
          </span>
          <h3
            className={`text-md font-semibold ${
              selectedCuisines.includes(cuisine) ? "" : "ml-6"
            }`}
          >
            {cuisine}
          </h3>
        </div>
      ))}
      {cuisines.length > 7 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex items-center justify-center text-center font-semibold w-fit mx-auto hover:underline"
        >
          {showAll ? (
            <>
              View Less
              <ChevronUp className="ml-1" />
            </>
          ) : (
            <>
              View More
              <ChevronDown className="ml-1" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FilterRestaurants;
