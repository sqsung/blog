import Image from "next/image";
import { getCategoryData } from "../../../lib/posts";
import Link from "next/link";

interface CategoryItemProps {
  category: string;
}

export default async function CategoryItem({ category }: CategoryItemProps) {
  const { numberOfPosts, categoryThumbnail } = await getCategoryData(category);

  return (
    <Link
      href={`/categories/${category}`}
      className="mx-auto h-80 w-[90%] cursor-pointer items-center justify-center rounded-md border border-gray-200 transition hover:border-gray-700"
    >
      <Image
        src={categoryThumbnail}
        alt="Category Thumbnail"
        width={200}
        height={200}
        className="h-[80%] w-full object-cover"
      />
      <div className="p-2">
        <p className="text-base font-bold sm:text-lg">{category}</p>
        <p className="text-sm text-gray-500">{numberOfPosts}개의 글</p>
      </div>
    </Link>
  );
}
