/**
 * Bloque de encabezado de sección: etiqueta + título + bajada opcional.
 * Cada línea declara su propia animación para que el Reveal padre las escalone.
 */
export default function SectionHeading({ eyebrow, title, lead, id, className = '', reveal = 'up' }) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      {eyebrow && (
        <span className="eyebrow" data-reveal={reveal} style={{ '--i': 0 }}>
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="section-title" data-reveal={reveal} style={{ '--i': 1 }}>
        {title}
      </h2>
      {lead && (
        <p className="section-lead" data-reveal={reveal} style={{ '--i': 2 }}>
          {lead}
        </p>
      )}
    </div>
  )
}
