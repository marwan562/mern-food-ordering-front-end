import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const LoaindgButton = ({
  isLoading,
  children,
}: {
  isLoading: boolean | undefined
  children: ReactNode;
}) => {
  return (
    <Button disabled={isLoading} type="submit" className="bg-orange-500 hover:bg-orange-400 rounded-r-full">
      {isLoading ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoaindgButton;
