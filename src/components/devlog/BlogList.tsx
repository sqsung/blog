import { getLatestTenPostsData } from "../../../lib/posts";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
  const allPostsData = await getLatestTenPostsData();

  return (
    <div className="mt-5 w-full justify-center px-0 sm:flex sm:px-[15%]">
      {/* <div>
        <p className="title w-full text-center">Recent Posts:</p>
      </div> */}
      <ul className="grid w-full grid-cols-2 flex-col gap-5 sm:flex  sm:justify-center ">
        {allPostsData.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
      </ul>
    </div>
  );
}
