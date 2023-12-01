"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="w-full cursor-pointer text-base text-gray-700 sm:text-2xl">
      <i
        className="bi bi-arrow-left transition-colors hover:text-gray-400"
        onClick={() => router.back()}
      />
    </div>
  );
}
