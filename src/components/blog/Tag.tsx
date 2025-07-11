"use client";

import { ROUTES } from "@/constants/routes.constant";
import { useRouter } from "next/navigation";

interface TagProps {
  tag: string;
  isClamped?: boolean;
}

const Tag = ({ tag, isClamped = false }: TagProps) => {
  const router = useRouter();

  return (
    <li className="transcolor cursor-pointer font-semibold text-indigo-500 hover:text-indigo-400">
      <span
        className={isClamped ? "line-clamp-1 text-ellipsis" : ""}
        onClick={() => router.push(ROUTES.tagged(tag, 1))}
      >
        {tag.toUpperCase()}
      </span>
    </li>
  );
};

export default Tag;
