import Image from "next/image";

export default function AuthorProfile() {
  return (
    <section className="flex flex-col items-center justify-center gap-10 border p-5">
      <Image
        src="/images/blog_profile.jpeg"
        alt="Blog Author's profile picture"
        width={300}
        height={300}
        // className="rounded-full"
      />
      <div className="flex h-full w-64 w-[300px] flex-col">
        <p className="m-0 text-2xl font-bold">James Sohn</p>
        <p className="m-0 mb-5 text-gray-400">Frontend Developer</p>
        <p>
          A coffe loving frontend engineer based in South Korea with a passion
          for developing user-focused products with great business models.
        </p>
      </div>
    </section>
  );
}
