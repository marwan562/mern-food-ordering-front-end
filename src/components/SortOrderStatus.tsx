import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TSortOrder = "lastCreated" | "oldCreated";

type TProps = {
  sortOrderStatus: TSortOrder;
  setSortOrderStatus: (value: TSortOrder) => void;
};

const SortOrderStatus = ({ sortOrderStatus, setSortOrderStatus }: TProps) => {
  return (
    <Select
      value={sortOrderStatus}
      onValueChange={(value) => setSortOrderStatus?.(value as TSortOrder)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort Created" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          <SelectItem value="lastCreated">Latest Orders</SelectItem>
          <SelectItem value="oldCreated">Oldest Orders</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortOrderStatus;
