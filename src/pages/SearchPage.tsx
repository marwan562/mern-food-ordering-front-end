import { useSearchGetRestaurant } from "@/api/RestaurantApi";
import LottileFiles from "@/assets/lottieFiles/LottieFiles";
import FilterRestaurants from "@/components/FilterRestaurants";
import PaginationRestaurant from "@/components/PaginationRestaurant";
import SearchResaultsCard from "@/components/SearchResaultsCard";
import SearchResaultsInfo from "@/components/SearchResaultsInto";

import SearchRestaurant, {
  TFormSearch,
} from "@/Form/Search-Restaurant/SearchRestaurant";
import { SquareMousePointer } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

type TSortOptions = "estimatedDeliveryTime" | "lastUpdate" | "deliveryPrice";

type TSearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOptions: TSortOptions;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<TSearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOptions: "lastUpdate",
  });

  const { restaurant, isLoading ,  } = useSearchGetRestaurant({
    city,
    searchQuery: searchState.searchQuery,
    selectedCuisines: searchState.selectedCuisines,
    sortOptions: searchState.sortOptions,
    page: searchState.page,
  });

  const setFormSearchState = (FormSearch: TFormSearch) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: FormSearch.searchQuery,
    }));
  };

  const setPageState = (page: number) => {
    setSearchState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSortOptions = (sortOptions: TSortOptions) => {
    setSearchState((prev) => ({ ...prev, sortOptions }));
  };

  const toggleCuisineSelection = (cuisine: string) => {
    setSearchState((prev) => ({
      ...prev,
      page: 1,
      selectedCuisines: prev.selectedCuisines.includes(cuisine)
        ? prev.selectedCuisines.filter((c) => c !== cuisine)
        : [...prev.selectedCuisines, cuisine],
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="flex flex-col gap-2" id="Filter-Cuisines">
        <div className="text-lg flex gap-2 items-center font-bold text-orange-500">
          <SquareMousePointer />
          <span>Select Your Cuisines</span> 
        </div>
        <FilterRestaurants
          selectedCuisines={searchState.selectedCuisines}
          onToggleCuisine={toggleCuisineSelection}
        />
      </div>
      <div id="Content-Restaurants" className="flex flex-col gap-5">
        <SearchRestaurant
          placeHolder={"Search by Cuisines or Restaurant Name.."}
          onSave={setFormSearchState}
          isLoading={isLoading}
        />
        <SearchResaultsInfo
          sortOptions={searchState.sortOptions}
          setSortOptions={setSortOptions}
          city={city}
          total={restaurant?.pagination?.totalResults}
        />
        {isLoading ? (
          <LottileFiles variant="Loading" />
        ) : (
          <>
            { restaurant && restaurant?.data?.length > 0 ? restaurant?.data.map((result) => (
              <SearchResaultsCard key={result._id} restaurant={result} />
            )): <LottileFiles variant="NotFoundSearch" message={"Restaurant Not Found."}/>}
            <PaginationRestaurant
              setPage={setPageState}
              page={restaurant?.pagination?.currentPage}
              totalPages={restaurant?.pagination?.totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
