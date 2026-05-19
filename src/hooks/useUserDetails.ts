import { useState, useEffect } from "react";
import { UserRecord } from "./useTableState";

// Exact interface matching your newly structured db.json
export interface UserDetails extends UserRecord {
  profile: {
    fullName: string;
    tier: number;
    avatar: string;
    balances: {
      accountBalance: string;
      bank: string;
    };
    personalInfo: {
      fullName: string;
      phoneNumber: string;
      emailAddress: string;
      bvn: string;
      gender: string;
      maritalStatus: string;
      children: string;
      typeOfResidence: string;
    };
    educationAndEmployment: {
      levelOfEducation: string;
      employmentStatus: string;
      sectorOfEmployment: string;
      durationOfEmployment: string;
      officeEmail: string;
      monthlyIncome: string;
      loanRepayment: string;
    };
    socials: {
      twitter: string;
      facebook: string;
      instagram: string;
    };
    guarantors: Array<{
      fullName: string;
      phoneNumber: string;
      emailAddress: string;
      relationship: string;
    }>;
  };
}

export function useUserDetails(id: string) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      // 1. Requirement: Retrieve from local storage
      const cacheKey = `lendsqr_user_${id}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setUser(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      try {
        // 2. Fetch from API if not in cache
        const res = await fetch("/api/users");
        const json = await res.json();

        // Find the specific user from your rich dataset
        const fullUser = json.data.find((u: UserDetails) => u.id === id);

        if (fullUser) {
          // 3. Requirement: Store to local storage for future visits
          localStorage.setItem(cacheKey, JSON.stringify(fullUser));
          setUser(fullUser);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, isLoading };
}
