import { useContext } from "react";
import { PostsContext } from "./postsContext";

export function usePostsContext() {
  return useContext(PostsContext);
}
