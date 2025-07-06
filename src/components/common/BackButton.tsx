"use client";

import { ROUTES } from "@/constants/routes.constant";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const onBack = () => {
    const referrer = document.referrer;
    const origin = window.location.origin;

    if (!referrer || !referrer.startsWith(origin)) {
      router.push(ROUTES.home());
    } else {
      router.back();
    }
  };

  return (
    <button className="group w-fit pe-5" onClick={onBack}>
      <ArrowLongLeftIcon className="text-t-subtle transcolor group-hover:text-t-normal h-10 w-10 cursor-pointer" />
    </button>
  );
};
export default BackButton;
