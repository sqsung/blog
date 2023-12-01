"use client";

import { useState } from "react";
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
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        onChange={(_, newPage) => {
          router.push(`/categories/${category}/${+newPage}`);
        }}
      />
    </div>
  );
}
