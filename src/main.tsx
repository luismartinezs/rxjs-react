import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { A11yProvider } from "./utils/a11y";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <A11yProvider>
      <App />
    </A11yProvider>
  </React.StrictMode>
);
