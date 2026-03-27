import type React from "react";
import { Star, Users } from "lucide-react";
import type { CardInfo } from "../types";
import { trafficLabel, trafficColor, trafficBg } from "../constants";
import { GateBadge } from "./GateBadges";

interface Props {
  place: CardInfo;
  icon: React.ReactNode;
  onSelect: () => void;
}

export default function ListItem({ place, icon, onSelect }: Props) {
  const visibleEntries = place.toiletEntries?.filter((e) => e.gate !== "无") ?? [];

  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 bg-white/50 p-3 rounded-2xl border border-white/20 hover:bg-white/70 transition-colors text-left"
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
          place.category === "metro"
            ? "bg-blue-50 text-blue-500"
            : "bg-surface-container-low text-primary"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h4 className="font-bold text-sm truncate">{place.title}</h4>
          {place.category === "metro" && place.metroLine && (
            <span className="shrink-0 bg-blue-500/10 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
              {place.metroLine}
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-500">
          {place.distance ? `${place.distance} • ` : ""}{place.location}
        </p>
        {visibleEntries.length > 0 ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {visibleEntries.map((e, i) => (
              <div key={i} className="flex items-center gap-0.5">
                <GateBadge gate={e.gate} />
                <span className="text-[9px] text-slate-500 truncate max-w-[120px]">
                  {e.location}
                </span>
              </div>
            ))}
          </div>
        ) : place.toiletEntries && visibleEntries.length === 0 ? (
          <div className="mt-1">
            <GateBadge gate="无" />
          </div>
        ) : place.subtitle && place.subtitle !== place.location ? (
          <p className="text-[9px] text-slate-400 truncate max-w-[200px]">{place.subtitle}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-full">
          <span className="text-[10px] font-bold text-primary">{place.rating}</span>
          <Star className="w-3 h-3 text-primary fill-current" />
        </div>
        <div
          className={`flex items-center gap-1 ${trafficBg[place.traffic]} px-2 py-0.5 rounded-full`}
        >
          <Users className={`w-2.5 h-2.5 ${trafficColor[place.traffic]}`} />
          <span className={`text-[9px] font-bold ${trafficColor[place.traffic]}`}>
            {trafficLabel[place.traffic]}
          </span>
        </div>
      </div>
    </button>
  );
}
