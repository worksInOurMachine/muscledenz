"use client";

import React from "react";
import { motion } from "framer-motion";

interface TopMarqueeProps {
  text: string;
}

const TopMarquee: React.FC<TopMarqueeProps> = ({ text }) => {
  if (!text) return null;

  // Repeat the text multiple times to ensure continuous flow
  const items = Array(10).fill(text);

  return (
    <div className="w-full  bg-[#111111] text-white py-2  overflow-hidden whitespace-nowrap border-b border-white/5 z-[60] relative">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          duration: 35, // Adjust speed for premium feel
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex items-center gap-6"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 flex-shrink-0">
            <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-white/90">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-6 flex-shrink-0">
            <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-white/90">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TopMarquee;
