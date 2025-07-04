import Header from "@/shared/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-[800px] flex-col gap-10">
        <Header />
      </div>
    </div>
  );
}
