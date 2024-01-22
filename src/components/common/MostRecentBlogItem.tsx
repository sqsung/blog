import Image from "next/image";
import { formatCategoryForUI } from "../../../lib/posts";
import { formatDate } from "@/utils/format";
import { Tags } from "../devlog";
import { PostData } from "global";
import Link from "next/link";

interface MostRecentBlogItemProps {
  blog: PostData;
}

export default async function MostRecentBlogItem({
  blog,
}: MostRecentBlogItemProps) {
  const { id, thumbnail, tags, title, description, date, category } = blog;

  return (
    <Link
      href={`/devlog/${category}/${id}`}
      className="title-text i-hover-up t-hover-blue flex w-full justify-center rounded-lg px-5 sm:px-0"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="relative h-[150px] w-full overflow-hidden rounded-lg md:h-[300px] lg:w-[50%]">
          <Image
            src={thumbnail}
            alt="Blog Post Thumbnail"
            layout="fill"
            className="w-full object-cover"
            quality={75}
          />
        </div>
        <div className="flex w-full flex-col sm:justify-between lg:w-[50%]">
          <div className="flex flex-col md:gap-2">
            <p className="subtle-text text-xs">
              {formatCategoryForUI(category)}
            </p>
            <p className="line-clamp-2 overflow-ellipsis text-base font-bold sm:text-lg">
              {title}
            </p>
            <Tags tags={tags} />
          </div>
          <p className="subtle-text my-2 line-clamp-5 overflow-ellipsis text-sm sm:my-3 sm:text-base">
            {description}
          </p>
          <p className="subtle-text text-xs sm:text-sm">
            {`${formatDate(date)}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
