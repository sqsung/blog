import { MainContents, Divider } from "@/components/common";
import { BlogListSkeleton } from "@/components/devlog";

export default function CategorizedPostsLoading() {
  return (
    <MainContents>
      <div className="w-full px-2 sm:px-[15%]">
        <div className="flex flex-col gap-1 p-5 sm:mb-5 sm:gap-3 sm:px-[15%]">
          <p className="skeleton w-fit text-[30px] font-bold">category</p>
          <p className="skeleton w-fit text-[18px]">A total of 00 posts</p>
          <Divider />
        </div>
        <BlogListSkeleton number={4} />
      </div>
    </MainContents>
  );
}
