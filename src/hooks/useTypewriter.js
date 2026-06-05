import { useEffect, useState } from "react";

/**
 * Effet "machine à écrire" : renvoie le texte tapé progressivement.
 * - Se relance si `text` change (ex. changement de langue FR/EN).
 * - Respecte prefers-reduced-motion : affiche tout d'un coup si l'utilisateur
 *   a demandé moins d'animations.
 */
export function useTypewriter(text, { speed = 75, startDelay = 650 } = {}) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOutput("");
    setDone(false);

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !text) {
      setOutput(text || "");
      setDone(true);
      return;
    }

    let i = 0;
    let timer;
    const start = setTimeout(function tick() {
      i += 1;
      setOutput(text.slice(0, i));
      if (i < text.length) timer = setTimeout(tick, speed);
      else setDone(true);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return { output, done };
}
