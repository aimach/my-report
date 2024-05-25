import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <div>Page de création d&apos;un compte-rendu</div>,
  },
  {
    path: "/dashboard",
    element: <div>Page du dashboard du directeur commercial</div>,
  },
  {
    path: "/login",
    element: <div>Page de login</div>,
  },
  {
    path: "/register",
    element: <div>Page de register</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
