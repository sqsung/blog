import SmallAuthorProfile from "./SmallAuthorProfile";
import { formatDate } from "@/utils/format";
import Tags from "./Tags";

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
}

export default function PostHeader({ title, date, tags }: PostHeaderProps) {
  return (
    <div className="flex w-full flex-col border-b-2">
      <h1 className="title m-0">{title}</h1>
      <div className="flex items-center gap-3">
        <p className="m-0 text-sm text-gray-600">{formatDate(date)}</p>
        <Tags tags={tags} />
      </div>
      <SmallAuthorProfile />
    </div>
  );
}
