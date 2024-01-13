import { formatCategoryForUI, getPostData } from "../../../../../lib/posts";
import { Divider, MainContents } from "@/components/common";
import Comments from "@/components/devlog/Comments";
import {
  AdjacentButtonsWrapper,
  EmptyBlogMessage,
  PostHeader,
  SideAuthorProfile,
} from "@/components/devlog";

const EMPTY_HTML_STRING = "<html><head></head><body></body></html>";

interface PostProps {
  params: {
    id: string;
    category: string;
  };
}

export default async function Post({ params }: PostProps) {
  const {
    title,
    date,
    tags,
    prevPost,
    nextPost,
    thumbnail,
    description,
    modifiedHtmlContent,
  } = await getPostData(params.category, params.id);

  return (
    <MainContents>
      <div className="relative flex h-full w-full max-w-[800px] flex-col content-center items-center gap-2 p-3 sm:p-10 lg:w-[50%]">
        <SideAuthorProfile date={date} />
        <PostHeader
          title={title}
          tags={tags}
          category={formatCategoryForUI(params.category)}
          thumbnail={thumbnail}
          description={description}
        />
        {modifiedHtmlContent !== EMPTY_HTML_STRING ? (
          <div
            className="blog"
            dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
          />
        ) : (
          <EmptyBlogMessage />
        )}
        {(nextPost || prevPost) && (
          <AdjacentButtonsWrapper nextPost={nextPost} prevPost={prevPost} />
        )}
        <Divider />
        <Comments />
      </div>
    </MainContents>
  );
}
