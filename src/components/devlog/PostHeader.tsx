import SmallAuthorProfile from "../common/SmallAuthorProfile";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import Divider from "../common/Divider";
import Link from "next/link";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
  category: string;
}

export default function PostHeader({
  title,
  date,
  tags,
  category,
}: PostHeaderProps) {
  return (
    <div className="flex w-full flex-col">
      <Link href={`/${category}/1`}>
        <p className="regular-text t-hover-blue text-xs sm:text-sm">
          {category}
        </p>
      </Link>
      <h1 className="title-text text-[30px] font-bold">{title}</h1>
      <p className="subtle-text m-0 text-xs sm:text-sm">{formatDate(date)}</p>
      <Tags tags={tags} />
      <SmallAuthorProfile />
      <Divider />
    </div>
  );
}
