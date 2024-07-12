import { PostModel } from "@/shared/models/post.model";
import { createContext } from "react";

type PostsContextState = {
  posts: PostModel[];
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedInputValue: string;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsContext = createContext<PostsContextState>({
  posts: [],
  setPosts: () => null,
  search: "",
  setSearch: () => null,
  debouncedInputValue: "",
  hasMore: true,
  setHasMore: () => null,
});
