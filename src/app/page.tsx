import BlogList from "@/components/blog/BlogList";
import Header from "@/components/common/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-[800px] flex-col gap-10">
        <Header />

        <div>
          <h2 className="text-5xl font-bold">Recent Posts</h2>
          <p className="text-lg text-zinc-400">by sqsung</p>
        </div>

        <BlogList
          blogs={[
            {
              title: "How does DNS work under the hood?",
              summary:
                "Core concepts you need to know to understand how your website is registered to the world wide web.",
              createdAt: "2025-07-04",
              tags: ["Network", "DNS"],
              category: "Network",
              isPublished: true,
              id: "1",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
