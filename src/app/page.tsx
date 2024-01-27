import BlogList from "@/components/devlog/BlogList";
import { AuthorProfile, MainContents } from "@/components/common";
import { getLatestPosts } from "../../lib/posts";

export default async function HomeDevlogPage() {
  const latestBlogPosts = await getLatestPosts();

  return (
    <MainContents>
      <div className="flex w-full flex-col items-center sm:px-[15%]">
        <section className="flex w-full max-w-[1800px] flex-col items-center justify-center gap-12 sm:py-10">
          <AuthorProfile />
          <BlogList blogs={latestBlogPosts} />
        </section>
      </div>
    </MainContents>
  );
}
