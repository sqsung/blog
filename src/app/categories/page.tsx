import { getCategories } from "../../../lib/posts";
import { CategoryItem } from "@/components/categories";
import { MainContents, Divider } from "@/components/common";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <MainContents>
      <div className="flex w-full flex-col p-5 sm:gap-5 lg:px-[25%]">
        <div className="flex flex-col gap-1 px-5 sm:gap-3">
          <p className="title-text text-[30px] font-bold">All Categories</p>
          <p className="subtle-text text-[18px]">
            {categories.length} categories to read from
          </p>
          <Divider />
        </div>
        <div className="mt-5 flex grid-cols-2 flex-col gap-3 pb-5 sm:grid">
          {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </div>
      </div>
    </MainContents>
  );
}
