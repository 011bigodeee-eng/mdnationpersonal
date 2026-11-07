"use client";
import { useEffect } from "react";

/** Progressive enhancement: content is visible without this hook or JavaScript. */
export function useCinematicMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-scene]"),
    );
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>(".method-step"),
    );
    let frame = 0;
    const update = () => {
      if (frame || reduce.matches) return;
      frame = requestAnimationFrame(() => {
        const height = window.innerHeight;
        const measurements = scenes.map((el) => ({
          el,
          rect: el.getBoundingClientRect(),
        }));
        const stepMeasurements = steps.map((el) => ({
          el,
          rect: el.getBoundingClientRect(),
        }));
        for (const { el, rect } of measurements) {
          const progress = Math.max(
            0,
            Math.min(
              1,
              (height * 0.85 - rect.top) / (rect.height + height * 0.25),
            ),
          );
          el.style.setProperty("--scene-progress", progress.toFixed(4));
          if (el.dataset.scrollScene === "discipline") {
            const range = height * (window.innerWidth <= 680 ? 0.27 : 0.5);
            const fill = Math.max(
              0,
              Math.min(1, (height * 0.76 - rect.top) / range),
            );
            const next = fill.toFixed(4);
            if (el.style.getPropertyValue("--discipline-progress") !== next)
              el.style.setProperty("--discipline-progress", next);
          }
          if (el.id === "inicio" && desktop.matches)
            el.style.setProperty(
              "--hero-offset",
              `${Math.max(0, -rect.top) * 0.055}px`,
            );
        }
        for (const { el, rect } of stepMeasurements)
          el.classList.toggle("step-active", rect.top < height * 0.76);
        frame = 0;
      });
    };
    const reset = () => {
      if (reduce.matches) {
        scenes.forEach((el) => {
          el.style.removeProperty("--scene-progress");
          el.style.removeProperty("--discipline-progress");
          el.style.removeProperty("--hero-offset");
        });
      } else update();
    };
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const pointer = (event: PointerEvent) => {
      if (reduce.matches || !desktop.matches || event.pointerType === "touch")
        return;
      const el = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-tilt]",
      );
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width,
        y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty("--pointer-x", `${x * 100}%`);
      el.style.setProperty("--pointer-y", `${y * 100}%`);
      el.style.setProperty("--tilt-x", `${(y - 0.5) * -4}deg`);
      el.style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`);
    };
    const leave = (event: PointerEvent) => {
      const el = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-tilt]",
      );
      if (
        el &&
        (!event.relatedTarget || !el.contains(event.relatedTarget as Node))
      ) {
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    reduce.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerout", leave);
      reduce.removeEventListener("change", reset);
    };
  }, []);
}
