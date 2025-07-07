import { getTags } from "@/backend/posts.server";
import Tag from "@/components/blog/Tag";
import Divider from "@/components/common/Divider";

const Tags = () => {
  const tags = getTags();

  return (
    <div className="flex flex-1 gap-10">
      <p className="text-5xl font-bold">Tags</p>
      <Divider direction="vertical" />
      <ul className="flex h-fit gap-5">
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
