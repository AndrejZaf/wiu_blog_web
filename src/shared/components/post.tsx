import { PostModel } from "../models/post.model";

type PostProps = {
  post: PostModel;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-auto flex-col h-full">
      <img className="flex-1" src={post.imageData} alt={post.title} />
      <div className="content mt-2 px-1">
        <h2 className="scroll-m-20 pb-2 text-md font-semibold tracking-tight first:mt-0 truncate">
          {post.title}
        </h2>
        <div className="line-clamp-2 text-sm leading-none">{post.content}</div>
      </div>
    </div>
  );
}
