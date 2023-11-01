import BlogList from "@/components/devlog/BlogList";
import { MainContents, AuthorProfile, MenuSelector } from "@/components/common";

export default function HomeDevlogPage() {
  return (
    <MainContents>
      <AuthorProfile />
      <section className="h-100 w-full flex-col items-center justify-center px-5">
        {/* <MenuSelector /> */}
        <BlogList />
      </section>
    </MainContents>
  );
}
