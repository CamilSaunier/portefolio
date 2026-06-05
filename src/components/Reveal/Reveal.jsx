import { useReveal } from "../../hooks/useReveal";

/**
 * Enveloppe son contenu d'une animation d'apparition au scroll.
 * `delay` (ms) permet de créer un effet d'escalier entre plusieurs éléments.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const { ref, isVisible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
