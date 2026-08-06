import type { PaginationMeta } from "@/shared/types";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

// + Scroll
interface PaginationProps {
  // Theo API
  meta: PaginationMeta;
  // Function handle change on UI
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  meta,
  onPageChange,
  className,
}: PaginationProps) => {
  const { currentPage, totalPages, hasPreviousPage, hasNextPage } = meta;

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    const maxVisible = 5;
    const pages: (number | "...")[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(currentPage + 1, totalPages - 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            text="Trước"
            onClick={(e) => {
              e.preventDefault();
              if (hasPreviousPage) {
                onPageChange(currentPage - 1);
              }
            }}
            className={
              !hasPreviousPage
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            text="Sau"
            onClick={(e) => {
              e.preventDefault();
              if (hasNextPage) {
                onPageChange(currentPage + 1);
              }
            }}
            className={
              !hasNextPage
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

