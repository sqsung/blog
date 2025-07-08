"use client";

import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface SeeMoreButtonProps {
  href: string;
  text: string;
}

const SeeMoreButton = ({ href, text = "See More" }: SeeMoreButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="transcolor hover:bg-background-secondary flex cursor-pointer items-center gap-1 rounded-lg px-5 py-1 font-bold"
    >
      <span>{text}</span>
      <ArrowLongRightIcon className="h-7 w-7" />
    </button>
  );
};

export default SeeMoreButton;
