import { getLatestPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";

const LandingPage = async () => {
  const posts = await getLatestPosts(1);

  return <BlogList listAlias="Checkout the latest posts" blogs={posts} />;
};

export default LandingPage;
