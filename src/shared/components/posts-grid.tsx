import { Link } from "react-router-dom";
import { PostModel } from "../models/post.model";
import Post from "./post";

type PostsGridProps = {
  posts: PostModel[];
};

export default function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12">
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
}
