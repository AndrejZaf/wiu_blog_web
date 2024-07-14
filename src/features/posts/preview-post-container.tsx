import { PostModel } from "@/shared/models/post.model";
import { axiosInstance } from "@/utils/axios.api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PreviewPost from "./components/preview-post";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ConfirmationDialog from "@/shared/components/confirmation-dialog";
import { useKeycloak } from "../keycloak/useKeycloak";

export default function PreviewPostContainer() {
  const { id } = useParams();
  const [post, setPost] = useState<PostModel>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { keycloak } = useKeycloak();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/posts/${id}`)
        .then((response) => setPost(response.data));
    }
  }, [id, setPost]);

  function deletePost(id: string) {
    axiosInstance
      .delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      })
      .then(() => {
        toast({
          title: "It's that time.. Our shredding machine is ready!",
          description: "Your post has been successfully deleted.",
        });
        navigate("/my-posts");
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

  return (
    <>
      {post && (
        <div className="container">
          {keycloak.authenticated === post.authorId && (
            <div className="post-buttons flex gap-2 justify-end">
              <Link to={`/posts/${post.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button
                variant="default"
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete
              </Button>
            </div>
          )}
          <PreviewPost post={post} />
          <ConfirmationDialog
            showDialog={showDeleteDialog}
            setShowDialog={setShowDeleteDialog}
            title="Are you sure that you want to delete this post?"
            content="This action cannot be undone. This will permanently delete your
            post."
            actionButtonText="Proceed"
            execute={() => deletePost(post.id)}
          />
        </div>
      )}
    </>
  );
}
