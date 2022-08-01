import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => instance.logoutRedirect();

  return (
    <button onClick={handleLogout} key="logoutRedirect">
      Logout using Redirect
    </button>
  );
};
