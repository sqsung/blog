import { getPostsByTag } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import { notFound } from "next/navigation";

interface TaggedPageProps {
  params: {
    tag: string;
    page: string;
  };
}

const TaggedPage = ({ params }: TaggedPageProps) => {
  const { tag, page } = params;
  const integerPage = +page;
  const upperCaseTag = tag.toUpperCase();

  if (isNaN(integerPage) || !upperCaseTag) {
    notFound();
  }

  const taggedPosts = getPostsByTag(upperCaseTag, integerPage);

  return <BlogList title={tag} subtitle={`Page ${page}`} blogs={taggedPosts} />;
};

export default TaggedPage;
