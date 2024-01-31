"use client";

import Image from "next/image";
import Link from "next/link";
import useHeader from "./Header.hook";
import { ProgressBar } from ".";

export default function Header() {
  const {
    models: { onTop, scrollProgress },
  } = useHeader();

  return (
    <header
      className={`fixed ${
        onTop ? "shadow-md" : ""
      } h-header z-[100] flex w-full justify-center px-1 py-3 transition duration-500 md:px-32 ${
        onTop ? "bg-primary" : ""
      }`}
    >
      <div
        className={`flex justify-between ${
          onTop ? "full-header-wrapper" : "mini-header-wrapper"
        }`}
      >
        <Link href="/" className="flex items-center justify-center gap-3">
          <div className="relative h-[30px] w-[30px]">
            <Image src="/logo.png" alt="jsjs devlog logo" fill={true} />
          </div>
          <p
            className={`cursor-pointer font-code text-2xl font-bold italic text-[#5AF] sm:block ${
              onTop ? "" : "hidden"
            }`}
          >
            JSJS BLOG
          </p>
        </Link>
        <Link
          href="/categories"
          className={`regular-text ${
            onTop ? "hidden" : "block"
          } t-hover-blue flex gap-1 font-semibold`}
        >
          <p className="rounded-md text-sm">Read More</p>
          <i className="bi bi-arrow-right" />
        </Link>
      </div>
      <ProgressBar progress={scrollProgress} />
    </header>
  );
}
