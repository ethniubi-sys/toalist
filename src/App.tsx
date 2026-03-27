import { useState } from "react";
import { AnimatePresence } from "motion/react";

import type { View, CardInfo } from "./types";
import LandingView from "./pages/LandingView";
import MapView from "./pages/MapView";
import DetailView from "./pages/DetailView";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);

  return (
    <div className="h-screen bg-surface font-body text-on-surface relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <LandingView key="landing" onSearch={() => setView("map")} />
        )}
        {view === "map" && (
          <MapView
            key="map"
            onSelectDetail={(card) => {
              setSelectedCard(card);
              setView("detail");
            }}
          />
        )}
        {view === "detail" && selectedCard && (
          <DetailView key="detail" card={selectedCard} onBack={() => setView("map")} />
        )}
      </AnimatePresence>
    </div>
  );
}
