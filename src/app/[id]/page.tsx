import { getPostData } from "../../../lib/posts";
import PostHeader from "@/components/devlog/PostHeader";

interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const { title, date, htmlContent } = await getPostData(params.id);

  return (
    <div className="flex h-full flex-col content-center items-center gap-10 p-10">
      <PostHeader title={title} date={date} />
      <div className="blog" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
