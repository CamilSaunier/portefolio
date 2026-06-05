import { useEffect, useState } from "react";

/**
 * Effet "machine à écrire" en BOUCLE sur une liste de mots :
 * tape un mot → pause → l'efface → passe au suivant → recommence.
 * - Se réinitialise si la liste change (changement de langue FR/EN).
 * - Respecte prefers-reduced-motion : affiche le 1er mot, sans animer.
 */
export function useTypewriterLoop(
  words,
  { typeSpeed = 85, deleteSpeed = 45, pause = 1600, start = true } = {}
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // signature stable de la liste : sert à réinitialiser quand elle change
  const key = Array.isArray(words) ? words.join("|") : "";

  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [key]);

  useEffect(() => {
    if (!start || !words || words.length === 0) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(words[0]);
      return;
    }

    const current = words[index % words.length];
    let timeout;

    if (!deleting && text === current) {
      // mot complet : on marque une pause avant d'effacer
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      // mot effacé : on passe au suivant
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      // frappe ou effacement caractère par caractère
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, key, typeSpeed, deleteSpeed, pause, start]);

  return text;
}
