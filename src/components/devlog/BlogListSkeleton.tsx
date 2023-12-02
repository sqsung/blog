import BlogListItemSkeleton from "./BlogListItemSkeleton";

export default function BlogListSkeleton({ number }: { number: number }) {
  return (
    <div className="mt-5 flex w-full flex-col justify-center gap-5 px-5 pb-10 sm:px-[10%] md:px-[15%]">
      <ul className="flex w-full flex-col justify-center gap-5">
        {Array.from({ length: number })
          .fill(null)
          .map((_, index) => (
            <BlogListItemSkeleton key={index} />
          ))}
      </ul>
    </div>
  );
}
