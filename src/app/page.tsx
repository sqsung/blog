import { getAllPosts } from "@/backend/posts.server";
import BlogList from "@/components/blog/BlogList";
import SeeMoreButton from "@/components/common/SeeMoreButton";
import { ROUTES } from "@/constants/routes.constant";

const LandingPage = () => {
  const { posts } = getAllPosts(1);

  return (
    <div className="flex flex-col items-center gap-10">
      <BlogList title="Checkout the latest posts" blogs={posts} />
      <SeeMoreButton href={ROUTES.posts(1)} text="See All Posts" />
    </div>
  );
};

export default LandingPage;
