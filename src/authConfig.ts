import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "0135b3dd-a20a-4454-8d4e-4a2e8d98232b",
    authority:
      "https://login.microsoftonline.com/1825340c-ffbb-48c8-ada5-f436123de743",
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: [`https://blackthorn-vision.com/BVCOWorking/user_impersonation`],
};
