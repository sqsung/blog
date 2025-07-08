import { getLatestPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import { notFound } from "next/navigation";

interface PostsPageProps {
  params: Promise<{
    page: string;
  }>;
}

const PostsPage = async ({ params }: PostsPageProps) => {
  const { page } = await params;
  const integerPage = +page;

  if (isNaN(integerPage)) {
    notFound();
  }

  const posts = getLatestPosts(integerPage);

  return (
    <BlogList
      title="All Posts"
      subtitle={`Page ${integerPage}`}
      blogs={posts}
    />
  );
};

export default PostsPage;
