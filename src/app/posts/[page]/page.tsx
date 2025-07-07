import { getLatestPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import { notFound } from "next/navigation";

interface PostsPageProps {
  params: {
    page: string;
  };
}

const PostsPage = ({ params }: PostsPageProps) => {
  const integerPage = +params.page;

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
