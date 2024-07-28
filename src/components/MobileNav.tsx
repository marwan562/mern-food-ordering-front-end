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
  LucideIcon,
  Menu,
  MenuSquare,
  PizzaIcon,
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
      <SheetContent className="space-y-3">
        <SheetTitle>
          <span>Welcome to MernEats.com!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription>
          {isAuthenticated ? (
            <>
              <NavItem to="/user-profile" icon={User} label="User Profile" />
              <NavItem
                to="/manage-restaurant"
                icon={PizzaIcon}
                label="Manage Restaurant"
              />
              <NavItem
                to="/order-status"
                icon={ListOrderedIcon}
                label="Order Status"
              />
              <NavItem to="/menu" icon={MenuSquare} label="Menu" />
              <div className="m-2">
                <Button
                  onClick={() => logout()}
                  className="w-full flex items-center bg-orange-500 py-1 hover:bg-orange-400 duration-300 space-x-3"
                >
                  <LogOutIcon />
                  <span>Log out</span>
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={async () => await loginWithRedirect()}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

const NavItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) => (
  <div className="bg-orange-300 hover:bg-orange-400 duration-300 p-1 w-full">
    <Link
      to={to}
      className="flex items-center bg-orange-200 py-1 hover:bg-orange-300 duration-300 space-x-3"
    >
      <Icon />
      <span>{label}</span>
    </Link>
  </div>
);

export default MobileNav;
