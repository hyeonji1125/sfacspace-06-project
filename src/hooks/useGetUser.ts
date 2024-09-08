import { useSession } from "next-auth/react";

export const useGetUser = () => {
  const { data, status } = useSession();
  const { user } = data ?? {};
  const { email, image, name } = user ?? {};

  return { session: data, status, user, email, image, name };
};
