import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { load } from "cheerio";
import hljs from "highlight.js";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "posts");

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as {
        title: string;
        date: string;
        thumbnail: string;
        description: string;
        tags: string[];
      }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
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
      tags: string[];
    }),
  };
}
