import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CampaignsPreview } from "@/components/dashboard/CampaignsPreview";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist";
import { ReactivationList } from "@/components/dashboard/ReactivationList";
import { TierBreakdown } from "@/components/dashboard/TierBreakdown";
import { VisitsChart } from "@/components/dashboard/VisitsChart";
import {
  campaignsPreview,
  dashboardKpis,
  onboardingSteps,
  reactivationClients,
  recentActivity,
  tierBreakdown,
  weeklyVisits,
} from "@/data/mock";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Tableau de bord</h1>
        <p className="mt-1 text-sm text-text-3">Vue d&apos;ensemble de votre programme de fidélité</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <OnboardingChecklist steps={onboardingSteps} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VisitsChart data={weeklyVisits} />
        </div>
        <TierBreakdown data={tierBreakdown} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed items={recentActivity} />
        </div>
        <ReactivationList clients={reactivationClients} />
      </div>

      <CampaignsPreview campaigns={campaignsPreview} />
    </div>
  );
}
