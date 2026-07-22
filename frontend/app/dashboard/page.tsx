import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";

export default function DashboardPage() {
  const walletConnected = false;

  return (
    <DashboardLayout title="Dashboard">
      {walletConnected ? <DashboardGrid /> : <EmptyDashboard />}
    </DashboardLayout>
  );
}
