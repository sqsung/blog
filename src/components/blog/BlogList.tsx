import { BlogMetadata } from "@/types/blog.types";
import BlogCard from "./BlogCard";

interface BlogListProps {
  listAlias: string;
  blogs: BlogMetadata[];
}

const BlogList = ({ listAlias, blogs }: BlogListProps) => {
  return (
    <ul className="flex flex-col">
      <div className="mb-16 flex flex-col gap-1">
        <h2 className="text-5xl font-bold">{listAlias}</h2>
        <p className="text-t-subtle text-xl">by sqsung</p>
      </div>

      {blogs.map((blog) => (
        <BlogCard key={blog.id} metadata={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
