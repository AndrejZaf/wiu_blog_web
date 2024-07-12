import { useState } from "react";
import { PostsContext } from "./postsContext";
import { useDebounce } from "use-debounce";
import { PostModel } from "@/shared/models/post.model";

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
