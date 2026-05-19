import Image from "next/image";
import styles from "./metric-card.module.scss";

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  type: "users" | "active" | "loans" | "savings"; // Controls the color modifier class
}

export default function MetricCard({ icon, title, value, type }: MetricCardProps) {
  // Safe string concatenation for clean BEM modifier selection
  const iconClass = `${styles.iconWrapper} ${styles[`iconWrapper--${type}`]}`;

  return (
    <div className={styles.card}>
      <div className={iconClass}>
        <Image src={`/icons/${icon}.svg`} alt="" width={20} height={20} />
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
