import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => instance.loginRedirect(loginRequest);

  return (
    <button onClick={handleLogin} key="loginPopup">
      Sign in
    </button>
  );
};
