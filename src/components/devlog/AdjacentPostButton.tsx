"use client";

import { PostData } from "global";
import Link from "next/link";
import { useState } from "react";

interface AdjacentPostButtonProps {
  direction: "previous" | "next";
  postData: PostData | null;
}

export default function AdjacentPostButton({
  postData,
  direction,
}: AdjacentPostButtonProps) {
  const [hovered, setHovered] = useState(false);

  return postData ? (
    <Link
      href={!!postData ? `/devlog/${postData!.category}/${postData!.id}` : ""}
      className={`gray-border flex w-1/2 items-end justify-between rounded-sm border px-3 py-5 ${
        hovered && !!postData ? "i-hover-up" : ""
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {direction === "previous" && (
        <i className="regular-text bi bi-arrow-left text-base sm:text-2xl" />
      )}
      <div className="w-fit max-w-[80%]">
        <p className="subtle-text text-xs italic">
          {direction === "previous" ? "Previous" : "Next"}
        </p>
        <p
          className={`max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-bold transition sm:text-base md:max-w-[100%] ${
            hovered ? "text-blue-300" : "regular-text"
          }`}
        >
          {postData!.title}
        </p>
      </div>
      {direction === "next" && (
        <i className="regular-text bi bi-arrow-right text-base sm:text-2xl" />
      )}
    </Link>
  ) : (
    <p className="subtle-text flex w-1/2 items-center justify-center text-sm italic sm:text-xs">
      No {direction} post in the category
    </p>
  );
}
