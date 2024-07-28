import { Form } from "@/components/ui/form";
import {
  manageRestaurantSchema,
  TManageRestaurantForm,
} from "@/validations/manageRestaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuItemsSection from "./MenuItemsSection";
import ImageFileSection from "./ImageFileSection";
import LoaindgButton from "@/components/LoadingButton";
import { IRestaurant } from "@/types";
import { useEffect } from "react";

type TProps = {
  onSave: (valuesManageForm: FormData) => void;
  isLoading: boolean;
  defaultValues: IRestaurant | undefined;
};

const defaultCreateRestaurant = {
  cuisines: ["Italian", "Burgers"],
  menuItems: [{ name: "", price: 0 }],
};

const ManageRestaurantForm = ({ defaultValues, isLoading, onSave }: TProps) => {
  const form = useForm<TManageRestaurantForm>({
    resolver: zodResolver(manageRestaurantSchema),
    defaultValues: defaultCreateRestaurant,
  });



  const onsubmit = (valuesForm: TManageRestaurantForm) => {
    const formData = new FormData();
    console.log("Form Values:", valuesForm); // Log form values
  
    formData.append("restaurantName", valuesForm.restaurantName);
    formData.append("city", valuesForm.city);
    formData.append("country", valuesForm.country);
    formData.append("deliveryPrice", valuesForm.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      valuesForm.estimatedDeliveryTime.toString()
    );
  
    valuesForm.cuisines.forEach((value, index) => {
      formData.append(`cuisines[${index}]`, value);
    });
  
    valuesForm.menuItems.forEach((value, index) => {
      formData.append(`menuItems[${index}][name]`, value.name);
      formData.append(`menuItems[${index}][price]`, value.price.toString());
    });
  
    if (valuesForm.imageFile) {
      formData.append("imageFile", valuesForm.imageFile);
    }
  
  
    onSave(formData);
  };
  

  useEffect(() => {
    if (!defaultValues) {
      return;
    }

    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className=" space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <CuisinesSection />
        <MenuItemsSection />
        <ImageFileSection />

        <LoaindgButton isLoading={isLoading}>Submit</LoaindgButton>
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
