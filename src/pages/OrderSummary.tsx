import { useCreateCheckoutSession } from "@/api/OrderApi";
import ButtonCheckOut from "@/components/ButtonCheckOut";
import { Badge } from "@/components/ui/badge";
import { IRestaurant } from "@/types";
import { TUserProfileForm } from "@/validations/userUpdateSchema";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type TCreateCheckOutRequest = {
  restaurantId: string;
  menuItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number; // Ensure quantity is a number
  }[];
  deliveryDetails: {
    email?: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
};

type TProps = {
  detailsRestaurant?: IRestaurant;
  handleRemoveItems: (_id: string) => void;
  cartItems: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

const OrderSummary = ({
  detailsRestaurant,
  cartItems,
  handleRemoveItems,
}: TProps) => {
  const { createSession, isLoading } = useCreateCheckoutSession();

  const totalPrice = cartItems.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, detailsRestaurant?.deliveryPrice ?? 0);
  
  const onCheckout = async (FormUserProfile: TUserProfileForm) => {
    if (!detailsRestaurant || !cartItems) {
      toast.error("Something went wrong!");
      return;
    }

    // Ensure quantity is a number
    const formattedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity), // Convert to number if necessary
    }));

    const data: TCreateCheckOutRequest = {
      restaurantId: detailsRestaurant._id,
      deliveryDetails: FormUserProfile,
      menuItems: formattedCartItems,
    };

    try {
      const response = await createSession(data);

      if (response.url) {
        window.location.href = response.url;
      } else {
        toast.error("Failed to create checkout session.");
      }
    } catch (error) {
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex flex-col gap-6 border-2 rounded-md py-6 h-fit px-4">
      <div className="flex text-2xl font-bold justify-between">
        <h2>Your Order</h2>
        <h3>${totalPrice.toFixed(2)}</h3>
      </div>
      <div className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-row items-center justify-between"
          >
            <div>
              <Badge variant={"outline"}>{item.quantity}</Badge>{" "}
              <span className="text-md font-medium">{item.name}</span>
            </div>
            <div className="flex flex-row-reverse gap-2 font-semibold items-center">
              <Trash
                onClick={() => handleRemoveItems(item._id)}
                size={19}
                className="cursor-pointer text-red-600"
              />
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="flex text-md justify-between">
        <h3>Delivery </h3>
        <span>${detailsRestaurant?.deliveryPrice.toFixed(2)}</span>
      </div>
      <hr />
      <ButtonCheckOut isLoading={isLoading} onCheckout={onCheckout} />
    </div>
  );
};

export default OrderSummary;
