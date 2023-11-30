import BlogListItem from "./BlogListItem";
import Link from "next/link";
import { PostData } from "global";

interface BlogListProps {
  blogs: PostData[];
  isOnMain?: boolean;
}

export default function BlogList({ blogs, isOnMain = true }: BlogListProps) {
  return (
    <div className="mt-5 flex w-full flex-col justify-center gap-5 px-5 pb-10 sm:px-[10%] md:px-[15%]">
      <ul className="flex w-full flex-col justify-center gap-5">
        {blogs.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
      </ul>
      {isOnMain && (
        <Link
          href="/categories"
          className="flex justify-center gap-1 text-gray-500 transition hover:text-gray-700"
        >
          <span>Read More</span>
          <i className="bi bi-arrow-right" />
        </Link>
      )}
    </div>
  );
}
