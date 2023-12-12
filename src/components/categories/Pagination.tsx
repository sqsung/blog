"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";

interface PaginationRoundedProps {
  page: number;
  pagesCount: number;
  category: string;
}

export default function PaginationRounded({
  pagesCount,
  page,
  category,
}: PaginationRoundedProps) {
  const router = useRouter();

  return (
    <div className="mb-5 flex justify-center px-2 sm:px-[15%]">
      <Pagination
        defaultPage={+page}
        color="primary"
        count={pagesCount}
        shape="rounded"
        onChange={(_, newPage) => {
          if (+page !== newPage) router.push(`/${category}/${+newPage}`);
        }}
      />
    </div>
  );
}
