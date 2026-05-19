import styles from "./skeleton.module.scss";

export default function DashboardSkeleton() {
  return (
    <div>
      {/* 4 Cards Skeleton */}
      <div className={styles.grid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.card}>
            <div className={`${styles.shimmer} ${styles.icon}`} />
            <div className={`${styles.shimmer} ${styles.title}`} />
            <div className={`${styles.shimmer} ${styles.value}`} />
          </div>
        ))}
      </div>

      {/* Table Skeleton (Headers + 5 Rows) */}
      <div className={styles.table}>
        <div className={styles.headerRow}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`${styles.shimmer} ${styles.headerCell}`} />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className={styles.row}>
            {[1, 2, 3, 4, 5, 6].map((cell) => (
              <div key={cell} className={`${styles.shimmer} ${styles.cell}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
