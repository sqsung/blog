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
        src="/images/blog_profile.jpeg"
        alt="Author profile image"
        width={50}
        height={50}
        className="max-h-[50px] rounded-full"
      />
      <div className="flex h-full flex-col justify-around">
        <p className="font-bold text-gray-700">James K. Sohn</p>
        <p className="text-sm text-gray-500">Frontend Engineer</p>
      </div>
      <div className="ml-auto flex items-center justify-center gap-0 text-center text-sm text-gray-500 sm:gap-1">
        {additionalInfo}
      </div>
    </div>
  );
}
