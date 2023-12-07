import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import { PostData } from "global";

export default function BlogListItem(props: PostData) {
  const { id, thumbnail, tags, title, description, date, category } = props;

  return (
    <li className="sm:border-gray-150 i-hover-up h-80 overflow-hidden rounded-md border hover:text-blue-300 sm:h-fit sm:pb-0">
      <Link href={`/devlog/${category}/${id}`}>
        <div className="flex h-[100%] flex-col gap-2 sm:flex-row">
          <Image
            src={thumbnail}
            width={100}
            height={100}
            alt="Blog Post Thumbnail"
            className="h-[60%] w-full min-w-[200px] object-cover sm:h-[200px] sm:max-h-[200px] sm:w-[200px]"
          />
          <div className="flex h-full w-full flex-col p-1 sm:p-2">
            <p className="overflow-ellipsis whitespace-nowrap text-sm font-bold sm:text-lg">
              {title}
            </p>
            <p className="text-xs text-gray-400 sm:text-sm ">
              {`${formatDate(date)}`}
            </p>
            <Tags tags={tags} />
            <p className="my-1 line-clamp-2 overflow-hidden overflow-ellipsis py-1 text-xs text-gray-500 sm:my-3 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
