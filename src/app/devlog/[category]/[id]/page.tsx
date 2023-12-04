import { getPostData } from "../../../../../lib/posts";
import { MainContents } from "@/components/common";
import { EmptyBlogMessage, PostHeader } from "@/components/devlog";

const emptyHTMLString = "<html><head></head><body></body></html>";

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
          <PostHeader title={title} date={date} tags={tags} />
        </div>
        {modifiedHtmlContent !== emptyHTMLString ? (
          <div
            className="blog"
            dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
          />
        ) : (
          <EmptyBlogMessage />
        )}
      </div>
    </MainContents>
  );
}
