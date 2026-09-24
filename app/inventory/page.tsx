"use client";

import { useEffect, useState } from "react";

type InventoryRow = {
  stock_id: string;
  warehouse_name: string;
  warehouse_code: string;
  sku: string;
  product_name: string;
  product_name_ar: string | null;
  category: string | null;
  brand: string | null;
  oem_number: string | null;
  condition: string | null;
  on_hand_qty: number;
  reserved_qty: number;
  available_qty: number;
  reorder_level: number;
  reorder_alert: boolean;
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await fetch("/api/inventory");

        if (!response.ok) {
          throw new Error("Failed to load inventory");
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  const totalOnHand = items.reduce(
    (sum, item) => sum + Number(item.on_hand_qty),
    0
  );

  const totalReserved = items.reduce(
    (sum, item) => sum + Number(item.reserved_qty),
    0
  );

  const totalAvailable = items.reduce(
    (sum, item) => sum + Number(item.available_qty),
    0
  );

  const alerts = items.filter((item) => item.reorder_alert).length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "34px" }}>
              Inventory Dashboard
            </h1>

            <p style={{ color: "#666", marginTop: "8px" }}>
              Alsmadi International Trade
            </p>
          </div>

          <a
            href="/"
            style={{
              textDecoration: "none",
              background: "#111",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
            }}
          >
            ← Dashboard
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "30px",
          }}
        >
          <StatCard title="Total Stock" value={totalOnHand} />
          <StatCard title="Reserved" value={totalReserved} />
          <StatCard title="Available" value={totalAvailable} />
          <StatCard title="Reorder Alerts" value={alerts} />
        </div>

        <section
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px" }}>
              Current Inventory
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: "40px", color: "#666" }}>
              Loading inventory...
            </div>
          ) : items.length === 0 ? (
            <div style={{ padding: "40px", color: "#666" }}>
              No inventory records found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "900px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={th}>SKU</th>
                    <th style={th}>Product</th>
                    <th style={th}>Warehouse</th>
                    <th style={th}>On Hand</th>
                    <th style={th}>Reserved</th>
                    <th style={th}>Available</th>
                    <th style={th}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => (
                    <tr key={item.stock_id}>
                      <td style={td}>
                        <strong>{item.sku}</strong>
                      </td>

                      <td style={td}>
                        {item.product_name_ar || item.product_name}
                        <div style={{ color: "#888", fontSize: "12px" }}>
                          {item.product_name}
                        </div>
                      </td>

                      <td style={td}>
                        {item.warehouse_name}
                        <div style={{ color: "#888", fontSize: "12px" }}>
                          {item.warehouse_code}
                        </div>
                      </td>

                      <td style={td}>{item.on_hand_qty}</td>

                      <td style={td}>{item.reserved_qty}</td>

                      <td style={td}>
                        <strong>{item.available_qty}</strong>
                      </td>

                      <td style={td}>
                        {item.reorder_alert ? (
                          <span
                            style={{
                              background: "#fee2e2",
                              color: "#b91c1c",
                              padding: "6px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                            }}
                          >
                            Reorder
                          </span>
                        ) : (
                          <span
                            style={{
                              background: "#dcfce7",
                              color: "#166534",
                              padding: "6px 10px",
                              borderRadius: "20px",
                              fontSize: "12px",
                            }}
                          >
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <div style={{ color: "#666", fontSize: "14px" }}>{title}</div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          marginTop: "8px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const th = {
  textAlign: "left" as const,
  padding: "14px 16px",
  fontSize: "13px",
  color: "#555",
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "16px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
};