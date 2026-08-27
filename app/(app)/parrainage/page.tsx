import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import { pageMeta } from "@/lib/nav";

export default function Page() {
  const [title, subtitle] = pageMeta["parrainage"];
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Card>
        <p className="text-[14px] text-text-3">
          Cet écran arrive bientôt. On le construira à l&apos;étape suivante.
        </p>
      </Card>
    </>
  );
}
