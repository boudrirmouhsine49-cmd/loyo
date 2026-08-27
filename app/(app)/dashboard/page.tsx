import PageHeader from "@/components/layout/PageHeader";
import { pageMeta } from "@/lib/nav";
import { getDashboardData } from "@/model/dashboard";
import KpiCard from "@/components/dashboard/KpiCard";
import OnboardingCard from "@/components/dashboard/OnboardingCard";
import VisitsChart from "@/components/dashboard/VisitsChart";
import ReturnDonut from "@/components/dashboard/ReturnDonut";
import TierBars from "@/components/dashboard/TierBars";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import InactivesList from "@/components/dashboard/InactivesList";
import CampaignsPreview from "@/components/dashboard/CampaignsPreview";

// VIEW (Server Component) — appelle le Model directement pour son rendu
// serveur (le fonctionnement standard de Next.js), puis se contente de
// distribuer les données aux composants d'affichage. Aucun calcul ici :
// tout est déjà prêt à afficher.
export default function DashboardPage() {
  const [title, subtitle] = pageMeta.dashboard;
  const data = getDashboardData();
  const [mainKpis, pointsKpi] = [data.kpis.slice(0, 3), data.kpis[3]];

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />

      <OnboardingCard
        steps={data.onboarding.steps}
        done={data.onboarding.done}
        total={data.onboarding.total}
        pct={data.onboarding.pct}
      />

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
          <VisitsChart points={data.visitsTrend.points} growthPct={data.visitsTrend.growthPct} />
        </div>
        <div className="space-y-4">
          <ReturnDonut pct={data.returnRatePct} />
          <TierBars tiers={data.tierBreakdown} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed items={data.recentActivity} />
        </div>
        <InactivesList clients={data.inactiveClients.clients} urgentCount={data.inactiveClients.urgentCount} />
      </div>

      <div className="mt-4">
        <CampaignsPreview campaigns={data.campaignsPreview} />
      </div>
    </>
  );
}
