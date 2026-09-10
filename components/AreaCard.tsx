import Link from 'next/link';

export function AreaCard({href, title, text}:{href:string; title:string; text:string}) {
  return (
    <Link className="area-card" href={href}>
      <span className="area-kicker">Area di intervento</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="text-link">Approfondisci <span aria-hidden="true">→</span></span>
    </Link>
  );
}
