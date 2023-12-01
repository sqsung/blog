"use client";

import { Pagination } from "@mui/material";

export default function PaginationRounded() {
  return (
    <Pagination
      className="border-test"
      count={10}
      variant="outlined"
      shape="rounded"
    />
  );
}
