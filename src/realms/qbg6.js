const {chromium}=require('playwright');const fs=require('fs');
const D=__dirname,F='file://'+D+'/../quiztoplasm.html';
const uri=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
const sym=`<rect x='20' y='20' width='74' height='54' rx='12'/><ellipse cx='60' cy='46' rx='12' ry='9'/><ellipse cx='36' cy='34' rx='7' ry='4'/><ellipse cx='38' cy='60' rx='7' ry='4'/><ellipse cx='80' cy='62' rx='6' ry='3.5'/>
<path d='M170,14 C188,30 152,46 170,62 C188,78 152,94 170,110 M192,14 C174,30 210,46 192,62 C174,78 210,94 192,110 M173,30 H189 M173,62 H189 M173,94 H189'/>
<path d='M262,40 C290,30 300,60 284,78 C268,96 236,92 238,70 C240,52 250,44 262,40 Z M246,82 C258,66 270,56 288,44'/>
<ellipse cx='70' cy='176' rx='38' ry='20'/><path d='M40,176 c6,-12 10,12 16,0 c6,-12 10,12 16,0 c6,-12 10,12 16,0 c6,-12 10,12 14,0'/>
<circle cx='190' cy='190' r='22'/><circle cx='190' cy='190' r='9'/>
<path d='M262,150 v38 M252,150 h20 M256,188 h12 M262,200 v40 M246,240 h32 M270,198 a14,14 0 0 1 4,26'/>
<path d='M30,262 c10,-24 30,-24 40,0 c-10,20 -30,20 -40,0 Z M50,240 v44'/>
<path d='M120,250 l12,-20 l12,20 l-12,20 z M144,250 h20 M164,250 l10,-14 M164,250 l10,14'/>`;
const garden=(c,o,w=420)=>`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${Math.round(w*300/320)}' viewBox='0 0 320 300'><g fill='none' stroke='${c}' stroke-opacity='${o}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${sym}</g><g fill='#e8b931' fill-opacity='.6'><circle cx='130' cy='120' r='3'/><circle cx='230' cy='130' r='2.5'/><circle cx='300' cy='270' r='3'/><circle cx='12' cy='130' r='2'/></g></svg>`;
const glow=`<svg xmlns='http://www.w3.org/2000/svg' width='520' height='488' viewBox='0 0 320 300'><defs><filter id='g' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='2.2' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs><g filter='url(#g)' fill='none' stroke='#b6f36a' stroke-opacity='.22' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'>${sym}</g><g fill='#e8f87a' fill-opacity='.7' filter='url(#g)'><circle cx='130' cy='120' r='2'/><circle cx='230' cy='130' r='1.6'/><circle cx='300' cy='270' r='2'/><circle cx='12' cy='130' r='1.5'/></g></svg>`;
const leaves=`<svg xmlns='http://www.w3.org/2000/svg' width='760' height='700'><g fill='none' stroke='#c9e7a6' stroke-opacity='.10' stroke-width='2.4' stroke-linecap='round'>
<path d='M80,300 C40,180 120,60 260,40 C280,180 220,280 80,300 Z M80,300 C140,220 200,130 260,40 M130,236 l-24,-40 M160,196 l-20,-52 M190,156 l-10,-56 M150,214 l40,-6 M182,172 l44,-4'/>
<path d='M520,640 C470,520 540,420 700,400 C720,540 650,630 520,640 Z M520,640 C580,560 640,480 700,400 M560,590 l-20,-40 M600,540 l-14,-50 M600,540 l44,0'/>
<path d='M600,120 c40,-30 90,-10 100,40 c-50,20 -90,10 -100,-40 Z M600,120 c30,10 60,25 100,40'/>
<path d='M300,560 c-10,-50 30,-90 80,-80 c0,50 -40,80 -80,80 Z M300,560 c20,-30 50,-60 80,-80'/>
<path d='M420,250 C440,290 400,330 420,370 C440,410 400,450 420,490 M444,250 C424,290 464,330 444,370 C424,410 464,450 444,490 M423,290 h18 M423,370 h18 M423,450 h18'/>
<circle cx='160' cy='520' r='34'/><circle cx='160' cy='520' r='13'/></g>
<g fill='#e8b931' fill-opacity='.5'><circle cx='340' cy='120' r='3'/><circle cx='700' cy='300' r='2.5'/><circle cx='60' cy='640' r='3'/><circle cx='520' cy='40' r='2'/></g></svg>`;
const tissue=`<svg xmlns='http://www.w3.org/2000/svg' width='360' height='300'><g fill='none' stroke='#b9df8e' stroke-opacity='.11' stroke-width='2' stroke-linejoin='round'>
<path d='M0,40 L60,20 L120,48 L110,120 L40,130 L0,100'/><path d='M120,48 L190,30 L250,60 L240,130 L170,140 L110,120'/><path d='M250,60 L320,40 L360,70 L360,130 L300,150 L240,130'/>
<path d='M40,130 L110,120 L170,140 L160,210 L90,230 L30,200'/><path d='M170,140 L240,130 L300,150 L290,220 L220,235 L160,210'/><path d='M0,190 L30,200 L90,230 L80,300 M300,150 L360,130 M290,220 L360,200 M220,235 L230,300 M90,230 L150,250 L160,210 M150,250 L160,300 M60,20 L60,0 M190,30 L190,0 M320,40 L320,0'/></g>
<g fill='#b9df8e' fill-opacity='.10'><circle cx='60' cy='75' r='12'/><circle cx='180' cy='88' r='13'/><circle cx='300' cy='95' r='12'/><circle cx='100' cy='178' r='12'/><circle cx='230' cy='185' r='13'/><circle cx='40' cy='255' r='11'/><circle cx='190' cy='265' r='12'/><circle cx='320' cy='250' r='11'/></g>
<g fill='#e8b931' fill-opacity='.45'><circle cx='62' cy='73' r='3'/><circle cx='232' cy='183' r='3'/></g></svg>`;
const flies=`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='560'><defs><radialGradient id='f'><stop offset='0' stop-color='#f6e27a' stop-opacity='.9'/><stop offset='.35' stop-color='#e8b931' stop-opacity='.35'/><stop offset='1' stop-color='#e8b931' stop-opacity='0'/></radialGradient></defs>
${[[60,80,10],[220,40,7],[400,120,12],[540,60,8],[120,260,9],[330,300,11],[500,330,7],[40,440,8],[260,480,10],[460,500,9],[580,230,6],[180,170,5]].map(([x,y,r])=>`<circle cx='${x}' cy='${y}' r='${r*2.4}' fill='url(#f)'/>`).join('')}
<g fill='none' stroke='#c9e7a6' stroke-opacity='.08' stroke-width='2'><path d='M300,180 c-30,-40 10,-90 60,-70 c10,50 -30,80 -60,70 Z'/><path d='M80,360 C98,376 62,392 80,408 C98,424 62,440 80,456 M102,360 C84,376 120,392 102,408 C84,424 120,440 102,456'/></g></svg>`;
const TIS=(w,n,d)=>tissue.replace(/stroke='#b9df8e' stroke-opacity='.11'/,`stroke='${w}' stroke-opacity='.17'`).replace(/fill='#b9df8e' fill-opacity='.10'/,`fill='${n}' fill-opacity='.16'`).replace(/#e8b931/g,d);
const P=uri(TIS("#5aa8ff","#9b6bff","#d0c0ff"));
const IA=`linear-gradient(180deg,#0a0912 0,#141228 600px,#1f1b40 1300px,#2c1838 2000px,#3a1c36 2700px)`;
const IAD=`linear-gradient(160deg,#0a0912 0,#161330 35%,#26193f 65%,#3a1c36 100%)`;
const TINT=`:root[data-theme="dark"]{--surface:#181530!important;--bench:#1d1936!important;--line:#352d58!important;--bg:#0f0d1c!important}`;
const C=[["1. Indigo into aubergine","Vertical ombre, cards unchanged (still dark green)",IA,""],
["2. Indigo into aubergine + matching cards","Same ombre, cards tinted indigo to blend in",IA,TINT],
["3. Diagonal indigo into aubergine + matching cards","Ombre runs corner to corner",IAD,TINT]];
const V=C.map(([n,d,g,x])=>({n,d,bg:`${P},${g}`,rep:"repeat,no-repeat",extra:x}));
(async()=>{const b=await chromium.launch();
for(let i=0;i<V.length;i++){const p=await b.newPage({viewport:{width:1100,height:2500},colorScheme:'dark'});
 await p.goto(F);await p.evaluate(()=>document.documentElement.setAttribute('data-theme','dark'));
 await p.addStyleTag({content:`body{background-color:#0d130e!important;background-image:${V[i].bg}!important;background-repeat:${V[i].rep}!important}`+(V[i].extra||'')});
 await p.waitForTimeout(1500);await p.screenshot({path:D+`/ia${i}.png`});await p.close()}
const html=`<html><body style="margin:0;background:#e9e3d3;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 16px;font:800 30px sans-serif;color:#1d5420">Quiztoplasm · inky indigo into aubergine</h1><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">${V.map((v,i)=>`<figure style="margin:0;background:#fff;border-radius:12px;padding:10px;box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="data:image/png;base64,${fs.readFileSync(D+`/ia${i}.png`).toString("base64")}" style="width:100%;border-radius:6px;display:block"><figcaption style="padding:8px 4px 2px"><b style="font-size:17px">${v.n}</b><div style="color:#555;font-size:13px">${v.d}</div></figcaption></figure>`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1500,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../quiztoplasm-indigo-aubergine.png',fullPage:true});await b.close();console.log('done')})();
