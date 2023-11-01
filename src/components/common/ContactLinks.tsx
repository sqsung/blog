import Link from "next/link";

interface ContactLinksProps {
  color?: string;
  hoverColor?: string;
  size?: "sm" | "md" | "lg" | "2xl";
  justify?: "start" | "end" | "around" | "between";
}

export default function ContactLinks({
  color = "text-gray-300",
  hoverColor = "text-gray-700",
  size = "2xl",
  justify,
}: ContactLinksProps) {
  return (
    <div className={`flex gap-5 justify-${justify} text-${size} ${color}`}>
      <a
        href="https://github.com/sqsung"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i
          className={`bi bi-github cursor-pointer transition-colors ${color} hover:${hoverColor}`}
        />
      </a>
      <a href="mailto:rok.ksohn@gmail.com">
        <i
          className={`bi bi-envelope-fill cursor-pointer transition-colors hover:${hoverColor}`}
        />
      </a>
      <Link href="/resume">
        <i
          className={`bi bi-info-circle-fill cursor-pointer transition-colors hover:${hoverColor}`}
        />
      </Link>
    </div>
  );
}
