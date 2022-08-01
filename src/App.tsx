import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Typography } from "@material-ui/core";
import { Profile } from "./pages/Profile";
import { SignInButton } from "./ui-components/SignInButton";

function App() {
  return (
    <>
      <AuthenticatedTemplate>
        <Profile />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography variant="h6" align="center">
          Please sign-in to see your profile information.
        </Typography>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  );
}

export default App;
