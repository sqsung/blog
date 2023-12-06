import { getPostData } from "../../../../../lib/posts";
import { Divider, MainContents } from "@/components/common";
import { EmptyBlogMessage, PostHeader } from "@/components/devlog";
import Comments from "@/components/devlog/Comments";

const EMPTY_HTML_STRING = "<html><head></head><body></body></html>";

interface PostProps {
  params: {
    id: string;
    category: string;
  };
}

export default async function Post({ params }: PostProps) {
  const { title, date, modifiedHtmlContent, tags } = await getPostData(
    params.category,
    params.id,
  );

  return (
    <MainContents>
      <div className="flex h-full w-full flex-col content-center items-center gap-2 p-3 sm:gap-10 sm:p-10 lg:w-[60%]">
        <div className="w-full">
          <PostHeader
            title={title}
            date={date}
            tags={tags}
            category={params.category}
          />
        </div>
        {modifiedHtmlContent !== EMPTY_HTML_STRING ? (
          <div
            className="blog"
            dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
          />
        ) : (
          <EmptyBlogMessage />
        )}
        <Divider />
        <Comments />
      </div>
    </MainContents>
  );
}
