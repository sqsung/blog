import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogMetadata } from "@/types/blog.types";

const POSTS_PATH = path.join(process.cwd(), "src/contents");
const INDEX_FILE = path.join(process.cwd(), "src/contents/_blog-index.json");

interface BlogIndex {
  sortedPosts: BlogMetadata[];
  tagToId: Record<string, string[]>;
  tagCounts: Record<string, number>;
  idToPost: Record<string, BlogMetadata>;
  totalPosts: number;
  totalTags: number;
  lastBuilt: string;
}

const generateBlogIndexes = () => {
  const files = fs.readdirSync(POSTS_PATH);
  const mdxOnly = files.filter((file) => file.endsWith(".mdx"));

  const posts: BlogMetadata[] = [];

  for (const mdx of mdxOnly) {
    const filePath = path.join(POSTS_PATH, mdx);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data: metadata } = matter(raw);

    if (!metadata.isPublished) {
      continue;
    }

    const post: BlogMetadata = {
      id: mdx.replace(/\.mdx?$/, ""),
      title: metadata.title,
      summary: metadata.summary,
      category: metadata.category,
      tags: metadata.tags || [],
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
};

generateBlogIndexes();
