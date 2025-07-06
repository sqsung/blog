interface BlogTitleProps {
  title: string;
  summary: string;
}

const BlogTitle = ({ title, summary }: BlogTitleProps) => {
  return (
    <div className="mb-5 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold">{title}</h1>
        <h2 className="text-t-subtle text-lg">{summary}</h2>
      </div>
    </div>
  );
};

export default BlogTitle;
