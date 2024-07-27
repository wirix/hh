"use client";

import { useRouter } from "next/navigation";

import {
  Pagination as PaginationLib,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Pagination = ({
  activePage,
  totalItems,
  itemsPage = 4,
}: {
  activePage: number;
  totalItems: number;
  itemsPage?: number;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / itemsPage);
  if (totalPages <= 1) return null;

  const togglePage = (count: 1 | -1) => {
    searchParams.set("page", String(activePage + count));
    router.push(`/vacancies?${searchParams.toString()}`);
    router.refresh();
  };

  const setPage = (page: number) => {
    searchParams.set("page", String(page));
    router.push(`/vacancies?${searchParams.toString()}`);
    router.refresh();
  };

  const pages: (number | string)[] = [];

  if (totalPages > 6) {
    pages.push(1);

    if (activePage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, activePage - 1);
    const end = Math.min(totalPages - 1, activePage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (activePage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <PaginationLib>
      <PaginationContent>
        {activePage !== 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => togglePage(-1)} />
          </PaginationItem>
        )}
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem
                className="cursor-pointer"
                key={`ellipsis-${index}`}
              >
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            const pageNumber = page as number;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={activePage === pageNumber}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        {activePage !== totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={() => togglePage(1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationLib>
  );
};
