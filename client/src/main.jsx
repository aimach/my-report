import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ReportList from "./pages/ReportList.jsx";
import SignIn from "./components/SignIn.jsx";
import CreateReport from "./pages/CreateReport.jsx";
import DirectorPage from "./pages/DirectorPage.jsx";
import { getAllVisitsWithCommercialId } from "./services/visits.js";
import { getAllClients } from "./services/clients.js";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getAllArticles } from "./services/articles.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReportList />,
        loader: () => {
          return getAllVisitsWithCommercialId(5, 1);
        },
      },
      {
        path: "/visit/:id",
        element: <CreateReport />,
        loader: async () => {
          const clients = await getAllClients();
          const articles = await getAllArticles();
          return { clients, articles };
        },
      },
      {
        path: "dashboard",
        element: <DirectorPage />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
