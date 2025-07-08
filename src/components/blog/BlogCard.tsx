"use client";

import { BlogMetadata } from "@/types/blog.types";
import Tag from "./Tag";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes.constant";

interface BlogCardProps {
  metadata: BlogMetadata;
}

const BlogCard = ({ metadata }: BlogCardProps) => {
  const router = useRouter();

  return (
    <li className="border-b-primary border-b first-of-type:border-y">
      <div className="flex flex-col gap-3 py-8 lg:flex-row lg:gap-5">
        <p className="text-t-subtle me-10 mt-3 flex-shrink-0 tracking-wide">
          {metadata.createdAt}
        </p>

        <div className="flex w-full flex-col gap-5">
          <button
            className="group lg:hover:bg-background-secondary transcolor flex cursor-pointer flex-col gap-3 rounded-xl pt-3 pb-8 lg:px-5"
            onClick={() => router.push(ROUTES.post(metadata.id))}
          >
            <p className="transcolor text-start text-2xl font-bold max-lg:group-hover:text-violet-500">
              {metadata.title}
            </p>
            <p className="text-t-subtle line-clamp-2 text-start text-ellipsis">
              {metadata.summary}
            </p>
          </button>

          {!!metadata.tags.length && (
            <ul className="flex gap-5 overflow-x-auto lg:ps-5">
              {metadata.tags.map((tag) => (
                <Tag tag={tag} key={tag} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
