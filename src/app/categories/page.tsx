import { getCategories } from "../../../lib/posts";
import { CategoryList } from "@/components/categories";
import { MainContents, Divider } from "@/components/common";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <MainContents>
      <div className="mt-10 flex w-full flex-col gap-5 lg:px-[25%]">
        <div className="flex flex-col px-5">
          <p className="title-text text-[30px] font-bold">All Categories</p>
          <p className="subtle-text text-[18px]">
            {categories.length} categories to read from
          </p>
          <Divider />
        </div>
        <CategoryList categories={categories} />
      </div>
    </MainContents>
  );
}
