interface DividerProps {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ direction = "horizontal" }: DividerProps) => {
  return <div className="border-b-primary w-full border-b"></div>;
};

export default Divider;
