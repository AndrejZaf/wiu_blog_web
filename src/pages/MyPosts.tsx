import { PostsProvider } from "@/features/posts/contexts/PostsProvider";
import MyPostsContainer from "@/features/posts/my-posts-container";

export default function MyPosts() {
  return (
    <PostsProvider>
      <MyPostsContainer />
    </PostsProvider>
  );
}
