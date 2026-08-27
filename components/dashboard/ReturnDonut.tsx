import { returnRatePct } from "@/data/mock";
import Card from "@/components/ui/Card";

const SIZE = 120;
const STROKE = 13;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ReturnDonut() {
  const offset = CIRCUMFERENCE * (1 - returnRatePct / 100);

  return (
    <Card className="flex items-center gap-5">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0 -rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--bg-subtle)" strokeWidth={STROKE} />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--text)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
        <text
          x={SIZE / 2}
          y={SIZE / 2 - 4}
          textAnchor="middle"
          fill="var(--text)"
          fontSize="22"
          fontWeight="700"
          transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
        >
          {returnRatePct} %
        </text>
        <text
          x={SIZE / 2}
          y={SIZE / 2 + 14}
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="9"
          letterSpacing="0.05em"
          transform={`rotate(90 ${SIZE / 2} ${SIZE / 2})`}
        >
          RETOUR
        </text>
      </svg>

      <div>
        <div className="text-[15px] font-semibold">Taux de retour</div>
        <p className="mt-1 text-[12.5px] text-text-3">
          {returnRatePct} % de vos clients reviennent au moins une fois par mois.
        </p>
      </div>
    </Card>
  );
}
