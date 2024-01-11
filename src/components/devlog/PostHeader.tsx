import Tags from "./Tags";
import Link from "next/link";
import Image from "next/image";

interface PostHeaderProps {
  title: string;
  tags: string[];
  category: string;
  thumbnail: string | null;
  description: string;
}

export default function PostHeader({
  title,
  tags,
  category,
  thumbnail,
  description,
}: PostHeaderProps) {
  return (
    <div className="w-full">
      <div className="mb-5 flex w-full flex-col gap-5">
        <Link href={`/${category}/1`}>
          <p className="regular-text t-hover-blue text-xs sm:text-sm">
            {category}
          </p>
        </Link>
        <div>
          <h1 className="blog-title">{title}</h1>
          <Tags tags={tags} />
        </div>
        <div>
          <p className="subtle-text text-base sm:text-lg">{description}</p>
          {thumbnail && (
            <div className="relative my-5 h-[300px] w-full overflow-hidden rounded-md sm:h-[300px]">
              <Image
                src={thumbnail}
                alt={`${title} post thumbnail`}
                layout="fill"
                className="object-cover"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
