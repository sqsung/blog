import Image from "next/image";
import { ContactLinks } from ".";
import { getCategories } from "../../../lib/posts";

export default async function AuthorProfile() {
  const categories = await getCategories();

  console.log(categories);

  return (
    <section className="flex flex-col items-center gap-5 px-5">
      <Image
        src="/images/blog_profile.jpeg"
        alt="Blog Author's profile picture"
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="flex w-64 flex-col gap-1">
        <p className="text-2xl font-bold">James K. Sohn</p>
        <p className="text-md mb-3 flex items-center text-gray-400">
          Frontend Engineer
        </p>
        <p className="text-sm text-gray-700">
          A coffe loving frontend engineer from Korea with a passion for
          developing user centered products with innovative business models.
        </p>
        <p className="my-2 text-sm text-gray-700">
          {`Accidentally fell in love with dev while studying it to manage my
          startup${"'"}s development team. Been a full-time dev since.`}
        </p>
        <ContactLinks color="text-gray-400" />
      </div>
      <div className="w-full">
        <p className="w-full border-b-[1px] text-sm">Categories:</p>
        {categories.map((category) => (
          <p key={category}>{category}</p>
        ))}
      </div>
    </section>
  );
}
