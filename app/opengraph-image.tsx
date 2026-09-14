import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Francesco Corsaro · Psicologo e Psicoterapeuta · Catania';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/logo-francesco-corsaro-social.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    <div style={{width:'100%',height:'100%',display:'flex',background:'#f6f2e9',color:'#17363a',padding:'72px',fontFamily:'serif'}}>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
        <div style={{display:'flex',alignItems:'center',gap:'18px',fontSize:30}}>
          <img src={logoSrc} alt="" width={72} height={72} />
          <div style={{display:'flex',flexDirection:'column'}}>
            <strong>Francesco Corsaro</strong>
            <span style={{fontSize:22,color:'#4d6061'}}>Psicologo · Psicoterapeuta · Catania</span>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',maxWidth:940}}>
          <div style={{fontSize:72,lineHeight:1.05,letterSpacing:'-2px'}}>Capire come funzioniamo per poter cambiare.</div>
          <div style={{fontSize:28,lineHeight:1.4,color:'#4d6061',marginTop:26}}>Psicoterapia Cognitiva Complessa per adolescenti, giovani adulti e genitori.</div>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center',fontSize:18,color:'#b9785f'}}>
          <span>Emozioni</span><span>↔</span><span>Pensieri</span><span>↔</span><span>Corpo</span><span>↔</span><span>Relazioni</span>
        </div>
      </div>
    </div>,
    size
  );
}
