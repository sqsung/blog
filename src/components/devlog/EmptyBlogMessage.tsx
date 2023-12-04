interface EmptyBlogMessageProps {
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyBlogMessage({
  message = "N/A",
  icon,
}: EmptyBlogMessageProps) {
  return (
    <div className="flex h-[500px] w-full items-center justify-center">
      <p className="font-bold italic text-gray-200">{icon ? icon : message}</p>
    </div>
  );
}
