import { getSortedPostsData } from "../../../lib/posts";
import Link from "next/link";

export default async function BlogList() {
  const allPostsData = await getSortedPostsData();

  return (
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
  );
}
