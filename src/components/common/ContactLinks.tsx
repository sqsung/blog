interface ContactLinksProps {
  color?: string;
  hoverColor?: string;
  size?: "sm" | "md" | "lg" | "2xl";
}

export default function ContactLinks({
  color = "text-gray-300",
  hoverColor = "text-gray-700",
  size = "2xl",
}: ContactLinksProps) {
  return (
    <div className={`flex gap-5 text-${size} ${color}`}>
      <a
        href="https://github.com/sqsung"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i
          className={`bi bi-github cursor-pointer transition-colors hover:${hoverColor}`}
        />
      </a>
      <a href="mailto:rok.ksohn@gmail.com">
        <i
          className={`bi bi-envelope-fill cursor-pointer transition-colors hover:${hoverColor}`}
        />
      </a>
    </div>
  );
}
