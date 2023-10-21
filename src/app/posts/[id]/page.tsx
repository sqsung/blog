import Head from "next/head";
import { getPostData } from "../../../../lib/posts";

interface PostProps {
  params: { id: string };
}

export default async function Post({ params }: PostProps) {
  const postData = await getPostData(params.id);

  return (
    <div className="flex h-screen flex-col content-center items-center gap-10 p-10">
      <h1 className="text-3xl">{postData.title}</h1>
      <p className="text-gray-400">{postData.date.toString()}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
    </div>
  );
}
