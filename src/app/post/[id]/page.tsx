import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Divider from "@/components/common/Divider";
import BackButton from "@/components/common/BackButton";
import BlogPostData from "@/components/blog/BlogPostData";
import { getPostById, getPostMetadataById } from "@/backend/posts.server";
import Image from "next/image";
import { Metadata } from "next";

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

const PostPage = async ({ params }: PostPageProps) => {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

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
        <div className="blog-post">
          <MDXRemote
            components={{
              Image,
            }}
            source={content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default PostPage;
