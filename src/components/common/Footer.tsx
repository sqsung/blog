import { ContactLinks } from ".";

export default function Footer() {
  return (
    <div className="mt-auto flex h-[50px] items-center justify-between border-t-[1px] px-1 md:px-10">
      <p className="text-[10px] italic text-gray-300 md:text-sm">
        © 2023 sqsung devlog. All Rights Reserved.
      </p>
      <ContactLinks />
    </div>
  );
}
