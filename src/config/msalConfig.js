import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Azure AD B2C Frontend Application Client ID
    authority:
      "https://<your-b2c-tenant>.b2clogin.com/<your-b2c-tenant>.onmicrosoft.com/B2C_1_signupsignin1", // User flow authority
    knownAuthorities: ["<your-b2c-tenant>.b2clogin.com"],
    redirectUri: "http://localhost:3000", // Redirect URI after login
  },
  cache: {
    cacheLocation: "localStorage", // Token stored in localStorage
    storeAuthStateInCookie: true, // Better compatibility with IE11 or Edge
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
