import PlanningClient from "./planning-client";

export default function PlanningPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Planning</h1>
      <PlanningClient />
    </main>
  );
}