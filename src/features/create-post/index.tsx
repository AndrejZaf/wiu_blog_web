import { Button } from "@/components/ui/button";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

export default function CreatePost() {
  const editor = useCreateBlockNote();

  return (
    <>
      <BlockNoteView editor={editor} />
      <Button
        onClick={() => console.log(editor.blocksToHTMLLossy())}
        variant="default"
      >
        Create
      </Button>
    </>
  );
}
