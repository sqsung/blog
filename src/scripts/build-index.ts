import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { BlogIndex, BlogMetadata } from "@/types/blog.types";

const POSTS_PATH = path.join(process.cwd(), "src/contents");
const INDEX_FILE = path.join(
  process.cwd(),
  "src/contents/generated/_blog-index.json",
);
const COMPILED_POSTS_DIR = path.join(
  process.cwd(),
  "src/contents/generated/compiled",
);

const generateBlogIndexes = async () => {
  if (!fs.existsSync(COMPILED_POSTS_DIR)) {
    fs.mkdirSync(COMPILED_POSTS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(POSTS_PATH);
  const mdxOnly = files.filter((file) => file.endsWith(".mdx"));

  const posts: BlogMetadata[] = [];

  for (const mdx of mdxOnly) {
    const filePath = path.join(POSTS_PATH, mdx);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: metadata, content } = matter(raw);

    if (!metadata.isPublished) {
      continue;
    }

    const postId = mdx.replace(/\.mdx?$/, "");

    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    });

    const compiledPath = path.join(COMPILED_POSTS_DIR, `${postId}.json`);
    fs.writeFileSync(
      compiledPath,
      JSON.stringify({ metadata, mdxSource }, null, 2),
    );

    const post: BlogMetadata = {
      id: postId,
      title: metadata.title,
      summary: metadata.summary,
      tags: (metadata.tags || []).map((tag: string) => tag.toUpperCase()),
      createdAt: metadata.createdAt,
      isPublished: metadata.isPublished,
    };

    posts.push(post);
  }

  posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const tagToId: Record<string, string[]> = {};
  const tagCounts: Record<string, number> = {};
  const idToPost: Record<string, BlogMetadata> = {};

  for (const post of posts) {
    idToPost[post.id] = post;

    for (const tag of post.tags) {
      if (!tagToId[tag]) {
        tagToId[tag] = [];
      }

      tagToId[tag].push(post.id);
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const index: BlogIndex = {
    sortedPosts: posts,
    tagToId,
    tagCounts,
    idToPost,
    totalPosts: posts.length,
    totalTags: Object.keys(tagCounts).length,
    lastBuilt: new Date().toISOString(),
  };

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));

  console.log("✅ Blog index generated:", INDEX_FILE);
  console.log(`✅ ${posts.length} posts compiled to ${COMPILED_POSTS_DIR}`);
};

generateBlogIndexes();
