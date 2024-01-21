import Image from "next/image";
import Divider from "./Divider";

export default async function AuthorProfile() {
  return (
    <section className="relative flex w-fit flex-col items-center overflow-hidden rounded-lg py-5">
      <Image
        src="/blog_profile.jpeg"
        alt="Blog Author's profile picture"
        width={300}
        height={300}
        className="h-[300px] w-full object-cover sm:h-[150px] sm:w-[150px] sm:rounded-full"
      />
      <div className="flex w-full flex-col gap-3 p-5 sm:w-[540px]">
        <div className="flex gap-2 sm:flex-col sm:items-center sm:gap-0">
          <p className="title-text overflow-ellipsis whitespace-nowrap text-lg font-bold md:text-2xl">
            James K. Sohn
          </p>
          <p className="subtle-text mr-auto flex items-center overflow-ellipsis whitespace-nowrap text-sm sm:mb-3 sm:mr-0 sm:text-lg">
            Frontend Engineer
          </p>
        </div>
        <Divider />
        <p className="regular-text sm:text-md text-sm">
          A coffee-loving frontend engineer from Korea with a passion for
          developing user centered products with innovative business models.{" "}
          {`Accidentally fell in love with dev while studying it to manage my
          startup${"'"}s development team. Been a full-time dev since.`}
        </p>
      </div>
    </section>
  );
}
