import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Blog, BlogMetadata } from "@/types/blog.types";
import Divider from "@/components/common/Divider";
import BackButton from "@/components/common/BackButton";
import BlogPostData from "@/components/blog/BlogPostData";

interface PostPageProps {
  params: {
    id: string;
  };
}

const getPostById = async (id: string): Promise<Blog | null> => {
  try {
    const filepath = path.join(process.cwd(), "/src/contents", `${id}.mdx`);
    const fileContents = fs.readFileSync(filepath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      metadata: data as BlogMetadata,
      content,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
