"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";
import styles from "./login.module.scss";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { email, setEmail, password, setPassword, errors, isLoading, handleLoginSubmit } = useLoginForm();

  return (
    <main className={styles.container}>
      {/* Left Pane - Branding & Illustration */}
      <section className={styles.leftPane}>
        <div className={styles.logoContainer}>
          <Image src="/img/logo.svg" alt="Lendsqr Logo" width={174} height={36} priority />
        </div>
        <div className={styles.illustrationContainer}>
          <Image src="/img/sign-in-illustration.svg" alt="Sign In Illustration" width={600} height={400} priority />
        </div>
      </section>

      {/* Right Pane - Login Form */}
      <section className={styles.rightPane}>
        <div className={styles.formWrapper}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form className={styles.form} onSubmit={handleLoginSubmit}>
            {errors.generic && <div className={styles.genericError}>{errors.generic}</div>}

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.hasError : ""}
              />
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div>
              <div className={styles.inputGroup}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? styles.hasError : ""}
                />
                <button type="button" className={styles.showPasswordBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <Link href="#" className={styles.forgotPassword}>
              Forgot Password?
            </Link>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
