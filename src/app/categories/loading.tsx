import { CategoryListSkeleton } from "@/components/categories";
import {
  ContactLinks,
  MainContents,
  Divider,
  SmallAuthorProfile,
} from "@/components/common";

export default function CategoriesLoading() {
  return (
    <MainContents>
      <div className="flex w-full flex-col px-5 sm:px-[25%]">
        <div className="px-2">
          <div className="flex items-center justify-between">
            <SmallAuthorProfile />
            <div className="flex flex-col">
              <ContactLinks />
              <p className="skeleton text-end text-sm italic">Category</p>
            </div>
          </div>
          <Divider />
        </div>
        <CategoryListSkeleton number={2} />
      </div>
    </MainContents>
  );
}
