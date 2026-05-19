"use client";

import MetricCard from "@/components/MetricCard/MetricCard";
import DataTable from "@/components/DataTable/DataTable";
import DashboardSkeleton from "@/components/Skeleton/DashboardSkeleton";
import gridStyles from "@/components/MetricCard/metric-grid.module.scss";
import { useUsers } from "@/hooks/useUsers";

export default function UsersPage() {
  const { data, stats, isLoading, error } = useUsers();

  return (
    <div>
      <h1 style={{ color: "#213F7D", fontSize: "1.5rem", fontWeight: 500, marginBottom: "2rem" }}>Users</h1>

      {/* 1. Loading State */}
      {isLoading && <DashboardSkeleton />}

      {/* 2. Error State */}
      {error && (
        <div style={{ padding: "2rem", backgroundColor: "#FCE8EC", color: "#E4033B", borderRadius: "4px" }}>
          <p>
            <strong>Error loading data:</strong> {error}
          </p>
        </div>
      )}

      {/* 3. Success State */}
      {!isLoading && !error && stats && data && (
        <>
          <section className={gridStyles.gridContainer}>
            <MetricCard icon="users-icon" title="Users" value={stats.totalUsers.toLocaleString()} type="users" />
            <MetricCard
              icon="users-active-icon"
              title="Active Users"
              value={stats.activeUsers.toLocaleString()}
              type="active"
            />
            <MetricCard
              icon="file-coins-icon"
              title="Users with Loans"
              value={stats.usersWithLoans.toLocaleString()}
              type="loans"
            />
            <MetricCard
              icon="stacked-coins-icon"
              title="Users with Savings"
              value={stats.usersWithSavings.toLocaleString()}
              type="savings"
            />
          </section>

          <DataTable records={data} />
        </>
      )}
    </div>
  );
}
