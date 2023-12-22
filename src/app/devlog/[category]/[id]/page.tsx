import { formatCategoryForUI, getPostData } from "../../../../../lib/posts";
import { Divider, MainContents } from "@/components/common";
import {
  AdjacentPostButton,
  EmptyBlogMessage,
  PostHeader,
} from "@/components/devlog";
import Comments from "@/components/devlog/Comments";
import Image from "next/image";

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
    modifiedHtmlContent,
  } = await getPostData(params.category, params.id);

  console.log("🐋", thumbnail);

  return (
    <MainContents>
      <div className="flex h-full w-full flex-col content-center items-center gap-2 p-3 sm:p-10 lg:w-[50%]">
        <div className="w-full">
          <PostHeader
            title={title}
            date={date}
            tags={tags}
            category={formatCategoryForUI(params.category)}
          />
        </div>
        {thumbnail && (
          <div className="relative h-[500px] w-full overflow-hidden rounded-md">
            <Image
              src={thumbnail}
              alt={`${title} post thumbnail`}
              layout="fill"
              className="object-cover"
              quality={100}
            />
          </div>
        )}
        {modifiedHtmlContent !== EMPTY_HTML_STRING ? (
          <div
            className="blog"
            dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
          />
        ) : (
          <EmptyBlogMessage />
        )}
        {(nextPost || prevPost) && (
          <div className="mt-10 flex w-full flex-col gap-1">
            <div className="flex h-full w-full items-center justify-center gap-2 rounded-sm py-1 sm:gap-5">
              <AdjacentPostButton direction="previous" postData={prevPost} />
              <AdjacentPostButton direction="next" postData={nextPost} />
            </div>
          </div>
        )}
        <Divider />
        <Comments />
      </div>
    </MainContents>
  );
}
