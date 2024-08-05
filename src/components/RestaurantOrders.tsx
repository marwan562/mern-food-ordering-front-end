import { TOrder, TStatus } from "@/types";
import { Card, CardHeader, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Truck, ShoppingBasket, Receipt } from "lucide-react";
import { orderStatusList } from "@/config/restaurant-options-config";
import { OrderStatus } from "@/utils/OrderStatus";
import { Progress } from "./ui/progress";

interface OrderManagementProps {
  orders?: TOrder[];
  handleStatusChange: (status: TStatus, orderId: string) => void;
}

const RestaurantOrders = ({
  orders,
  handleStatusChange,
}: OrderManagementProps) => {
  return (
    <div className="p-6 space-y-6">
      {orders?.map((order) => {
        const currentTime = new Date();
        const orderCreationTime = new Date(order.created_At);
        const expectedTime = new Date(
          orderCreationTime.getTime() +
            order.restaurant.estimatedDeliveryTime * 60000
        );
        const { statusClass, indicatorColor } = OrderStatus(order.status);
        const colorStatus = indicatorColor.split("-")[1];
        const expired = currentTime > expectedTime;

        return (
          <Card
            key={order._id}
            className={`bg-gray-100 rounded-lg shadow-md border-2 ${
              expired ? "border-red-500 " : `border-${colorStatus}-500`
            }`}
          >
            <CardHeader className="flex justify-between items-center border-b pb-4">
              <div className="text-xl font-bold">
                {order.restaurant.restaurantName}
              </div>
              <div className="text-md">Order ID: {order._id}</div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="mb-4 flex-1">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Truck className="mr-2" />
                    Delivery To:
                  </h2>
                  <p>{order.deliveryDetails.name}</p>
                  <p>
                    {order.deliveryDetails.city},{" "}
                    {order.deliveryDetails.addressLine1}
                  </p>
                </div>
                <div className="mb-4 flex-1">
                  <h2 className="flex items-center text-lg font-semibold">
                    <ShoppingBasket className="mr-2" />
                    Items:
                  </h2>
                  {order.cartItems.map((item) => (
                    <p key={item._id}>
                      {item.name} (x{item.quantity})
                    </p>
                  ))}
                </div>
                <div className="mb-4 flex-1">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Receipt className="mr-2" />
                    Total:
                  </h2>
                  <p>${order.totalAmount?.toFixed(2)}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="grid grid-cols-2 md:grid-cols-[4fr_1fr] items-center gap-4">
                  <h2 className="text-lg font-semibold">Order Progress:</h2>
                  <Select
                    value={order.status}
                    onValueChange={(value) =>
                      handleStatusChange(value as TStatus, order._id)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {orderStatusList.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative pt-2">
                  <div className="flex items-center justify-between mb-2 text-xs font-medium">
                    <span>Placed</span>
                    <span>Delivered</span>
                  </div>
                  <Progress
                    className="animate-pulse h-2"
                    indicatorColor={expired? "bg-red-500" :indicatorColor}
                    value={
                      expired
                        ? 100
                        : order.status === "delivered"
                        ? 100
                        : order.status === "outForDelivery"
                        ? 75
                        : order.status === "inProgress"
                        ? 50
                        : order.status === "paid"
                        ? 25
                        : 0
                    }
                  />
                  <div className="flex flex-row justify-between">
                    {orderStatusList.map((status) => (
                      <h2
                        className={`${
                          expired
                            ? order.status === status && "text-red-500"
                            : order.status === status && statusClass
                        } text-lg font-semibold`}
                      >
                        {status}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">Expected By:</h2>
                    <p
                      className={`text-lg ${
                        expired ? "text-red-500 font-bold" : "text-orange-500"
                      }`}
                    >
                      {expired ? (
                        <span className="text-xl text-red-500">
                          Expired:{" "}
                          {expectedTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      ) : (
                        <span className={`${statusClass} text-xl font-bold `}>
                          {expectedTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RestaurantOrders;
