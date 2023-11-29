interface MainContentsProps {
  children: React.ReactNode;
}

export default function MainContents({ children }: MainContentsProps) {
  return (
    <main className="flex h-full w-full flex-grow justify-center">
      {children}
    </main>
  );
}
