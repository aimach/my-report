import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ReportList from "./pages/ReportList.jsx";
import SignIn from "./components/SignIn.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { getAllVisitsWithCommercialId } from "./services/visits.js";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReportList />,
        loader: () => {
          return getAllVisitsWithCommercialId();
        },
      },
      {
        path: "/create",
        element: <div>Page de création dun compte rendu</div>,
      },
      {
        path: "dashboard",
        element: <div>Page du dashboard du directeur commercial</div>,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <div>Page de register</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
