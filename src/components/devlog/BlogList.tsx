import { getLatestTenPostsData } from "../../../lib/posts";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
  const allPostsData = await getLatestTenPostsData();

  return (
    <>
      {/* <div>
        <p className="title w-full text-center">Recent Posts:</p>
      </div> */}
      <div className="mt-5 w-full justify-center px-0 sm:flex sm:px-[15%]">
        <ul className="flex w-full flex-col justify-center gap-5">
          {allPostsData.map((metaData, index) => (
            <BlogListItem key={index} {...metaData} />
          ))}
        </ul>
      </div>
    </>
  );
}
