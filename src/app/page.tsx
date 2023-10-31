import BlogList from "@/components/devlog/BlogList";
import { PageWrapper, AuthorProfile, MenuSelector } from "@/components/common";

export default function HomeDevlogPage() {
  return (
    <PageWrapper>
      <AuthorProfile />
      <section className="h-100 border-test w-full flex-col items-center justify-center px-5">
        <MenuSelector />
        <BlogList />
      </section>
    </PageWrapper>
  );
}
