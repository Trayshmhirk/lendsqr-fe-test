import { useState, useMemo } from "react";

export interface UserRecord {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Pending" | "Inactive" | "Blacklisted";
}

export function useTableState(initialData: UserRecord[]) {
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Overlay Visibility States
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const [activeRowMenuId, setActiveRowMenuId] = useState<string | null>(null);

  // Form Filter State fields
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  // Active criteria applied to filter the table dataset
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // 1. Core Filtration Logic
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      return (
        (!appliedFilters.organization ||
          item.organization.toLowerCase().includes(appliedFilters.organization.toLowerCase())) &&
        (!appliedFilters.username || item.username.toLowerCase().includes(appliedFilters.username.toLowerCase())) &&
        (!appliedFilters.email || item.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) &&
        (!appliedFilters.phoneNumber || item.phoneNumber.includes(appliedFilters.phoneNumber)) &&
        (!appliedFilters.status || item.status === appliedFilters.status)
      );
    });
  }, [initialData, appliedFilters]);

  // 2. Computed Pagination Metrics
  const totalRecords = filteredData.length;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  // 3. Action Handlers
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setActiveFilterColumn(null);
  };

  const handleResetFilters = () => {
    const fresh = { organization: "", username: "", email: "", date: "", phoneNumber: "", status: "" };
    setFilters(fresh);
    setAppliedFilters(fresh);
    setCurrentPage(1);
    setActiveFilterColumn(null);
  };

  const toggleFilterColumn = (columnName: string) => {
    setActiveFilterColumn(activeFilterColumn === columnName ? null : columnName);
    setActiveRowMenuId(null);
  };

  const toggleRowMenu = (rowId: string) => {
    setActiveRowMenuId(activeRowMenuId === rowId ? null : rowId);
    setActiveFilterColumn(null);
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
    paginatedData,
    totalRecords,
    totalPages,
    activeFilterColumn,
    toggleFilterColumn,
    activeRowMenuId,
    toggleRowMenu,
    handleApplyFilters,
    handleResetFilters,
  };
}
