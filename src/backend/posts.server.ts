import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { BlogMetadata } from "@/types/blog.types";
import rawBlogIndex from "@/contents/generated/_blog-index.json";
import { BlogIndex } from "@/types/blog.types";
import { POSTS_PER_PAGE } from "@/constants/posts.constant";

const POSTS_PATH = path.join(process.cwd(), "/src/contents");
const blogIndex = rawBlogIndex as BlogIndex;

const getPaginationValues = (page: number) => {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return { start, end };
};

export const getLatestPosts = (page: number) => {
  const { start, end } = getPaginationValues(page);
  return blogIndex.sortedPosts.slice(start, end);
};

export const getPostById = (postId: string) => {
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

export const getPostsByTag = (tag: string, page: number) => {
  const { start, end } = getPaginationValues(page);
  const taggedIds = blogIndex.tagToId[tag.toUpperCase()]?.slice(start, end);

  if (!taggedIds || !taggedIds.length) {
    return [];
  }

  const posts: BlogMetadata[] = [];

  for (const id of taggedIds) {
    const post = blogIndex.idToPost[id];

    if (!post) {
      continue;
    }

    posts.push(post);
  }

  return posts;
};

export const getTags = () => {
  return blogIndex.tagCounts;
};
