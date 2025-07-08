import Image from "next/image";
import ContactLinks from "../common/ContactLinks";

const AuthorInfo = () => {
  return (
    <div className="flex w-fit flex-shrink-0 flex-col items-center gap-5">
      <div className="relative aspect-square w-[200px] overflow-hidden rounded-full">
        <Image
          src="/images/blog_profile.jpeg"
          alt="Author profile image"
          fill
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-1 text-xl font-bold">sqsung</p>
        <p className="text-t-subtle">Software Engineer</p>
        <p className="text-t-subtle">Seoul, Korea</p>
      </div>
      <ContactLinks />
    </div>
  );
};

export default AuthorInfo;
