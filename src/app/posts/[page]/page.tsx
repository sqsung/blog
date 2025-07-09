import { getAllPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import PaginationButtons from "@/components/blog/PaginationButtons";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostsPageProps {
  params: Promise<{
    page: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: PostsPageProps): Promise<Metadata> => {
  const { page } = await params;

  return {
    title: `All posts (${page})`,
  };
};

const PostsPage = async ({ params }: PostsPageProps) => {
  const { page } = await params;
  const integerPage = +page;

  if (isNaN(integerPage)) {
    notFound();
  }

  const { posts, totalPages } = getAllPosts(integerPage);

  return (
    <>
      <BlogList
        title="All Posts"
        subtitle={`Page ${integerPage}`}
        blogs={posts}
      />
      <PaginationButtons
        page={integerPage}
        totalPages={totalPages}
        baseURL="/posts"
      />
    </>
  );
};

export default PostsPage;
