import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const LoaindgButton = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  return (
    <Button disabled={isLoading} type="submit" className="bg-orange-500">
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
