import { PostStatus } from "@/features/posts/models/post-status.enum";

export interface PostModel {
  id: string;
  authorId?: string;
  title: string;
  content: string;
  contentBlocks: string;
  createdDate?: string;
  readTime?: number;
  tags: string[];
  imageData: string;
  status: PostStatus;
}
