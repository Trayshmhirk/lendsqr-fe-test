import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.scss";

interface NotFoundProps {
  title?: string;
  message?: string;
  icon?: string;
  linkText?: string;
  linkHref?: string;
  transparent?: boolean;
}

export default function NotFound({
  title = "No Results Found",
  message = "The data you are looking for does not exist or may have been removed.",
  icon = "/icons/user-times.svg",
  linkText,
  linkHref,
  transparent = false,
}: NotFoundProps) {
  return (
    <div className={`${styles.notFoundContainer} ${transparent ? styles.transparent : ""}`}>
      <div className={styles.iconWrapper}>
        <Image
          src={icon}
          alt="Not Found Icon"
          width={32} // Reduced size because of the wrapper
          height={32}
        />
      </div>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>

      {linkText && linkHref && (
        <Link href={linkHref} className={styles.returnBtn}>
          {linkText}
        </Link>
      )}
    </div>
  );
}
