import Divider from "@/components/common/Divider";
import Biography from "@/components/about/Biography";
import AuthorInfo from "@/components/about/AuthorInfo";

const AboutAuthorPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <h2 className="text-center text-3xl font-bold lg:text-start lg:text-5xl">
        About the Author
      </h2>
      <Divider />
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
        <AuthorInfo />
        <Divider direction="vertical" />
        <Biography />
      </div>
    </div>
  );
};

export default AboutAuthorPage;
