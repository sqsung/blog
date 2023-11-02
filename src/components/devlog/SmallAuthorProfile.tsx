import Image from "next/image";

export default function SmallAuthorProfile() {
  return (
    <div className="my-5 flex gap-3">
      <Image
        src="/images/blog_profile.jpeg"
        alt="Author profile image"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex h-full flex-col justify-around">
        <p className="font-bold">James K. Sohn</p>
        <p className="text-sm text-gray-500">Frontend Engineer</p>
      </div>
    </div>
  );
}
