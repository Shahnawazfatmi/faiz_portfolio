"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { PlusIcon } from "./Icons";
import { Reveal } from "./motion";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {SITE.faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 0.05} className={`faq-item${isOpen ? " open" : ""}`}>
            <h3 style={{ margin: 0 }}>
              <button className="faq-q" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {item.q} <PlusIcon />
              </button>
            </h3>
            {/* Answers stay in the DOM (collapsed) so they're indexable. */}
            <motion.div
              id={`faq-${i}`}
              className="faq-a"
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}            >
              <p>{item.a}</p>
            </motion.div>
          </Reveal>
        );
      })}
    </div>
  );
}
