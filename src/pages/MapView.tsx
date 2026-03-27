import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Navigation,
  MapPin,
  Bookmark,
  ChevronUp,
  ChevronDown,
  Users,
  Search,
  Loader2,
  LocateFixed,
  TrainFront,
  Footprints,
  ListFilter,
} from "lucide-react";

import type { Traffic, ToiletCategory, CardInfo, PlaceInfo } from "../types";
import {
  SHENZHEN_LNG,
  SHENZHEN_LAT,
  PLACEHOLDER_IMAGES,
  STAT_TEMPLATES,
  TRAFFIC_HEX,
  trafficLabel,
  trafficColor,
  trafficBg,
} from "../constants";
import { classifyPoi } from "../utils/classify-poi";
import { formatDistance } from "../utils/format";
import { ALL_METRO_TOILETS, detectLineSearch, getToiletsByLine } from "../data/metro-toilets";
import { STATION_COORDS } from "../data/station-coords";
import ListItem from "../components/ListItem";
import { GateList } from "../components/GateBadges";

declare const AMap: any;

// ─── Mock data for fallback ─────────────────────────────────────────────────

const MOCK_ITEMS: { name: string; addr: string; cat: ToiletCategory; line?: string }[] = [
  { name: "公共卫生间", addr: "步行街东侧50米", cat: "surface" },
  { name: "商场洗手间", addr: "商场B1层", cat: "surface" },
  { name: "地铁1号线 世界之窗站卫生间", addr: "地铁1号线站厅层", cat: "metro", line: "1号线" },
  { name: "公园公厕", addr: "公园南门入口", cat: "surface" },
  { name: "地铁3号线 购物公园站卫生间", addr: "地铁3号线站厅", cat: "metro", line: "3号线" },
  { name: "医院公共卫生间", addr: "门诊楼一楼", cat: "surface" },
  { name: "地铁4号线 福田口岸站卫生间", addr: "地铁4号线B出口旁", cat: "metro", line: "4号线" },
  { name: "社区便民公厕", addr: "社区服务中心旁", cat: "surface" },
  { name: "地铁11号线 福田站卫生间", addr: "地铁11号线站厅", cat: "metro", line: "11号线" },
  { name: "超市洗手间", addr: "超市入口右侧", cat: "surface" },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function MapView({ onSelectDetail }: { onSelectDetail: (card: CardInfo) => void }) {
  const [activeCard, setActiveCard] = useState(0);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [allPlaces, setAllPlaces] = useState<PlaceInfo[]>([]);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [cardsMini, setCardsMini] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ToiletCategory>("all");
  const [metroLineFilter, setMetroLineFilter] = useState<string>("all");
  const [activeLineName, setActiveLineName] = useState<string | null>(null);
  const [selectedLinePlace, setSelectedLinePlace] = useState<PlaceInfo | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const onSelectDetailRef = useRef(onSelectDetail);
  const activeLineNameRef = useRef<string | null>(null);
  onSelectDetailRef.current = onSelectDetail;
  activeLineNameRef.current = activeLineName;

  // ─── Derived state ──────────────────────────────────────────────────────

  const toMeters = (distanceText: string): number => {
    const t = (distanceText || "").trim().toLowerCase();
    if (!t) return Number.MAX_SAFE_INTEGER;
    if (t.endsWith("km")) {
      const n = Number.parseFloat(t.replace("km", ""));
      return Number.isFinite(n) ? Math.round(n * 1000) : Number.MAX_SAFE_INTEGER;
    }
    if (t.endsWith("m")) {
      const n = Number.parseFloat(t.replace("m", ""));
      return Number.isFinite(n) ? Math.round(n) : Number.MAX_SAFE_INTEGER;
    }
    const n = Number.parseFloat(t);
    return Number.isFinite(n) ? Math.round(n) : Number.MAX_SAFE_INTEGER;
  };

  const filteredPlaces = allPlaces.filter((p) => {
    if (categoryFilter === "all") return true;
    if (p.category !== categoryFilter) return false;
    if (categoryFilter === "metro" && metroLineFilter !== "all") return p.metroLine === metroLineFilter;
    return true;
  });

  const topCards = filteredPlaces.slice(0, 3);
  // When a place is selected from map/list, always show a single fixed card.
  // If line-search is active but nothing selected yet, keep cards hidden.
  const displayedCards = selectedLinePlace ? [selectedLinePlace] : activeLineName ? [] : topCards;
  const activeCardData = displayedCards[activeCard];

  const availableMetroLines = [
    ...new Set(
      allPlaces
        .filter((p) => p.category === "metro")
        .map((p) => p.metroLine)
        .filter(Boolean),
    ),
  ] as string[];

  // ─── Map helpers ────────────────────────────────────────────────────────

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const addMarkers = useCallback((places: PlaceInfo[]) => {
    if (!mapRef.current) return;
    places.forEach((p) => {
      const icon = p.category === "metro" ? "🚇" : "🚻";
      const color = TRAFFIC_HEX[p.traffic];
      const el = document.createElement("div");
      el.style.cursor = "pointer";
      el.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center">
        <div style="background:${color};color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:12px;white-space:nowrap;box-shadow:0 2px 12px rgba(0,0,0,0.4);max-width:160px;overflow:hidden;text-overflow:ellipsis;transition:transform 0.15s">${icon} ${p.title}</div>
        <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid ${color}"></div>
      </div>`;

      const marker = new AMap.Marker({
        position: new AMap.LngLat(p.lng, p.lat),
        content: el,
        offset: new AMap.Pixel(-60, -32),
        map: mapRef.current,
      });

      marker.on("click", () => {
        // Marker click always previews in center card; detail is opened by card click only.
        setSelectedLinePlace(p);
        setCardsMini(false);
        setActiveCard(0);
      });

      el.addEventListener("mouseenter", () => {
        const label = el.querySelector("div > div:first-child") as HTMLElement;
        if (label) label.style.transform = "scale(1.1)";
      });
      el.addEventListener("mouseleave", () => {
        const label = el.querySelector("div > div:first-child") as HTMLElement;
        if (label) label.style.transform = "scale(1)";
      });

      markersRef.current.push(marker);
    });
  }, []);

  const placeUserMarker = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) return;
    if (userMarkerRef.current) userMarkerRef.current.setMap(null);
    const el = document.createElement("div");
    el.innerHTML = `<div style="width:20px;height:20px;border-radius:50%;background:#4285F4;border:3px solid #fff;box-shadow:0 0 0 2px rgba(66,133,244,0.3),0 2px 8px rgba(0,0,0,0.3)"></div>`;
    userMarkerRef.current = new AMap.Marker({
      position: [lng, lat],
      content: el,
      offset: new AMap.Pixel(-10, -10),
      map: mapRef.current,
    });
  }, []);

  // ─── Data helpers ───────────────────────────────────────────────────────

  const applyResults = useCallback(
    (cards: PlaceInfo[], lng: number, lat: number) => {
      cards.sort((a, b) => toMeters(a.distance) - toMeters(b.distance));
      setAllPlaces(cards);
      setActiveCard(0);
      setCategoryFilter("all");
      setMetroLineFilter("all");
      clearMarkers();
      addMarkers(cards);
      if (mapRef.current) {
        mapRef.current.setCenter([lng, lat]);
        mapRef.current.setZoom(15);
      }
    },
    [clearMarkers, addMarkers],
  );

  const generateNearbyMocks = useCallback(
    (lng: number, lat: number): PlaceInfo[] => {
      const trafficOptions: Traffic[] = ["low", "medium", "high"];
      return MOCK_ITEMS.map((item, i) => {
        const angle = (i / MOCK_ITEMS.length) * Math.PI * 2 + Math.random() * 0.5;
        const r = 0.002 + Math.random() * 0.008;
        const pLng = lng + r * Math.cos(angle);
        const pLat = lat + r * Math.sin(angle);
        const dist = Math.round(AMap.GeometryUtil.distance([lng, lat], [pLng, pLat]));
        return {
          title: item.name,
          location: item.addr,
          distance: formatDistance(dist),
          rating: (4.0 + Math.random() * 0.9).toFixed(1),
          image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
          traffic: trafficOptions[i % 3],
          subtitle: item.addr,
          category: item.cat,
          metroLine: item.line,
          stats: STAT_TEMPLATES[i % STAT_TEMPLATES.length],
          lng: pLng,
          lat: pLat,
        };
      });
    },
    [],
  );

  const searchNearby = useCallback(
    (lng: number, lat: number, keyword?: string) => {
      setLoading(true);
      const searchWord = keyword || "厕所|卫生间|洗手间";
      let done = false;

      const finish = (cards: PlaceInfo[]) => {
        if (done) return;
        done = true;
        applyResults(cards, lng, lat);
        setLoading(false);
      };

      const fallbackTimer = setTimeout(() => finish(generateNearbyMocks(lng, lat)), 10000);

      try {
        const ps = new AMap.PlaceSearch({ pageSize: 25, pageIndex: 1, extensions: "all" });
        ps.searchNearBy(searchWord, [lng, lat], 5000, (status: string, result: any) => {
          clearTimeout(fallbackTimer);
          const trafficOptions: Traffic[] = ["low", "medium", "high"];

          const keywordText = keyword?.trim().toLowerCase() || "";
          const isAddressSearch = Boolean(keywordText) && !detectLineSearch(keywordText);
          const toMetroCard = (st: (typeof ALL_METRO_TOILETS)[number], i: number): PlaceInfo | null => {
            const coord = STATION_COORDS[st.station];
            if (!coord) return null;
            const [mLng, mLat] = coord;
            const meters = Math.round(AMap.GeometryUtil.distance([lng, lat], [mLng, mLat]));
            const hasToilet = st.toilets.some((te) => te.gate !== "无");
            return {
              title: `${st.station}站`,
              location: st.line,
              distance: formatDistance(meters),
              rating: hasToilet ? "4.5" : "-",
              image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
              traffic: hasToilet ? trafficOptions[i % 3] : "high",
              subtitle: hasToilet
                ? st.toilets
                    .filter((te) => te.gate !== "无")
                    .map((te) => `【${te.gate}】${te.location}`)
                    .join(" ")
                : "该站暂无厕所",
              toiletEntries: st.toilets,
              category: "metro",
              metroLine: st.line,
              stats: STAT_TEMPLATES[i % STAT_TEMPLATES.length],
              lng: mLng,
              lat: mLat,
            };
          };

          const matchedMetro = ALL_METRO_TOILETS
            .filter((st) => {
              // Address search should show nearby metro from table data, not only keyword-matched station names.
              if (!keywordText || isAddressSearch) return true;
              const station = st.station.toLowerCase();
              const line = st.line.toLowerCase();
              return station.includes(keywordText) || line.includes(keywordText);
            })
            .map((st, i) => toMetroCard(st, i))
            .filter((p) => p !== null)
            .sort((a, b) => {
              const am = toMeters(a.distance);
              const bm = toMeters(b.distance);
              return am - bm;
            })
            .slice(0, keywordText ? 20 : 12);

          // For auto-location nearby mode, only keep nearby metro lines (avoid showing full city lines).
          const nearestLines = [...new Set(matchedMetro.slice(0, 8).map((m) => m.metroLine).filter(Boolean))].slice(0, 3);
          const nearbyMetro = matchedMetro.filter((m) => {
            const meters = toMeters(m.distance);
            if (keywordText && isAddressSearch) return meters <= 1000;
            if (keywordText) return meters <= 8000;
            return meters <= 5000 && nearestLines.includes(m.metroLine);
          }).slice(0, 8);

          if (status === "complete" && result.poiList?.pois?.length) {
            const surfaceCards: PlaceInfo[] = result.poiList.pois
              .map((poi: any, i: number) => {
              const pLng = poi.location.getLng();
              const pLat = poi.location.getLat();
              const dist = Math.round(AMap.GeometryUtil.distance([lng, lat], [pLng, pLat]));
              const cls = classifyPoi(poi.name, poi.address || "");
              return {
                title: poi.name,
                location: poi.adname || poi.cityname || "",
                distance: formatDistance(dist),
                rating: poi.biz_ext?.rating || (4.0 + Math.random() * 0.9).toFixed(1),
                image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
                traffic: trafficOptions[i % 3],
                subtitle: poi.address || "",
                category: cls.category,
                metroLine: cls.metroLine,
                stats: STAT_TEMPLATES[i % STAT_TEMPLATES.length],
                lng: pLng,
                lat: pLat,
              };
              })
              // Nearby search uses table data for metro toilets.
              .filter((p) => p.category !== "metro");

            finish([...surfaceCards, ...nearbyMetro]);
          } else {
            finish(nearbyMetro.length ? nearbyMetro : generateNearbyMocks(lng, lat));
          }
        });
      } catch {
        clearTimeout(fallbackTimer);
        const fallbackMetro = ALL_METRO_TOILETS
          .map((st, i) => {
            const coord = STATION_COORDS[st.station];
            if (!coord) return null;
            const [mLng, mLat] = coord;
            const meters = Math.round(AMap.GeometryUtil.distance([lng, lat], [mLng, mLat]));
            const hasToilet = st.toilets.some((te) => te.gate !== "无");
            return {
              title: `${st.station}站`,
              location: st.line,
              distance: formatDistance(meters),
              rating: hasToilet ? "4.5" : "-",
              image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
              traffic: hasToilet ? (["low", "medium", "high"] as Traffic[])[i % 3] : "high",
              subtitle: hasToilet
                ? st.toilets
                    .filter((te) => te.gate !== "无")
                    .map((te) => `【${te.gate}】${te.location}`)
                    .join(" ")
                : "该站暂无厕所",
              toiletEntries: st.toilets,
              category: "metro" as const,
              metroLine: st.line,
              stats: STAT_TEMPLATES[i % STAT_TEMPLATES.length],
              lng: mLng,
              lat: mLat,
            };
          })
          .filter((p) => p !== null)
          .sort((a, b) => toMeters(a.distance) - toMeters(b.distance))
          .filter((m) => toMeters(m.distance) <= 5000)
          .slice(0, 8);
        finish(fallbackMetro.length ? fallbackMetro : generateNearbyMocks(lng, lat));
      }
    },
    [applyResults, generateNearbyMocks],
  );

  // ─── Address search (resolve destination first, then nearby toilets) ────

  const searchByAddress = useCallback(
    (query: string) => {
      const q = query.trim();
      if (!q) return;

      const fallbackCenter = userPos ? [userPos[0], userPos[1]] : [SHENZHEN_LNG, SHENZHEN_LAT];
      setLoading(true);

      const doNearby = (lng: number, lat: number) => {
        setActiveLineName(null);
        setSelectedLinePlace(null);
        setCardsMini(false);
        searchNearby(lng, lat, q);
      };

      try {
        const ps = new AMap.PlaceSearch({ city: "深圳", pageSize: 1, pageIndex: 1, extensions: "base" });
        ps.search(q, (status: string, result: any) => {
          if (status === "complete" && result.poiList?.pois?.length) {
            const poi = result.poiList.pois[0];
            const pLng = poi.location?.getLng?.();
            const pLat = poi.location?.getLat?.();
            if (typeof pLng === "number" && typeof pLat === "number") {
              doNearby(pLng, pLat);
              return;
            }
          }
          // Fallback: search near current/default center so user always gets feedback.
          doNearby(fallbackCenter[0], fallbackCenter[1]);
        });
      } catch {
        doNearby(fallbackCenter[0], fallbackCenter[1]);
      }
    },
    [searchNearby, userPos],
  );

  // ─── Metro line search (static coordinates — instant) ──────────────────

  const searchMetroLine = useCallback(
    (lineName: string) => {
      setActiveLineName(lineName);
      setSelectedLinePlace(null);
      setCardsMini(false);
      setAllPlaces([]);
      clearMarkers();
      setActiveCard(0);

      const stations = getToiletsByLine(lineName);
      if (!stations.length) return;

      const trafficOptions: Traffic[] = ["low", "medium", "high"];
      const results: PlaceInfo[] = [];

      stations.forEach((st, i) => {
        const coord = STATION_COORDS[st.station];
        if (!coord) return;
        const [lng, lat] = coord;
        const hasToilet = st.toilets.some((te) => te.gate !== "无");

        results.push({
          title: `${st.station}站`,
          location: st.line,
          distance: "",
          rating: hasToilet ? "4.5" : "-",
          image: PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length],
          traffic: hasToilet ? trafficOptions[i % 3] : "high",
          subtitle: hasToilet
            ? st.toilets
                .filter((te) => te.gate !== "无")
                .map((te) => `【${te.gate}】${te.location}`)
                .join(" ")
            : "该站暂无厕所",
          toiletEntries: st.toilets,
          category: "metro",
          metroLine: st.line,
          stats: STAT_TEMPLATES[i % STAT_TEMPLATES.length],
          lng,
          lat,
        });
      });

      addMarkers(results);
      setAllPlaces(results);
      setActiveCard(0);
      setCategoryFilter("all");
      setMetroLineFilter("all");

      if (mapRef.current && results.length > 0) {
        const lngs = results.map((r) => r.lng);
        const lats = results.map((r) => r.lat);
        mapRef.current.setBounds(
          new AMap.Bounds(
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ),
          false,
          [60, 60, 200, 60],
        );
      }
    },
    [clearMarkers, addMarkers],
  );

  // ─── Geolocation ───────────────────────────────────────────────────────

  const relocateUser = useCallback(() => {
    if (!mapRef.current) return;
    setLoading(true);
    let resolved = false;

    const doSearch = (lng: number, lat: number) => {
      if (resolved) return;
      resolved = true;
      setActiveLineName(null);
      setSelectedLinePlace(null);
      setCardsMini(false);
      setUserPos([lng, lat]);
      mapRef.current?.setCenter([lng, lat]);
      mapRef.current?.setZoom(16);
      placeUserMarker(lng, lat);
      searchNearby(lng, lat);
    };

    setTimeout(() => doSearch(SHENZHEN_LNG, SHENZHEN_LAT), 6000);

    try {
      const geo = new AMap.Geolocation({ enableHighAccuracy: true, timeout: 5000 });
      geo.getCurrentPosition((status: string, result: any) => {
        if (status === "complete" && result.position) {
          doSearch(result.position.getLng(), result.position.getLat());
        } else {
          doSearch(SHENZHEN_LNG, SHENZHEN_LAT);
        }
      });
    } catch {
      doSearch(SHENZHEN_LNG, SHENZHEN_LAT);
    }
  }, [searchNearby, placeUserMarker]);

  // ─── Map init ──────────────────────────────────────────────────────────

  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el || typeof AMap === "undefined") return;

    const map = new AMap.Map(el, {
      zoom: 16,
      center: [SHENZHEN_LNG, SHENZHEN_LAT],
      mapStyle: "amap://styles/normal",
      viewMode: "2D",
      showLabel: true,
      resizeEnable: true,
    });
    mapRef.current = map;
    map.on("complete", () => relocateUser());

    return () => {
      map.destroy();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    clearMarkers();
    addMarkers(filteredPlaces);
  }, [categoryFilter, metroLineFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Event handlers ────────────────────────────────────────────────────

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;

    const lineName = detectLineSearch(q);
    if (lineName) {
      searchMetroLine(lineName);
      return;
    }

    setActiveLineName(null);
    setSelectedLinePlace(null);
    setCardsMini(false);
    // Address/keyword search: resolve destination first to avoid "exists but no response".
    searchByAddress(q);
  };

  const goToCard = (index: number) => {
    if (index >= 0 && index < displayedCards.length) setActiveCard(index);
  };

  const handleDragStart = (_: any, info: { point: { x: number } }) => {
    setDragStartX(info.point.x);
    setIsDragging(false);
  };

  const handleDragEnd = (_: any, info: { point: { x: number }; velocity: { x: number } }) => {
    const diff = info.point.x - dragStartX;
    if (Math.abs(diff) > 10) setIsDragging(true);
    if (diff < -50 || info.velocity.x < -300) goToCard(activeCard + 1);
    else if (diff > 50 || info.velocity.x > 300) goToCard(activeCard - 1);
  };

  const handleCardClick = (c: CardInfo) => {
    if (!isDragging) onSelectDetail(c);
    setIsDragging(false);
  };

  const handlePlaceSelect = (place: PlaceInfo) => {
    // List click always previews in center card; detail is opened by card click only.
    setSelectedLinePlace(place);
    setCardsMini(false);
    setActiveCard(0);
  };

  // ─── Render ────────────────────────────────────────────────────────────

  const categoryTabs: { key: ToiletCategory; label: string; icon: React.FC<any> }[] = [
    { key: "all", label: "全部", icon: ListFilter },
    { key: "surface", label: "地面", icon: Footprints },
    { key: "metro", label: "地铁", icon: TrainFront },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col overflow-hidden"
    >
      {/* Map container */}
      <div className="absolute inset-0 z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Header with search */}
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center gap-2">
        <div className="flex-1 bg-white/90 backdrop-blur-xl h-12 rounded-full flex items-center shadow-lg px-4 gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="搜索附近厕所 / 地点..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveLineName(null);
                setSelectedLinePlace(null);
                setCardsMini(false);
                if (userPos) searchNearby(userPos[0], userPos[1]);
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center shadow-lg shrink-0"
        >
          <Search className="w-5 h-5 text-on-primary-container" />
        </button>
      </header>

      {/* Floating category tabs */}
      <div className="fixed top-20 left-4 right-4 z-40 flex flex-col gap-2">
        <div className="flex gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setCategoryFilter(tab.key);
                setMetroLineFilter("all");
                setSelectedLinePlace(null);
                setActiveCard(0);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all ${
                categoryFilter === tab.key
                  ? "bg-primary text-white shadow-primary/30"
                  : "bg-white/90 backdrop-blur-xl text-slate-600 hover:bg-white"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              <span
                className={`text-[10px] ${categoryFilter === tab.key ? "text-white/70" : "text-slate-400"}`}
              >
                ({tab.key === "all" ? allPlaces.length : allPlaces.filter((p) => p.category === tab.key).length})
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {categoryFilter === "metro" && availableMetroLines.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar"
            >
              <button
                onClick={() => {
                  setMetroLineFilter("all");
                  setSelectedLinePlace(null);
                  setActiveCard(0);
                }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  metroLineFilter === "all" ? "bg-blue-500 text-white" : "bg-white/80 text-slate-500"
                }`}
              >
                全部线路
              </button>
              {availableMetroLines.sort().map((line) => (
                <button
                  key={line}
                  onClick={() => {
                    setMetroLineFilter(line);
                    setSelectedLinePlace(null);
                    setActiveCard(0);
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    metroLineFilter === line ? "bg-blue-500 text-white" : "bg-white/80 text-slate-500"
                  }`}
                >
                  🚇 {line}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-sm font-medium">定位搜索中...</span>
          </div>
        </div>
      )}

      {/* Cards — full or mini */}
      {displayedCards.length > 0 && (
        <AnimatePresence mode="wait">
          {cardsMini ? (
            <motion.div
              key="mini"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => setCardsMini(false)}
              className="absolute bottom-28 left-4 right-4 z-20 cursor-pointer"
            >
              <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl p-3 flex items-center gap-3 border border-white/40">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${trafficBg[activeCardData?.traffic || "low"]}`}
                >
                  {activeCardData?.category === "metro" ? (
                    <TrainFront className={`w-5 h-5 ${trafficColor[activeCardData?.traffic || "low"]}`} />
                  ) : (
                    <MapPin className={`w-5 h-5 ${trafficColor[activeCardData?.traffic || "low"]}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{activeCardData?.title}</h4>
                  <p className="text-[10px] text-slate-500">
                    {activeCardData?.distance} · {activeCardData?.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-bold text-primary">
                    {activeCardData?.rating} ★
                  </span>
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-1">
                点击展开 · {displayedCards.length} 个推荐
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 z-20 flex justify-center px-6 pointer-events-none"
              style={{ top: 170 }}
            >
              <div className="relative w-full max-w-sm" style={{ height: 460 }}>
                {displayedCards.map((c, i) => {
                  const offset = i - activeCard;
                  const isActive = i === activeCard;
                  const isGone = offset < 0;

                  return (
                    <motion.div
                      key={c.title + i}
                      drag={isActive ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.3}
                      onDragStart={isActive ? handleDragStart : undefined}
                      onDragEnd={isActive ? handleDragEnd : undefined}
                      animate={{
                        scale: displayedCards.length <= 1 ? 1 : isGone ? 0.92 : 1 - offset * 0.05,
                        y: displayedCards.length <= 1 ? 0 : isGone ? -20 : offset * 28,
                        x: displayedCards.length <= 1 ? 0 : isGone ? -30 : 0,
                        opacity: displayedCards.length <= 1 ? 1 : isGone ? 0 : Math.max(0.6, 1 - offset * 0.15),
                        rotateZ: isGone ? -3 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute top-0 left-0 right-0 glow-wrap glow-${c.traffic}`}
                      style={{
                        zIndex: displayedCards.length - Math.abs(offset),
                        pointerEvents: isActive ? "auto" : "none",
                        cursor: isActive ? "grab" : "default",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <div className="glow-ring" />
                      <div
                        className="relative rounded-[calc(1.5rem-3px)] overflow-hidden"
                        onMouseUp={isActive ? () => handleCardClick(c) : undefined}
                      >
                        <div className="relative h-40 w-full">
                          <img src={c.image} className="w-full h-full object-cover" alt={c.title} />
                          <div className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-2 py-1 rounded-full text-[10px] font-bold shadow-md">
                            {c.rating} ★
                          </div>
                          <div
                            className={`absolute top-4 left-4 ${trafficBg[c.traffic]} backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5`}
                          >
                            <Users className={`w-3 h-3 ${trafficColor[c.traffic]}`} />
                            <span className={`text-[10px] font-bold ${trafficColor[c.traffic]}`}>
                              {trafficLabel[c.traffic]}
                            </span>
                          </div>
                          {c.category === "metro" && (
                            <div className="absolute bottom-3 left-4 bg-blue-500/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1">
                              <TrainFront className="w-3 h-3 text-white" />
                              <span className="text-[9px] font-bold text-white">
                                {c.metroLine || "地铁"}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-5 bg-white/90 backdrop-blur-2xl">
                          <div className="flex justify-between items-start mb-3">
                            <div className="min-w-0 flex-1 mr-2">
                              <h3 className="text-lg font-headline font-bold truncate">{c.title}</h3>
                              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Navigation className="w-3 h-3 fill-current shrink-0" /> {c.distance}{" "}
                                · {c.location}
                              </p>
                            </div>
                            <div className="bg-primary/10 p-2 rounded-full shrink-0">
                              <Bookmark className="w-4 h-4 text-primary fill-current" />
                            </div>
                          </div>
                          {c.toiletEntries && c.toiletEntries.length > 0 ? (
                            <div className="mb-3 bg-slate-50/80 rounded-xl p-3 max-h-[100px] overflow-y-auto">
                              <GateList entries={c.toiletEntries} />
                            </div>
                          ) : (
                            <div className="flex gap-2 mb-3">
                              {c.stats.map((stat) => (
                                <div
                                  key={stat.label}
                                  className="flex-1 bg-surface-container-low p-2 rounded-xl flex flex-col items-center gap-0.5"
                                >
                                  <stat.icon className="w-4 h-4 text-primary" />
                                  <span className="text-[8px] font-bold uppercase text-slate-400">
                                    {stat.label}
                                  </span>
                                  <span className="text-[9px] font-bold">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          <button className="w-full bg-primary-container text-on-primary-container py-3 rounded-full font-bold text-xs shadow-md">
                            开始导航
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {!cardsMini && displayedCards.length > 0 && (
                <button
                  onClick={() => setCardsMini(true)}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/95 backdrop-blur-xl text-slate-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/40 z-30 pointer-events-auto"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* FABs */}
      <motion.div
        className="absolute right-6 z-30 flex flex-col gap-3 items-center"
        animate={{ bottom: sheetExpanded ? 420 : cardsMini ? 120 : 200 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button
          onClick={relocateUser}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all"
        >
          <LocateFixed className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Bottom sheet */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl rounded-t-[2.5rem] shadow-2xl z-40 border-t border-white/40 overflow-hidden"
        animate={{ height: sheetExpanded ? 400 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6 pb-0">
          <button
            onClick={() => setSheetExpanded(!sheetExpanded)}
            className="flex flex-col items-center w-full mb-4"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-4" />
            <div className="w-full flex justify-between items-center">
              <h3 className="text-lg font-headline font-bold">
                附近厕所{" "}
                <span className="text-sm text-slate-400 font-normal">
                  ({filteredPlaces.length})
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary">
                  {sheetExpanded ? "收起" : "查看全部"}
                </span>
                {sheetExpanded ? (
                  <ChevronDown className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronUp className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>
          </button>
        </div>

        <AnimatePresence>
          {sheetExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 pb-8 space-y-3 overflow-y-auto"
              style={{ maxHeight: 300 }}
            >
              {filteredPlaces.map((place, i) => (
                <motion.div
                  key={place.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <ListItem
                    place={place}
                    icon={place.category === "metro" ? <TrainFront /> : <MapPin />}
                    onSelect={() => handlePlaceSelect(place)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
