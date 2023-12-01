import SmallAuthorProfile from "./SmallAuthorProfile";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";
import Divider from "../common/Divider";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

export default function PostHeader({ title, date, tags }: PostHeaderProps) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="title m-0 mb-2">{title}</h1>
      <p className="m-0 text-xs text-gray-600 sm:text-sm">{formatDate(date)}</p>
      <Tags tags={tags} />
      <SmallAuthorProfile />
      <Divider />
    </div>
  );
}
