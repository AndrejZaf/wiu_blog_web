import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import Posts from "./pages/Posts";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <h1>search</h1>,
      },
      {
        path: "settings",
        element: <h1>settings</h1>,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);
