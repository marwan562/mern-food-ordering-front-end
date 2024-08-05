import { AppState, Auth0Provider as Auth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0Provider = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_DOMAIN_AUTH0;
  const clientId = import.meta.env.VITE_CLIENT_ID_AUTH0;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL_AUTH0;
  const audience = 'mern-food-ordering-app-api';

  if (!domain || !clientId || !redirect_uri) {
    throw new Error("Error: something went wrong in auth0");
  }

  const onRedirectCallback = (appState?:AppState) => {
    navigate(appState?.returnTo ||"/auth-callback");
  };

  return (
    <Auth0
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri,
        audience,
      }}
    >
      {children}
    </Auth0>
  );
};

export default Auth0Provider;
