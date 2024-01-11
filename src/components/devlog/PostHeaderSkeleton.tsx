export default function PostHeaderSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-5 flex w-full flex-col gap-5">
        <p className="skeleton text-xs sm:text-sm">category</p>
        <div>
          <h1 className="skeleton blog-title m-0 mb-2 leading-tight">
            Loading
          </h1>
          <p className="skeleton m-0 w-fit text-xs text-gray-600 sm:text-sm">
            Tag1 Tag2 Tag3 Tag4 Tag5
          </p>
        </div>
        <div>
          <p className="skeleton text-base sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            cupiditate accusantium soluta distinctio voluptatem esse veritatis
            eos, adipisci modi nostrum magnam, rerum quisquam. Impedit deserunt,
            sit minus ut id ipsam?
          </p>
          <div className="skeleton relative my-5 h-[300px] w-full overflow-hidden rounded-md sm:h-[300px]"></div>
        </div>
      </div>
    </div>
  );
}
