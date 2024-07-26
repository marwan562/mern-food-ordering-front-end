import { Separator } from "@radix-ui/react-separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  ListOrderedIcon,
  LogOutIcon,
  Menu,
  MenuSquare,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className=" space-y-3 ">
        <SheetTitle>
          <span>Welocme to MernEats.com!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className=" ">
          {isAuthenticated ? (
            <>
              <div className="bg-orange-300 hover:bg-orange-400 duration-300 p-1 w-full">
                <Link
                  to={"/user-profile"}
                  className=" flex items-center bg-orange-200  py-1 hover:bg-orange-300 duration-300  space-x-3"
                >
                  <User />
                  <span>User Profile</span>
                </Link>
              </div>
              <div className="bg-orange-300 hover:bg-orange-400 duration-300 p-1 w-full">
                <Link
                  to={"/order-status"}
                  className=" flex items-center bg-orange-200 py-1 hover:bg-orange-300 duration-300  space-x-3"
                >
                  <ListOrderedIcon />
                  <span>Order Status</span>
                </Link>
              </div>
              <div className="bg-orange-300 hover:bg-orange-400  duration-300 p-1 w-full">
                <Link
                  to={"/Menu"}
                  className=" flex items-center bg-orange-200  py-1 hover:bg-orange-300 duration-300  space-x-3"
                >
                  <MenuSquare />
                  <span>Menu</span>
                </Link>
              </div>
              <div className="m-2">
                <Button
                  onClick={() => logout()}
                  className=" w-full cursor-pointer flex items-center bg-orange-500  py-1 hover:bg-orange-400 duration-300  space-x-3"
                >
                  <LogOutIcon />
                  <span>Log out</span>
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className=" flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
