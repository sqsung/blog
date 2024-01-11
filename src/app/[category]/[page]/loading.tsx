import { MainContents, Divider } from "@/components/common";
import { BlogListSkeleton } from "@/components/devlog";

export default function CategorizedPostsLoading() {
  return (
    <MainContents>
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-1 p-5 sm:mb-5 sm:px-[10%] md:px-[15%]">
          <p className="skeleton w-fit text-[30px] font-bold">category</p>
          <p className="skeleton w-fit text-[18px]">A total of 00 posts</p>
          <Divider />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <BlogListSkeleton number={4} />
        </div>
      </div>
    </MainContents>
  );
}
