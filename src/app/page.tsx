import BlogList from "@/components/blog/BlogList";

const Home = () => {
  return (
    <BlogList
      listAlias="Checkout the latest posts"
      blogs={[
        {
          id: "2025-07-05-dns-concepts",
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
  );
};

export default Home;
