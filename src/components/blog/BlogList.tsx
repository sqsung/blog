import { BlogMetadata } from "@/types/blog.types";
import BlogCard from "./BlogCard";

interface BlogListProps {
  listAlias: string;
  blogs: BlogMetadata[];
}

const BlogList = ({ listAlias, blogs }: BlogListProps) => {
  return (
    <ul className="flex flex-col">
      <h2 className="mb-10 text-5xl font-bold">{listAlias}</h2>

      {blogs.map((blog) => (
        <BlogCard key={blog.id} metadata={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
