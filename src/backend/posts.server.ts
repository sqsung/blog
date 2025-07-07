import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { BlogMetadata } from "@/types/blog.types";
import blogIndex from "@/contents/_blog-index.json";
import { POSTS_PER_PAGE } from "@/constants/posts.constant";

const POSTS_PATH = path.join(process.cwd(), "/src/contents");

export const getPostsPaginated = async (page: number) => {
  const start = page * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return blogIndex.sortedPosts.slice(start, end);
};

export const getPostById = async (postId: string) => {
  try {
    const filepath = path.join(POSTS_PATH, `${postId}.mdx`);
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

export const getPostsByTag = async (tag: string) => {
  const taggedIds = blogIndex.tagToId[tag as keyof typeof blogIndex.tagToId];

  if (!taggedIds || !taggedIds.length) {
    return [];
  }

  const posts: BlogMetadata[] = [];

  for (const id of taggedIds) {
    const post = blogIndex.idToPost[id as keyof typeof blogIndex.idToPost];

    if (!post) {
      continue;
    }

    posts.push(post);
  }

  return posts;
};

export const getTags = async () => {
  return blogIndex.tagCounts;
};
