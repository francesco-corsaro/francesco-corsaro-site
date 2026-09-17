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
<section className="page-hero"><div className="container narrow"><span className="eyebrow">Aree di intervento</span><h1>Per chi e per quali difficoltà.</h1><p className="lead">Lavoro con adolescenti, giovani adulti e genitori. Qui trovi le principali situazioni di cui mi occupo e come possiamo affrontarle. Le aree possono intrecciarsi: non serve scegliere un’etichetta prima di chiedere un colloquio.</p></div></section><section className="section"><div className="container card-grid">{areas.map(a=><AreaCard key={a.href} {...a}/>)}</div></section></>}
