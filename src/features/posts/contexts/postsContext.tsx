import { PostModel } from "@/shared/models/post.model";
import { createContext, useContext, useState } from "react";
import { useDebounce } from "use-debounce";

type PostsContextState = {
  posts: PostModel[];
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedInputValue: string;
  hasMore: boolean;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostsContext = createContext<PostsContextState>({
  posts: [],
  setPosts: () => null,
  search: "",
  setSearch: () => null,
  debouncedInputValue: "",
  hasMore: true,
  setHasMore: () => null,
});

export function PostsProvider({ children }: React.PropsWithChildren<object>) {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedInputValue] = useDebounce(search, 500);
  const [hasMore, setHasMore] = useState<boolean>(true);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        search,
        setSearch,
        debouncedInputValue,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  return useContext(PostsContext);
}
