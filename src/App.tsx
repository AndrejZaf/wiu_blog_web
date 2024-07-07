import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Keycloak from "keycloak-js";
import KeycloakProvider from "./features/keycloak/KeycloakProvider";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const keycloakSetting = {
  url: "http://localhost:8090/",
  realm: "writeitup",
  clientId: "wiu-web",
};

const authInstance = new Keycloak(keycloakSetting);

function App() {
  return (
    <KeycloakProvider client={authInstance}>
      <RouterProvider router={router} />
    </KeycloakProvider>
  );
}

export default App;
