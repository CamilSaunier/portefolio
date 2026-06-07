import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Experience from "./sections/Experience/Experience";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export default function App() {
  const { t, i18n } = useTranslation();
  const mainRef = useRef(null);
  const firstRun = useRef(true);

  useEffect(() => {
    // <html lang> à jour pour les lecteurs d'écran (prononciation)
    document.documentElement.lang = i18n.resolvedLanguage;

    // animation brève au changement de langue (on saute le 1er rendu)
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove("lang-fx");
    void el.offsetWidth; // force un reflow -> relance l'animation à chaque fois
    el.classList.add("lang-fx");
  }, [i18n.resolvedLanguage]);

  return (
    <>
      {/* premier élément focusable : permet de sauter la navbar au clavier */}
      <a href="#main-content" className="skip-link">
        {t("a11y.skip")}
      </a>
      <Background />
      <Navbar />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
