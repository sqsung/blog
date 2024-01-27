"use client";

interface ContactLinksProps {
  color?: string;
  size?: "sm" | "md" | "lg" | "2xl";
  justify?: "start" | "end" | "around" | "between";
}

export default function ContactLinks({
  color = "text-gray-500",
  size = "2xl",
  justify,
}: ContactLinksProps) {
  return (
    <div
      className={`flex gap-2 md:gap-5 justify-${justify} text-${size} ${color}`}
    >
      <a
        href="https://github.com/sqsung"
        target="_blank"
        rel="noreferrer noopener"
        className="cursor-pointer transition-colors"
      >
        <i className="bi bi-github duration-300 hover:text-gray-300" />
      </a>
      <a href="mailto:rok.ksohn@gmail.com">
        <i className="bi bi-envelope-fill cursor-pointer transition-colors duration-300 hover:text-gray-300" />
      </a>
    </div>
  );
}
