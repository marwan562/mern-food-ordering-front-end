import { useGetMyOrders } from "@/api/OrderApi";
import LottieFiles from "@/assets/lottieFiles/LottieFiles";
import FilterOrderStatus from "@/components/FilterOrderStatus";
import OrderStatusList from "@/components/OrderStatusList";
import PaymentSuccessfully from "@/components/PaymentSuccessfully";
import SortOrderStatus from "@/components/SortOrderStatus";
import { TStatus } from "@/types";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type TSortOrder = "lastCreated" | "oldCreated";

type TFilterOrder = {
  sortOrder: TSortOrder;
  selectedStatus: TStatus[];
};

const OrderStatusPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const success = params.get('success') === 'true';



  const [filterOrder, setFilterOrder] = useState<TFilterOrder>({
    selectedStatus: [],
    sortOrder: "lastCreated",
  });
  

  const { data, isLoading } = useGetMyOrders({
    sortOrder: filterOrder.sortOrder,
    selectedStatus: filterOrder.selectedStatus,
  });

  if (success) {
    return <PaymentSuccessfully/>
  }
  const onToggelStatus = (status: TStatus) => {
    setFilterOrder((prev) => ({
      ...prev,
      selectedStatus: prev.selectedStatus.includes(status)
        ? prev.selectedStatus.filter((el) => el !== status)
        : [...prev.selectedStatus, status],
    }));
  };

  const setSortOrderStatus = (value: TSortOrder) => {
    setFilterOrder((prev) => ({ ...prev, sortOrder: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-5">
      <FilterOrderStatus
        selectedStatus={filterOrder.selectedStatus}
        onToggelStatus={onToggelStatus}
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <div className=" text-orange-500 text-2xl font-bold">
            {data?.length} Orders Found.{" "}
          </div>
          <SortOrderStatus
            sortOrderStatus={filterOrder.sortOrder}
            setSortOrderStatus={setSortOrderStatus}
          />
        </div>
        {isLoading && <LottieFiles variant={"Loading"} />}
        {data && data?.length > 0 ? (
          data?.map((el, i) => <OrderStatusList key={i} {...el} />)
        ) : (
          <LottieFiles variant={"NotFoundSearch"} message="Order Not Found." />
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;
