interface GrayLabelProps {
  text?: string;
}

export default function GrayLabel({ text = "-" }: GrayLabelProps) {
  return (
    <div className="w-fit rounded-sm bg-gray-100 px-1 sm:px-2">
      <p className="text-xs text-gray-500 sm:text-sm">{text}</p>
    </div>
  );
}
