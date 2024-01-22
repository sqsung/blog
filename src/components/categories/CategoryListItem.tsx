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
      className="i-hover-up regular-text t-hover-blue mx-auto flex h-60 w-[90%] flex-col gap-2 overflow-hidden rounded-md sm:h-80"
    >
      <div className="relative h-[50%] min-h-[150px] overflow-hidden rounded-lg sm:max-h-[200px] sm:min-h-[200px]">
        <Image
          src={categoryThumbnail!}
          alt="Category Thumbnail"
          layout="fill"
          className="w-full object-cover"
          quality={75}
        />
      </div>
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
