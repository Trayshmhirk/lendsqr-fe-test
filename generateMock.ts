import * as fs from "fs";

// 1. Define the exact shape matching the Figma UI
interface UserProfile {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Pending" | "Blacklisted" | "Inactive";
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

// 2. Generate the data
const ORGANIZATIONS = ["Lendsqr", "Irorun", "Lendstar"];
const STATUSES: UserProfile["status"][] = ["Active", "Pending", "Blacklisted", "Inactive"];

const users: UserProfile[] = [];

for (let i = 1; i <= 500; i++) {
  const isEven = i % 2 === 0;

  users.push({
    id: `LSQFf587g${i.toString().padStart(2, "0")}`,
    organization: ORGANIZATIONS[i % ORGANIZATIONS.length],
    username: isEven ? "Grace Effiom" : "Tosin Dokunmu",
    email: isEven ? "grace@gmail.com" : "tosin@lendsqr.com",
    phoneNumber: "07060780922",
    dateJoined: "Apr 30, 2020 10:00 AM",
    status: STATUSES[i % STATUSES.length],
    profile: {
      fullName: isEven ? "Grace Effiom" : "Tosin Dokunmu",
      tier: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1,
      avatar: "",
      balances: {
        accountBalance: "200,000.00",
        bank: "9912345678/Providus Bank",
      },
      personalInfo: {
        fullName: isEven ? "Grace Effiom" : "Tosin Dokunmu",
        phoneNumber: "07060780922",
        emailAddress: isEven ? "grace@gmail.com" : "tosin@lendsqr.com",
        bvn: "07060780922",
        gender: isEven ? "Female" : "Male",
        maritalStatus: "Single",
        children: "None",
        typeOfResidence: "Parent's Apartment",
      },
      educationAndEmployment: {
        levelOfEducation: "B.Sc",
        employmentStatus: "Employed",
        sectorOfEmployment: "FinTech",
        durationOfEmployment: "2 years",
        officeEmail: isEven ? "grace@lendsqr.com" : "tosin@lendsqr.com",
        monthlyIncome: "₦200,000.00 - ₦400,000.00",
        loanRepayment: "40,000",
      },
      socials: {
        twitter: isEven ? "@grace_effiom" : "@tosin_dokunmu",
        facebook: isEven ? "Grace Effiom" : "Tosin Dokunmu",
        instagram: isEven ? "@grace_effiom" : "@tosin_dokunmu",
      },
      guarantors: [
        {
          fullName: "Debby Ogana",
          phoneNumber: "07060780922",
          emailAddress: "debby@gmail.com",
          relationship: "Sister",
        },
        {
          fullName: "Debby Ogana",
          phoneNumber: "07060780922",
          emailAddress: "debby@gmail.com",
          relationship: "Sister",
        },
      ],
    },
  });
}

// Override rows 1 and 2 to perfectly match the dashboard screenshot with deep profile merging
users[0] = {
  ...users[0],
  organization: "Lendsqr",
  username: "Adedeji",
  email: "adedeji@lendsqr.com",
  phoneNumber: "08078903721",
  dateJoined: "May 15, 2020 10:00 AM",
  status: "Inactive",
  profile: {
    ...users[0].profile,
    fullName: "Adedeji",
    personalInfo: {
      ...users[0].profile.personalInfo,
      fullName: "Adedeji",
      emailAddress: "adedeji@lendsqr.com",
      phoneNumber: "08078903721",
    },
  },
};

users[1] = {
  ...users[1],
  organization: "Irorun",
  username: "Debby Ogana",
  email: "debby2@irorun.com",
  phoneNumber: "08160780928",
  dateJoined: "Apr 30, 2020 10:00 AM",
  status: "Pending",
  profile: {
    ...users[1].profile,
    fullName: "Debby Ogana",
    personalInfo: {
      ...users[1].profile.personalInfo,
      fullName: "Debby Ogana",
      emailAddress: "debby2@irorun.com",
      phoneNumber: "08160780928",
    },
    // The guarantors array remains untouched, preserving the debby@gmail.com distinction!
  },
};

// 3. Write to file
fs.writeFileSync("db.json", JSON.stringify(users, null, 2));
console.log("Successfully generated 500 strict-typed records in db.json");
