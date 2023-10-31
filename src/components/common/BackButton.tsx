"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="w-full cursor-pointer text-2xl text-gray-700">
      <i
        className="bi bi-arrow-left transition-colors hover:text-gray-400"
        onClick={() => router.back()}
      />
    </div>
  );
}
