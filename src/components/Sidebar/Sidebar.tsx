"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.scss";

interface SidebarItem {
  title: string;
  path: string;
  icon: string; // Dynamic file name mapping
}

interface SidebarGroup {
  category: string;
  items: SidebarItem[];
}

const MENU_DATA: SidebarGroup[] = [
  {
    category: "Customers",
    items: [
      { title: "Users", path: "/dashboard/users", icon: "users" },
      { title: "Guarantors", path: "/dashboard/guarantors", icon: "user-group" },
      { title: "Loans", path: "/dashboard/loans", icon: "money-sack" },
      { title: "Decision Models", path: "/dashboard/decision-models", icon: "handshake" },
      { title: "Savings", path: "/dashboard/savings", icon: "piggy-bank" },
      { title: "Loan Requests", path: "/dashboard/loan-requests", icon: "hand-sack" },
      { title: "Whitelist", path: "/dashboard/whitelist", icon: "user-check" },
      { title: "Karma", path: "/dashboard/karma", icon: "user-times" },
    ],
  },
  {
    category: "Businesses",
    items: [
      { title: "Organization", path: "/dashboard/organization", icon: "briefcase" },
      { title: "Loan Products", path: "/dashboard/loan-products", icon: "handshake" },
      { title: "Savings Products", path: "/dashboard/savings-products", icon: "bank" },
      { title: "Fees and Charges", path: "/dashboard/fees-charges", icon: "coins-solid" },
      { title: "Transactions", path: "/dashboard/transactions", icon: "transfer" },
      { title: "Services", path: "/dashboard/services", icon: "galaxy" },
      { title: "Service Account", path: "/dashboard/service-account", icon: "user-cog" },
      { title: "Settlements", path: "/dashboard/settlements", icon: "scroll" },
      { title: "Reports", path: "/dashboard/reports", icon: "chart-bar" },
    ],
  },
  {
    category: "Settings",
    items: [
      { title: "Preferences", path: "/dashboard/preferences", icon: "sliders" },
      { title: "Fees and Pricing", path: "/dashboard/fees-pricing", icon: "badge-percent" },
      { title: "Audit Logs", path: "/dashboard/audit-logs", icon: "clipboard-list" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Switch Organization Selector */}
      <div className={styles.orgSelector}>
        <Image src="/icons/briefcase.svg" alt="" width={16} height={16} />
        <span>Switch Organization</span>
        <Image src="/icons/chevron-down.svg" alt="" width={12} height={12} className={styles.arrow} />
      </div>

      {/* Fixed Dashboard Home Hub */}
      <div className={styles.navGroup}>
        <Link href="/dashboard" className={`${styles.navLink} ${pathname === "/dashboard" ? styles.active : ""}`}>
          <Image src="/icons/home.svg" alt="" width={16} height={16} />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Core Dynamic Asset Generation Iterations */}
      {MENU_DATA.map((group) => (
        <div key={group.category} className={styles.navGroup}>
          <h2 className={styles.groupTitle}>{group.category}</h2>
          {group.items.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={item.title} href={item.path} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className={isActive ? styles.iconActive : styles.iconInactive}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
