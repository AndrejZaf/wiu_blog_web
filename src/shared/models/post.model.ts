import { PostStatus } from "@/features/posts/models/post-status.enum";

export interface PostModel {
  id: string;
  title: string;
  content: string;
  contentBlocks: string;
  createdDate?: Date;
  tags: string[];
  imageData: string;
  status: PostStatus;
}
