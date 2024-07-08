import PostForm from "./components/post-form";

export default function PostContainer() {
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Story time! Tell us more about your interesting story
      </h2>
      <PostForm />
    </>
  );
}
