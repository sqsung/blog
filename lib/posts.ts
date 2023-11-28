import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { load } from "cheerio";
import hljs from "highlight.js";
import remarkGfm from "remark-gfm";
import { PostData } from "global";

const postsDirectory = path.join(process.cwd(), "posts");

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);

export async function getLatestTenPostsData() {
  const categories = fs.readdirSync(postsDirectory);
  const allPosts: PostData[] = [];

  categories.map((category) => {
    const filePath = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(filePath);

    const fullPaths = fileNames.map((file) => {
      return path.join(filePath, file);
    });

    fullPaths.forEach((path) => {
      const fileContent = fs.readFileSync(path, "utf8");
      const matterResult = matter(fileContent);
      const id = path.split("/").at(-1)?.replace(/\.md$/, "");

      const post = {
        ...matterResult.data,
        category,
        id,
      } as PostData;

      allPosts.push(post);
    });
  });

  return allPosts
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
    .splice(0, 10);
}

export async function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: { id: fileName.replace(/\.md$/, "") },
    };
  });
}

/**
 * Grabs a single Post Data by Id
 * @param id id of the target blog
 * @returns the HTML content of the blog as well as its meta data
 */
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .process(matterResult.content);

  const stringContent = processedContent.toString();

  // Replace tags that need classes to be styled properly using cheerio library
  const htmlContent = load(stringContent);

  // - replace <blockquote> with <div className="quote">
  htmlContent("blockquote").each((index, element) => {
    const quote = htmlContent(element);
    const div = htmlContent("<div>").addClass("quote");
    div.html(quote.html() as string);
    quote.replaceWith(div);
  });

  // - apply syntax highlights to <pre><code[language-..] with highlight.js
  htmlContent('pre code[class^="language-"]').each((index, element) => {
    const codeBlock = htmlContent(element);
    const code = codeBlock.text();
    const language = codeBlock.attr("class")?.replace("language-", ""); // Remove the "language-" prefix
    const highlightedCode = hljs.highlight(language as string, code).value;
    codeBlock.html(highlightedCode);
  });

  // - add ".noncode" class to non-language codes (for styling purposes)
  htmlContent("p code").each((index, element) => {
    const codeBlock = htmlContent(element);
    const code = codeBlock.html();
    const span = htmlContent("<span>").addClass("noncode");
    span.html(code as string);
    codeBlock.replaceWith(span);
  });

  const modifiedHtmlContent = htmlContent.html();

  return {
    id,
    modifiedHtmlContent,
    ...(matterResult.data as {
      title: string;
      date: string;
      thumbnail: string;
      description: string;
      category: string;
      tags: string[];
    }),
  };
}

export async function getCategories() {
  const allCategories = fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .filter((file) => !file.includes(".md"));

  return allCategories;
}

getCategories();
