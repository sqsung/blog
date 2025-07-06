import BlogList from "@/components/blog/BlogList";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-[1000px] flex-col gap-10">
        <Header />

        <BlogList
          listAlias="Checkout the latest posts"
          blogs={[
            {
              id: "1",
              title: "How does DNS work under the hood?",
              summary:
                "Core concepts you need to know to understand how your website is registered to the world wide web.",
              createdAt: "2025-07-04",
              tags: ["Network", "DNS"],
              category: "Network",
              isPublished: true,
            },
            {
              id: "2",
              title:
                "How does DNS work under the hood? For the length of the title. The CSS NextJS of the future",
              summary:
                "Core concepts you need to know to understand how your website is registered to the world wide web. The asdjkhjkfgh askhksafd askjdklasjd",
              createdAt: "2025-07-05",
              tags: ["Network", "DNS"],
              category: "Network",
              isPublished: true,
            },
            {
              id: "3",
              title: "How does DNS work under the hood?",
              summary:
                "Core concepts you need to know to understand how your website is registered to the world wide web.",
              createdAt: "2025-07-04",
              tags: ["Network", "DNS"],
              category: "Network",
              isPublished: true,
            },
          ]}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
