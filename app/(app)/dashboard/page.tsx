import PageHeader from "@/components/layout/PageHeader";
import { pageMeta } from "@/lib/nav";
import { dashboardKpis } from "@/data/mock";
import KpiCard from "@/components/dashboard/KpiCard";
import OnboardingCard from "@/components/dashboard/OnboardingCard";
import VisitsChart from "@/components/dashboard/VisitsChart";
import TierBars from "@/components/dashboard/TierBars";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import InactivesList from "@/components/dashboard/InactivesList";
import CampaignsPreview from "@/components/dashboard/CampaignsPreview";

export default function DashboardPage() {
  const [title, subtitle] = pageMeta.dashboard;
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {/* Colonne principale + colonne latérale */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <VisitsChart />
          <ActivityFeed />
          <CampaignsPreview />
        </div>
        <div className="space-y-4">
          <OnboardingCard />
          <TierBars />
          <InactivesList />
        </div>
      </div>
    </>
  );
}
