"use client";

import { useState } from 'react';

const nodes = [
  { id: 'emozioni', label: 'Emozioni', x: 50, y: 16 },
  { id: 'pensieri', label: 'Pensieri', x: 82, y: 35 },
  { id: 'corpo', label: 'Corpo', x: 74, y: 76 },
  { id: 'comportamenti', label: 'Comportamenti', x: 50, y: 90 },
  { id: 'relazioni', label: 'Relazioni', x: 18, y: 68 },
  { id: 'esperienze', label: 'Esperienze', x: 19, y: 30 },
];

const descriptions: Record<string,string> = {
  emozioni: 'Le emozioni orientano l’attenzione, segnalano bisogni e modificano il modo in cui interpretiamo ciò che accade.',
  pensieri: 'Le interpretazioni che diamo alle situazioni influenzano ciò che proviamo e le strategie che scegliamo.',
  corpo: 'Attivazione, tensione, sonno e segnali corporei partecipano alla regolazione psicologica.',
  comportamenti: 'Ciò che facciamo può ridurre il disagio nell’immediato e, a volte, mantenerlo nel lungo periodo.',
  relazioni: 'Le relazioni influenzano sicurezza, aspettative, identità e possibilità di chiedere o ricevere aiuto.',
  esperienze: 'La storia personale contribuisce a costruire significati, abitudini e modi di proteggersi.'
};

export function ComplexMind() {
  const [active, setActive] = useState('emozioni');
  return (
    <div className="mind-shell">
      <div className="mind-map" aria-label="Mappa interattiva dei processi psicologici">
        <svg className="mind-lines" viewBox="0 0 100 100" role="img" aria-label="Connessioni tra emozioni, pensieri, corpo, comportamenti, relazioni ed esperienze">
          {nodes.flatMap((a,i) => nodes.slice(i+1).map((b) => (
            <line key={`${a.id}-${b.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={active===a.id || active===b.id ? 'active' : ''} />
          )))}
        </svg>
        {nodes.map(n => (
          <button key={n.id} className={`mind-node ${active===n.id ? 'active':''}`} style={{left:`${n.x}%`, top:`${n.y}%`}} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} onClick={() => setActive(n.id)} aria-pressed={active===n.id}>
            {n.label}
          </button>
        ))}
        <div className="mind-core" aria-hidden="true"><span>Sistema</span></div>
      </div>
      <div className="mind-copy" aria-live="polite">
        <span className="eyebrow">Un sistema, non un ingranaggio</span>
        <h3>{nodes.find(n=>n.id===active)?.label}</h3>
        <p>{descriptions[active]}</p>
        <p className="mind-fixed">Il disagio raramente nasce da un solo elemento. In terapia cerchiamo di capire come questi processi interagiscono tra loro.</p>
      </div>
    </div>
  );
}
