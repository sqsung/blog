import BlogList from "@/components/devlog/BlogList";
import {
  AuthorProfile,
  MainContents,
  MostRecentBlogItem,
} from "@/components/common";
import { getLatestTenPostsData } from "../../lib/posts";

export default async function HomeDevlogPage() {
  const latestTenPosts = await getLatestTenPostsData();
  const mostRecentBlog = latestTenPosts[0];
  const remainingBlogs = latestTenPosts.slice(1, 10);

  return (
    <MainContents>
      <div className="flex w-full flex-col items-center sm:px-[15%]">
        <section className="flex w-full max-w-[1800px] flex-col items-center justify-center gap-12 py-10">
          <AuthorProfile />
          <MostRecentBlogItem blog={mostRecentBlog} />
          <BlogList blogs={remainingBlogs} />
        </section>
      </div>
    </MainContents>
  );
}
