import BlogList from "@/components/devlog/BlogList";
import { MainContents, AuthorProfile } from "@/components/common";
import { getLatestTenPostsData } from "../../lib/posts";

export default async function HomeDevlogPage() {
  const latestTenPosts = await getLatestTenPostsData();

  return (
    <MainContents>
      <div className="flex w-full flex-col items-center">
        <AuthorProfile />
        <section className="h-100 w-full max-w-[1800px] flex-col items-center justify-center">
          <BlogList blogs={latestTenPosts} />
        </section>
      </div>
    </MainContents>
  );
}
