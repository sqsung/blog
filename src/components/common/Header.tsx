import Link from "next/link";
import { MenuSelector } from ".";

export default function Header() {
  return (
    <div className="mb-auto flex h-[50px] items-center justify-between border-b-[1px] px-1 md:px-10">
      <Link href="/">
        <p className="cursor-pointer text-2xl font-bold italic text-blue-300">
          <span className="not-italic">🐋</span> sqsung devlog
        </p>
      </Link>
    </div>
  );
}
