import { authClient } from "@lib/auth-client";
import { Role } from "@lib/role";

const useIsAdmin = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user.role === Role.admin;

  return { isAdmin, isPending, session };
};

export default useIsAdmin;
