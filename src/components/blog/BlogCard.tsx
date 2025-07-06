"use client";

import { BlogMetadata } from "@/types/blog.types";
import Tag from "./Tag";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  metadata: BlogMetadata;
}

const BlogCard = ({ metadata }: BlogCardProps) => {
  const router = useRouter();

  return (
    <li className="border-b-primary border-b first-of-type:border-y">
      <div className="flex cursor-pointer flex-row gap-5 py-8">
        <p className="text-t-subtle me-10 mt-3 flex-shrink-0 tracking-wide">
          {metadata.createdAt}
        </p>

        <div className="flex w-full flex-col gap-5">
          <button
            className="hover:bg-background-secondary transcolor flex flex-col gap-3 rounded-xl px-5 pt-3 pb-8"
            onClick={() => router.push(`/post/${metadata.id}`)}
          >
            <p className="text-start text-2xl font-bold">{metadata.title}</p>
            <p className="text-t-subtle text-start">{metadata.summary}</p>
          </button>

          {!!metadata.tags.length && (
            <ul className="flex gap-5 ps-5">
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
