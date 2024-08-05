import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  type TProps = {
    page?: number;
    totalPages?: number;
    setPage: (page: number) => void;
  };
  
  const PaginationRestaurant = ({ page = 1, totalPages = 1, setPage }: TProps) => {
    const arrTotalPages = Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1); // Use 1-based indexing for user-friendly pagination
  
    const handleSetPage = (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setPage(pageNumber);
      }
    };
  
    return (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem
              className="cursor-pointer"
              onClick={() => handleSetPage(page - 1)}
            >
              <PaginationPrevious />
            </PaginationItem>
          )}
          {arrTotalPages.map((pageNumber) => (
            <PaginationItem
              key={pageNumber}
              className="cursor-pointer"
              onClick={() => handleSetPage(pageNumber)}
            >
              <PaginationLink isActive={pageNumber === page}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < totalPages && (
            <PaginationItem
              className="cursor-pointer"
              onClick={() => handleSetPage(page + 1)}
            >
              <PaginationNext />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationRestaurant;
  