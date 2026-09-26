"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

export function Counter({ value, duration = 2000, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  // Tách số và hậu tố (VD: "500+" → num=500, suffix="+")
  const match = value.match(/^([\d.,]+)(.*)$/);
  const numStr = match?.[1] || "0";
  const suffix = match?.[2] || "";
  const target = parseFloat(numStr.replace(/,/g, "")) || 0;
  const decimals = numStr.includes(".")
    ? (numStr.split(".")[1] ?? "").length
    : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();
    let rafId = 0;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplay(current.toFixed(decimals));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setDisplay(target.toFixed(decimals));
      }
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}