import { BlogMetadata } from "@/types/blog.types";

interface BlogCardProps {
  metadata: BlogMetadata;
}

const BlogCard = ({ metadata }: BlogCardProps) => {
  return (
    <li className="border-y border-neutral-600 py-3">
      <div className="flex cursor-pointer flex-col gap-5 rounded-xl p-3 hover:bg-neutral-700">
        <p className="text-zinc-400">{metadata.createdAt}</p>

        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{metadata.title}</p>
          {!!metadata.tags.length && (
            <ul className="flex gap-3 font-semibold text-blue-300">
              {metadata.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-zinc-400">{metadata.summary}</p>
      </div>
    </li>
  );
};

export default BlogCard;
