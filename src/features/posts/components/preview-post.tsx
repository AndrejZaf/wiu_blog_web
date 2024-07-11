import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostModel } from "@/shared/models/post.model";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect, useState } from "react";

type PreviewPostProps = {
  post: PostModel;
};

export default function PreviewPost({ post }: PreviewPostProps) {
  const [editor, setEditor] = useState<BlockNoteEditor>();

  console.log(post);

  useEffect(() => {
    setEditor(
      BlockNoteEditor.create({
        initialContent: JSON.parse(post.contentBlocks),
        defaultStyles: false,
        domAttributes: {
          editor: {
            class: "px-0",
          },
        },
      })
    );
  }, [post]);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        {post.title}
      </h1>
      <div className="post-info flex justify-between my-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">AndrejZaf</p>
        </div>
        <div className="post-core-data text-sm font-medium">
          <p>Jul 11, 2024</p>
          <p>7 min. read</p>
        </div>
      </div>
      <hr />
      <div className="cover-image mt-6 aspect-video lg:h-[450px] mx-auto">
        <img className="object-cover" src={post.imageData} alt={post.title} />
      </div>
      {editor && (
        <BlockNoteView
          id="content"
          editable={false}
          className="rounded-md mt-4"
          theme="light"
          editor={editor}
        />
      )}
      <div className="tags flex gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="default">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
