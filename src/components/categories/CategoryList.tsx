import { CategoryListItem } from ".";

interface CategoryListProps {
  categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="mt-5 flex grid-cols-2 flex-col gap-5 pb-5 md:grid">
      {categories.map((category, index) => (
        <CategoryListItem key={index} category={category} />
      ))}
    </div>
  );
}
