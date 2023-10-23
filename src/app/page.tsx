import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";
import Header from "@/components/common/Header";

/**
 * ✏️ NOTES:
 * 1. @getStaticProps
 * - When building highly performant static pages, but most likely without real-time data
 * - When page should be pre-rendered (SEO benefits) and must be fast
 *
 * 2. @getStaticPaths
 * - complements 'getStaticProps'
 * - When page has Dynamic Routes (must define a list of paths to be statistically generated)
 * - As the page builds, Next.js will statically pre-render all the paths specified by getStaticPaths
 * - 🌐 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
 *
 * 3. @getServerSideProps
 * - When you need Next.js to pre-render the page on each request (using the data returned from getServerSideProps)
 * - Basically, the better alternative to getStaticProps when you need to make a page with real-time data (frequent updates)
 */

export default async function Home() {
  /**
   * await technically not needed in the case below as it's just fetching internally stored data
   * also, getStaticProps is no longer necessary with the app directory
   * check out: https://github.com/vercel/next.js/issues/51860
   */
  const allPostsData = await getSortedPostsData();

  return (
    <div className="w-sreen flex h-screen flex-col">
      <head>
        <title>James Next.js Blog</title>
      </head>
      <Header />
      <section className="h-100 flex h-1/4 items-center justify-center gap-10 border p-10">
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
      <section className="h-100 h-3/4 flex-col items-center justify-center border p-10">
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
