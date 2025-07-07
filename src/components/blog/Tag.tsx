interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <li className="transcolor cursor-pointer font-semibold text-indigo-500 hover:text-indigo-400">
      <p className="line-clamp-1 text-ellipsis">{tag.toUpperCase()}</p>
    </li>
  );
};

export default Tag;
