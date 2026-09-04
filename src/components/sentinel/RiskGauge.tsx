"use client";

import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SIZE = 180;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = Math.PI * RADIUS; // half circle

function bandColorVar(score: number) {
  if (score >= 65) return "var(--risk-high)";
  if (score >= 35) return "var(--risk-medium)";
  return "var(--risk-low)";
}

export function RiskGauge({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionScore = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const [dash, setDash] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionScore, score, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(Math.round(v));
        setDash(CIRCUMFERENCE * (1 - v / 100));
      },
    });
    return () => controls.stop();
  }, [inView, score, motionScore]);

  const color = bandColorVar(display);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE / 2 + STROKE} viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE}`}>
        <path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dash}
          style={{ transition: "stroke 0.3s ease" }}
        />
      </svg>
      <div className="-mt-10 flex flex-col items-center">
        <span className="font-display text-4xl font-semibold tabular-nums" style={{ color }}>
          {display}
        </span>
        <span className="font-mono-tag text-[11px] uppercase tracking-wide text-muted mt-1">
          risk score
        </span>
      </div>
    </div>
  );
}
