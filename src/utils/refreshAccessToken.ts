import { AccountInfo, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";
import { msalInstance } from "../index";

export const refreshAccessToken = async (): Promise<string> => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    localStorage.setItem("accessToken", response.accessToken);

    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      msalInstance.acquireTokenRedirect({
        ...loginRequest,
        account: msalInstance.getActiveAccount() as AccountInfo,
      });
    }

    return "";
  }
};
