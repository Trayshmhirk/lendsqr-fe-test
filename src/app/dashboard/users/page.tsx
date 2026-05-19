import MetricCard from "@/components/MetricCard/MetricCard";
import gridStyles from "@/components/MetricCard/metric-grid.module.scss";

export default function UsersPage() {
  return (
    <div>
      <h1 style={{ color: "#213F7D", fontSize: "1.5rem", fontWeight: 500, marginBottom: "2rem" }}>Users</h1>

      {/* Grid wrapper holding all structural summary data widgets */}
      <section className={gridStyles.gridContainer}>
        <MetricCard icon="users-icon" title="Users" value="2,453" type="users" />
        <MetricCard icon="users-active-icon" title="Active Users" value="2,453" type="active" />
        <MetricCard icon="file-coins-icon" title="Users with Loans" value="12,453" type="loans" />
        <MetricCard icon="stacked-coins-icon" title="Users with Savings" value="102,453" type="savings" />
      </section>

      {/* Table Layer will mount directly under here */}
      <div style={{ color: "#545F7D" }}>
        <p>The 500-record data table component will be initialized here.</p>
      </div>
    </div>
  );
}
