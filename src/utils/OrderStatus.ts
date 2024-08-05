import { TStatus } from "@/types";

export const OrderStatus = (status: TStatus) => {
  let statusText;
  let statusClass;
  let indicatorColor;

  switch (status) {
    case "placed":
      statusText = "Order Placed";
      statusClass = "text-black-500";
      indicatorColor = "bg-black";
      break;
    case "paid":
      statusText = "Order Paid";
      statusClass = "text-blue-500";
      indicatorColor = "bg-blue-500";
      break;
    case "inProgress":
      statusText = "Order In Progress";
      statusClass = "text-yellow-500";
      indicatorColor = "bg-yellow-500";
      break;
    case "outForDelivery":
      statusText = "Out For Delivery";
      statusClass = "text-orange-500";
      indicatorColor = "bg-orange-500";
      break;
    case "delivered":
      statusText = "Order Delivered";
      statusClass = "text-green-500";
      indicatorColor = "bg-green-500";
      break;
    default:
      statusText = "Unknown Status";
      statusClass = "text-red-500";
      indicatorColor = "bg-red-500";
      break;
  }
  return { statusText, statusClass, indicatorColor };
};
