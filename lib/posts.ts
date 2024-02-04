import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { load } from "cheerio";
import hljs from "highlight.js";
import remarkGfm from "remark-gfm";
import { PostData } from "global";
import { PAGE_SIZE } from "@/utils/constants";

const postsDirectory = path.join(process.cwd(), "posts");
const thumbnailDirectory = path.join(process.cwd(), "public/images");

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);

function getThumbnail(category: string, id?: string) {
  if (id) {
    const imagesDirectory = path.join(thumbnailDirectory, `${category}/${id}`);

    if (!fs.existsSync(imagesDirectory)) return "/__placeholder_thumbnail.png";

    const files = fs.readdirSync(imagesDirectory);

    for (const file of files) {
      if (file.includes("__thumbnail"))
        return `/images/${category}/${id}/${file}`;
    }

    if (files.length) return `/images/${category}/${id}/${files[0]}`;
  } else {
    const categoryDirectory = path.join(thumbnailDirectory, `${category}`);
    const folders = fs.readdirSync(categoryDirectory);
    const firstPostDirectory = path.join(
      thumbnailDirectory,
      `${category}/${folders[0]}`,
    );
    const firstPostFiles = fs.readdirSync(firstPostDirectory);

    for (const file of firstPostFiles) {
      if (file.includes("__thumbnail"))
        return `${firstPostDirectory.split("public")[1]}/${file}`;
    }

    if (firstPostFiles.length)
      return `/images/${category}/${folders[0]}/${firstPostFiles[0]}`;
  }

  return "/__placeholder_thumbnail.png";
}

/**
 * Fetches the ten latests posts in an uncategorized manner
 * @returns Array of ten latest posts
 */
export async function getLatestPosts() {
  const categories = fs.readdirSync(postsDirectory);
  const allPosts: PostData[] = [];

  categories.map((category) => {
    const filePath = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(filePath);

    const fullPaths = fileNames.map((file) => {
      return path.join(filePath, file);
    });

    fullPaths.forEach((fullPath) => {
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContent);
      const id = fullPath.split("/").at(-1)?.replace(/\.md$/, "");
      const thumbnail = getThumbnail(category, id!);

      if (matterResult.data.isPublished) {
        allPosts.push({
          ...matterResult.data,
          category,
          id,
          thumbnail,
        } as PostData);
      }
    });
  });

  return allPosts
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    })
    .splice(0, 12);
}

/**
 * Returns data of a single blog post by its cateogry/id
 * @param category category of the target blog post
 * @param id id of the target blog post
 * @returns the HTML content of the blog as well as its meta data
 */
export async function getPostData(categoryName: string, id: string) {
  const category = formatCategoryForServer(categoryName);
  const { prevPost, nextPost } = await getAdjacentPosts(category, id);
  const fullPath = path.join(postsDirectory, `${category}/${id}.md`);
  const thumbnail = getThumbnail(category, id);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .process(matterResult.content);

  const stringContent = processedContent.toString();

  // Replace tags that need classes to be styled properly using cheerio library
  const htmlContent = load(stringContent);

  // replace <blockquote> with <div className="quote">
  htmlContent("blockquote").each((_, element) => {
    const quote = htmlContent(element);
    const div = htmlContent("<div>").addClass("quote");
    div.html(quote.html() as string);
    quote.replaceWith(div);
  });

  // apply syntax highlights to <pre><code[language-..] with highlight.js
  htmlContent('pre code[class^="language-"]').each((_, element) => {
    const codeBlock = htmlContent(element);
    const code = codeBlock.text();
    const language = codeBlock.attr("class")?.replace("language-", ""); // Remove the "language-" prefix
    const highlightedCode = hljs.highlight(language as string, code).value;
    codeBlock.html(highlightedCode);
  });

  // add ".noncode" class to non-language codes (for styling purposes)
  htmlContent("p code").each((_, element) => {
    const codeBlock = htmlContent(element);
    const code = codeBlock.html();
    const span = htmlContent("<span>").addClass("noncode");
    span.html(code as string);
    codeBlock.replaceWith(span);
  });

  // wraps img tags in a div with blog-image-wrapper class
  htmlContent("img").each((_, element) => {
    const img = htmlContent(element);
    const wrapper = htmlContent("<div>").addClass("blog-image-wrapper");
    const imageId = img.attr("src");

    if (!imageId?.includes("https://")) {
      const newSrc = `/images/${category}/${id}/${imageId}`;
      img.attr("src", newSrc);
    }

    img.wrap(wrapper);
  });

  const modifiedHtmlContent = htmlContent.html();

  return {
    modifiedHtmlContent,
    prevPost,
    nextPost,
    ...(matterResult.data as PostData),
    thumbnail: thumbnail === "/thumbnails/placeholder.png" ? null : thumbnail,
  };
}

/**
 * Fetches the ids of a posts adjacent (prev/next) to a target post
 * @param category category the post is located in
 * @param targetId id of the post that is being read
 * @returns (object) prevPost: data of the previous post, nextPost: data of the nextPostsId
 */
