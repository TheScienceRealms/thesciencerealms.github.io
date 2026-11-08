const {chromium}=require('playwright');const fs=require('fs');
const D=__dirname,F='file://'+D+'/../science-realms.html';
const gf=f=>`https://fonts.googleapis.com/css2?family=${f}&display=swap`;
const DARK=`:root{--paper:#1f3322;--paper2:#2a432d;--sage-dd:#f3ecdc;--sage-d:#b9cdb3;--gold-d:#e2bd5a;--gold-l:rgba(226,189,90,.25);--ink:#f3ecdc;--muted:#c6d2c0;--line:#3d5a40}html,body{background:#1f3322}.lead{color:#e6eddf!important}.btn.solid{background:#e2bd5a;border-color:#e2bd5a;color:#1f3322}.btn.line{background:transparent;color:#f3ecdc;border-color:#f3ecdc}`;
const FONTS={fraunces:{font:"Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,800",css:`:root{--display:"Fraunces",Georgia,serif}h1 em{font-style:italic}`,name:"Fraunces"},
 unb:{font:"Unbounded:wght@700;800",css:`:root{--display:"Unbounded",system-ui,sans-serif}h1{font-size:clamp(38px,6.6vw,74px);letter-spacing:-.02em}`,name:"Unbounded"}};
const ENV={
 ivory:{n:"Ivory with gold foil",body:"#f6efdd",flap:"#ede2c6",line:"#c8a03e",inner:"#c8a03e",txt:"#8a6a1c",slip:"#ffffff"},
 gold:{n:"Gold envelope",body:"#d9b250",flap:"#e8c66c",line:"#8a6a1c",inner:"#fff3cf",txt:"#5b440f",slip:"#fbf7ec"},
 white:{n:"Bright white with gold",body:"#ffffff",flap:"#f2eee4",line:"#e2bd5a",inner:"#e2bd5a",txt:"#a8841f",slip:"#fbf3df"}};
const env=e=>`<svg viewBox="0 0 380 320" role="img" aria-label="Results envelope">
 <ellipse cx="190" cy="302" rx="150" ry="10" fill="#0d1a0f" opacity=".45"/>
 <path d="M40,130 L190,36 L340,130" fill="${e.flap}" stroke="${e.line}" stroke-width="3" stroke-linejoin="round"/>
 <g><rect x="78" y="44" width="224" height="200" rx="8" fill="${e.slip}" stroke="#c8a03e" stroke-width="3"/>
  <rect x="86" y="52" width="208" height="184" rx="5" fill="none" stroke="#c8a03e" stroke-width="1" opacity=".7"/>
  <text x="190" y="78" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="12" letter-spacing="3.5" fill="#2f4630">RESULTS</text>
  <path d="M120,88 H260" stroke="#c8a03e" stroke-width="1.5"/>
  <rect x="104" y="100" width="76" height="76" rx="8" fill="#e2bd5a" stroke="#8a6a1c" stroke-width="2"/>
  <text x="142" y="156" text-anchor="middle" style="font-family:var(--display);font-weight:800" font-size="44" fill="#1f3322">A*</text>
  <rect x="196" y="100" width="76" height="76" rx="8" fill="#1f3322" stroke="#8a6a1c" stroke-width="2"/>
  <text x="234" y="156" text-anchor="middle" style="font-family:var(--display);font-weight:800" font-size="44" fill="#e2bd5a">A</text>
  <path d="M104,194 H272 M104,208 H236" stroke="#e4dcc6" stroke-width="5" stroke-linecap="round"/></g>
 <path d="M40,130 V282 H340 V130 L190,216 Z" fill="${e.body}" stroke="${e.line}" stroke-width="3" stroke-linejoin="round"/>
 <path d="M50,148 V272 H330 V148" fill="none" stroke="${e.inner}" stroke-width="1.2" opacity=".7"/>
 <path d="M40,282 L160,198 M340,282 L220,198" stroke="${e.line}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
 <text x="190" y="268" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="10" letter-spacing="3" fill="${e.txt}">RESULTS DAY</text>
 <circle cx="190" cy="217" r="25" fill="${e===ENV.gold?"#1f3322":"#e2bd5a"}" stroke="#8a6a1c" stroke-width="3"/>
 <circle cx="190" cy="217" r="18" fill="none" stroke="${e===ENV.gold?"#e2bd5a":"#8a6a1c"}" stroke-width="1.5" stroke-dasharray="2 3"/>
 <text x="190" y="225" text-anchor="middle" style="font-family:var(--display);font-weight:800" font-size="20" fill="${e===ENV.gold?"#e2bd5a":"#1f3322"}">SR</text>
 <g fill="#e2bd5a"><path d="M54,58 l4,9 l9,2 l-9,3 l-4,9 l-4,-9 l-9,-3 l9,-2 z"/><path d="M330,62 l3,6 l6,1 l-6,2 l-3,6 l-3,-6 l-6,-2 l6,-1 z"/><path d="M352,176 l2,5 l5,1 l-5,2 l-2,5 l-2,-5 l-5,-2 l5,-1 z"/><path d="M24,214 l2,5 l5,1 l-5,2 l-2,5 l-2,-5 l-5,-2 l5,-1 z"/></g></svg>`;
const V=[];for(const ek of ["ivory","gold","white"])for(const fk of ["fraunces","unb"])V.push({ek,fk,n:ENV[ek].n,d:FONTS[fk].name});
(async()=>{const b=await chromium.launch();
for(let i=0;i<V.length;i++){const v=V[i],f=FONTS[v.fk];const p=await b.newPage({viewport:{width:1200,height:700}});
 await p.goto(F);await p.addStyleTag({url:gf(f.font)});await p.addStyleTag({content:DARK+f.css});
 await p.evaluate(svg=>{document.querySelector('.envelope').innerHTML=svg},env(ENV[v.ek]));
 await p.waitForTimeout(1800);await p.screenshot({path:D+`/g${i}.png`,clip:{x:0,y:0,width:1200,height:480}});await p.close()}
const html=`<html><body style="margin:0;background:#e9e3d3;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 16px;font:800 30px sans-serif;color:#2f4630">Forest and gold · envelope colour options</h1><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">${V.map((v,i)=>`<figure style="margin:0;background:#fff;border-radius:12px;padding:10px;box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="data:image/png;base64,${fs.readFileSync(D+`/g${i}.png`).toString("base64")}" style="width:100%;border-radius:6px;display:block"><figcaption style="padding:8px 4px 2px"><b style="font-size:18px">${i+1}. ${v.n}</b><div style="color:#555;font-size:14px">Title font: ${v.d}</div></figcaption></figure>`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1400,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../science-realms-envelopes.png',fullPage:true});await b.close();console.log('done')})();
