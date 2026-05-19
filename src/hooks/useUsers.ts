import { useState, useEffect } from "react";
import { UserRecord } from "./useTableState";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export function useUsers() {
  const [data, setData] = useState<UserRecord[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to load users data");

        const json = await res.json();
        setStats(json.stats);
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  return { data, stats, isLoading, error };
}
