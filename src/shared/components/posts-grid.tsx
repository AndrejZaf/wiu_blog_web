import { Link } from "react-router-dom";
import Post from "./post";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsContext } from "@/features/posts/contexts/postsContext";

type PostsGridProps = {
  fetchMoreData(): void;
};

export default function PostsGrid({ fetchMoreData }: PostsGridProps) {
  const { posts, hasMore } = usePostsContext();
  return (
    <InfiniteScroll
      dataLength={posts.length}
      loader={<p>Loading...</p>}
      next={fetchMoreData}
      hasMore={hasMore}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12">
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <Post post={post} />
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
