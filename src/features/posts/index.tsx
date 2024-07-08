import Header from "./components/header";
import PostsGrid from "@/shared/components/posts-grid";
import { myPosts } from "./mocks/posts.mock";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PostsContainer() {
  return (
    <div className="container">
      <Header />
      <section className="mb-8">
        <Tabs defaultValue="published">
          <div className="flex justify-between">
            <h2 className="scroll-m-20 mb-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              My Posts
            </h2>{" "}
            <TabsList>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>
          </div>
          <Input
            className="w-full border-0 focus-visible:ring-transparent"
            type="text"
            placeholder="Search by title, keyword, tag or whatever you want"
          />
          <hr className="mb-2" />

          <TabsContent value="published">
            <PostsGrid posts={myPosts} />
          </TabsContent>
          <TabsContent value="draft">Change your password here.</TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
