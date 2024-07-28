import { IRestaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
