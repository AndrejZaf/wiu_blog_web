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
import { useEffect, useState } from "react";
import TagsInput from "./tags-input";
import { Option } from "@/components/ui/multiple-selector";
import { axiosInstance } from "@/utils/axios.api";
import { CreatePostModel } from "../models/create-post.model";
import { useKeycloak } from "@/features/keycloak/useKeycloak";
import { PostStatus } from "../models/post-status.enum";
import { getImageData } from "@/utils/image-processing.util";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PostModel } from "@/shared/models/post.model";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 3 characters.",
  }),
  file: z.string().optional(),
});

type PostProps = {
  post?: PostModel;
};

export default function PostForm({ post }: PostProps) {
  const navigate = useNavigate();
  const editor = useCreateBlockNote();
  const { toast } = useToast();
  const [tags, setTags] = useState<Option[]>([]);
  const { keycloak } = useKeycloak();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title || "",
        file: post.imageData || "",
      });
      editor
        .tryParseHTMLToBlocks(post.content)
        .then((blocks) => editor.replaceBlocks(editor.document, blocks));
      setTags(post.tags.map((tag) => ({ value: tag, label: tag })));
    }
  }, [form, post, editor]);

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: PostStatus
  ) => {
    event.preventDefault();
    const data = form.getValues();
    const content = await editor.blocksToHTMLLossy();
    const tagStrings = tags.map((tag) => tag.value);

    if (post) {
      const postData: PostModel = {
        id: post.id,
        title: data.title,
        content: content,
        imageData: data.file!,
        tags: tagStrings,
        status: status,
      };
      axiosInstance
        .put("/posts", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        })
        .then((response) => {
          toast({
            title: "We are changing the ink.. Our printing machine is ready!",
            description: "Your post has been successfully edited.",
          });
          navigate(`/posts/${response.data.id}`);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Oh, no.. We have a problem!",
            description: "An error occurred, please try again later",
          });
          console.error(error.message);
        });
    } else {
      const postData: CreatePostModel = {
        title: data.title,
        content: content,
        imageData: data.file!,
        tags: tagStrings,
        status: status,
      };
      axiosInstance
        .post("/posts", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        })
        .then((response) => {
          toast({
            title: "Finally.. Our printing machine is ready!",
            description: "Your post has been successfully created.",
          });
          navigate(`/posts/${response.data.id}`);
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: "Oh, no.. We have a problem!",
            description: "An error occurred, please try again later",
          });
          console.error(error.message);
        });
    }
  };

  return (
    <Form {...form}>
      <form className="w-full">
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
                      getImageData(event, onChange);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {form.getValues().file ? (
          <img
            className="w-[33%] mx-auto mt-4 rounded-md"
            src={form.getValues().file}
          />
        ) : (
          <div className="lg:w-[33%] aspect-video bg-gray-300 mx-auto mt-4 rounded-md"></div>
        )}

        <div className="editor h-max-[250px]">
          <Label>Content</Label>
          <BlockNoteView
            id="content"
            className="border border-input rounded-md"
            theme="light"
            editor={editor}
          />
        </div>
        <TagsInput tags={tags} setTags={setTags} />
        {post && post.status === PostStatus.DRAFT && (
          <div className="text-right">
            <small className="text-sm font-medium leading-none">
              The post is marked as draft as of now
            </small>
          </div>
        )}
        <div className="flex gap-4 mt-4 justify-end">
          <Button
            variant="outline"
            type="submit"
            onClick={(event) => onSubmit(event, PostStatus.DRAFT)}
          >
            Save as draft
          </Button>
          <Button
            type="submit"
            onClick={(event) => onSubmit(event, PostStatus.PUBLISHED)}
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
}
