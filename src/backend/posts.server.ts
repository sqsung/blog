import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { BlogMetadata } from "@/types/blog.types";

const POSTS_PATH = path.join(process.cwd(), "/src/contents");

export const getLatestPosts = async (limit = 10) => {
  try {
    const filenames = fs
      .readdirSync(POSTS_PATH)
      .filter((name) => name.endsWith(".mdx"))
      .sort()
      .reverse();

    const posts: BlogMetadata[] = [];

    for (const filename of filenames) {
      if (posts.length >= limit) {
        break;
      }

      const postId = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
      const { data } = matter(raw);

      const metadata = {
        id: postId,
        ...data,
      } as BlogMetadata;

      if (metadata.isPublished) {
        posts.push(metadata);
      }
    }

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
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

// export const getPostsByTag = async (tag: string) => {};

// export const getTags = async () => {};
