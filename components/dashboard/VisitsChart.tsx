"use client";

import { useState } from "react";
import { weeklyVisitsTrend } from "@/data/mock";
import { fr } from "@/lib/format";
import Card from "@/components/ui/Card";

const W = 700;
const H = 180;
const Y_MAX = 950;
const Y_TOP_GRIDLINE = 800;

function points() {
  const n = weeklyVisitsTrend.length;
  return weeklyVisitsTrend.map((point, i) => {
    const x = (i / (n - 1)) * W;
    const y = H - (point.visits / Y_MAX) * H;
    return { ...point, x, y };
  });
}

export default function VisitsChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const pts = points();
  const first = weeklyVisitsTrend[0].visits;
  const last = weeklyVisitsTrend[weeklyVisitsTrend.length - 1].visits;
  const growthPct = Math.round(((last - first) / first) * 100);

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${W},${H} L0,${H} Z`;
  const lastPoint = pts[pts.length - 1];
  const activePoint = hovered !== null ? pts[hovered] : null;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[15px] font-semibold">Visites hebdomadaires</div>
          <p className="mt-0.5 text-[12.5px] text-text-3">
            12 dernières semaines · <span className="font-medium text-succes">+{growthPct} % sur la période</span>
          </p>
        </div>
        <span className="label flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-text" /> Visites
        </span>
      </div>

      <div className="relative mt-4">
        <span className="tnum pointer-events-none absolute top-0 left-0 text-[11px] text-text-muted">
          {fr(Y_TOP_GRIDLINE)}
        </span>
        <span className="tnum pointer-events-none absolute bottom-0 left-0 text-[11px] text-text-muted">0</span>

        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-btn-sm bg-btn px-2 py-1 text-[11px] whitespace-nowrap text-btn-text"
            style={{ left: `${(activePoint.x / W) * 100}%`, top: `${(activePoint.y / H) * 100}%`, marginTop: -8 }}
          >
            {activePoint.label} · {fr(activePoint.visits)} visites
          </div>
        )}

        <svg viewBox={`0 0 ${W} ${H}`} className="h-[180px] w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="visits-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--text)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--text)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line x1="0" y1={H - (Y_TOP_GRIDLINE / Y_MAX) * H} x2={W} y2={H - (Y_TOP_GRIDLINE / Y_MAX) * H} stroke="var(--border)" strokeWidth="1" />
          <line x1="0" y1={H} x2={W} y2={H} stroke="var(--border)" strokeWidth="1" />

          <path d={areaPath} fill="url(#visits-gradient)" />
          <path d={linePath} fill="none" stroke="var(--text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

          {pts.map((p, i) => (
            <circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r="10"
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="cursor-pointer"
            />
          ))}
          <circle cx={lastPoint.x} cy={lastPoint.y} r="4.5" fill="var(--text)" stroke="var(--bg-card)" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-2 flex justify-between border-t border-line-light pt-2 text-[11px] text-text-muted">
        <span>{weeklyVisitsTrend[0].label}</span>
        <span>{weeklyVisitsTrend[6].label}</span>
        <span>{weeklyVisitsTrend[weeklyVisitsTrend.length - 1].label}</span>
      </div>
    </Card>
  );
}
