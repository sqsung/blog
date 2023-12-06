import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="mb-auto flex h-[50px] items-center justify-between border-b-[1px] px-1 md:px-10">
      <Link href="/" className="flex items-center justify-center gap-3">
        <Image
          src="/images/logo.png"
          alt="jsjs devlog logo"
          width={30}
          height={30}
        />
        <p className="cursor-pointer text-2xl font-bold italic text-[#5AF]">
          jsjs devlog
        </p>
      </Link>
    </div>
  );
}
