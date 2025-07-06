interface DividerProps {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ direction = "horizontal" }: DividerProps) => {
  if (direction === "vertical") {
    return (
      <div
        className={`border-b-primary w-px self-stretch border-l`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`border-b-primary h-px w-full border-b`}
      aria-hidden="true"
    />
  );
};

export default Divider;
