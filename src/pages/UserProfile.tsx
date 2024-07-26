import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/Form/User-Profile-Form/UserProfileForm";

const UserProfile = () => {
  const { user } = useGetMyUser();
  const { updateMyUser, isLoading } = useUpdateMyUser();

  return (
    <UserProfileForm
      defaultValues={user}
      isLoading={isLoading}
      onSave={updateMyUser}
    />
  );
};

export default UserProfile;
