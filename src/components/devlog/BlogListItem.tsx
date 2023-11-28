import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import { PostData } from "global";

export default function BlogListItem(props: PostData) {
  const { id, thumbnail, tags, title, description, date, category } = props;

  return (
    <li className="border-t-[1px] border-gray-200 py-5 [&:last-of-type]:border-b-[1px]">
      <Link href={`/${id}`}>
        <div className="flex h-[100px] gap-5 transition hover:scale-[1.01]">
          <Image
            src={thumbnail || "/seriesThumbnails/nextjs.png"}
            width={100}
            height={100}
            alt="Blog Post Thumbnail"
          />
          <div className="flex h-full w-full flex-col">
            <p className="text-[20px] font-bold transition hover:cursor-pointer hover:text-gray-300">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">
                {`${category} ${formatDate(date)}`}
              </p>
              <Tags tags={tags} />
            </div>
            <p className="my-5">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
