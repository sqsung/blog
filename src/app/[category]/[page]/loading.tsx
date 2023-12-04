import {
  ContactLinks,
  MainContents,
  SmallAuthorProfile,
  Divider,
} from "@/components/common";
import { BlogListSkeleton } from "@/components/devlog";

export default function CategorizedPostsLoading() {
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
        <BlogListSkeleton number={4} />
      </div>
    </MainContents>
  );
}
