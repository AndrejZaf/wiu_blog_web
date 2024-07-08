import { PostModel } from "../models/post.model";

type PostProps = {
  post: PostModel;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="w-72 md:w-44 lg:w-72 cursor-pointer">
      <div className="h-52 md:h-40 lg:h-56 rounded-xl bg-gray-100"></div>
      <div className="content mt-2 px-1">
        <h2 className="scroll-m-20 pb-2 text-md font-semibold tracking-tight first:mt-0 truncate">
          {post.title}
        </h2>
        <div className="line-clamp-2 text-sm leading-none">{post.content}</div>
      </div>
    </div>
  );
}
