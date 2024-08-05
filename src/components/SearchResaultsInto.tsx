import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TSortOptions = "estimatedDeliveryTime" | "lastUpdate" | "deliveryPrice";

type TProps = {
  total: number | undefined;
  city: string | undefined;
  sortOptions?: TSortOptions;
  setSortOptions?: (sort: TSortOptions) => void;
};

const SearchResaultsInfo = ({
  total,
  city,
  sortOptions,
  setSortOptions,
}: TProps) => {
  return (
    <div className="flex items-center flex-col-reverse  gap-5 md:flex-row justify-between">
      <div className="flex flex-row items-end gap-2">
        <div className="text-2xl font-bold">
          {total} Restaurant found in {city}
        </div>
        <Link
          to={"/"}
          className="text-md font-semibold cursor-pointer text-blue-500 underline"
        >
          Change Location
        </Link>
      </div>
      <div>
        <Select
          value={sortOptions}
          onValueChange={(value) => setSortOptions?.(value as TSortOptions)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Options" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="lastUpdate">Last Update</SelectItem>
              <SelectItem value="estimatedDeliveryTime">
                Fast Delivery
              </SelectItem>
              <SelectItem value="deliveryPrice">Best Price</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchResaultsInfo;
