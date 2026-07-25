import React from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface LoadingPageProps {
  isVisible: boolean;
}

export default function LoadingPage({ isVisible }: LoadingPageProps) {
  return (
    <>
      {isVisible && (
        <motion.div
          id="splash-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F9FC] font-sans"
        >
          {/* Animated slow-moving background blobs for loader depth */}
          <div className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-[#7C4DFF]/15 to-[#4F8CFF]/10 blur-[80px] animate-pulse-slow pointer-events-none" />
          
          <div className="text-center space-y-6 relative z-10 animate-fade-in">
            {/* Spinning / Scaling Logo loader emblem */}
            <motion.div
              initial={{ scale: 0.85, rotate: -15, opacity: 0 }}
              animate={{ scale: [0.85, 1.05, 1], rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center mx-auto"
            >
              <Logo size="lg" />
            </motion.div>

            <div className="space-y-1.5">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-slate-800 font-bold text-sm tracking-widest font-display uppercase"
              >
                Natraj V
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[10px] text-slate-500 font-mono tracking-wider"
              >
                Initiating Spatial Experience Engine...
              </motion.p>
            </div>

            {/* Progress loader */}
            <div className="h-[2px] w-36 bg-slate-200/60 rounded-full mx-auto overflow-hidden p-[1px] border border-white/35">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#4F8CFF] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
