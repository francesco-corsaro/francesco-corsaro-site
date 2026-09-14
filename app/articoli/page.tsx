import { pageMetadata } from '@/lib/seo';

export const metadata=pageMetadata({
  title:'Articoli',
  description:'Approfondimenti divulgativi su ansia, ADHD, autismo, adolescenza, genitorialità, psicoterapia e neuroscienze.',
  path:'/articoli',
  noIndex:true
});

const cats=['Ansia','ADHD','Autismo','Adolescenza','Genitorialità','Psicoterapia','Mente e neuroscienze'];

export default function Page(){return <><section className="page-hero"><div className="container narrow"><span className="eyebrow">Articoli</span><h1>Psicologia spiegata senza semplificazioni inutili.</h1><p className="lead">Una sezione predisposta per futuri contenuti divulgativi su psicoterapia, neurodivergenze e processi di regolazione.</p></div></section><section className="section"><div className="container tag-grid">{cats.map(c=><span className="tag" key={c}>{c}</span>)}</div><div className="container empty-state"><p>Gli articoli verranno pubblicati progressivamente. Fino ad allora questa sezione non viene indicizzata dai motori di ricerca.</p></div></section></>}
