import { useParams } from "react-router-dom";
import PostForm from "./components/post-form";
import { useEffect, useState } from "react";
import { PostModel } from "@/shared/models/post.model";
import { axiosInstance } from "@/utils/axios.api";

export default function PostContainer() {
  const { id } = useParams();
  const [post, setPost] = useState<PostModel>();

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/posts/${id}`)
        .then((response) => setPost(response.data));
    }
  }, [id, setPost]);

  return (
    <div className="container">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Story time! Tell us more about your interesting story
      </h2>
      <PostForm post={post} />
    </div>
  );
}
