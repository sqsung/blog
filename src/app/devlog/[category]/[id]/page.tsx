import { formatCategoryForUI, getPostData } from "../../../../../lib/posts";
import { Divider, MainContents } from "@/components/common";
import {
  AdjacentPostButton,
  EmptyBlogMessage,
  PostHeader,
} from "@/components/devlog";
import Comments from "@/components/devlog/Comments";
import { formatDate } from "@/utils/format";
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
    description,
    modifiedHtmlContent,
  } = await getPostData(params.category, params.id);

  return (
    <MainContents>
      <div className="relative flex h-full w-full flex-col content-center items-center gap-2 p-3 sm:p-10 lg:w-[50%]">
        <div className="absolute left-[-200px] flex flex-col gap-3">
          <Image
            src="/blog_profile.jpeg"
            alt="Author profile image"
            width={75}
            height={75}
            className="max-h-[75px] rounded-full"
          />
          <div className="flex h-full flex-col justify-around">
            <p className="title-text font-bold">James K. Sohn</p>
            <p className="subtle-text text-sm">{formatDate(date)}</p>
          </div>
        </div>
        <div className="w-full">
          <PostHeader
            title={title}
            tags={tags}
            category={formatCategoryForUI(params.category)}
            thumbnail={thumbnail}
            description={description}
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
