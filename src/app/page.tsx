import { useEffect } from "react";
import { AuthorProfile } from "@/components/common";
import BlogList from "@/components/techBlogs/BlogList";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-5/6 justify-center gap-5 border">
      <BlogList />
    </div>
  );
}
