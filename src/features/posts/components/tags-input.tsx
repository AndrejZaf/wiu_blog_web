import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

type TagsInputProps = {
  tags: Option[];
  setTags: (value: Option[]) => void;
};

export default function TagsInput({ tags, setTags }: TagsInputProps) {
  return (
    <div className="mt-2">
      <Label htmlFor="tags">Tags</Label>
      <MultipleSelector
        value={tags}
        onChange={setTags}
        placeholder="Tags"
        creatable={true}
        className="focus-visible:ring-transparent"
      />
    </div>
  );
}
