import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  return (
    <header className="mb-10 flex w-full items-center py-5">
      <Link
        href="/"
        className="font-source-code-pro mr-auto text-2xl font-bold"
      >
        sqsung.
      </Link>
      <nav className="flex items-center gap-3 font-bold">
        <Link
          href="/posts"
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          posts
        </Link>
        <Link
          href="/tags"
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          tags
        </Link>
        <Link
          href="/about"
          className="transcolor hover:bg-background-secondary cursor-pointer rounded-lg bg-transparent px-3 py-1"
        >
          about
        </Link>
        <ThemeToggler />
      </nav>
    </header>
  );
}
