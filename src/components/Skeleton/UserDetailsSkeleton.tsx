import React from "react";
import styles from "./skeleton.module.scss";

export default function UserDetailsSkeleton() {
  return (
    <div>
      <div className={`${styles.shimmer} ${styles.skBack}`} />

      <div className={styles.detailsHeaderRow}>
        <div className={`${styles.shimmer} ${styles.skTitle}`} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className={`${styles.shimmer} ${styles.skBtn}`} />
          <div className={`${styles.shimmer} ${styles.skBtn}`} />
        </div>
      </div>

      <section className={styles.skDetailsCard}>
        <div style={{ display: "flex", gap: "1.875rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className={`${styles.shimmer} ${styles.skAvatar}`} />
            <div>
              <div className={`${styles.shimmer} ${styles.skTextLg}`} />
              <div className={`${styles.shimmer} ${styles.skTextSm}`} />
            </div>
          </div>
          <div style={{ width: "1px", height: "80px", backgroundColor: "rgba(84, 95, 125, 0.2)" }} />
          <div>
            <div className={`${styles.shimmer} ${styles.skTextSm}`} style={{ marginBottom: 12 }} />
            <div className={`${styles.shimmer} ${styles.skTextSm}`} />
          </div>
          <div style={{ width: "1px", height: "80px", backgroundColor: "rgba(84, 95, 125, 0.2)" }} />
          <div>
            <div className={`${styles.shimmer} ${styles.skTextLg}`} />
            <div className={`${styles.shimmer} ${styles.skTextSm}`} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", overflowX: "hidden" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`${styles.shimmer} ${styles.skTab}`} style={{ margin: "1rem" }} />
          ))}
        </div>
      </section>

      <section className={styles.skDetailsContent}>
        {[1, 2, 3].map((section) => (
          <div
            key={section}
            style={{
              paddingBottom: "1.875rem",
              marginBottom: "1.875rem",
              borderBottom: "1px solid rgba(33, 63, 125, 0.1)",
            }}
          >
            <div className={`${styles.shimmer} ${styles.skSectionTitle}`} />
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.875rem" }}
            >
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div className={`${styles.shimmer} ${styles.skLabel}`} />
                  <div className={`${styles.shimmer} ${styles.skValue}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
