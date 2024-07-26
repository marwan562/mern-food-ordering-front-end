import { IUser } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUser = async ():Promise<IUser> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${baseUrl}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Error: falid to get My Profile User..!");
    }

    return res.json()
  };
  const {
    isSuccess,
    isError,
    data: user,
  } = useQuery("fetchCurrentUser", getMyUser);

  return {isSuccess , isError , user}
};

type TCreateUser = {
  auth0Id: string;
  email: string;
};

const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUser = async (body: TCreateUser) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${baseUrl}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("Something went be wrong in create User");
    }

    return res;
  };

  const {
    mutateAsync: createUser,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createMyUser);
  return { createUser, isError, isLoading, isSuccess };
};

type updateUser = {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUser = async (body: updateUser) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${baseUrl}/api/my/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("something went be wrong in update user..!");
    }
    return res;
  };

  const {
    isSuccess,
    isError,
    isLoading,
    error,
    reset,
    mutateAsync: updateMyUser,
  } = useMutation(updateUser);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { isSuccess, isError, isLoading, updateMyUser };
};

export { useGetMyUser, useCreateMyUser, useUpdateMyUser };
