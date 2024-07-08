import { PostModel } from "../models/post.model";
import Post from "./post";

type PostsGridProps = {
  posts: PostModel[];
};

export default function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="flex flex-wrap gap-12">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
