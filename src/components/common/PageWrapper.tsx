interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="border-test flex h-full min-h-screen w-full justify-center gap-5 px-[15%] py-10">
      {children}
    </div>
  );
}
