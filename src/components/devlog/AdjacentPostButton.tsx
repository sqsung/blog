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
      className={`flex w-1/2 cursor-pointer items-end justify-between rounded-sm border border-gray-200 px-3 py-5 transition ${
        hovered && !!postData ? "-translate-y-1 transform" : ""
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {direction === "previous" && (
        <i className="bi bi-arrow-left text-base sm:text-2xl" />
      )}
      <div className="w-fit max-w-[80%]">
        <p className="text-xs italic">
          {direction === "previous" ? "Previous" : "Next"}
        </p>
        <p
          className={`max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap text-xs font-bold transition sm:text-base md:max-w-[100%] ${
            hovered ? "text-blue-300" : "text-gray-700"
          }`}
        >
          {postData!.title}
        </p>
      </div>
      {direction === "next" && (
        <i className="bi bi-arrow-right text-base sm:text-2xl" />
      )}
    </Link>
  ) : (
    <p className="flex w-1/2 items-center justify-center text-sm italic text-gray-300 sm:text-xs">
      No {direction} post in the category
    </p>
  );
}
