export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
          Alsmadi AI Agent
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
            marginBottom: "40px",
          }}
        >
          Multi-company AI-powered trade and operations platform.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <DashboardCard
            title="Companies"
            description="Manage multiple companies and business entities."
          />

          <DashboardCard
            title="Customers"
            description="Manage customers, contacts and communications."
          />

          <DashboardCard
            title="Suppliers"
            description="Manage suppliers and purchasing relationships."
          />

          <DashboardCard
            title="Products"
            description="Manage products, SKUs and product information."
          />

          <DashboardCard
            title="Inventory"
            description="Manage warehouses, stock and movements."
          />

          <DashboardCard
            title="Logistics"
            description="Track shipments, containers, ports and deliveries."
          />

          <DashboardCard
            title="AI Agent"
            description="AI-powered assistance for business operations."
          />
        </div>
      </section>
    </main>
  );
}

function DashboardCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{title}</h2>

      <p style={{ color: "#666", lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}
