import Image from "next/image";
import { ContactLinks } from ".";
import Divider from "./Divider";

export default async function AuthorProfile() {
  return (
    <section className="flex w-full flex-col items-center">
      <Image
        src="/images/blog_profile.jpeg"
        alt="Blog Author's profile picture"
        width={300}
        height={300}
        className="h-[300px] w-full object-cover sm:h-[150px] sm:w-[150px] sm:rounded-full"
      />
      <div className="flex w-full flex-col gap-3 p-5 sm:w-[540px]">
        <div className="flex gap-2 sm:flex-col sm:items-center sm:gap-0">
          <p className="text-lg font-bold md:text-2xl">James K. Sohn</p>
          <p className="mr-auto flex items-center text-sm text-gray-400 sm:mb-3 sm:mr-0 sm:text-lg">
            Frontend Engineer
          </p>
          <ContactLinks color="text-gray-400" />
        </div>
        <Divider />
        <p className="sm:text-md text-sm text-gray-700">
          A coffee-loving frontend engineer from Korea with a passion for
          developing user centered products with innovative business models.{" "}
          {`Accidentally fell in love with dev while studying it to manage my
          startup${"'"}s development team. Been a full-time dev since.`}
        </p>
      </div>
    </section>
  );
}
