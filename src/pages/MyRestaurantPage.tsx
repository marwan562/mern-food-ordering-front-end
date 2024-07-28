import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/Form/Manage-Restaurant-Form/ManageRestaurantForm";

const MyRestaurantPage = () => {
  const { mutateMyResturant, isLoading: isCreateing } = useCreateMyRestaurant();
  const { updatedMyResturant, isLoading: isUpdateing } = useUpdateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();

  const isEditing = myRestaurant ? updatedMyResturant : mutateMyResturant

  return (
    <ManageRestaurantForm
      defaultValues={myRestaurant}
      isLoading={isCreateing || isUpdateing}
      onSave={isEditing}
    />
  );
};

export default MyRestaurantPage;
