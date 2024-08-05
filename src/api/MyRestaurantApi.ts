import { IRestaurant, TOrder, TStatus } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type TOrderState = {
  status?: TStatus | "";
  orderId?: string | null;
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrders = async (): Promise<TOrder[]> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${baseUrl}/api/my/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error fetching Restaurant Orders");
    }

    return res.json();
  };

  const {
    isLoading,
    isError,
    data: orders,
  } = useQuery("restaurantOrders", getMyRestaurantOrders);

  return { isLoading, isError, orders };
};

export const useUpdateOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantOrder = async ({
    status,
    orderId,
  }: TOrderState): Promise<TOrder> => {
    const accessToken = await getAccessTokenSilently();
    

    const res = await fetch(
      `${baseUrl}/api/my/restaurant/order/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching Restaurant Orders");
    }

    return res.json();
  };
  const queryClient = useQueryClient()
  const {
    isLoading,
    isError,
    isSuccess,
    reset,
    mutateAsync: updateOrder,
  } = useMutation(updateRestaurantOrder,{
    onSuccess: ()=> {
      queryClient.invalidateQueries("restaurantOrders")
    }
  });

  if (isSuccess) {
    toast.success("Updated you'r Restaurant Successfully");
  }

  if (isError) {
    toast.error("Failed Update Restaurant...! ");
    reset();
  }

  return { isLoading, isError, updateOrder };
};

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurant = async (): Promise<IRestaurant | undefined> => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!res.ok) {
      throw new Error("restaurant not found");
    }

    return res.json();
  };

  const {
    isSuccess,
    isLoading,
    isError,
    data: myRestaurant,
  } = useQuery("fetchGetMyRestaurant", getMyRestaurant);

  return {
    isSuccess,
    isLoading,
    isError,
    myRestaurant,
  };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyResturant = async (FormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: FormData,
    });

    if (!res.ok) {
      throw new Error("Error: Failed to update you'r Resturant");
    }

    return res.json();
  };

  const {
    mutateAsync: updatedMyResturant,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(updateMyResturant);

  if (isSuccess) {
    toast.success("Updated you'r Restaurant Successfully");
  }

  if (isError) {
    toast.error("Failed Update Restaurant...! ");
  }

  return {
    updatedMyResturant,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyResturant = async (FormData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${baseUrl}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: FormData,
    });
    if (!res.ok) {
      throw new Error("Error: Failed to create you'r Resturant");
    }

    return res.json();
  };

  const {
    mutateAsync: mutateMyResturant,
    isError,
    isSuccess,
    isLoading,
  } = useMutation(createMyResturant);

  if (isSuccess) {
    toast.success("Created you'r Restaurant Successfully");
  }

  if (isError) {
    toast.error("Failed Create Restaurant...! ");
  }

  return {
    mutateMyResturant,
    isError,
    isSuccess,
    isLoading,
  };
};
