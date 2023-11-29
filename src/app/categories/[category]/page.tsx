import { BlogListItem } from "@/components/devlog";
import { getPostsByCategory } from "../../../../lib/posts";
import { MainContents } from "@/components/common";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const postsData = await getPostsByCategory(params.category);

  return (
    <MainContents>
      <div>
        <p>{params.category}</p>
        <ul>
          {postsData.map((post, index) => (
            <BlogListItem key={index} {...post} />
          ))}
        </ul>
      </div>
    </MainContents>
  );
}
