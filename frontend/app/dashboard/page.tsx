"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";
import { useWallet } from "@/contexts/WalletContext";

export default function DashboardPage() {
  const { walletAddress } = useWallet();

  const walletConnected = Boolean(walletAddress);

  return (
    <DashboardLayout title="Dashboard">
      {walletConnected ? <DashboardGrid /> : <EmptyDashboard />}
    </DashboardLayout>
  );
}
