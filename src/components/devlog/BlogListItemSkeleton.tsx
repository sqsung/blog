export default function BlogListItemSkeleton() {
  return (
    <div className="title-text w-full overflow-hidden rounded-md">
      <div className="flex h-80 flex-col gap-2 sm:h-[26rem]">
        <div className="skeleton relative h-[50%] min-h-[150px] overflow-hidden rounded-l sm:max-h-[200px] sm:min-h-[200px]" />
        <div className="flex h-[50%] w-full flex-col p-1 sm:justify-between">
          <p className="skeleton h-[10px] w-[50%] overflow-ellipsis whitespace-nowrap text-sm font-bold transition hover:cursor-pointer hover:text-gray-300 sm:h-[25px] sm:text-lg"></p>
          <p className="skeleton h-[5px] w-[25%] text-xs text-gray-400 sm:h-[10px] sm:text-sm"></p>
          <div className="flex flex-col gap-2 sm:my-5">
            <p className="skeleton line-clamp-2 h-[15px] w-full overflow-hidden overflow-ellipsis text-xs text-gray-500 sm:h-[25px] sm:text-base"></p>
            <p className="skeleton line-clamp-2 h-[15px] w-full overflow-hidden overflow-ellipsis text-xs text-gray-500 sm:h-[25px] sm:text-base"></p>
          </div>
          <p className="skeleton h-[5px] w-[25%] text-xs text-gray-400 sm:h-[10px] sm:text-sm"></p>
        </div>
      </div>
    </div>
  );
}
