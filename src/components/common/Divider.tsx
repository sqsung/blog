import { twMerge } from "tailwind-merge";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  className?: string;
}

const Divider = ({
  direction = "horizontal",
  className = "",
}: DividerProps) => {
  if (direction === "vertical") {
    return (
      <div
        className={twMerge(
          `border-b-primary w-px self-stretch border-l`,
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={twMerge(`border-b-primary h-px w-full border-b`, className)}
      aria-hidden="true"
    />
  );
};

export default Divider;