export async function getAdjacentPosts(category: string, targetId: string) {
  const adjacentPosts: {
    prevPost: null | PostData;
    nextPost: null | PostData;
  } = {
    prevPost: null,
    nextPost: null,
  };

  const sortedPosts = await getAllPostsByCategory(category);

  for (let i = 0; i < sortedPosts.length; i += 1) {
    if (targetId !== sortedPosts[i].id) continue;

    const prev = i === 0 ? null : sortedPosts[i - 1];
    const next = i + 1 === sortedPosts.length ? null : sortedPosts[i + 1];

    adjacentPosts.prevPost = prev;
    adjacentPosts.nextPost = next;

    break;
  }

  return adjacentPosts;
}

/**
 * Fetches all the categories (directories in sides /posts)
 * @returns an Array<string> of all the categories in it
 */
export async function getCategories() {
  const allCategories = fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .filter((file) => !file.includes(".md"));

  return allCategories;
}

/**
 * Fetches category specific information
 * @param category name of the target category
 * @returns (object) numberOfPosts: total num of posts inside target category / categoryThumbnail: uri string of the default thumbnail of target category, lastUpdateAt: date of latest publish
 */
export async function getCategoryData(categoryName: string) {
  const category = formatCategoryForServer(categoryName);
  const categoryPath = path.join(postsDirectory, category);
  const fileNames = fs.readdirSync(categoryPath);

  const fullPaths: string[] = [];
  let lastUpdatedAt: string | null = null;

  fileNames.map((fileName) => {
    const fullPath = path.join(categoryPath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContent);

    if (matterResult.data.isPublished) {
      fullPaths.push(fullPath);

      const publishedDate = matterResult.data.date;
      if (!lastUpdatedAt || publishedDate > lastUpdatedAt) {
        lastUpdatedAt = publishedDate;
      }
    }
  });

  const categoryThumbnail = getThumbnail(category);

  return {
    numberOfPosts: fullPaths.length,
    categoryThumbnail,
    lastUpdatedAt,
  };
}

/**
 * Fetches posts of a single target category
 * @param category name of the target category
 * @param page page number the user is on
 * @returns (object) totalPages: number of pages in target category / categorizedPosts: array of posts that belong to the category / totalPosts: number of posts in the category
 */
export async function getPostsByCategory(categoryName: string, page: number) {
  const category = formatCategoryForServer(categoryName);
  const filePath = path.join(postsDirectory, category);
  const fileNames = fs.readdirSync(filePath);
  const categorizedPosts: PostData[] = [];

  const startPoint = 1 + PAGE_SIZE * page - PAGE_SIZE;
  const endPoint = PAGE_SIZE * page;
  const fullPaths: string[] = [];

  fileNames.map((fileName) => {
    const fullPath = path.join(filePath, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContent);

    if (matterResult.data.isPublished) {
      fullPaths.push(fullPath);
    }
  });

  for (let i = startPoint; i <= endPoint; i++) {
    const currentPath = fullPaths[i - 1];

    if (!currentPath) break;

    const fileContent = fs.readFileSync(currentPath, "utf8");
    const matterResult = matter(fileContent);
    const id = currentPath.split("/").at(-1)?.replace(/\.md$/, "");
    const thumbnail = getThumbnail(category, id);

    categorizedPosts.push({
      ...matterResult.data,
      thumbnail,
      category,
      id,
    } as PostData);
  }

  return {
    totalPages: Math.ceil(fileNames.length / PAGE_SIZE),
    categorizedPosts,
    totalPosts: fullPaths.length,
  };
}

/**
 * Fetches every post in a category, sorted by date of publication (latest to oldest)
 * @param category Target category
 * @returns Array of posts that belong to target category
 */
export async function getAllPostsByCategory(category: string) {
  const filePath = path.join(postsDirectory, category);
  const fileNames = fs.readdirSync(filePath);
  const allPosts: PostData[] = [];

  const fullPaths = fileNames.map((file) => {
    return path.join(filePath, file);
  });

  fullPaths.forEach((fullPath, index) => {
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContent);

    const id = fileNames[index].replace(/\.md$/, "");

    const thumbnailPath = path.join(
      thumbnailDirectory,
      `${category}/posts/${id}.jpg`,
    );

    const thumbnail = fs.existsSync(thumbnailPath)
      ? thumbnailPath.split("public")[1]
      : `/thumbnails/${category}/default.png`;

    if (matterResult.data.isPublished) {
      allPosts.push({
        id,
        thumbnail,
        category,
        ...matterResult.data,
      } as PostData);
    }
  });

  return allPosts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

/**
 * @param category name of category to be formatted
 * @returns if category includes '-', returns category name with all dashes replaced with a sapce, and vice versa.
 */
export function formatCategoryForServer(category: string) {
  return category.replaceAll("%20", " ").replaceAll(" ", "_");
}

export function formatCategoryForUI(category: string) {
  return category.replaceAll("_", " ").replaceAll("%20", " ");
}
