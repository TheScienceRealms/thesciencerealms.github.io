const {chromium}=require('playwright');
const D=__dirname,F='file://'+D+'/../science-realms.html';
const gf=f=>`https://fonts.googleapis.com/css2?family=${f}&display=swap`;
const V=[
 {n:"1. Current",d:"Bricolage Grotesque · sage, beige, gold",font:null,css:""},
 {n:"2. Brighter gold, fresher sage",d:"Bricolage Grotesque · richer gold title, lighter sage",font:null,
  css:`:root{--sage-dd:#3d6b45;--sage-d:#5d8a5f;--gold-d:#b8860b;--gold-l:#f6df9a}h1 em{color:#c99a1a;text-shadow:0 2px 0 #7a5a10}`},
 {n:"3. Academic serif",d:"Fraunces · same colours, more bookish",font:"Fraunces:opsz,wght@9..144,700;9..144,900",
  css:`:root{--display:"Fraunces",Georgia,serif}h1{font-weight:900;letter-spacing:-.01em}h1 em{font-style:italic}`},
 {n:"4. Forest and gold (dark)",d:"Bricolage Grotesque · deep green paper, cream text",font:null,
  css:`:root{--paper:#1f3322;--paper2:#2a432d;--sage-dd:#f3ecdc;--sage-d:#b9cdb3;--gold-d:#e2bd5a;--gold-l:rgba(226,189,90,.25);--ink:#f3ecdc;--muted:#c6d2c0;--line:#3d5a40}html,body{background:#1f3322}.lead{color:#e6eddf!important}.btn.solid{background:#e2bd5a;border-color:#e2bd5a;color:#1f3322}.btn.line{background:transparent;color:#f3ecdc;border-color:#f3ecdc}`},
 {n:"5. Clean white with sage",d:"DM Serif Display · white page, sage and gold accents",font:"DM+Serif+Display",
  css:`:root{--paper:#ffffff;--paper2:#f7f9f5;--display:"DM Serif Display",Georgia,serif;--sage-dd:#41604a;--gold-l:#f3e6c0}html,body{background:#fff}h1{font-weight:400;letter-spacing:0}.sh h2{font-weight:400}`},
 {n:"6. Playful rounded",d:"Fredoka · mint sage, honey gold",font:"Fredoka:wght@500;700",
  css:`:root{--paper:#eef4ea;--paper2:#fbfdf9;--display:"Fredoka",system-ui,sans-serif;--sage-dd:#2f6b4f;--sage-d:#4c8a6a;--gold-d:#c58b10;--gold-l:#ffe7a3}html,body{background:#eef4ea}h1{font-weight:700;letter-spacing:0}`}];
(async()=>{const b=await chromium.launch();const shots=[];
for(let i=0;i<V.length;i++){const v=V[i];const p=await b.newPage({viewport:{width:1200,height:1020}});
 await p.goto(F);
 if(v.font)await p.addStyleTag({url:gf(v.font)});
 if(v.css)await p.addStyleTag({content:v.css});
 await p.addStyleTag({content:'.slip{animation:none!important}'});
 await p.waitForTimeout(1800);const path=D+`/v${i}.png`;await p.screenshot({path});shots.push(path);await p.close()}
const html=`<html><body style="margin:0;background:#e9e3d3;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 16px;font:800 30px sans-serif;color:#2f4630">The Science Realms · style options</h1><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">${V.map((v,i)=>`<figure style="margin:0;background:#fff;border-radius:12px;padding:10px;box-shadow:0 6px 18px rgba(0,0,0,.12)"><img src="data:image/png;base64,${require("fs").readFileSync(D+`/v${i}.png`).toString("base64")}" style="width:100%;border-radius:6px;display:block"><figcaption style="padding:8px 4px 2px"><b style="font-size:18px">${v.n}</b><div style="color:#555;font-size:14px">${v.d}</div></figcaption></figure>`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1400,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../science-realms-styles.png',fullPage:true});await b.close();console.log('done')})();
