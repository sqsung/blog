import { getLatestTenPostsData, getSortedPostsData } from "../../../lib/posts";
import BlogListItem from "./BlogListItem";

export default async function BlogList() {
  const allPostsData = await getLatestTenPostsData();

  return (
    <div>
      <div>
        <p className="title w-full text-center">Recent Posts:</p>
      </div>
      <ul className="mt-2 flex flex-col">
        {allPostsData.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
        {/* {allPostsData.map((metaData, index) => {
          console.log(metaData);
          return <p key={index}>HiHiHiHiHi</p>;
        })} */}
      </ul>
    </div>
  );
}
