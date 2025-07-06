import { BlogMetadata } from "@/types/blog.types";

interface BlogCardProps {
  metadata: BlogMetadata;
}

const BlogCard = ({ metadata }: BlogCardProps) => {
  return (
    <li className="border-b-primary border-b first-of-type:border-y">
      <div className="flex cursor-pointer flex-row gap-5 py-8">
        <p className="text-t-subtle me-10 mt-3 flex-shrink-0 tracking-wide">
          {metadata.createdAt}
        </p>

        <div className="flex flex-col gap-5">
          <div className="hover:bg-background-secondary flex flex-col gap-3 rounded-xl px-5 py-3 transition-colors duration-300">
            <p className="text-2xl font-bold">{metadata.title}</p>
            <p className="text-t-subtle text-lg">{metadata.summary}</p>
          </div>

          {!!metadata.tags.length && (
            <ul className="flex gap-5 ps-5 font-semibold text-indigo-400">
              {metadata.tags.map((tag) => (
                <li key={tag}>{tag.toUpperCase()}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
