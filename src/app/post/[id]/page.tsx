import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Tag from "@/components/blog/Tag";
import { Blog, BlogMetadata } from "@/types/blog.types";
import Divider from "@/components/common/Divider";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";

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
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">{metadata.title}</h1>
          <h2 className="text-t-subtle text-lg">{metadata.summary}</h2>
        </div>
      </div>

      <Divider />

      <div className="flex gap-5">
        <div className="border-b-primary flex flex-shrink-0 flex-col gap-10 border-e pe-10">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-[50px] overflow-hidden rounded-full">
              <Image
                src="/images/blog_profile.jpeg"
                fill
                alt="Author Profile Picture"
              />
            </div>
            <div>
              <p className="text-t-subtle text-sm">sqsung</p>
              <p className="text-t-subtle text-sm">{metadata.createdAt}</p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-5">
            <p className="text-t-subtle text-sm">TAGS</p>
            <ul>
              {metadata.tags.map((tag) => (
                <Tag tag={tag} key={tag} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-lg">
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
