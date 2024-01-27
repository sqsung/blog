import BlogListItemSkeleton from "./BlogListItemSkeleton";

export default function BlogListSkeleton({ number }: { number: number }) {
  return (
    <div className="sm:px-[10%] md:px-[15%]">
      <ul className="flex w-full flex-col gap-10 px-5 sm:grid sm:grid-cols-2 sm:px-0">
        {Array.from({ length: number })
          .fill(null)
          .map((_, index) => (
            <BlogListItemSkeleton key={index} />
          ))}
      </ul>
    </div>
  );
}
