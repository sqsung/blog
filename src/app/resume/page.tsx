import { MainContents, BackButton } from "@/components/common";

export default function ResumePage() {
  return (
    <MainContents>
      <div className="w-full border border-red-400">
        <BackButton />
        <p>This is going to be used as a resume page!</p>
      </div>
    </MainContents>
  );
}
