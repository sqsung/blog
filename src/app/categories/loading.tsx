import { CategoryListSkeleton } from "@/components/categories";
import { MainContents, Divider } from "@/components/common";

export default function CategoriesLoading() {
  return (
    <MainContents>
      <div className="flex w-full flex-col p-5 sm:gap-5 lg:px-[25%]">
        <div className="flex flex-col px-5">
          <p className="title-text text-[30px] font-bold">All Categories</p>
          <p className="subtle-text text-[18px]">00 categories to read from</p>
          <Divider />
        </div>
        <CategoryListSkeleton number={4} />
      </div>
    </MainContents>
  );
}
