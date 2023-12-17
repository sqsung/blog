import { formatCategoryForUI, getPostsByCategory } from "../../../../lib/posts";
import { BlogList } from "@/components/devlog";
import { Pagination } from "@/components/categories";
import { MainContents, Divider } from "@/components/common";

interface CategoryPageProps {
  params: {
    category: string;
    page: number;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { totalPages, categorizedPosts, totalPosts } = await getPostsByCategory(
    params.category,
    params.page,
  );

  return (
    <MainContents>
      <div className="w-full px-2 sm:px-[15%]">
        <div className="flex flex-col gap-1 p-5 sm:mb-5 sm:gap-3 sm:px-[15%]">
          <p className="title-text text-[30px] font-bold">
            {formatCategoryForUI(params.category)}
          </p>
          <p className="subtle-text text-[18px]">
            A total of {totalPosts} post{totalPosts > 1 ? "s" : ""}
          </p>
          <Divider />
        </div>
        <BlogList blogs={categorizedPosts} isOnMain={false} />
        <Pagination
          pagesCount={totalPages}
          category={params.category}
          page={params.page}
        />
      </div>
    </MainContents>
  );
}
