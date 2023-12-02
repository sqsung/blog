import BlogList from "@/components/devlog/BlogList";
import { MainContents, AuthorProfile } from "@/components/common";
import { getLatestTenPostsData } from "../../lib/posts";

export default async function HomeDevlogPage() {
  const latestTenPosts = await getLatestTenPostsData();

  return (
    <MainContents>
      <div className="w-full px-0 2xl:px-[15%]">
        <AuthorProfile />
        <section className="h-100 w-full flex-col items-center justify-center px-1">
          <BlogList blogs={latestTenPosts} />
        </section>
      </div>
    </MainContents>
  );
}
