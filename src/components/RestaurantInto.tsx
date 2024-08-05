import { IRestaurant } from "@/types";
import { Dot } from "lucide-react";

type TProps = {
  detailsRestaurant?: IRestaurant;
  setCartItems: (val: { _id: string; name: string; price: number }) => void;
};

const RestaurantInfo = ({ detailsRestaurant, setCartItems }: TProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 border-2 rounded-md py-6 h-fit px-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {detailsRestaurant?.restaurantName}
          </h2>
          <p className="text-md text-gray-400">{`${detailsRestaurant?.city}, ${detailsRestaurant?.country}`}</p>
        </div>
        <div className="flex items-center flex-wrap">
          {detailsRestaurant?.cuisines.map((cuisine, i) => (
            <div key={i} className="flex items-center">
              <span>{cuisine}</span>
              {i < detailsRestaurant?.cuisines.length - 1 && (
                <Dot className="mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {detailsRestaurant?.menuItems.map(({ _id, name, price }, i) => (
          <div
            key={i}
            onClick={() => setCartItems({ _id, name, price })}
            className="flex flex-row gap-4 border-2 rounded-md py-6 h-fit px-4 hover:bg-orange-300 cursor-pointer"
          >
            <div className="flex flex-col">
              <span>{name}</span>
              <span className="text-gray-800">${price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantInfo;
