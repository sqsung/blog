import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Divider from "@/components/common/Divider";
import BackButton from "@/components/common/BackButton";
import BlogPostData from "@/components/blog/BlogPostData";
import { getPostById } from "@/backend/posts.server";

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;

  return (
    <article className="flex flex-col gap-5">
      <BackButton />

      <div className="mb-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{metadata.title}</h1>
          <p className="text-t-subtle text-lg">{metadata.summary}</p>
        </div>
      </div>

      <Divider />

      <div className="flex gap-5">
        <BlogPostData createdAt={metadata.createdAt} tags={metadata.tags} />
        <Divider direction="vertical" />
        <div className="blog-post">
          <MDXRemote
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
