import { useKeycloak } from "@/features/keycloak/useKeycloak";
import React, { useEffect } from "react";

type PrivateRouteProps = {
  Component: React.ComponentType;
};

export default function PrivateRoute({ Component }: PrivateRouteProps) {
  const { keycloak, initialized } = useKeycloak();
  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        keycloak.login();
      }
    }
  }, [keycloak, initialized]);

  if (!initialized) {
    return <p>Loading...</p>;
  }

  if (!keycloak.authenticated) {
    return <p>Authenticating...</p>;
  }

  return <Component />;
}
