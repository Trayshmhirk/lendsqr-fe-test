import { renderHook, act } from "@testing-library/react";
import { useTableState, UserRecord } from "../useTableState";

// Mock Data for our testing sandbox
const mockData: UserRecord[] = [
  {
    id: "1",
    organization: "Lendsqr",
    username: "Adedeji",
    email: "ade@test.com",
    phoneNumber: "123",
    dateJoined: "May",
    status: "Active",
  },
  {
    id: "2",
    organization: "Irorun",
    username: "Debby",
    email: "deb@test.com",
    phoneNumber: "456",
    dateJoined: "Apr",
    status: "Pending",
  },
  {
    id: "3",
    organization: "Lendsqr",
    username: "Grace",
    email: "grace@test.com",
    phoneNumber: "789",
    dateJoined: "Jun",
    status: "Blacklisted",
  },
];

describe("useTableState Hook", () => {
  // ==========================================
  // POSITIVE SCENARIO TESTING
  // ==========================================

  it("[Positive] should initialize with correct pagination metrics", () => {
    const { result } = renderHook(() => useTableState(mockData));

    // It should count all 3 records and default to page 1
    expect(result.current.totalRecords).toBe(3);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(10);
  });

  it("[Positive] should accurately filter users by exact Organization", () => {
    const { result } = renderHook(() => useTableState(mockData));

    act(() => {
      // Set the filter input
      result.current.setFilters({ ...result.current.filters, organization: "Irorun" });
    });

    act(() => {
      // Click "Apply"
      result.current.handleApplyFilters();
    });

    // Should only return Debby
    expect(result.current.paginatedData.length).toBe(1);
    expect(result.current.paginatedData[0].username).toBe("Debby");
  });

  it("[Positive] should accurately perform partial text matches on Username", () => {
    const { result } = renderHook(() => useTableState(mockData));

    act(() => {
      // Type "gra" into the username filter (lowercase to test case-insensitivity)
      result.current.setFilters({ ...result.current.filters, username: "gra" });
    });

    act(() => result.current.handleApplyFilters());

    // Should return Grace
    expect(result.current.paginatedData.length).toBe(1);
    expect(result.current.paginatedData[0].username).toBe("Grace");
  });

  // ==========================================
  // NEGATIVE SCENARIO TESTING
  // ==========================================

  it("[Negative] should return an empty array when filter criteria matches no users", () => {
    const { result } = renderHook(() => useTableState(mockData));

    act(() => {
      // Search for a non-existent user
      result.current.setFilters({ ...result.current.filters, username: "GhostUser99" });
    });

    act(() => result.current.handleApplyFilters());

    // Should gracefully return 0 records without crashing
    expect(result.current.paginatedData.length).toBe(0);
    expect(result.current.totalRecords).toBe(0);
  });

  it("[Negative] should reset safely to original data when filters are cleared", () => {
    const { result } = renderHook(() => useTableState(mockData));

    // First apply a bad filter
    act(() => {
      result.current.setFilters({ ...result.current.filters, status: "Inactive" });
    });
    act(() => result.current.handleApplyFilters());

    expect(result.current.paginatedData.length).toBe(0); // Zero results found

    // Now test the negative-recovery (Resetting)
    act(() => {
      result.current.handleResetFilters();
    });

    // Should bounce back to all 3 original records
    expect(result.current.paginatedData.length).toBe(3);
    expect(result.current.filters.status).toBe("");
  });
});
