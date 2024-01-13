import Image from "next/image";
import { formatCategoryForUI, getCategoryData } from "../../../lib/posts";
import Link from "next/link";
import { formatDate } from "@/utils/format";

interface CategoryListItemProps {
  category: string;
}

export default async function CategoryListItem({
  category,
}: CategoryListItemProps) {
  const { numberOfPosts, categoryThumbnail, lastUpdatedAt } =
    await getCategoryData(category);

  return (
    <Link
      href={`/${category}/1`}
      className="i-hover-up regular-text t-hover-blue mx-auto flex h-80 w-[90%] flex-col gap-2 overflow-hidden rounded-md"
    >
      <Image
        src={categoryThumbnail!}
        alt="Category Thumbnail"
        width={200}
        height={200}
        className="h-[70%] w-full rounded-lg object-cover"
        quality={100}
      />
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold sm:text-lg">
          {formatCategoryForUI(category)}
        </p>
        <div>
          <p className="subtle-text gap-1 text-sm">
            {numberOfPosts} Post{numberOfPosts > 1 ? "s" : ""}
            {lastUpdatedAt && <p>Last Update: {formatDate(lastUpdatedAt)}</p>}
          </p>
        </div>
      </div>
    </Link>
  );
}
