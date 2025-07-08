import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { ROUTES } from "@/constants/routes.constant";

export default function Header() {
  return (
    <header className="mb-5 flex w-full items-center py-5 lg:mb-10">
      <Link
        href={ROUTES.home()}
        className="font-source-code-pro mr-auto cursor-pointer text-2xl font-bold"
      >
        sqsung.
      </Link>
      <nav className="flex items-center gap-3 font-bold">
        <Link
          href={ROUTES.posts(1)}
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          posts
        </Link>
        <Link
          href={ROUTES.tags()}
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          tags
        </Link>
        <Link
          href={ROUTES.about()}
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          about
        </Link>
        <ThemeToggler />
      </nav>
    </header>
  );
}
