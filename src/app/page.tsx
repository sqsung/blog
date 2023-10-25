import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";
import { AuthorProfile } from "@/components/common";

export default async function Home() {
  /**
   * await technically not needed in the case below as it's just fetching internally stored data
   * also, getStaticProps is no longer necessary with the app directory
   * check out: https://github.com/vercel/next.js/issues/51860
   */
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex h-full w-full justify-center border border-red-500 px-1 px-5">
      <AuthorProfile />
      <section className="h-100 w-[1000px] flex-col items-center justify-center border px-5">
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
