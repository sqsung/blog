import Link from "next/link";

export default function Header() {
  return (
    <div className="mb-auto flex h-[50px] items-center border-b-[1px] ps-10">
      <Link href="/">
        <p className="cursor-pointer text-2xl font-bold italic text-blue-300">
          <span className="not-italic">🐋</span> sqsung devlog
        </p>
      </Link>
    </div>
  );
}
