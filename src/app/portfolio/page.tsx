import { MainContents, BackButton } from "@/components/common";

export default function PortfolioPage() {
  return (
    <MainContents>
      <div className="w-full border border-red-400">
        <BackButton />
        <p>This is going to be used as a portfolio page!</p>
      </div>
    </MainContents>
  );
}
