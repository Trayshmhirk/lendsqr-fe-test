"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTableState, UserRecord } from "@/hooks/useTableState";
import styles from "./data-table.module.scss";
import CustomSelect from "@/components/CustomSelect/CustomSelect";

interface DataTableProps {
  records: UserRecord[];
}

export default function DataTable({ records }: DataTableProps) {
  const {
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
  } = useTableState(records);

  const columns = ["Organization", "Username", "Email", "Phone Number", "Date Joined", "Status"];

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.tableElement}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>
                  <div className={styles.headerCell} onClick={() => toggleFilterColumn(col)}>
                    <span>{col}</span>
                    <Image src="/icons/filter-list.svg" alt="Filter" width={16} height={12} />
                  </div>

                  {/* Filter Overlay Component Trigger */}
                  {activeFilterColumn === col && (
                    <div
                      className={`${styles.filterPopover} ${columns.indexOf(col) >= 3 ? styles.alignRight : ""}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label>
                        Organization
                        <CustomSelect
                          value={filters.organization}
                          onChange={(val) => setFilters({ ...filters, organization: val as string })}
                          options={[
                            { label: "Select", value: "" },
                            { label: "Lendsqr", value: "Lendsqr" },
                            { label: "Irorun", value: "Irorun" },
                            { label: "Lendstar", value: "Lendstar" },
                          ]}
                        />
                      </label>
                      <label>
                        Username
                        <input
                          type="text"
                          placeholder="User"
                          value={filters.username}
                          onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                        />
                      </label>
                      <label>
                        Email
                        <input
                          type="email"
                          placeholder="Email"
                          value={filters.email}
                          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                        />
                      </label>
                      <label>
                        Phone Number
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={filters.phoneNumber}
                          onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
                        />
                      </label>
                      <label>
                        Status
                        <CustomSelect
                          value={filters.status}
                          onChange={(val) => setFilters({ ...filters, status: val as string })}
                          options={[
                            { label: "Select", value: "" },
                            { label: "Active", value: "Active" },
                            { label: "Pending", value: "Pending" },
                            { label: "Inactive", value: "Inactive" },
                            { label: "Blacklisted", value: "Blacklisted" },
                          ]}
                        />
                      </label>
                      <div className={styles.buttonRow}>
                        <button className={styles.resetBtn} onClick={handleResetFilters}>
                          Reset
                        </button>
                        <button className={styles.submitBtn} onClick={handleApplyFilters}>
                          Filter
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id}>
                <td>{row.organization}</td>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.dateJoined}</td>

                <td>
                  <span className={`${styles.badge} ${styles[`badge--${row.status.toLowerCase()}`]}`}>
                    {row.status}
                  </span>
                </td>

                <td>
                  <div className={styles.actionWrapper}>
                    <button className={styles.actionBtn} onClick={() => toggleRowMenu(row.id)}>
                      <Image src="/icons/vertical-ellipsis.svg" alt="" width={14} height={14} />
                    </button>

                    {/* Actions Context Menu Overlay */}
                    {activeRowMenuId === row.id && (
                      <div
                        className={`${styles.actionsMenu} ${
                          paginatedData.indexOf(row) >= paginatedData.length - 2 ? styles.alignUp : ""
                        }`}
                      >
                        <Link href={`/dashboard/users/${row.id}`}>
                          <Image src="/icons/eye.svg" alt="" width={16} height={16} />
                          <span>View Details</span>
                        </Link>
                        <button onClick={() => alert("User Blacklisted")}>
                          <Image src="/icons/blacklist.svg" alt="" width={16} height={16} />
                          <span>Blacklist User</span>
                        </button>
                        <button onClick={() => alert("User Activated")}>
                          <Image src="/icons/activate.svg" alt="" width={16} height={16} />
                          <span>Activate User</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Pagination Control Row Footer */}
      <footer className={styles.paginationRow}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Showing
          <CustomSelect
            variant="pagination"
            value={itemsPerPage}
            onChange={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
            options={[
              { label: "10", value: 10 },
              { label: "20", value: 20 },
              { label: "50", value: 50 },
              { label: "100", value: 100 },
            ]}
          />
          out of {totalRecords}
        </div>

        <div className={styles.pagesList}>
          <button
            className={`${styles.navArrow} ${styles.navArrowLeft}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <Image src="/icons/chevron-down.svg" alt="" width={14} height={14} />
          </button>

          {getPages().map((page, index) => {
            if (page === "...") {
              return <span key={`ellipsis-${index}`}>...</span>;
            }
            return (
              <button
                key={page}
                className={currentPage === page ? styles.pageActive : ""}
                onClick={() => setCurrentPage(page as number)}
              >
                {page}
              </button>
            );
          })}

          <button
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Image src="/icons/chevron-down.svg" alt="" width={14} height={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
