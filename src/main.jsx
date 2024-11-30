import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { msalInstance } from "./config/msalConfig";
import { MsalProvider } from "@azure/msal-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MsalProvider instance={msalInstance}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </MsalProvider>
  </Provider>
);
