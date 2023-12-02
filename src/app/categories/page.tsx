import { ContactLinks, MainContents } from "@/components/common";
import { getCategories } from "../../../lib/posts";
import CategoryItem from "@/components/categories/CategoryItem";
import { SmallAuthorProfile } from "@/components/devlog";
import Divider from "@/components/common/Divider";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <MainContents>
      <div className="flex w-full flex-col px-5 lg:px-[25%]">
        <div className="px-2">
          <div className="flex items-center justify-between">
            <SmallAuthorProfile />
            <ContactLinks />
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
