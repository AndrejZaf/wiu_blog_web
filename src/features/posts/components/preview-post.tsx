import { Badge } from "@/components/ui/badge";
import { PostModel } from "@/shared/models/post.model";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

type PreviewPostProps = {
  post: PostModel;
};

export default function PreviewPost({ post }: PreviewPostProps) {
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (editor) {
      editor.replaceBlocks(editor.document, JSON.parse(post.contentBlocks));
    }
  }, [editor, post]);

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        {post.title}
      </h1>
      <div className="cover-image mt-6 aspect-video h-[450px] mx-auto">
        <img src={post.imageData} alt={post.title} />
      </div>
      <div className="post-info flex justify-between">
        <div className="post-date">{post.createdDate?.toString()}</div>
        <div className="read-time">Test</div>
      </div>
      <BlockNoteView
        id="content"
        editable={false}
        className="rounded-md mt-4"
        theme="light"
        editor={editor}
      />
      <div className="tags flex gap-2">
        {post.tags.map((tag) => (
          <Badge variant="default">{tag}</Badge>
        ))}
      </div>
    </div>
  );
}
