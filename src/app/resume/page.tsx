import { MainContents, AuthorProfile, ContactLinks } from "@/components/common";

export default function ResumePage() {
  return (
    <MainContents>
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <AuthorProfile />
        <ContactLinks color="text-gray-400" />
      </div>
    </MainContents>
  );
}
