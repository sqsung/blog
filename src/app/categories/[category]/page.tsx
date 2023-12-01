import { BlogList, SmallAuthorProfile } from "@/components/devlog";
import { getPostsByCategory } from "../../../../lib/posts";
import { ContactLinks, MainContents } from "@/components/common";
import Divider from "@/components/common/Divider";
import Pagination from "@/components/common/Pagination";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorizedPosts = await getPostsByCategory(params.category);

  return (
    <MainContents>
      <div className="w-full px-2 sm:px-[15%]">
        <div className="px-2 sm:px-[15%]">
          <div className="flex items-center justify-between">
            <SmallAuthorProfile />
            <ContactLinks />
          </div>
          <Divider />
        </div>
        <BlogList blogs={categorizedPosts} isOnMain={false} />
        <Pagination />
      </div>
    </MainContents>
  );
}
