import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import UserProfileForm from "@/Form/User-Profile-Form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { TUserProfileForm } from "@/validations/userUpdateSchema";

type TProps = {
  onCheckout: (val: TUserProfileForm) => void;
  isLoading: boolean;
};

const ButtonCheckOut = ({ onCheckout, isLoading }: TProps) => {
  const { pathname } = useLocation();
  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading: isAuthLoading,
  } = useAuth0();

  const { user } = useGetMyUser();

  const handleOnLogin = async () => {
    await loginWithRedirect({ appState: { returnTo: pathname } });
  };

  return (
    <>
      {isAuthenticated ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button className=" bg-orange-500 hover:bg-orange-400">
              Check Out
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <UserProfileForm
              title={"Confirm Details Delivery"}
              onSave={onCheckout}
              defaultValues={user}
              buttonConfirm={
                <Button className=" bg-orange-500 hover:bg-orange-400">
                  {isLoading ? "Loading..." : "Continue to payment"}
                </Button>
              }
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={handleOnLogin}
          className=" bg-orange-500 hover:bg-orange-400"
        >
          {isAuthLoading ? "Loading..." : " Log In To Ckeck Out"}
        </Button>
      )}
    </>
  );
};

export default ButtonCheckOut;
