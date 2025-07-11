"use client";

import { ROUTES } from "@/constants/routes.constant";
import { useRouter } from "next/navigation";

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  const router = useRouter();

  return (
    <li className="transcolor cursor-pointer font-semibold text-indigo-500 hover:text-indigo-400">
      <span onClick={() => router.push(ROUTES.tagged(tag, 1))}>
        {tag.toUpperCase()}
      </span>
    </li>
  );
};

export default Tag;
