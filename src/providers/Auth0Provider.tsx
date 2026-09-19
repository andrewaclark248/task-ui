import { Auth0Provider as Auth0ProviderSDK } from "@auth0/auth0-react";
import type { ReactNode } from "react";

type Auth0ProviderProps = {
  children: ReactNode;
};

export default function Auth0Provider({
  children,
}: Auth0ProviderProps) {
console.log("AUTH0 DOMAIN:", import.meta.env.VITE_AUTH0_DOMAIN);
console.log("AUTH0 CLIENT ID:", import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log("AUTH0 AUDIENCE:", import.meta.env.VITE_AUTH0_AUDIENCE);    
  return (
    <Auth0ProviderSDK
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0ProviderSDK>
  );
}