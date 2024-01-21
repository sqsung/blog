import BlogList from "@/components/devlog/BlogList";
import { MainContents, MostRecentBlogItem } from "@/components/common";
import { getLatestTenPostsData } from "../../lib/posts";

export default async function HomeDevlogPage() {
  const latestTenPosts = await getLatestTenPostsData();
  const mostRecentBlog = latestTenPosts[0];
  const remainingBlogs = latestTenPosts.slice(1, 10);

  return (
    <MainContents>
      <div className="flex w-full flex-col items-center">
        <section className="flex w-full max-w-[1800px] flex-col items-center justify-center gap-10">
          <MostRecentBlogItem blog={mostRecentBlog} />
          <BlogList blogs={remainingBlogs} />
        </section>
      </div>
    </MainContents>
  );
}
