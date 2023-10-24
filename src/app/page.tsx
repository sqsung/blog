import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

export default async function Home() {
  /**
   * await technically not needed in the case below as it's just fetching internally stored data
   * also, getStaticProps is no longer necessary with the app directory
   * check out: https://github.com/vercel/next.js/issues/51860
   */
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex h-full w-full flex-col">
      <section className="flex items-center justify-center gap-10 border p-5">
        <Image
          src="/images/profile.jpg"
          alt="Blog Author's profile picture"
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="flex h-full flex-col">
          <p className="m-0 text-2xl font-bold">James Sohn</p>
          <p className="m-0 mb-5 text-gray-400">Frontend Developer</p>
          <p className="max-w-md">
            Software engineer based in South Korea with a passion for developing
            user-focused products with great business models.
          </p>
        </div>
      </section>
      <section className="h-100 h-3/4 flex-col items-center justify-center p-10">
        <h2 className="my-5 text-2xl font-bold">Blogs</h2>
        <ul className="flex flex-col gap-10">
          {allPostsData.map(({ id, title, date }) => (
            <li key={id}>
              <Link
                href={`/posts/${id}`}
                className="text-2xl hover:cursor-pointer hover:text-gray-300"
              >
                {title}
              </Link>
              <p className="text-gray-400">{date.toString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
