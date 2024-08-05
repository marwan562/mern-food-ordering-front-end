import { IRestaurant, TResRestaurant } from "@/types";
import { useQuery } from "react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

type TSearchRestaurant = {
  city: string | undefined;
  searchQuery: string;
  sortOptions: "estimatedDeliveryTime" | "lastUpdate" | "deliveryPrice";
  page: number;
  selectedCuisines: string[];
};

export const useSearchGetRestaurant = ({
  city,
  searchQuery,
  page,
  sortOptions,
  selectedCuisines,
}: TSearchRestaurant) => {
  const fetchRestaurants = async (): Promise<TResRestaurant> => {
    const params = new URLSearchParams({
      searchQuery,
      page: page.toString(),
      sortOptions,
    });

    if (selectedCuisines.length > 0) {
      params.set("selectedCuisines", selectedCuisines.join(","));
    }

    const res = await fetch(
      `${baseUrl}/api/restaurant/search/${city}?${params}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  };

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useQuery(
    [
      "searchRestaurant",
      city,
      searchQuery,
      page,
      selectedCuisines,
      sortOptions,
    ],
    fetchRestaurants,
    {
      keepPreviousData: true,
      staleTime: 5000, // Adjust this as needed
    }
  );

  return { restaurant, isLoading, isError };
};

export const useGetDetailsRestaurant = (id?: string) => {
  const getDetailsRestaurant = async ():Promise<IRestaurant> => {
    const res = await fetch(`${baseUrl}/api/restaurant/details/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    return res.json();
  };

  const {
    isError,
    isLoading,
    data: detailsRestaurant,
  } = useQuery(["getDetailsRestaurant", id], getDetailsRestaurant,{enabled:!!id});

  return { isError, isLoading, detailsRestaurant };
};
