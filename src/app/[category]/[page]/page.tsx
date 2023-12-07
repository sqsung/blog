import { getPostsByCategory } from "../../../../lib/posts";
import { BlogList } from "@/components/devlog";
import {
  Pagination,
  ContactLinks,
  MainContents,
  SmallAuthorProfile,
  Divider,
} from "@/components/common";

interface CategoryPageProps {
  params: {
    category: string;
    page: number;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { totalPages, categorizedPosts } = await getPostsByCategory(
    params.category,
    params.page,
  );

  return (
    <MainContents>
      <div className="w-full px-2 sm:px-[15%]">
        <div className="px-2 sm:px-[15%]">
          <div className="flex items-center justify-between">
            <SmallAuthorProfile />
            <div className="flex flex-col items-end">
              <ContactLinks />
              <p className="text-end text-xs italic text-gray-300 sm:text-sm">
                {params.category}
              </p>
            </div>
          </div>
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
