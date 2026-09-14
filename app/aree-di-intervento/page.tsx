import { AreaCard } from '@/components/AreaCard';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { areas } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Aree di intervento',
  description: 'Ansia, ADHD, autismo e neurodivergenze, adolescenza, giovani adulti e parent training a Catania con Francesco Corsaro.',
  path: '/aree-di-intervento'
});

export default function Page(){return <>
<BreadcrumbJsonLd items={[{name:'Home',path:'/'},{name:'Aree di intervento',path:'/aree-di-intervento'}]} />
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Aree di intervento</span><h1>Comprendere il problema nel contesto in cui accade.</h1><p className="lead">Le stesse difficoltà possono avere funzioni e significati differenti da persona a persona. Per questo ogni area viene affrontata a partire dal funzionamento individuale.</p></div></section><section className="section"><div className="container card-grid">{areas.map(a=><AreaCard key={a.href} {...a}/>)}</div></section></>}
