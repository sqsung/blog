import { ContactLinks } from ".";

export default function Footer() {
  return (
    <div className="mt-auto flex h-[50px] items-center justify-between border-t-[1px] px-10">
      <p className="text-sm italic text-gray-300">
        © 2023 sqsung devlog. All Rights Reserved.
      </p>
      <ContactLinks />
    </div>
  );
}
