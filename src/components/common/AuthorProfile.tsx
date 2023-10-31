import Image from "next/image";
import { ContactLinks } from ".";

export default function AuthorProfile() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 p-5">
      <Image
        src="/images/blog_profile.jpeg"
        alt="Blog Author's profile picture"
        width={300}
        height={300}
      />
      <div className="flex h-full w-64 flex-col gap-1">
        <p className="m-0 text-2xl font-bold">James Sohn</p>
        <p className="m-0 text-gray-400">Frontend Developer</p>
        <p className="text-sm">
          A coffe loving frontend engineer from Korea with a passion for
          developing user centered products with innovative business models.
        </p>
        <br />
        <p className="mb-5 text-sm">
          {`Accidentally fell in love with dev while studying it to better manage my
          startup${"'"}s development team. Been a full-time dev since.`}
        </p>
        <ContactLinks color="text-gray-600" hoverColor="text-gray-400" />
      </div>
    </section>
  );
}
