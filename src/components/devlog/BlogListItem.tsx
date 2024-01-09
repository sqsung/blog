import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import { PostData } from "global";
import { formatCategoryForUI } from "../../../lib/posts";

export default function BlogListItem(props: PostData) {
  const { id, thumbnail, tags, title, description, date, category } = props;

  return (
    <li className="title-text i-hover-up t-hover-blue overflow-hidden rounded-md sm:h-fit sm:pb-0">
      <Link href={`/devlog/${category}/${id}`}>
        <div className="flex h-[24rem] flex-col gap-2 sm:gap-0">
          <div className="relative h-[50%] overflow-hidden rounded-l sm:min-h-[200px]">
            <Image
              src={thumbnail}
              layout="fill"
              alt="Blog Post Thumbnail"
              className="w-full min-w-[200px] object-cover sm:h-[200px] sm:max-h-[200px] sm:w-[200px]"
              quality={100}
            />
          </div>
          <div className="flex h-[50%] w-full flex-col gap-2 p-1 sm:justify-between sm:p-2">
            <div className="flex flex-col">
              <p className="subtle-text text-xs">
                {formatCategoryForUI(category)}
              </p>
              <p className="line-clamp-2 overflow-ellipsis text-base font-bold sm:text-lg">
                {title}
              </p>
              <Tags tags={tags} />
            </div>
            <p className="subtle-text my-2 line-clamp-2 overflow-ellipsis text-sm sm:my-3 sm:text-base">
              {description}
            </p>
            <p className="subtle-text text-xs sm:text-sm ">
              {`${formatDate(date)}`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
