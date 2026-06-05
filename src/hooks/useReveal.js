import { useEffect, useRef, useState } from "react";

/**
 * Anime l'apparition d'un élément quand il entre dans le viewport.
 * Utilise IntersectionObserver (natif, performant — pas de listener scroll).
 *
 * Usage :
 *   const { ref, isVisible } = useReveal();
 *   <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`} />
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
