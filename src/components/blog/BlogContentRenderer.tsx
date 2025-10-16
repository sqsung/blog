"use client";

import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";

interface BlogContentRendererProps {
  content: MDXRemoteSerializeResult;
}

export default function BlogContentRenderer({
  content,
}: BlogContentRendererProps) {
  return (
    <div className="blog-post">
      <MDXRemote {...content} components={{ Image }} />
    </div>
  );
}
