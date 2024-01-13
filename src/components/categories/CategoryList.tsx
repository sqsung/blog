import { CategoryListItem } from ".";

interface CategoryListProps {
  categories: string[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="mt-5 flex grid-cols-2 flex-col gap-3 pb-5 sm:grid">
      {categories.map((category, index) => (
        <CategoryListItem key={index} category={category} />
      ))}
    </div>
  );
}
