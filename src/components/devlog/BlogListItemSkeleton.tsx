export default function BlogListItemSkeleton() {
  return (
    <div className="sm:border-gray-150 h-80 overflow-hidden rounded-md border transition hover:border-gray-700 sm:h-[200px] sm:pb-0">
      <div className="flex h-[100%] flex-col gap-1 sm:flex-row">
        <div className="skeleton h-[60%] w-full min-w-[200px] object-cover sm:h-[200px] sm:max-h-[200px] sm:w-[200px]" />
        <div className="flex h-[40%] w-full flex-col gap-2 p-1 sm:h-full sm:p-2">
          <p className="skeleton h-[10px] w-[50%] overflow-ellipsis whitespace-nowrap text-sm font-bold transition hover:cursor-pointer hover:text-gray-300 sm:h-[25px] sm:text-lg"></p>
          <p className="skeleton h-[5px] w-[25%] text-xs text-gray-400 sm:h-[10px] sm:text-sm"></p>
          <p className="skeleton h-[5px] w-[25%] text-xs text-gray-400 sm:h-[10px] sm:text-sm"></p>
          <div className="flex flex-col gap-2 sm:my-5">
            <p className="skeleton line-clamp-2 h-[15px] w-full overflow-hidden overflow-ellipsis text-xs text-gray-500 sm:h-[25px] sm:text-base"></p>
            <p className="skeleton line-clamp-2 h-[15px] w-full overflow-hidden overflow-ellipsis text-xs text-gray-500 sm:h-[25px] sm:text-base"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
