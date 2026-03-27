import type { ToiletCategory } from "../types";
import { METRO_KEYWORDS, STATION_LINE_MAP, SORTED_STATION_NAMES } from "../data/metro-stations";

export function classifyPoi(
  name: string,
  address: string,
): { category: ToiletCategory; metroLine?: string } {
  const combined = `${name} ${address}`;

  const lineMatch = combined.match(/(\d{1,2})号线/);
  if (lineMatch) {
    return { category: "metro", metroLine: `${lineMatch[1]}号线` };
  }

  for (const station of SORTED_STATION_NAMES) {
    if (combined.includes(station)) {
      const lines = STATION_LINE_MAP[station];
      return { category: "metro", metroLine: lines[0] };
    }
  }

  const isMetro = METRO_KEYWORDS.some((kw) => combined.includes(kw));
  if (isMetro) return { category: "metro", metroLine: "未知线路" };

  return { category: "surface" };
}
