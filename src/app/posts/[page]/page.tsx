import { getAllPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import PaginationButtons from "@/components/blog/PaginationButtons";
import { POST_TTL } from "@/constants/posts.constant";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PostsPageProps {
  params: Promise<{
    page: string;
  }>;
}

export const revalidate = POST_TTL;

export const generateStaticParams = async () => {
  const { totalPages } = getAllPosts(1);
  const limit = totalPages < 10 ? totalPages : 10;

  return Array.from({ length: limit }, (_, i) => ({
    page: (i + 1).toString(),
  }));
};

export const generateMetadata = async ({
  params,
}: PostsPageProps): Promise<Metadata> => {
  const { page } = await params;
  return { title: `All posts (${page})` };
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
