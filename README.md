# Lendsqr Admin Console Portal (Frontend Assessment Submission)

This is a complete, pixel-perfect implementation of the Lendsqr Admin Dashboard built using **Next.js (App Router)**, **TypeScript**, and **SCSS Modules**. It covers everything from secure user authentication to a responsive directory data table and detailed user profiles.

## 🚀 Live Links

- **Live Deployment URL:** [https://micheal-osunbajo-lendsqr-fe-test.vercel.app](https://micheal-osunbajo-lendsqr-fe-test.vercel.app)
- **Core Engine Stack:** Next.js (v14+ App Router), TypeScript, SCSS (SASS) Modules, Jest, React Testing Library.

## 💻 Local Setup & Installation

1. Clone the project locally:

   ```bash
   git clone https://github.com/trayshmhirk/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

## 🛠️ Key Features & Implementation Details

### 1. Project Setup & Styling

- Built using Next.js App Router and strictly typed with TypeScript.
- Styled using SCSS Modules to keep styles isolated, modular, and easy to maintain.
- Handled global variables (colors, mixins, and responsive breakpoints) in an abstract configuration file.

### 2. Login & Route Guarding

- **Authentication System:** Built a custom login form hook (`useLoginForm`) to handle text entries and validation alerts.
- **Route Guards:** Created a server-side cookie middleware (`middleware.ts`). Unauthenticated users trying to access the dashboard are instantly redirected to the login screen, while authenticated users are kept away from the login page.
- **Root Redirection:** Configured the root path (`/`) to automatically check for active sessions and instantly route users to their correct destination.

### 3. Mock Database & Internal API (BFF Proxy)

- **Custom JSON Schema:** Designed a rich, deeply nested `db.json` database dataset containing realistic enterprise user fields (bank balances, employment records, multiple guarantors).
- **API Handler:** Built an internal Next.js route (`/api/users`) to serve the data safely. It caches the database response for 1 hour to prevent hitting external rate limits.

### 4. High-Fidelity Dashboard UI & Table Logic

- **Interactive Data Grid:** Implemented a full data table that displays key information across 500 mock users.
- **Search Filters:** Built an overlay filter panel allowing admins to search by Organization, Username, Email, Phone, Status, and Date.
- **Performance Optimization:** Wrapped filtration logic inside React `useMemo` hooks to keep searching lightning-fast without making repetitive network queries.
- **Custom Selectors:** Designed custom dropdown selectors from scratch to bypass generic browser input constraints.

### 5. Detailed Profiles & Local Storage Caching

- Created a dynamic profile route (`/dashboard/users/[id]`) displaying nested relational user blocks (Personal Information, Employment, Socials, and multiple Guarantors).
- Integrated `localStorage` caching inside the profile retrieval hook (`useUserDetails`) so profiles load instantly on repeat visits. Included a structure validator to automatically clean out old or invalid data records.
- Added a safe profile dropdown menu inside the top header row with a functional, cookie-clearing Logout button.

### 6. Shimmer Skeletons & Responsive Mobile UI

- **UX Shimmer Feedback:** Replaced generic loading text flags with custom structural shimmer blocks (`UserDetailsSkeleton` and dashboard cards) to match the visual footprint of asynchronous network loading loops.
- **Responsive Navigation:** Added tablet and mobile screen media queries, complete with a responsive top bar and an off-canvas drawer navigation drawer sidebar that automatically closes when routing links are selected.
- **Empty States:** Integrated a reusable `NotFound` component featuring dynamic text configurations and customizable icons to cleanly display when search queries return zero results or missing routes.

## 🧪 Testing Matrix

To guarantee application stability, the core business hooks are verified using Jest and React Testing Library under a standard virtual DOM runner environment.

- **`useLoginForm.test.ts`**: Validates form handling parameters for blank fields, incorrect regex emails, short passwords, back-end field rejection errors, and dashboard redirect executions.
- **`useTableState.test.ts`**: Validates correct index tracking, strict organizational filters, case-insensitive string parsing, and query reset recoveries.

Run the test runner locally via:

```bash
pnpm test
```
