import type React from "react";
import {
  Layers,
  Thermometer,
  Leaf,
  Droplets,
  Wind,
  Coffee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Traffic } from "./types";

export const SHENZHEN_LNG = 114.0579;
export const SHENZHEN_LAT = 22.5431;

export const trafficLabel: Record<Traffic, string> = {
  low: "Low",
  medium: "Moderate",
  high: "Busy",
};

export const trafficColor: Record<Traffic, string> = {
  low: "text-green-500",
  medium: "text-amber-500",
  high: "text-red-500",
};

export const trafficBg: Record<Traffic, string> = {
  low: "bg-green-500/10",
  medium: "bg-amber-500/10",
  high: "bg-red-500/10",
};

export const TRAFFIC_HEX: Record<Traffic, string> = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

export const PLACEHOLDER_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA2XjSbZNt1v3MiQwYNfHAyVijxb6sJ52pYnbmNk5qtsbApArGxib3nXifKNAAIXcWXP4H7l1ICsTvhy69JTu5LLKBSHnYat875iyVEzy3hZwofJgO44HWBjb4obED6b_dN7oAxnqhBW_YGR0V5KEcfEAmCkVNagv2NqCBFWNynNs4S5GDswJrQ2uuYvL-g3rvhy6b6m0ls_0nFlVwmDInHRkKDb6FAuw3yq8g8d8i5r-khOikd05k5NzpoGPM_ZG5udvWhKP678MAo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCb2FJj3yAsMDrzNtf2ViIuNuFATGV9DfBiq0HY_drTs8GFcGreKulwgNm1iZ6F8LWQBCfOncBZeX5mHb3obAAXDf7qAz33raSO4MsABsjz6THB_9pxqQsEPRkHnK_HrKpokB4SPDUE9WiYy38CcN5xIMpThgoRvnx5WjDn_sUX427rR5MgfKJhYKserqto_w9I8jzSXlYkH9KDaK3ytKAhPBXCCijGvimEUbY5KziHRvYr-L7MGNEk_khaTAzAX4ipN5yC8Ckctteo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDXCAIgvv3rFeuY4qKLhipuTJW-qhd1IPdzzQCJ_ueuDbKq149xh8IFtd30Xv5LO8uTO2na-1qR66aO5FpHL39g0L8g_NdgTeEKvsXwMDmuNdMXU334JzL9pm7KRC4HkFgzXcZPDBLSW1kgj-sIZ2Gs_f9MQ_lpOpd_jd7el5Owf2y_feIddNjqEMq10AI07jn5odLs2PReo1jhN1-xcKPzPI5geBBOoYbmEo7J_Pn1wm8t4y5zsEFYJS93BlHZAR1fYo6uM01H19LX",
];

export const STAT_TEMPLATES: { icon: React.FC<any>; label: string; value: string }[][] = [
  [
    { icon: Layers, label: "Paper", value: "3-Ply" },
    { icon: Thermometer, label: "Temp", value: "22°C" },
    { icon: Leaf, label: "Vibe", value: "Zen" },
  ],
  [
    { icon: Droplets, label: "Clean", value: "Spotless" },
    { icon: Wind, label: "Air", value: "Fresh" },
    { icon: Coffee, label: "Café", value: "Nearby" },
  ],
  [
    { icon: ShieldCheck, label: "Safe", value: "Guarded" },
    { icon: Sparkles, label: "Style", value: "Classic" },
    { icon: Thermometer, label: "Temp", value: "20°C" },
  ],
];
