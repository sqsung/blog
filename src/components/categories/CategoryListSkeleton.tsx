export default function CategoryListSkeleton({ number }: { number: number }) {
  return (
    <div className="mt-5 flex w-full grid-cols-2 flex-col gap-3 pb-5 sm:grid">
      {Array.from({ length: number })
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="regular-text mx-auto flex h-80 w-[90%] flex-col gap-2 overflow-hidden rounded-md"
          >
            <div className="skeleton h-[70%] w-full rounded-lg" />
            <div className="flex flex-col gap-2 p-2">
              <p className="skeleton h-[16px] w-[50%] text-base font-bold sm:text-lg"></p>
              <p className="skeleton h-[10px] w-[50%] text-base font-bold sm:text-lg"></p>
              <p className="skeleton h-[10px] w-[50%] text-base font-bold sm:text-lg"></p>
            </div>
          </div>
        ))}
    </div>
  );
}
