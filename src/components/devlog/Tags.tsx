interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag, index) => (
        <div key={`${index}-${tag}`} className="w-fit bg-gray-800 px-2 py-1">
          <p className="rounded-md text-xs font-semibold text-blue-300 sm:text-sm">
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
}
