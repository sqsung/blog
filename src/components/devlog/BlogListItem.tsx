import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import { PostData } from "global";
import GrayLabel from "../common/GrayLabel";

export default function BlogListItem(props: PostData) {
  const { id, thumbnail, tags, title, description, date, category } = props;

  return (
    <li className="sm:border-gray-150 h-30 overflow-hidden border-b pb-5 transition hover:border-gray-700 sm:rounded-md sm:border sm:pb-0 [&:first-of-type]:border-t">
      <Link href={`/categories/${category}/${id}`}>
        <div className="flex h-[100%] gap-2 sm:gap-5">
          <Image
            src={thumbnail || "/seriesThumbnails/nextjs.png"}
            width={100}
            height={100}
            alt="Blog Post Thumbnail"
            objectFit="cover"
            className="max-h-[100px] sm:h-[200px] sm:max-h-[200px] sm:w-[200px]"
          />
          <div className="flex h-full w-full flex-col sm:py-3">
            <p className="text-sm font-bold transition hover:cursor-pointer hover:text-gray-300 sm:text-lg">
              {title}
            </p>
            <p className="text-xs text-gray-400 sm:text-sm ">
              {`${formatDate(date)}`}
            </p>
            <Tags tags={tags} />
            <p className="my-1 h-full overflow-hidden py-1 text-xs text-gray-500 sm:py-5 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
