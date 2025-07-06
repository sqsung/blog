interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <li className="transcolor cursor-pointer font-semibold text-indigo-400 hover:text-indigo-500">
      {tag.toUpperCase()}
    </li>
  );
};

export default Tag;
