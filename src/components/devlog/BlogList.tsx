import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
  const allPostsData = await getSortedPostsData();

  return (
    <div>
      <div>
        <p className="title w-full text-center">Recent Posts:</p>
      </div>
      <ul className="mt-2 flex flex-col">
        {allPostsData.map((metaData) => (
          <BlogListItem key={metaData.id} {...metaData} />
        ))}
      </ul>
    </div>
  );
}
