export default function CategoryListSkeleton({ number }: { number: number }) {
  return (
    <div className="mt-5 flex grid-cols-2 flex-col gap-3 pb-5 sm:grid">
      {Array.from({ length: number })
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="border-gray-200transition mx-auto h-80 w-[90%] items-center justify-center rounded-md border"
          >
            <div className="skeleton h-[80%] w-full  object-cover" />
            <div className="flex flex-col gap-2 p-2">
              <p className="skeleton h-[16px] w-[50%] text-base font-bold sm:text-lg"></p>
              <p className="skeleton h-[10px] w-[50%] text-base font-bold sm:text-lg"></p>
            </div>
          </div>
        ))}
    </div>
  );
}
