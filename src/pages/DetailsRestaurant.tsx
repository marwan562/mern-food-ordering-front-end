import { useGetDetailsRestaurant } from "@/api/RestaurantApi";
import RestaurantInfo from "@/components/RestaurantInto";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { useState } from "react";
import { toast } from "sonner";
import LottileFiles from "@/assets/lottieFiles/LottieFiles";

type TCartState = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailsRestaurant = () => {
  const { id } = useParams();
  const { isLoading, isError, detailsRestaurant } = useGetDetailsRestaurant(id);
  const [cartItems, setCartItems] = useState<TCartState[]>([]);

  if (isError) {
    throw new Error("Details Restaurant not found..!");
  }

  const handleSetCartItems = ({
    _id,
    name,
    price,
  }: {
    _id: string;
    name: string;
    price: number;
  }) => {
    setCartItems((prev) => {
      const existingCartItems = prev?.find((c) => c._id === _id);
      if (existingCartItems) {
        toast.success("Incremenal Item Successfully Added");
        return prev?.map((el) =>
          el._id === _id ? { ...el, quantity: el.quantity + 1 } : el
        );
      }
      toast.success("Added Item Successfully.");
      return [...prev, { _id, name, price, quantity: 1 }];
    });
  };

  const handleRemoveItems = (_id: string) => {
    toast.success("Deleted Items Successfully.");
    setCartItems((prev) => {
      return prev.filter((c) => c._id !== _id);
    });
  };

  return (
    <div className="flex flex-col">
      <AspectRatio ratio={16 / 5}>
        <img
          loading="lazy"
          src={detailsRestaurant?.imageUrl}
          alt={detailsRestaurant?.restaurantName}
          className="w-full rounded-md h-full object-cover"
        />
      </AspectRatio>

      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-5 m-10">
          <RestaurantInfo
            setCartItems={handleSetCartItems}
            detailsRestaurant={detailsRestaurant}
          />
          <OrderSummary
            cartItems={cartItems}
            handleRemoveItems={handleRemoveItems}
            detailsRestaurant={detailsRestaurant}
          />
        </div>
      ) : (
        <LottileFiles
          className=" flex flex-col  h-full mx-auto size-[200px] "
          variant="Loading"
        />
      )}
    </div>
  );
};

export default DetailsRestaurant;
