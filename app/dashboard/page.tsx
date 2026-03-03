import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Non autorisé</h1>
        <p>Va sur /login</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <LogoutButton />
      </div>

      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Session</h2>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}