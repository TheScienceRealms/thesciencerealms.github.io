const {chromium}=require('playwright');const fs=require('fs');
const D=__dirname,F='file://'+D+'/../quiztoplasm.html';
const uri=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
// biology symbol tile; c = stroke colour, o = opacity
const tile=(c,o,g="#e8b931",go=0)=>`<svg xmlns='http://www.w3.org/2000/svg' width='320' height='300'><g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
<rect x='20' y='20' width='74' height='54' rx='12'/><ellipse cx='60' cy='46' rx='12' ry='9'/><ellipse cx='36' cy='34' rx='7' ry='4'/><ellipse cx='38' cy='60' rx='7' ry='4'/><ellipse cx='80' cy='62' rx='6' ry='3.5'/>
<path d='M170,14 C188,30 152,46 170,62 C188,78 152,94 170,110 M192,14 C174,30 210,46 192,62 C174,78 210,94 192,110 M173,30 H189 M173,62 H189 M173,94 H189'/>
<path d='M262,40 C290,30 300,60 284,78 C268,96 236,92 238,70 C240,52 250,44 262,40 Z M246,82 C258,66 270,56 288,44'/>
<ellipse cx='70' cy='176' rx='38' ry='20'/><path d='M40,176 c6,-12 10,12 16,0 c6,-12 10,12 16,0 c6,-12 10,12 16,0 c6,-12 10,12 14,0'/>
<circle cx='190' cy='190' r='22'/><circle cx='190' cy='190' r='9'/>
<path d='M262,150 v38 M252,150 h20 M256,188 h12 M262,200 v40 M246,240 h32 M270,198 a14,14 0 0 1 4,26'/>
<path d='M30,262 c10,-24 30,-24 40,0 c-10,20 -30,20 -40,0 Z M50,240 v44'/>
<path d='M120,250 l12,-20 l12,20 l-12,20 z M144,250 h20 M164,250 l10,-14 M164,250 l10,14'/>
</g><g fill='${g}' fill-opacity='${go}'><circle cx='130' cy='120' r='3'/><circle cx='230' cy='130' r='2.5'/><circle cx='300' cy='270' r='3'/><circle cx='12' cy='130' r='2'/></g></svg>`;
const V=[
 {n:"1. Current",d:"Plain dark background",css:""},
 {n:"2. Forest ombre + cell pattern",d:"Black-green fading to forest green, faint cells, DNA and leaves",
  css:`body{background-color:#0f1611!important;background-image:${uri(tile('#a6dea8',.10,'#e8b931',.5))},linear-gradient(180deg,#0b120d 0,#122016 500px,#1b3a22 1200px,#24552c 2200px)!important;background-repeat:repeat,no-repeat!important}`},
 {n:"3. Gold glow ombre",d:"Dark green with a warm gold glow, gold-tinted symbols",
  css:`body{background-color:#0f1611!important;background-image:${uri(tile('#e8b931',.10,'#e8b931',.6))},radial-gradient(ellipse 80% 60% at 70% 0%,rgba(232,185,49,.18),transparent 70%),linear-gradient(180deg,#0f1611 0,#16231a 900px,#1d2f1f 2000px)!important;background-repeat:repeat,no-repeat,no-repeat!important}`},
 {n:"4. Deep teal ombre",d:"Green fading into deep teal, mint symbols",
  css:`body{background-color:#0c1613!important;background-image:${uri(tile('#7fe0c0',.10,'#e8b931',.5))},linear-gradient(180deg,#0c1613 0,#0f2420 600px,#123a33 1400px,#145046 2300px)!important;background-repeat:repeat,no-repeat!important}`},
 {n:"5. Microscope glow",d:"A soft green spotlight behind the title, like light through a microscope",
  css:`body{background-color:#0f1611!important;background-image:${uri(tile('#a6dea8',.08,'#e8b931',.5))},radial-gradient(circle 520px at 50% 160px,rgba(108,192,112,.22),transparent 70%),linear-gradient(180deg,#0f1611,#132017)!important;background-repeat:repeat,no-repeat,no-repeat!important}`},
 {n:"6. Night garden",d:"Ombre from near-black to moss, bigger leafy symbols",
  css:`body{background-color:#0d130e!important;background-image:${uri(tile('#c9e7a6',.13,'#e8b931',.6).replace("width='320' height='300'","width='420' height='394' viewBox='0 0 320 300'"))},linear-gradient(180deg,#0d130e 0,#16200f 700px,#26361a 1600px,#34481f 2400px)!important;background-repeat:repeat,no-repeat!important}`}];
(async()=>{const b=await chromium.launch();
for(let i=0;i<V.length;i++){const p=await b.newPage({viewport:{width:1100,height:1300},colorScheme:'dark'});
 await p.goto(F);await p.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));
 if(V[i].css)await p.addStyleTag({content:V[i].css});
 await p.waitForTimeout(1500);await p.screenshot({path:D+`/q${i}.png`});await p.close()}
const html=`<html><body style="margin:0;background:#e9e3d3;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 16px;font:800 30px sans-serif;color:#1d5420">Quiztoplasm · dark background options</h1><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">${V.map((v,i)=>`<figure style="margin:0;background:#fff;border-radius:12px;padding:10px;box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="data:image/png;base64,${fs.readFileSync(D+`/q${i}.png`).toString("base64")}" style="width:100%;border-radius:6px;display:block"><figcaption style="padding:8px 4px 2px"><b style="font-size:17px">${v.n}</b><div style="color:#555;font-size:13px">${v.d}</div></figcaption></figure>`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1500,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../quiztoplasm-backgrounds.png',fullPage:true});await b.close();console.log('done')})();
