interface MainContentsProps {
  children: React.ReactNode;
}

export default function MainContents({ children }: MainContentsProps) {
  return (
    <main className="flex h-full flex-grow justify-center px-[15%]">
      {children}
    </main>
  );
}
