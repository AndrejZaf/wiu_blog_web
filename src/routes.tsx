import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts";
import MyPosts from "./pages/MyPosts";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PreviewPost from "./pages/PreviewPost";
import PrivateRoute from "./shared/components/private-route";
import Settings from "./pages/Settings";

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
        element: <PrivateRoute Component={Settings} />,
      },
      {
        path: "posts",
        children: [
          {
            path: "",
            element: <h1>posts</h1>,
          },
          {
            path: ":id",
            element: <PreviewPost />,
          },
          {
            path: ":id/edit",
            element: <PrivateRoute Component={Post} />,
          },
          {
            path: "new",
            element: <PrivateRoute Component={Post} />,
          },
        ],
      },
      {
        path: "my-posts",
        element: <PrivateRoute Component={MyPosts} />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);
