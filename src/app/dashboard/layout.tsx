import React from "react";
import Topbar from "@/components/Topbar/Topbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutContainer}>
      <Topbar />

      <div className={styles.mainWrapper}>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>

        <main className={styles.contentWorkspace}>{children}</main>
      </div>
    </div>
  );
}
