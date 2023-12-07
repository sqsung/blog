import { getCategories } from "../../../lib/posts";
import { CategoryItem } from "@/components/categories";
import { SmallAuthorProfile } from "@/components/devlog";
import { ContactLinks, MainContents, Divider } from "@/components/common";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <MainContents>
      <div className="flex w-full flex-col px-5 lg:px-[25%]">
        <div className="px-2">
          <div className="flex items-center justify-between">
            <SmallAuthorProfile />
            <div className="flex flex-col items-end">
              <ContactLinks />
              <p className="text-end text-xs italic text-gray-300 sm:text-sm">
                All Categories
              </p>
            </div>
          </div>
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
