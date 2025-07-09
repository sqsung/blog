import path from "path";
import fs from "fs/promises";
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
  const totalPages = Math.ceil(blogIndex.totalPosts / POSTS_PER_PAGE);

  return {
    start,
    end,
    totalPages,
  };
};

export const getAllPosts = (page: number) => {
  const { start, end, totalPages } = getPaginationValues(page);
  const posts = blogIndex.sortedPosts.slice(start, end);

  return {
    posts,
    totalPages,
  };
};

export const getPostMetadataById = (postId: string) => {
  return blogIndex.idToPost[postId];
};

export const getPostById = async (postId: string) => {
  try {
    const filepath = path.join(POSTS_PATH, `${postId}.mdx`);
    const fileContents = await fs.readFile(filepath, "utf8");
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
  const { start, end, totalPages } = getPaginationValues(page);
  const taggedIds = blogIndex.tagToId[tag.toUpperCase()]?.slice(start, end);

  if (!taggedIds || !taggedIds.length) {
    return { posts: [], totalPages: 1 };
  }

  const posts: BlogMetadata[] = [];

  for (const id of taggedIds) {
    const post = blogIndex.idToPost[id];

    if (!post) {
      continue;
    }

    posts.push(post);
  }

  return { posts, totalPages };
};

export const getTags = () => {
  return blogIndex.tagCounts;
};
