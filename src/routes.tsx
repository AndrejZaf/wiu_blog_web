import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import CreatePost from "./features/create-post";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <h1>home</h1>,
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
        children: [
          {
            path: "new",
            element: <CreatePost />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);
