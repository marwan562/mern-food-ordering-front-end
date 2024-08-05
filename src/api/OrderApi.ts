import { TOrder, TStatus } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type TPropsOrders = {
  sortOrder: "lastCreated" | "oldCreated";
  selectedStatus: TStatus[];
};

export const useGetMyOrders = ({ sortOrder, selectedStatus }: TPropsOrders) => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrders = async (): Promise<TOrder[]> => {
    const params = new URLSearchParams({
      sortOrderCreated: sortOrder,
    });

    if (selectedStatus.length > 0) {
      params.set("orderStatus", selectedStatus.join(","));
    }

    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${baseUrl}/api/order?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Something went be wrong in fetchData");
    }

    return res.json();
  };

  const { isLoading, isError, data } = useQuery(
    ["MyOrders", sortOrder, selectedStatus],
    getMyOrders,
    {
      refetchInterval: 5000,
    }
  );

  return { isLoading, isError, data };
};

type TCreateCheckOutRequest = {
  restaurantId: string;
  menuItems: {
    _id: string;
    name: string;
    price: number;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    city: string;
    addressLine1: string;
    country: string;
    email?: string;
  };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSession = async (
    createCheckOutRequest: TCreateCheckOutRequest
  ) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const res = await fetch(
        `${baseUrl}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(createCheckOutRequest),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `Error ${res.status}: ${errorData.message || "Something went wrong"}`
        );
      }

      return res.json();
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      throw new Error("Failed to create checkout session.");
    }
  };

  const {
    isError,
    isLoading,
    data,
    mutateAsync: createSession,
  } = useMutation(createCheckoutSession);

  return { isError, data, isLoading, createSession };
};
