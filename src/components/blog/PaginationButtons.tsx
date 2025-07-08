"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  baseURL: string;
}

const PaginationButtons = ({
  page,
  totalPages,
  baseURL,
}: PaginationButtonsProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const normalizedBaseURL = baseURL.replace(/\/+$/, "");

  const router = useRouter();

  const onNextPage = () => {
    if (!isLastPage) {
      router.push(`${normalizedBaseURL}/${page + 1}`);
    }
  };

  const onPreviousPage = () => {
    if (!isFirstPage) {
      router.push(`${normalizedBaseURL}/${page - 1}`);
    }
  };

  return (
    <div className="flex w-full justify-between gap-5">
      {!isFirstPage && (
        <button
          onClick={onPreviousPage}
          className="transcolor hover:bg-background-secondary mr-auto flex cursor-pointer items-center gap-1 rounded-lg bg-transparent px-3 py-1 font-bold"
        >
          <ArrowLongLeftIcon className="h-6 w-6" />
          <span>Page {page - 1}</span>
        </button>
      )}
      {!isLastPage && (
        <button
          onClick={onNextPage}
          className="transcolor hover:bg-background-secondary ml-auto flex cursor-pointer items-center gap-1 rounded-lg bg-transparent px-3 py-1 font-bold"
        >
          <span>Page {page + 1}</span>
          <ArrowLongRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
