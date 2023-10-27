import { getSortedPostsData } from "../../../lib/posts";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
  const allPostsData = await getSortedPostsData();

  return (
    <ul className=" my-10 flex flex-col">
      {allPostsData.map((metaData) => (
        <BlogListItem key={metaData.id} {...metaData} />
      ))}
    </ul>
  );
}
