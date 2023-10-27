"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuSelector() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-5">
      <Link href="/" className={pathname === "/" ? "menu-selected" : "menu"}>
        Tech Blogs
      </Link>
      <Link
        href="/resume"
        className={pathname === "/resume" ? "menu-selected" : "menu"}
      >
        Resume
      </Link>
      <Link
        href="/portfolio"
        className={pathname === "/portfolio" ? "menu-selected" : "menu"}
      >
        Project
      </Link>
      <Link
        href="/contact"
        className={pathname === "/contact" ? "menu-selected" : "menu"}
      >
        Contact
      </Link>
    </ul>
  );
}
