import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Experience from "./sections/Experience/Experience";
import Skills from "./sections/Skills/Skills";
import Projects from "./sections/Projects/Projects";

export default function App() {
  const { t, i18n } = useTranslation();

  // tient l'attribut <html lang> à jour pour les lecteurs d'écran (prononciation)
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
  }, [i18n.resolvedLanguage]);

  return (
    <>
      {/* premier élément focusable : permet de sauter la navbar au clavier */}
      <a href="#main-content" className="skip-link">
        {t("a11y.skip")}
      </a>
      <Background />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
