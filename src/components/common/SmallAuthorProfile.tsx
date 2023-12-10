import Image from "next/image";

interface SmallAuthorProfileProps {
  children?: React.ReactNode;
}

export default function SmallAuthorProfile({
  children: additionalInfo,
}: SmallAuthorProfileProps) {
  return (
    <div className="my-5 flex gap-3">
      <Image
        src="/blog_profile.jpeg"
        alt="Author profile image"
        width={50}
        height={50}
        className="max-h-[50px] rounded-full"
      />
      <div className="flex h-full flex-col justify-around">
        <p className="title-text font-bold">James K. Sohn</p>
        <p className="regular-text text-sm">Frontend Engineer</p>
      </div>
      <div className="subtle-text ml-auto flex items-center justify-center gap-0 text-center text-sm sm:gap-1">
        {additionalInfo}
      </div>
    </div>
  );
}
