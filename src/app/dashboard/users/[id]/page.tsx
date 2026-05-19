"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUserDetails } from "@/hooks/useUserDetails";
import UserDetailsSkeleton from "@/components/Skeleton/UserDetailsSkeleton";
import NotFound from "@/components/NotFound/NotFound";
import styles from "./user-details.module.scss";

export default function UserDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { user, isLoading } = useUserDetails(id);

  if (isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (!user) {
    return (
      <div>
        <Link href="/dashboard/users" className={styles.backLink}>
          <Image src="/icons/back-arrow.svg" alt="Back" width={25} height={25} />
          Back to Users
        </Link>

        <NotFound
          title="User Not Found"
          message="The user profile you are looking for does not exist in the database or may have been removed."
          linkText="Return to Directory"
          linkHref="/dashboard/users"
        />
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/users" className={styles.backLink}>
        <Image src="/icons/back-arrow.svg" alt="Back" width={25} height={25} />
        Back to Users
      </Link>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actionButtons}>
          <button className={styles.btnBlacklist}>Blacklist User</button>
          <button className={styles.btnActivate}>Activate User</button>
        </div>
      </div>

      {/* Profile Header Card */}
      <section className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className={styles.avatarBox}>
              {/* If avatar is empty, use placeholder */}
              <Image src={user.profile.avatar || "/icons/user.svg"} alt="Avatar" width={30} height={30} />
            </div>

            <div className={styles.nameBox}>
              <h2>{user.profile.fullName}</h2>
              <p>{user.id.toUpperCase()}</p>
            </div>
          </div>

          <div className={styles.divider} />
          <div className={styles.tierBox}>
            <p>User&apos;s Tier</p>
            <div className={styles.stars}>
              {/* Render stars based on tier */}
              {Array.from({ length: 3 }).map((_, idx) => (
                <Image
                  key={idx}
                  src={idx < user.profile.tier ? "/icons/star-filled.svg" : "/icons/star-outline.svg"}
                  alt="Star"
                  width={14}
                  height={14}
                />
              ))}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.bankBox}>
            <h3>₦{user.profile?.balances?.accountBalance}</h3>
            <p>{user.profile?.balances?.bank}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.active}`}>General Details</div>
          <div className={styles.tab}>Documents</div>
          <div className={styles.tab}>Bank Details</div>
          <div className={styles.tab}>Loans</div>
          <div className={styles.tab}>Savings</div>
          <div className={styles.tab}>App and System</div>
        </div>
      </section>

      {/* Main Data Content Grid */}
      <section className={styles.detailsContent}>
        {/* Personal Information */}
        <div className={styles.section}>
          <h4>Personal Information</h4>
          <div className={styles.dataGrid}>
            <div className={styles.dataItem}>
              <span className={styles.label}>Full Name</span>
              <span className={styles.value}>{user.profile.personalInfo.fullName}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>{user.profile.personalInfo.phoneNumber}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>{user.profile.personalInfo.emailAddress}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Bvn</span>
              <span className={styles.value}>{user.profile.personalInfo.bvn}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{user.profile.personalInfo.gender}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Marital Status</span>
              <span className={styles.value}>{user.profile.personalInfo.maritalStatus}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Children</span>
              <span className={styles.value}>{user.profile.personalInfo.children}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Type of Residence</span>
              <span className={styles.value}>{user.profile.personalInfo.typeOfResidence}</span>
            </div>
          </div>
        </div>

        {/* Education and Employment */}
        <div className={styles.section}>
          <h4>Education and Employment</h4>
          <div className={`${styles.dataGrid} ${styles.grid4}`}>
            <div className={styles.dataItem}>
              <span className={styles.label}>Level of Education</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.levelOfEducation}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Employment Status</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.employmentStatus}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Sector of Employment</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.sectorOfEmployment}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Duration of Employment</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.durationOfEmployment}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Office Email</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.officeEmail}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Monthly Income</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.monthlyIncome}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Loan Repayment</span>
              <span className={styles.value}>{user.profile.educationAndEmployment.loanRepayment}</span>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className={styles.section}>
          <h4>Socials</h4>
          <div className={`${styles.dataGrid} ${styles.grid4}`}>
            <div className={styles.dataItem}>
              <span className={styles.label}>Twitter</span>
              <span className={styles.value}>{user.profile.socials.twitter}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Facebook</span>
              <span className={styles.value}>{user.profile.socials.facebook}</span>
            </div>
            <div className={styles.dataItem}>
              <span className={styles.label}>Instagram</span>
              <span className={styles.value}>{user.profile.socials.instagram}</span>
            </div>
          </div>
        </div>

        {/* Guarantor */}
        {user.profile.guarantors.map((guarantor, index) => (
          <div className={styles.section} key={index}>
            <h4>Guarantor {user.profile.guarantors.length > 1 ? index + 1 : ""}</h4>
            <div className={`${styles.dataGrid} ${styles.grid4}`}>
              <div className={styles.dataItem}>
                <span className={styles.label}>Full Name</span>
                <span className={styles.value}>{guarantor.fullName}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.label}>Phone Number</span>
                <span className={styles.value}>{guarantor.phoneNumber}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.label}>Email Address</span>
                <span className={styles.value}>{guarantor.emailAddress}</span>
              </div>
              <div className={styles.dataItem}>
                <span className={styles.label}>Relationship</span>
                <span className={styles.value}>{guarantor.relationship}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
