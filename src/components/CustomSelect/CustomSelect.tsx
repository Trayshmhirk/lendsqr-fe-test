"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./custom-select.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  variant?: "default" | "pagination";
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
  variant = "default",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"down" | "up">("down");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Calculate smart positioning when opening
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      // Rough height estimate (32px per item + padding).
      // If there's less than 200px below, flip it up.
      const estimatedDropdownHeight = options.length * 32 + 10;

      if (spaceBelow < estimatedDropdownHeight && rect.top > estimatedDropdownHeight) {
        setDropdownPosition("up");
      } else {
        setDropdownPosition("down");
      }
    }
  }, [isOpen, options.length]);

  return (
    <div className={`${styles.selectContainer} ${styles[`variant--${variant}`]}`} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${styles[`trigger--${variant}`]} ${isOpen ? styles.isOpen : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        <Image src="/icons/chevron-down.svg" alt="" width={12} height={12} className={styles.icon} />
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${styles[`position--${dropdownPosition}`]}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.isSelected : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
