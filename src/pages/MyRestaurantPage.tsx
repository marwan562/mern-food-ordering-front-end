import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
  useUpdateOrders,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/Form/Manage-Restaurant-Form/ManageRestaurantForm";
import RestaurantOrders from "@/components/RestaurantOrders";
import { TStatus } from "@/types";
import { useState } from "react";

type TOrderState = {
  status?: TStatus | "";
  orderId?: string | null;
};

const MyRestaurantPage = () => {
  const { mutateMyResturant, isLoading: isCreateing } = useCreateMyRestaurant();
  const { updatedMyResturant, isLoading: isUpdateing } =
    useUpdateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const [orderState, setOrderState] = useState<TOrderState>({
    status: "",
    orderId: null,
  });
  const { orders } = useGetMyRestaurantOrders();
  const { updateOrder } = useUpdateOrders();

  const handleStatusChange = (status: TStatus | "", orderId: string) => {
    setOrderState({ orderId, status });
    updateOrder({ orderId, status });
  };

  console.log(orderState);

  const isEditing = myRestaurant ? updatedMyResturant : mutateMyResturant;

  return (
    <Tabs defaultValue="manage-restaurant">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage-Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <RestaurantOrders
          handleStatusChange={handleStatusChange}
          orders={orders}
        />
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          defaultValues={myRestaurant}
          isLoading={isCreateing || isUpdateing}
          onSave={isEditing}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MyRestaurantPage;
