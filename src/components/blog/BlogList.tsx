import { BlogMetadata } from "@/types/blog.types";
import BlogCard from "./BlogCard";

interface BlogListProps {
  title: string;
  subtitle?: string;
  blogs: BlogMetadata[];
}

const BlogList = ({ title, subtitle = "by sqsung", blogs }: BlogListProps) => {
  return (
    <ul className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-1 lg:mb-16">
        <h2 className="text-3xl font-bold lg:text-5xl">{title}</h2>
        <p className="text-t-subtle text-xl">{subtitle}</p>
      </div>

      {blogs.map((blog) => (
        <BlogCard key={blog.id} metadata={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
