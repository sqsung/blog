interface TagsProps {
  tags: string[];
}

export default function Tags({ tags }: TagsProps) {
  return (
    <div className="flex gap-2 font-light sm:gap-3">
      {tags.map((tag, index) => (
        <div key={`${index}-${tag}`} className="w-fit">
          <p className="text-xs text-blue-300 sm:text-sm">#{tag}</p>
        </div>
      ))}
    </div>
  );
}
