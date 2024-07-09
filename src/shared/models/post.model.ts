import { PostStatus } from "@/features/posts/models/post-status.enum";

export interface PostModel {
  id: string;
  title: string;
  content: string;
  createdDate?: Date;
  tags: string[];
  imageData: string;
  status: PostStatus;
}
