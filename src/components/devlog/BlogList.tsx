import BlogListItem from "./BlogListItem";
import { getLatestTenPostsData } from "../../../lib/posts";

export default async function BlogList() {
  const latestTenPosts = await getLatestTenPostsData();

  return (
    <div className="mt-5 w-full justify-center px-5 sm:px-[10%] md:px-[15%]">
      <ul className="flex w-full flex-col justify-center gap-5">
        {latestTenPosts.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
      </ul>
    </div>
  );
}
