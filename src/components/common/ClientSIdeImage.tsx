"use client";

import { DEFAULT_THUMBNAIL } from "@/utils/constants";
import Image from "next/image";

interface ClientSideImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ClientSideImage({
  src,
  alt,
  ...rest
}: ClientSideImageProps) {
  console.log("🐋", src);

  return (
    <Image
      key={src || DEFAULT_THUMBNAIL}
      className="h-[300px] w-[300px] object-cover"
      src={src}
      alt={alt}
      {...rest}
    />
  );
}
