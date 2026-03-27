import type { ToiletEntryInfo } from "../types";

const GATE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  "闸内": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "闸外": { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  "无": { bg: "bg-red-50", text: "text-red-400", border: "border-red-200" },
};

export function GateBadge({ gate }: { gate: string }) {
  const style = GATE_STYLES[gate] || GATE_STYLES["无"];
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold border ${style.bg} ${style.text} ${style.border}`}
    >
      {gate}
    </span>
  );
}

export function GateList({
  entries,
  compact = false,
}: {
  entries: ToiletEntryInfo[];
  compact?: boolean;
}) {
  const visible = entries.filter((e) => e.gate !== "无");
  if (!visible.length) {
    return (
      <div className="flex items-center gap-1.5">
        <GateBadge gate="无" />
        <span className="text-[10px] text-red-400">该站暂无厕所</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        {visible.map((e, i) => (
          <div key={i} className="flex items-center gap-1">
            <GateBadge gate={e.gate} />
            <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
              {e.location}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {visible.map((e, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <GateBadge gate={e.gate} />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-600 leading-snug">{e.location}</p>
            {e.note && (
              <p className="text-[10px] text-amber-600 mt-0.5">⚠ {e.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
