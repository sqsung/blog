import { SmallAuthorProfile } from ".";
import { Divider } from "../common";

export default function PostHeaderSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <h1 className="skeleton title m-0 mb-2 leading-tight">Loading</h1>
      <p className="skeleton m-0 w-fit text-xs text-gray-600 sm:text-sm">
        Loading Loading
      </p>
      <p className="skeleton mt-1 w-fit text-xs text-gray-600 sm:text-sm">
        Loading Loading
      </p>
      <SmallAuthorProfile />
      <Divider />
    </div>
  );
}
