import Image from "next/image";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center gap-5 pt-5 lg:gap-10 lg:pt-20">
      <Image
        src="/images/not_found.svg"
        alt="Frowny face indicating the page is not found"
        width={300}
        height={150}
      />
      <div className="flex flex-col items-center gap-5">
        <p className="text-2xl font-bold lg:text-5xl">Uh oh!</p>
        <p className="text-t-subtle text-center text-base whitespace-pre lg:text-lg">
          {
            "Can't find the page you're looking for.\nDouble check if the address is correct."
          }
        </p>
      </div>
    </div>
  );
}
