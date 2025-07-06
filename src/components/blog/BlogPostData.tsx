import Image from "next/image";
import Divider from "../common/Divider";
import Tag from "./Tag";

interface BlogPostDataProps {
  createdAt: string;
  tags: string[];
}

const BlogPostData = ({ createdAt, tags }: BlogPostDataProps) => {
  return (
    <div className="flex w-[150px] max-w-[150px] flex-shrink-0 flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square w-[50px] overflow-hidden rounded-full">
          <Image
            fill
            src="/images/blog_profile.jpeg"
            alt="Author Profile Picture"
          />
        </div>
        <div>
          <p className="text-t-subtle text-sm">sqsung</p>
          <p className="text-t-subtle text-sm">{createdAt}</p>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-5">
        <p className="text-t-subtle text-sm">TAGS</p>
        <ul>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPostData;
