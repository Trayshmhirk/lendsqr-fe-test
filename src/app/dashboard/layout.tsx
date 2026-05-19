"use client";

import React, { useState } from "react";
import Topbar from "@/components/Topbar/Topbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.scss";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.layoutContainer}>
      {/* Pass the toggle function to the Topbar */}
      <Topbar toggleSidebar={toggleSidebar} />

      <div className={styles.mainWrapper}>
        {/* Pass the state to the Sidebar wrapper */}
        <div className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.open : ""}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        {/* Clickable Mobile Overlay */}
        {isSidebarOpen && <div className={styles.mobileOverlay} onClick={closeSidebar} />}

        <main className={styles.contentWorkspace}>{children}</main>
      </div>
    </div>
  );
}
