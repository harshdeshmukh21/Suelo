import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const rootElement = document.getElementById("root");

// Using non-null assertion operator
const root = createRoot(rootElement!);

root.render(
  <Auth0Provider
    domain="harshdeshmukh21.us.auth0.com"
    clientId="5jvESFtGYzACows13qC8YZCykK3A5E0s"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/dashboard",
    }}
  >
    <App />
  </Auth0Provider>
);
