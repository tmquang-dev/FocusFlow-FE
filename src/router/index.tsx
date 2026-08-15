import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { protectedRoutes } from "./protectedRoutes";
import NotFound from "../pages/NotFound";

export const route = createBrowserRouter([
  publicRoutes,
  protectedRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
]);
