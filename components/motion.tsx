"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { compact, full } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades/slides children in when scrolled into view and adds `.in` so nested CSS (bars, meters) can animate. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "article" | "section" | "li" | "header" | "aside";
  className?: string;
} & Omit<ComponentProps<"div">, "ref" | "children" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">) {
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={`${className}${seen ? " in" : ""}`}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      onViewportEnter={() => setSeen(true)}
      {...(rest as object)}
    >
      {children}
    </M>
  );
}

/** Staggered word-by-word headline reveal. */
export function SplitWords({ text, className = "", wordClassName = "", delay = 0 }: { text: string; className?: string; wordClassName?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i, all) => (
        // The space sits outside the overflow-hidden mask, otherwise inline-block trims it.
        <Fragment key={i}>
          <span className="word-mask">
            <motion.span
              className={`word ${wordClassName}`}
              initial={reduce ? false : { y: "110%", rotate: 4 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.07 }}
            >
              {w}
            </motion.span>
          </span>
          {i < all.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

/** Number that counts up the first time it enters the viewport. */
export function Counter({
  to,
  format = "full",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  format?: "full" | "compact";
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const fmt = (v: number) => (format === "compact" ? compact(v) : full(v)) + suffix;

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = fmt(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);

  // Server-rendered with the final value so crawlers and no-JS readers see real numbers.
  return <span ref={ref}>{fmt(to)}</span>;
}

/** Button/link that leans toward the cursor. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength * 1.4);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
