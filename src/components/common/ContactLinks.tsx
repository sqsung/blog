"use client";
import Link from "next/link";

interface ContactLinksProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "2xl";
  justify?: "start" | "end" | "around" | "between";
}

export default function ContactLinks({
  color = "text-gray-300",
  size = "2xl",
  justify,
}: ContactLinksProps) {
  return (
    <div className={`flex gap-5 justify-${justify} text-${size} ${color}`}>
      <a
        href="https://github.com/sqsung"
        target="_blank"
        rel="noreferrer noopener"
        className="cursor-pointer transition-colors"
      >
        <i className="bi bi-github hover:text-gray-700" />
      </a>
      <a href="mailto:rok.ksohn@gmail.com">
        <i className="bi bi-envelope-fill cursor-pointer transition-colors hover:text-gray-700" />
      </a>
      <Link href="/resume">
        <i className="bi bi-info-circle-fill cursor-pointer transition-colors hover:text-gray-700" />
      </Link>
    </div>
  );
}
