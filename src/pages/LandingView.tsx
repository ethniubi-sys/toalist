import { motion } from "motion/react";
import { Menu, MapPin, ArrowRight } from "lucide-react";

export default function LandingView({ onSearch }: { onSearch: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full flex flex-col items-center justify-center p-8 bg-landing-bg"
    >
      <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXCAIgvv3rFeuY4qKLhipuTJW-qhd1IPdzzQCJ_ueuDbKq149xh8IFtd30Xv5LO8uTO2na-1qR66aO5FpHL39g0L8g_NdgTeEKvsXwMDmuNdMXU334JzL9pm7KRC4HkFgzXcZPDBLSW1kgj-sIZ2Gs_f9MQ_lpOpd_jd7el5Owf2y_feIddNjqEMq10AI07jn5odLs2PReo1jhN1-xcKPzPI5geBBOoYbmEo7J_Pn1wm8t4y5zsEFYJS93BlHZAR1fYo6uM01H19LX"
          className="w-full h-full object-cover"
          alt="Map Pattern"
        />
      </div>

      <header className="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-xl px-6 h-14 rounded-full flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-slate-500" />
          <span className="font-headline font-bold italic text-lg tracking-tight">
            LooFinder
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNpM22WTcREBHwXh5ATg7Hrq4B97B3i75dx_kq4VBR2LpE6hGfb05j71u6eavGgpAc6NPnOZTKZLSPYqeI-eOvDCRIl6eRn7o87oAck_EAD71Z2q-cOSwuWLTMmmeASOwUNdZzftmsLnjhCsjhNMubrDoBNZjxpI0-2Wl5j7LjS2YezdkoAL3A-r2IdH862yr4ytS93C0RJZxFYM6UeDZ1KlUosOLiMJ11P_LyoVcBZs6Y7j4ezRQSG75rx6N6AIopKbxaKI7P1P-w"
            alt="User"
          />
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-xs text-center">
        <div className="relative">
          <div className="absolute -inset-12 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute -inset-6 bg-white/40 rounded-full" />
          <div className="relative bg-white p-6 rounded-full shadow-xl">
            <div className="bg-primary-container p-4 rounded-full">
              <MapPin className="w-10 h-10 text-primary fill-current" />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSearch}
          className="bg-primary-container text-on-primary-container py-3 px-6 rounded-full font-headline font-bold tracking-tight text-sm shadow-lg flex items-center justify-center gap-2"
        >
          SEARCH NEAREST THRONE
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
