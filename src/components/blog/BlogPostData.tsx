import Image from "next/image";
import Divider from "../common/Divider";
import Tag from "./Tag";

interface BlogPostDataProps {
  createdAt: string;
  tags: string[];
}

const BlogPostData = ({ createdAt, tags }: BlogPostDataProps) => {
  return (
    <div className="flex w-full flex-shrink-0 flex-col gap-5 lg:w-[150px] lg:max-w-[150px] lg:gap-10">
      <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-start">
        <div className="relative aspect-square w-[50px] overflow-hidden rounded-full">
          <Image
            fill
            src="/images/blog_profile.jpeg"
            alt="Author Profile Picture"
            objectFit="cover"
          />
        </div>
        <div>
          <p className="text-t-subtle text-sm">sqsung</p>
          <p className="text-t-subtle text-sm">{createdAt}</p>
        </div>
      </div>
      <Divider className="max-lg:hidden" />
      <div className="flex w-full flex-col gap-1 lg:gap-5">
        <p className="text-t-subtle text-sm">TAGS</p>
        <ul className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-hidden">
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </ul>
      </div>

      <Divider className="lg:hidden" />
    </div>
  );
};

export default BlogPostData;
