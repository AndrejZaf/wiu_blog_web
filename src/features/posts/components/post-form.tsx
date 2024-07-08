import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangeEvent } from "react";

type PostFormProps = {};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 3 characters.",
  }),
  file: z.string().optional(),
});

async function getImageData(
  event: ChangeEvent<HTMLInputElement>,
  callback: (result: string | ArrayBuffer | null) => void
) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.onerror = () => {
    callback("");
    return;
  };
  reader.readAsDataURL(event.target.files![0]);
}

export default function PostForm() {
  const editor = useCreateBlockNote();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    console.log(editor.blocksToHTMLLossy());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    className="focus-visible:ring-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...rest } }) => {
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    onChange={(event) => {
                      onChange("");
                      getImageData(event, onChange);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="lg:w-[33%] aspect-video bg-gray-300 mx-auto mt-4 rounded-md">
          {form.getValues().file && (
            <img className="w-full h-full" src={form.getValues().file} />
          )}
        </div>

        <div className="editor h-max-[250px]">
          <Label>Content</Label>
          <BlockNoteView
            id="content"
            className="border border-input rounded-md"
            theme="light"
            editor={editor}
          />
        </div>
        <div className="flex gap-4 mt-4 justify-end">
          <Button variant="outline" type="submit">
            Save as draft
          </Button>
          <Button type="submit">Publish</Button>
        </div>
      </form>
    </Form>
  );
}
