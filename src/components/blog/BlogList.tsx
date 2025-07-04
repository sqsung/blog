import { BlogMetadata } from "@/types/blog.types";
import BlogCard from "./BlogCard";

interface BlogListProps {
  blogs: BlogMetadata[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} metadata={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
