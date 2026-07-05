import Link from "next/link";

export const metadata = {
  title: "Dealer Landing | O'Neil Nissan",
  description:
    "Fast-loading, mobile-first dealership landing pages built for conversion and ARPAIBOT-ready lead capture.",
};

const inventory = [
  {
    id: "rogue",
    name: "2025 Nissan Rogue",
    subtitle: "SV AWD",
    price: "$32,995",
  },
  {
    id: "sentra",
    name: "2025 Nissan Sentra",
    subtitle: "SV FWD",
    price: "$22,745",
  },
  {
    id: "altima",
    name: "2025 Nissan Altima",
    subtitle: "SR AWD",
    price: "$29,995",
  },
  {
    id: "pathfinder",
    name: "2025 Nissan Pathfinder",
    subtitle: "SL 4WD",
    price: "$41,995",
  },
];

export default function Home({
  searchParams,
}: {
  searchParams?: { vehicle?: string };
}) {
  const vehiclePrefill = searchParams?.vehicle ?? "";
  const phone = "215-555-1234";

  return (
    <main
      style={{
        background: "#0b1120",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Above the fold: trust → action */}
      <section style={{ padding: "28px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#93c5fd",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              4.8⭐ rating • 1,200+ customers • <span style={{ color: "#fbbf24" }}>fast response</span>
            </p>
            <h1
              style={{
                fontSize: 42,
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Unlock Today’s Price in <span style={{ color: "#60a5fa" }}>30 seconds</span>
            </h1>
            <p style={{ color: "#cbd5e1", margin: "0 auto", maxWidth: 760 }}>
              View inventory, call instantly, get directions, and submit a lead that’s ARPAIBOT-ready for rapid follow-up.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
                marginTop: 8,
              }}
            >
              <a
                href="#lead"
                style={{
                  background: "#60a5fa",
                  color: "#0b1120",
                  padding: "12px 18px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Primary CTA: Unlock Price
              </a>

              <a
                href="#lead"
                style={{
                  border: "1px solid #334155",
                  padding: "12px 18px",
                  borderRadius: 10,
                  fontWeight: 700,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Secondary CTA: Schedule Test Drive
              </a>
            </div>

            {/* Click-to-call + directions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                marginTop: 14,
              }}
            >
              <a
                href={`tel:${phone.replace(/-/g, "")}`}
                style={{
                  background: "#16a34a",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Call Now
              </a>

              <a
                href="https://maps.google.com/?q=O'Neil+Nissan"
                style={{
                  background: "#2563eb",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory grid */}
      <section style={{ padding: "14px 16px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 14,
            }}
          >
            {inventory.map((v) => {
              const encoded = encodeURIComponent(v.name);
              return (
                <div
                  key={v.id}
                  style={{
                    border: "1px solid #1f2937",
                    borderRadius: 14,
                    padding: 14,
                    background: "#111827",
                  }}
                >
                  <div
                    style={{
                      background: "#1f2937",
                      borderRadius: 12,
                      aspectRatio: "16 / 10",
                      marginBottom: 12,
                    }}
                    aria-label={`${v.name} photo placeholder`}
                  />

                  <h3 style={{ margin: 0, fontSize: 18 }}>{v.name}</h3>
                  <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>{v.subtitle}</p>

                  <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <Link
                      href={`/?vehicle=${encoded}#lead`}
                      style={{
                        background: "#60a5fa",
                        color: "#0b1120",
                        textDecoration: "none",
                        padding: "10px 14px",
                        borderRadius: 10,
                        fontWeight: 700,
                      }}
                      prefetch={false}
                    >
                      Unlock Deal
                    </Link>

                    <a
                      href={`tel:${phone.replace(/-/g, "")}`}
                      style={{
                        border: "1px solid #334155",
                        textDecoration: "none",
                        padding: "10px 14px",
                        borderRadius: 10,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      Call
                    </a>

                    <span style={{ marginTop: 10, display: "block", color: "#f1f5f9", fontWeight: 700 }}>
                      {v.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="lead" style={{ padding: "0 16px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div
            style={{
              border: "1px solid #1f2937",
              borderRadius: 16,
              padding: 18,
              background: "#111827",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22 }}>Request Today’s Price</h2>
            <p style={{ margin: "8px 0 16px", color: "#cbd5e1" }}>
              ARPAIBOT-ready data capture. Lead currently logs server-side, ready to connect to Twilio/CRM.
            </p>

            <form action="/api/lead" method="post" style={{ display: "grid", gap: 12 }}>
              <input type="hidden" name="source" value="home_page" />
              <input type="hidden" name="vehicle" value={vehiclePrefill} />

              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "#cbd5e1" }}>Name</span>
                <input
                  name="name"
                  required
                  placeholder="John Doe"
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                  }}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "#cbd5e1" }}>Phone</span>
                <input
                  name="phone"
                  required
                  inputMode="tel"
                  placeholder="215-555-1234"
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                  }}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "#cbd5e1" }}>Email</span>
                <input
                  name="email"
                  required
                  inputMode="email"
                  placeholder="john@example.com"
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                  }}
                />
              </label>

              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ color: "#cbd5e1" }}>Vehicle</span>
                <input
                  name="vehicle_display"
                  placeholder="Rogue"
                  defaultValue={vehiclePrefill}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "white",
                  }}
                />
              </label>

              <button
                type="submit"
                style={{
                  background: "#60a5fa",
                  color: "#0b1120",
                  fontWeight: 800,
                  padding: 12,
                  borderRadius: 12,
                  border: "none",
                }}
              >
                Submit Lead
              </button>

              <p style={{ color: "#64748b", margin: 0 }}>
                Privacy-ready: server-side handling with a clean API endpoint (currently console logging).
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
