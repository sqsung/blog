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
    <button
      className="group transcolor text-t-subtle hover:text-t-normal flex w-fit cursor-pointer items-center gap-1 pe-5"
      onClick={onBack}
    >
      <ArrowLongLeftIcon className="h-8 w-8" />
      <span className="text-lg font-bold">Back</span>
    </button>
  );
};
export default BackButton;
