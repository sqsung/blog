import SmallAuthorProfile from "./SmallAuthorProfile";
import { formatDate } from "@/utils/format";

interface PostHeaderProps {
  title: string;
  date: string;
}

export default function PostHeader({ title, date }: PostHeaderProps) {
  return (
    <div className="flex w-full flex-col border-b-2">
      <h1 className="title m-0">{title}</h1>
      <p className="m-0 text-sm text-gray-600">{formatDate(date)}</p>
      <SmallAuthorProfile />
    </div>
  );
}
