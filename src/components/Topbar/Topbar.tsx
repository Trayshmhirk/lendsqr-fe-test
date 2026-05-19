"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./topbar.module.scss";

export default function Topbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      // Hit our internal logout API route to nuke the server cookie
      await fetch("/api/auth/logout", { method: "POST" });

      // Wipe localStorage user cache entirely to keep data sandbox completely secure on signoff
      localStorage.clear();

      // Force a clean hard-refresh straight to login page so middleware validates the drop
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to execute session logout lifecycle:", error);
    }
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.leftSection}>
        {/* Mobile Hamburger Button */}
        <button className={styles.hamburgerBtn} onClick={toggleSidebar} aria-label="Toggle Menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#213F7D"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <Link href="/dashboard">
          <Image src="/img/logo.svg" alt="Lendsqr Logo" width={145} height={30} priority className={styles.logo} />
        </Link>

        <div className={styles.searchGroup}>
          <input type="text" placeholder="Search for anything" />
          <button className={styles.searchBtn} aria-label="Search Submit">
            <Image src="/icons/search.svg" alt="Search Icon" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className={styles.rightSection}>
        <Link href="#" className={styles.docsLink}>
          Docs
        </Link>

        <button className={styles.bellBtn} aria-label="Notifications">
          <Image src="/icons/notification-bell.svg" alt="Notification Bell" width={20} height={23} />
        </button>

        {/* Profile Wrapper Container */}
        <div className={styles.profileWrapper}>
          <div
            className={styles.profileBox}
            onClick={toggleDropdown}
            role="button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <Image src="/img/avatar.png" alt="Admin Avatar" width={40} height={40} className={styles.avatar} />
            <span className={styles.adminName}>Adedeji</span>
            <Image
              src="/icons/dropdown-arrow-filled.svg"
              alt="Dropdown Arrow"
              width={10}
              height={10}
              className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.arrowRotate : ""}`}
            />
          </div>

          {/* Clean Logout Menu Menu Overlay Dropdown */}
          {isDropdownOpen && (
            <div className={styles.profileDropdown}>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
