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
      <div className="flex items-center gap-5 font-bold">
        <Link href="/posts">posts</Link>
        <Link href="/tags">tags</Link>
        <Link href="/about">about</Link>
        <ThemeToggler />
      </div>
    </header>
  );
}
