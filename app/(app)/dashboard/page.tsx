import PageHeader from "@/components/layout/PageHeader";
import { pageMeta } from "@/lib/nav";
import { dashboardKpis } from "@/data/mock";
import KpiCard from "@/components/dashboard/KpiCard";
import OnboardingCard from "@/components/dashboard/OnboardingCard";
import VisitsChart from "@/components/dashboard/VisitsChart";
import ReturnDonut from "@/components/dashboard/ReturnDonut";
import TierBars from "@/components/dashboard/TierBars";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import InactivesList from "@/components/dashboard/InactivesList";
import CampaignsPreview from "@/components/dashboard/CampaignsPreview";

export default function DashboardPage() {
  const [title, subtitle] = pageMeta.dashboard;
  const [mainKpis, pointsKpi] = [dashboardKpis.slice(0, 3), dashboardKpis[3]];

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      <OnboardingCard />

      {/* KPIs */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {mainKpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <div className="mt-4">
        <KpiCard kpi={pointsKpi} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VisitsChart />
        </div>
        <div className="space-y-4">
          <ReturnDonut />
          <TierBars />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <InactivesList />
      </div>

      <div className="mt-4">
        <CampaignsPreview />
      </div>
    </>
  );
}
