import Link from "next/link";

export default function Header() {
  return (
    <div className="flex gap-5 border p-5">
      <Link href="/">Home</Link>
      <Link href="/devlog">Devlog</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/resume">Author</Link>
    </div>
  );
}
