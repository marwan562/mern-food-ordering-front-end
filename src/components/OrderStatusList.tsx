import { TOrder } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Progress } from "./ui/progress";
import { Receipt, ShoppingBasket, Truck } from "lucide-react";
import { OrderStatus } from "@/utils/OrderStatus";

const OrderStatusList = ({
  restaurant,
  deliveryDetails,
  cartItems,
  status,
  totalAmount,
  created_At,
}: TOrder) => {
  const currentTime = new Date();
  const orderCreationTime = new Date(created_At);
  const expectedTime = new Date(
    orderCreationTime.getTime() + restaurant.estimatedDeliveryTime * 60000
  );
  const expired = currentTime > expectedTime;

  const { statusText, statusClass ,   indicatorColor} = OrderStatus(status);

  return (
    <div className="flex flex-col p-9 rounded-lg gap-8 bg-gray-100">
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between">
        <div className="text-3xl font-bold">
          Order Status:{" "}
          <span
            className={`text-2xl ${expired ? "text-red-500" : statusClass}`}
          >
            {expired ? "Order Expired" : statusText}
          </span>
        </div>
        <div className="text-3xl font-bold">
          Expected By:{" "}
          <span
            className={`text-2xl ${expired ? " text-red-500" : statusClass} `}
          >
            {expectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
      <Progress
        indicatorColor={expired ? "bg-red-500" : indicatorColor}
        value={
          expired
            ? 100
            : status === "delivered"
            ? 100
            : status === "outForDelivery"
            ? 75
            : status === "inProgress"
            ? 50
            : status === "paid"
            ? 25
            : 0
        }
        className="animate-pulse h-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="flex flex-row gap-1 items-center text-xl font-bold">
              <Truck />
              Delivering To:
            </h2>
            <div className="mt-1 ml-1 text-md font-semibold">
              <p>{deliveryDetails.name}</p>
              <p>
                {deliveryDetails.city}, {deliveryDetails.addressLine1}
              </p>
            </div>
          </div>
          <div>
            <h2 className="flex flex-row gap-1 text-xl font-bold">
              <ShoppingBasket />
              Your Order:
            </h2>
            <div>
              {cartItems.map((item, i) => (
                <p key={i} className="mt-1 ml-1 text-md font-semibold">
                  {item.name} (x{item.quantity})
                </p>
              ))}
            </div>
          </div>
          <hr />
          <div>
            <h2 className="flex flex-row gap-1 text-xl font-bold">
              <Receipt />
              Total:
            </h2>
            <p className="mt-1 ml-1 text-md font-semibold">
              ${totalAmount ? totalAmount?.toFixed(2) : "Placed"}
            </p>
          </div>
        </div>
        <AspectRatio ratio={16 / 6}>
          <img
            className="object-cover w-full h-full rounded-md"
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default OrderStatusList;
