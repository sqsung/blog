import { getPostsByTag } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import PaginationButtons from "@/components/blog/PaginationButtons";
import { notFound } from "next/navigation";

interface TaggedPageProps {
  params: Promise<{
    tag: string;
    page: string;
  }>;
}

const TaggedPage = async ({ params }: TaggedPageProps) => {
  const { tag, page } = await params;
  const integerPage = +page;
  const upperCaseTag = tag.toUpperCase();

  if (isNaN(integerPage) || !upperCaseTag) {
    notFound();
  }

  const { posts, totalPages } = getPostsByTag(upperCaseTag, integerPage);

  return (
    <>
      <BlogList title={upperCaseTag} subtitle={`Page ${page}`} blogs={posts} />
      <PaginationButtons page={integerPage} totalPages={totalPages} />
    </>
  );
};

export default TaggedPage;
