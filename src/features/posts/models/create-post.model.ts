import { PostStatus } from "./post-status.enum";

export interface CreatePostModel {
  title: string;
  content: string;
  contentBlocks: string;
  status: PostStatus;
  imageData: string;
  tags: string[];
}
