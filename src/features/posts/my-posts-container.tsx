import PostsGrid from "@/shared/components/posts-grid";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostStatus } from "./models/post-status.enum";
import { axiosInstance } from "@/utils/axios.api";
import { useKeycloak } from "../keycloak/useKeycloak";
import { usePostsContext } from "./contexts/usePostsContext";

export default function MyPostsContainer() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<PostStatus>(
    PostStatus.PUBLISHED
  );
  const [page, setPage] = useState<number>(1);
  const { setPosts, search, debouncedInputValue, setSearch, setHasMore } =
    usePostsContext();
  const { keycloak, initialized } = useKeycloak();
  useEffect(() => {
    axiosInstance
      .get(
        `/posts/me?page=${0}&size=${10}&status=${selectedTab}${
          debouncedInputValue && `&search=${debouncedInputValue}`
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      )
      .then((response) => {
        setPosts(response.data.content);
        setHasMore(response.data.content.length > 0);
      });
  }, [
    keycloak,
    selectedTab,
    initialized,
    setPosts,
    debouncedInputValue,
    setHasMore,
  ]);

  function fetchMoreData() {
    axiosInstance
      .get(
        `/posts/me?page=${page}&size=${10}&status=${selectedTab}${
          debouncedInputValue && `&search=${debouncedInputValue}`
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      )
      .then((response) => {
        setPage((currentPage) => currentPage + 1);
        setPosts((currentPosts) => [...currentPosts, ...response.data.content]);
        setHasMore(response.data.content.length > 0);
      });
  }

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
          onValueChange={(value) => {
            setSelectedTab(PostStatus[value as keyof typeof PostStatus]);
            setSearch("");
          }}
        >
          <div className="flex justify-between">
            <h2 className="scroll-m-20 mb-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              My Posts
            </h2>
            <TabsList>
              <TabsTrigger value={PostStatus.PUBLISHED}>Published</TabsTrigger>
              <TabsTrigger value={PostStatus.DRAFT}>Draft</TabsTrigger>
            </TabsList>
          </div>
          <Input
            className="w-full border-0 focus-visible:ring-transparent"
            type="text"
            placeholder="Search by title, keyword, tag or whatever you want"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <hr className="mb-2" />

          <TabsContent value={PostStatus.PUBLISHED}>
            <PostsGrid fetchMoreData={fetchMoreData} />
          </TabsContent>
          <TabsContent value={PostStatus.DRAFT}>
            <PostsGrid fetchMoreData={fetchMoreData} />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
