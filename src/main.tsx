import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "./routes/root";
import Number from "./routes/number";
import A11yLabels from "./routes/a11yLabels";
import Abstraction from "./routes/abstraction";
import ProviderAbstraction from "./routes/providerAbstraction";
import TopModal from "./routes/topModal";
import ErrorPage from "./error-page";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "number",
        element: <Number />,
        errorElement: <ErrorPage />,
      },
      {
        path: "labels",
        element: <A11yLabels />,
        errorElement: <ErrorPage />,
      },
      {
        path: "abstraction",
        element: <Abstraction />,
        errorElement: <ErrorPage />,
      },
      {
        path: "provider",
        element: <ProviderAbstraction />,
        errorElement: <ErrorPage />,
      },
      {
        path: "top-modal",
        element: <TopModal />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
