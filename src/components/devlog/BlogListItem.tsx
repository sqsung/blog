import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";

interface BlogListItemProps {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function BlogListItem(props: BlogListItemProps) {
  const { id, thumbnail, tags, title, description, date } = props;

  return (
    <li className="py-5 transition hover:scale-[1.01]">
      <Link href={`/${id}`}>
        <div className="flex h-[150px] gap-5">
          {thumbnail && (
            <Image
              src={thumbnail}
              width={150}
              height={150}
              alt="Blog Post Thumbnail"
            />
          )}
          <div className="flex h-full w-full flex-col">
            <p className="text-[20px] font-bold transition hover:cursor-pointer hover:text-gray-300">
              {title}
            </p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">{formatDate(date)}</p>
              <Tags tags={tags} />
            </div>
            <p className="my-5">{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
