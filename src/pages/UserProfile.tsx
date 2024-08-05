import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import LoadingButton from "@/components/LoadingButton";
import UserProfileForm from "@/Form/User-Profile-Form/UserProfileForm";

const UserProfile = () => {
  const { user } = useGetMyUser();
  const { updateMyUser, isLoading } = useUpdateMyUser();

  return (
    <UserProfileForm
    title={"User Profile"}
      buttonConfirm={
        <LoadingButton isLoading={isLoading}> Submit</LoadingButton>
      }
      defaultValues={user}
      onSave={updateMyUser}
    />
  );
};

export default UserProfile;
