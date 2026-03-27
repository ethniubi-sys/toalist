import type React from "react";

export type Traffic = "low" | "medium" | "high";
export type ToiletCategory = "all" | "surface" | "metro";
export type View = "landing" | "map" | "detail";

export interface ToiletEntryInfo {
  gate: "闸内" | "闸外" | "无";
  location: string;
  note: string;
}

export interface CardInfo {
  title: string;
  location: string;
  distance: string;
  rating: string;
  image: string;
  traffic: Traffic;
  subtitle: string;
  category: ToiletCategory;
  metroLine?: string;
  toiletEntries?: ToiletEntryInfo[];
  stats: { icon: React.FC<any>; label: string; value: string }[];
}

export interface PlaceInfo extends CardInfo {
  lng: number;
  lat: number;
}
