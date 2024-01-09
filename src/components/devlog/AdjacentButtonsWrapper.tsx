import { AdjacentPostButton } from ".";
import { PostData } from "global";

interface AdjaceButtonsWrapperProps {
  prevPost: PostData | null;
  nextPost: PostData | null;
}

export default function AdjacentButtonsWrapper({
  prevPost,
  nextPost,
}: AdjaceButtonsWrapperProps) {
  return (
    <div className="mt-10 flex w-full flex-col gap-1">
      <div className="flex h-full w-full items-center justify-center gap-2 rounded-sm py-1 sm:gap-5">
        <AdjacentPostButton direction="previous" postData={prevPost} />
        <AdjacentPostButton direction="next" postData={nextPost} />
      </div>
    </div>
  );
}
