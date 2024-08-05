import { orderStatusList } from "@/config/restaurant-options-config";
import { TStatus } from "@/types";
import { Check, SquareMousePointer } from "lucide-react";


type TProps = {
    onToggelStatus:(status:TStatus) => void
    selectedStatus:TStatus[]
}

const FilterOrderStatus = ({onToggelStatus ,selectedStatus}:TProps) => {
  return (
    <div className="flex flex-col gap-2">
        <div className="text-lg flex gap-2 items-center font-bold text-orange-500">
        <SquareMousePointer />
        <span>Filter Status Your Orders.</span>
      </div>
      {orderStatusList.map((cuisine, i) => (
        <div
          key={i}
          onClick={() => onToggelStatus(cuisine)}
          className={`flex items-center gap-1 border-2 border-gray-200/60 rounded-full p-1 cursor-pointer ${
            selectedStatus.includes(cuisine) ? "bg-orange-300" : ""
          }`}
        >
          <span>
            <Check
              className={`${
                selectedStatus.includes(cuisine) ? "text-orange-500" : "hidden"
              }`}
            />
          </span>
          <h3
            className={`text-md font-semibold ${
              selectedStatus.includes(cuisine) ? "" : "ml-6"
            }`}
          >
            {cuisine}
          </h3>
        </div>
      ))}
    
    </div>
  );
};

export default FilterOrderStatus;
