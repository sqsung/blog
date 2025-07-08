import { getPostsByTag } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
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

  const taggedPosts = getPostsByTag(upperCaseTag, integerPage);

  return (
    <BlogList
      title={upperCaseTag}
      subtitle={`Page ${page}`}
      blogs={taggedPosts}
    />
  );
};

export default TaggedPage;
