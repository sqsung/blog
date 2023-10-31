import { getPostData } from "../../../lib/posts";
import PostHeader from "@/components/devlog/PostHeader";
import { PageWrapper, BackButton } from "@/components/common";

interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const { title, date, modifiedHtmlContent, tags } = await getPostData(
    params.id,
  );

  return (
    <PageWrapper>
      <div className="flex h-full flex-col content-center items-center gap-10 p-10">
        <BackButton />
        <PostHeader title={title} date={date} tags={tags} />
        <div
          className="blog"
          dangerouslySetInnerHTML={{ __html: modifiedHtmlContent }}
        />
      </div>
    </PageWrapper>
  );
}
