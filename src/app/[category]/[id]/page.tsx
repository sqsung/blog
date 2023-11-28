import { getPostData } from "../../../../lib/posts";
import PostHeader from "@/components/devlog/PostHeader";
import { MainContents, BackButton } from "@/components/common";

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
      <div className="flex h-full w-[80%] flex-col content-center items-center gap-10 p-10">
        <div className="w-full">
          <BackButton />
          <PostHeader title={title} date={date} tags={tags} />
        </div>
        <div
          className="blog"
          dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
        />
      </div>
    </MainContents>
  );
}
