import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useDataTable<T extends { _id: string }>(
  data: T[],
  columns: { accessor: keyof T; header: string }[],
  itemsPerPage: number,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    const filtersFromUrl = searchParams.get("filters");
    const searchFromUrl = searchParams.get("search");
    const sortColumnFromUrl = searchParams.get("sortColumn");
    const sortDirectionFromUrl = searchParams.get("sortDirection") as "asc" | "desc";

    if (pageFromUrl) setPage(Number.parseInt(pageFromUrl));
    if (filtersFromUrl) setFilters(JSON.parse(filtersFromUrl));
    if (searchFromUrl) setSearchTerm(searchFromUrl);
    if (sortColumnFromUrl) setSortColumn(sortColumnFromUrl as keyof T);
    if (sortDirectionFromUrl) setSortDirection(sortDirectionFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("filters", JSON.stringify(filters));
    params.set("search", search);
    if (sortColumn) params.set("sortColumn", sortColumn as string);
    params.set("sortDirection", sortDirection);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [page, filters, search, sortColumn, sortDirection, router, searchParams]);

  const filteredAndSortedData = useMemo(() => {
    const result = data.filter((item: T) =>
      Object.entries(filters).every(([key, value]) => {
        const itemValue = item[key as keyof T];
        return value === "" || (typeof itemValue === "string" && itemValue.toLowerCase().includes(value.toLowerCase()));
      }) &&
      Object.values(item).some((value) => typeof value === "string" && value.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, filters, search, sortColumn, sortDirection]);

  const paginatedData = useMemo(() =>
      filteredAndSortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredAndSortedData, page, itemsPerPage]
  );

  const handleSort = useCallback((column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }, [sortColumn]);

  const handleFilterChange = useCallback((newFilters: Record<string, string>) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  return {
    page,
    setPage,
    filters,
    search,
    sortColumn,
    sortDirection,
    paginatedData,
    filteredAndSortedData,
    handleSort,
    handleFilterChange,
    handleSearchChange,
  };
}