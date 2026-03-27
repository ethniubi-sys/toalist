import { motion } from "motion/react";
import {
  ArrowLeft,
  MoreVertical,
  Accessibility,
  Baby,
  Navigation,
  Users,
  DoorOpen,
} from "lucide-react";
import type { CardInfo } from "../types";
import { trafficLabel, trafficColor, trafficBg } from "../constants";
import { GateList } from "../components/GateBadges";

export default function DetailView({ card, onBack }: { card: CardInfo; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40 grayscale-[0.2] contrast-[0.9]">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXCAIgvv3rFeuY4qKLhipuTJW-qhd1IPdzzQCJ_ueuDbKq149xh8IFtd30Xv5LO8uTO2na-1qR66aO5FpHL39g0L8g_NdgTeEKvsXwMDmuNdMXU334JzL9pm7KRC4HkFgzXcZPDBLSW1kgj-sIZ2Gs_f9MQ_lpOpd_jd7el5Owf2y_feIddNjqEMq10AI07jn5odLs2PReo1jhN1-xcKPzPI5geBBOoYbmEo7J_Pn1wm8t4y5zsEFYJS93BlHZAR1fYo6uM01H19LX"
          alt="Map Background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,#735c0015_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl px-6 h-16 flex items-center justify-between shadow-[0_8px_32px_rgba(115,92,0,0.06)]">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-primary-container/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="font-headline font-semibold text-lg tracking-tight">
            {card.title}
          </h1>
        </div>
        <button className="p-2 hover:bg-primary-container/20 rounded-full transition-colors">
          <MoreVertical className="w-6 h-6 text-slate-500" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 pt-24 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-sm glow-wrap glow-${card.traffic}`}
          style={{ borderRadius: "2rem" }}
        >
          <div className="glow-ring" style={{ borderRadius: "2rem" }} />
          <div className="relative rounded-[calc(2rem-3px)] overflow-hidden">
            <div className="relative h-52 w-full">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 bg-primary-container/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-primary shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  AVAILABLE
                </span>
              </div>
              <div
                className={`absolute top-4 right-4 ${trafficBg[card.traffic]} backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5`}
              >
                <Users className={`w-3 h-3 ${trafficColor[card.traffic]}`} />
                <span className={`text-[10px] font-bold ${trafficColor[card.traffic]}`}>
                  {trafficLabel[card.traffic]}
                </span>
              </div>
            </div>

            <div className="p-7 space-y-5 bg-white/90 backdrop-blur-2xl">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                    {card.title}
                  </h2>
                  <div className="flex gap-3 text-slate-400">
                    <Accessibility className="w-5 h-5" />
                    <Baby className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Navigation className="w-3 h-3 fill-current" /> {card.distance ? `${card.distance} • ` : ""}
                  {card.location} • {card.rating} ★
                </p>
              </div>

              {card.toiletEntries && card.toiletEntries.length > 0 ? (
                <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <DoorOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-700">厕所位置详情</span>
                  </div>
                  <GateList entries={card.toiletEntries} />
                </div>
              ) : (
                <>
                  {card.subtitle && (
                    <p className="text-sm text-slate-500 italic font-medium">{card.subtitle}</p>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {card.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-surface-container-low p-3 rounded-2xl flex flex-col items-center justify-center text-center space-y-1"
                      >
                        <stat.icon className="w-5 h-5 text-primary" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                          {stat.label}
                        </span>
                        <span className="text-[10px] font-bold leading-tight">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-br from-primary-fixed to-primary-container text-on-primary-container font-headline font-extrabold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 tracking-tight text-lg"
              >
                START NAVIGATION
                <Navigation className="w-5 h-5 fill-current" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
