interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex cursor-pointer gap-3">
      {tags.map((tag, index) => (
        <div
          key={`${index}-${tag}`}
          className="w-fit rounded-md bg-gray-100 px-2 py-[1px]"
        >
          <p className="text-sm text-gray-500">{tag}</p>
        </div>
      ))}
    </div>
  );
}
