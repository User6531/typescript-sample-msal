import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";

// Material-ui imports
import Paper from "@material-ui/core/Paper";
import { SignOutButton } from "../ui-components/SignOutButton";
import { TUser } from "../utils/meApiCall";
import { meApiCall } from "../utils/meApiCall";
import { refreshAccessToken } from "../utils/refreshAccessToken";

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | TUser>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      (async () => {
        await refreshAccessToken();
        setGraphData((await meApiCall()).data);
      })();
    }
  }, [inProgress, graphData, instance]);

  return (
    <Paper>{graphData ? <ProfileData graphData={graphData} /> : null}</Paper>
  );
};

export function Profile() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
      <SignOutButton />
    </MsalAuthenticationTemplate>
  );
}
