import { PostModel } from "../models/post.model";

type PostProps = {
  post: PostModel;
};

export default function Post({ post }: PostProps) {
  return (
    <div className="flex flex-auto flex-col aspect-square">
      <img
        className="h-[70%] object-cover"
        src={post.imageData}
        alt={post.title}
      />
      <div className="content mt-2 px-1 h-[30%]">
        <h2 className="scroll-m-20 pb-2 text-md font-semibold tracking-tight first:mt-0 truncate">
          {post.title}
        </h2>
        <div className="line-clamp-2 text-sm leading-none text-justify">
          {post.content}
        </div>
      </div>
    </div>
  );
}
