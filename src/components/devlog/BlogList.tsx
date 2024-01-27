import BlogListItem from "./BlogListItem";
import Link from "next/link";
import { PostData } from "global";

interface BlogListProps {
  blogs: PostData[];
  isOnMain?: boolean;
}

export default function BlogList({ blogs, isOnMain = true }: BlogListProps) {
  return (
    <div className="flex flex-col gap-10">
      <ul className="flex w-full flex-col gap-10 px-5 sm:grid sm:grid-cols-2 sm:px-0 ">
        {blogs.map((metaData, index) => (
          <BlogListItem key={index} {...metaData} />
        ))}
      </ul>
      {isOnMain && (
        <Link
          href="/categories"
          className="flex justify-center gap-1 sm:justify-end"
        >
          <span className="regular-text i-hover-up t-hover-gray gray-border rounded-md border px-5 py-2 text-sm">
            Read More <i className="bi bi-arrow-right" />
          </span>
        </Link>
      )}
    </div>
  );
}
