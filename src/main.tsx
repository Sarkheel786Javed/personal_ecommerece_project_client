import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./app/createContextAuth/createContex.tsx";
import { AutsidebarhProvider } from "./app/createContextAuth/CreateSidebarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AutsidebarhProvider>
        <App />
      </AutsidebarhProvider>
    </AuthProvider>
  </React.StrictMode>
);
