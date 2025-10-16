import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import Divider from "@/components/common/Divider";
import BackButton from "@/components/common/BackButton";
import BlogPostData from "@/components/blog/BlogPostData";
import { getPostById, getPostMetadataById } from "@/backend/posts.server";
import { Metadata } from "next";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { id } = await params;
  const blog = getPostMetadataById(id);

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: ["/images/blog_profile.jpeg"],
    },
  };
};

export const revalidate = 86400;

const PostPage = async ({ params }: PostPageProps) => {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const { metadata, mdxSource } = post;

  return (
    <article className="flex flex-col gap-5">
      <BackButton />
      <div className="mb-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold lg:text-4xl">{metadata.title}</h1>
          <p className="text-t-subtle text-base lg:text-lg">
            {metadata.summary}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-5 lg:flex-row">
        <BlogPostData createdAt={metadata.createdAt} tags={metadata.tags} />
        <Divider direction="vertical" />
        <BlogContentRenderer content={mdxSource} />
      </div>
    </article>
  );
};

export default PostPage;
