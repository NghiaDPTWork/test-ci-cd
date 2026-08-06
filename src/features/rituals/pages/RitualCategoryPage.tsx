import { useEffect, useState } from "react";
import { useRituals } from "../hooks/useRitual";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  Pagination,
} from "@/shared/components/common";
import { RitualCard, RitualFilters } from "../components";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

export default function RitualCategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDifficulty = searchParams.get("difficultLevel") || "all";
  const isHotParam = searchParams.get("isHot");
  const isHot =
    isHotParam === "true" ? true : isHotParam === "false" ? false : undefined;
  const [searchInput, setSearchInput] = useState<string>(
    searchParams.get("search") || "",
  );
  const debounedSearch = useDebounce(searchInput, 500);

  const { rituals, pagination, isLoading, isError, error, refetch } =
    useRituals({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 6,

      // undefined để loại bỏ giá trị rỗng khi không lọc
      search: searchParams.get("search") || undefined,
      difficultLevel: searchParams.get("difficultLevel") || undefined,

      // Boolean hoặc undefined
      isHot: isHot,
    });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  useEffect(() => {
    if (debounedSearch !== (searchParams.get("search") || "")) {
      handleFliterChange("search", debounedSearch || undefined);
    }
  }, [debounedSearch]);

  const handleIsHotChange = (value: boolean | undefined) => {
    handleFliterChange(
      "isHot",
      value === undefined ? undefined : String(value),
    );
  };

  const handleDifficultyChange = (difficulty: string) => {
    handleFliterChange(
      "difficultLevel",
      difficulty === "all" ? undefined : difficulty,
    );
  };

  const handleFliterChange = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Fliter xong rồi mới phân trang
    params.set("page", "1");
    setSearchParams(params);
  };

  if (isLoading) return <LoadingState />;
  if (isError)
    return (
      <ErrorState
        message={error?.message || "Lỗi tải danh sách nghi lễ"}
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Danh Sách Nghi Lễ
          </h1>
          <p className="text-sm text-muted-foreground">
            Tìm hiểu cách chuẩn bị và thực hiện các nghi lễ truyền thống.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <RitualFilters
        searchTerm={searchInput}
        onSearchChange={handleSearchChange}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={handleDifficultyChange}
        isHot={isHot}
        onIsHotChange={handleIsHotChange}
      />

      {/* Grid List */}
      {rituals.length === 0 ? (
        <EmptyState message="Không tìm thấy nghi lễ nào phù hợp với bộ lọc." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rituals.map((ritual) => (
            <RitualCard key={ritual.id} ritual={ritual} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <Pagination meta={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
