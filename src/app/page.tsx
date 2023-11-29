import BlogList from "@/components/devlog/BlogList";
import { MainContents, AuthorProfile, MenuSelector } from "@/components/common";

export default function HomeDevlogPage() {
  return (
    <MainContents>
      <div className="w-full px-0 md:px-[15%]">
        <AuthorProfile />
        <section className="h-100 w-full flex-col items-center justify-center px-1">
          <BlogList />
        </section>
      </div>
    </MainContents>
  );
}
