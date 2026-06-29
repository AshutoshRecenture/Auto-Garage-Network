import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { LogoProvider } from "./utils/LogoContext.jsx";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <LogoProvider>
        <App />
      </LogoProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
