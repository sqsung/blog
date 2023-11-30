import BlogListItem from "./BlogListItem";
import { getLatestTenPostsData } from "../../../lib/posts";
import Link from "next/link";

export default async function BlogList() {
  const latestTenPosts = await getLatestTenPostsData();

  return (
    <div className="mt-5 flex w-full flex-col justify-center gap-5 px-5 pb-10 sm:px-[10%] md:px-[15%]">
      <ul className="flex w-full flex-col justify-center gap-5">
        {latestTenPosts.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
      </ul>
      <Link
        href="/categories"
        className="flex justify-center gap-1 text-gray-500 transition hover:text-gray-700"
      >
        <span>See All Categories</span>
        <i className="bi bi-arrow-right" />
      </Link>
    </div>
  );
}
