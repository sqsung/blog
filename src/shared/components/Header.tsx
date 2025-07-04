import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full items-center py-5">
      <Link href="/" className="mr-auto text-2xl font-bold">
        sqsung
      </Link>
      <div className="flex gap-5 font-bold">
        <Link href="/posts">posts</Link>
        <Link href="/tags">tags</Link>
        <Link href="/about">about</Link>
      </div>
    </header>
  );
}
