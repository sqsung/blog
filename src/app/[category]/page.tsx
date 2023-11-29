import { MainContents } from "@/components/common";
import { getCategories } from "../../../lib/posts";
import CategoryItem from "@/components/categories/CategoryItem";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <MainContents>
      {categories.map((category, index) => (
        <CategoryItem key={index} category={category} />
      ))}
    </MainContents>
  );
}
