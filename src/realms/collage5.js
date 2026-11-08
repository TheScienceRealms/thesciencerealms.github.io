const {chromium}=require('playwright');
const D=__dirname,F='file://'+D+'/../science-realms.html';
const gf=f=>`https://fonts.googleapis.com/css2?family=${f}&display=swap`;
const DARK=`:root{--paper:#1f3322;--paper2:#2a432d;--sage-dd:#f3ecdc;--sage-d:#b9cdb3;--gold-d:#e2bd5a;--gold-l:rgba(226,189,90,.25);--ink:#f3ecdc;--muted:#c6d2c0;--line:#3d5a40}html,body{background:#1f3322}.lead{color:#e6eddf!important}.btn.solid{background:#e2bd5a;border-color:#e2bd5a;color:#1f3322}.btn.line{background:transparent;color:#f3ecdc;border-color:#f3ecdc}`;
const V=[
 {n:"A. Bricolage Grotesque",d:"The current font · modern and chunky",font:null,css:DARK},
 {n:"B. Fraunces",d:"Soft academic serif · italic ‘Realms’",font:"Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,800",css:DARK+`:root{--display:"Fraunces",Georgia,serif}h1 em{font-style:italic}`},
 {n:"C. DM Serif Display",d:"Elegant, classic serif",font:"DM+Serif+Display",css:DARK+`:root{--display:"DM Serif Display",Georgia,serif}h1,.sh h2{font-weight:400;letter-spacing:0}`},
 {n:"D. Unbounded",d:"Wide, bold and modern",font:"Unbounded:wght@700;800",css:DARK+`:root{--display:"Unbounded",system-ui,sans-serif}h1{font-size:clamp(38px,6.6vw,74px);letter-spacing:-.02em}`},
 {n:"E. Syne",d:"Sharp, arty and futuristic",font:"Syne:wght@700;800",css:DARK+`:root{--display:"Syne",system-ui,sans-serif}h1{letter-spacing:-.02em}`},
 {n:"F. Fredoka",d:"Rounded and friendly",font:"Fredoka:wght@600;700",css:DARK+`:root{--display:"Fredoka",system-ui,sans-serif}h1{font-weight:700;letter-spacing:0}`}];
(async()=>{const b=await chromium.launch();const shots=[];
for(let i=0;i<V.length;i++){const v=V[i];const p=await b.newPage({viewport:{width:1200,height:1020}});
 await p.goto(F);
 if(v.font)await p.addStyleTag({url:gf(v.font)});
 if(v.css)await p.addStyleTag({content:v.css});
 await p.evaluate(svg=>{document.querySelector('.envelope').innerHTML=svg},require('fs').readFileSync(D+'/envelope-forest.svg','utf8'));
 await p.addStyleTag({content:'.slip{animation:none!important}'});
 await p.waitForTimeout(1800);const path=D+`/e${i}.png`;await p.screenshot({path});shots.push(path);await p.close()}
const html=`<html><body style="margin:0;background:#e9e3d3;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 16px;font:800 30px sans-serif;color:#2f4630">The Science Realms · Forest and gold · new envelope · font options</h1><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">${V.map((v,i)=>`<figure style="margin:0;background:#fff;border-radius:12px;padding:10px;box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="data:image/png;base64,${require("fs").readFileSync(D+`/e${i}.png`).toString("base64")}" style="width:100%;border-radius:6px;display:block"><figcaption style="padding:8px 4px 2px"><b style="font-size:18px">${v.n}</b><div style="color:#555;font-size:14px">${v.d}</div></figcaption></figure>`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1400,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../science-realms-forest-envelope.png',fullPage:true});await b.close();console.log('done')})();
