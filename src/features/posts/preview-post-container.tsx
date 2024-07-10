import { PostModel } from "@/shared/models/post.model";
import { axiosInstance } from "@/utils/axios.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PreviewPost from "./components/preview-post";

export default function PreviewPostContainer() {
  const { id } = useParams();
  const [post, setPost] = useState<PostModel>();

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/posts/${id}`)
        .then((response) => setPost(response.data));
    }
  }, [id, setPost]);

  return <div className="container">{post && <PreviewPost post={post} />}</div>;
}
