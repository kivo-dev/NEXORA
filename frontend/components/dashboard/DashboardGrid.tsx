import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { AllocationCard } from "@/components/dashboard/AllocationCard";
import { PerformanceCard } from "@/components/dashboard/PerformanceCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { WatchlistCard } from "@/components/dashboard/WatchlistCard";
import { QuickActions } from "@/components/dashboard/QuickActions";

/**
 * Composes the dashboard's widgets into a responsive 12-column grid.
 * Each widget owns its own mock data by default and can later be wired
 * to live props once the backend API is connected.
 */
export function DashboardGrid() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <WelcomeCard />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PortfolioOverview />
        </div>
        <div className="lg:col-span-4">
          <HealthScoreCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PerformanceCard />
        </div>
        <div className="lg:col-span-4">
          <AllocationCard />
        </div>
      </div>

      <InsightCard />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TransactionsTable />
        </div>
        <div className="lg:col-span-5">
          <WatchlistCard />
        </div>
      </div>

      <QuickActions />
    </div>
  );
}
