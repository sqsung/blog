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
    <div className="flex w-5/6 justify-center gap-5 border">
      <AuthorProfile />
      <section className="h-100 w-full flex-col items-center justify-center border px-5">
        <ul className="flex gap-5">
          <li className="	text-decoration-line: w-[150px] cursor-pointer text-lg font-bold underline">
            Tech Blogs
          </li>
          <li className="w-[150px] cursor-pointer text-center text-lg font-light">
            Resume
          </li>
          <li className="w-[150px] cursor-pointer text-center text-lg font-light">
            Project
          </li>
          <li className="w-[150px] cursor-pointer text-center text-lg font-light">
            Contact
          </li>
        </ul>
        <ul className="my-10 flex flex-col gap-10">
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
