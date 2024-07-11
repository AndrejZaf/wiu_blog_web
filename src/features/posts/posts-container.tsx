import PostsGrid from "@/shared/components/posts-grid";
import { myPosts } from "./mocks/posts.mock";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostStatus } from "./models/post-status.enum";
import { axiosInstance } from "@/utils/axios.api";
import { useKeycloak } from "../keycloak/useKeycloak";
import { PostModel } from "@/shared/models/post.model";

export default function PostsContainer() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<PostStatus>(
    PostStatus.PUBLISHED
  );
  const [posts, setPosts] = useState<PostModel[]>([]);
  const { keycloak } = useKeycloak();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/my-posts" && keycloak.authenticated) {
      axiosInstance
        .get(`/posts/me?page=${0}&size=${10}&status=${selectedTab}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        })
        .then((response) => setPosts(response.data.content));
    }
  }, [keycloak.authenticated, keycloak.token, pathname, selectedTab]);

  return (
    <div className="container">
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={() => navigate("/posts/new")}>
          Create Post
        </Button>
      </div>
      <section className="mb-8">
        <Tabs
          defaultValue={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(PostStatus[value as keyof typeof PostStatus])
          }
        >
          <div className="flex justify-between">
            <h2 className="scroll-m-20 mb-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              My Posts
            </h2>{" "}
            <TabsList>
              <TabsTrigger value={PostStatus.PUBLISHED}>Published</TabsTrigger>
              <TabsTrigger value={PostStatus.DRAFT}>Draft</TabsTrigger>
            </TabsList>
          </div>
          <Input
            className="w-full border-0 focus-visible:ring-transparent"
            type="text"
            placeholder="Search by title, keyword, tag or whatever you want"
          />
          <hr className="mb-2" />

          <TabsContent value={PostStatus.PUBLISHED}>
            <PostsGrid posts={posts} />
          </TabsContent>
          <TabsContent value={PostStatus.DRAFT}>
            <PostsGrid posts={posts} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
