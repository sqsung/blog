import { MainContents } from "@/components/common";
import { EmptyBlogMessage, PostHeaderSkeleton } from "@/components/devlog";
import { CircularProgress } from "@mui/material";

export default function PostLoading() {
  return (
    <MainContents>
      <div className="flex h-full w-full flex-col content-center items-center gap-2 p-3 sm:gap-10 sm:p-10 lg:w-[50%]">
        <div className="w-full">
          <PostHeaderSkeleton />
        </div>
        <EmptyBlogMessage icon={<CircularProgress />} />
      </div>
    </MainContents>
  );
}
