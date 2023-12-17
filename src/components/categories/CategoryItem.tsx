import Image from "next/image";
import { formatCategoryForUI, getCategoryData } from "../../../lib/posts";
import Link from "next/link";

interface CategoryItemProps {
  category: string;
}

export default async function CategoryItem({ category }: CategoryItemProps) {
  const { numberOfPosts, categoryThumbnail } = await getCategoryData(category);

  return (
    <Link
      href={`/${category}/1`}
      className="i-hover-up regular-text t-hover-blue gray-border mx-auto h-80 w-[90%] overflow-hidden rounded-md border"
    >
      <Image
        src={categoryThumbnail!}
        alt="Category Thumbnail"
        width={200}
        height={200}
        className="h-[80%] w-full object-cover"
      />
      <div className="p-2">
        <p className="text-base font-bold sm:text-lg">
          {formatCategoryForUI(category)}
        </p>
        <p className="subtle-text text-sm">
          {numberOfPosts} Post{numberOfPosts > 1 ? "s" : ""}
        </p>
      </div>
    </Link>
  );
}
