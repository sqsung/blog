import { formatDate } from "@/utils/format";
import Image from "next/image";

interface SideAuthorProfileProps {
  date: string;
}

export default function SideAuthorProfile({ date }: SideAuthorProfileProps) {
  return (
    <div className="absolute left-[-200px] flex flex-col gap-3">
      <Image
        src="/blog_profile.jpeg"
        alt="Author profile image"
        width={75}
        height={75}
        className="max-h-[75px] rounded-full"
      />
      <div className="flex h-full flex-col justify-around">
        <p className="title-text font-bold">James K. Sohn</p>
        <p className="subtle-text text-sm">{formatDate(date)}</p>
      </div>
    </div>
  );
}
