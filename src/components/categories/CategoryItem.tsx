import Image from "next/image";
import { getCategoryData } from "../../../lib/posts";

interface CategoryItemProps {
  category: string;
}

export default async function CategoryItem({ category }: CategoryItemProps) {
  const { numberOfPosts, categoryThumbnail } = await getCategoryData(category);

  return (
    <div>
      <Image
        src={categoryThumbnail}
        alt="Category Thumbnail"
        width={250}
        height={250}
        className="max-h-[250px] max-w-[250px]"
      />
      <p>{category}</p>
      <p>{numberOfPosts}개의 글</p>
    </div>
  );
}
