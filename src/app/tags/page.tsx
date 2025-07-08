import { getTags } from "@/backend/posts.server";
import Tag from "@/components/blog/Tag";
import Divider from "@/components/common/Divider";

const Tags = () => {
  const tags = getTags();

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
      <p className="border-b-primary text-5xl font-bold max-lg:border-b max-lg:pb-5">
        Tags
      </p>
      <Divider direction="vertical" />
      <ul className="flex h-fit flex-wrap gap-5">
        {Object.keys(tags).map((tag) => {
          const count = tags[tag];

          return (
            <div key={tag} className="flex gap-1">
              <Tag tag={tag} />
              <p className="text-t-subtle font-bold">{count}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Tags;
