const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
const P=[["The Science Realms","science-realms.html"],["Quiztoplasm","quiztoplasm.html"],["ChemQuest","chemquest.html"],["The Psycheverse","psycheverse.html"]];
(async()=>{const b=await chromium.launch();const cells=[];
for(const [n,f] of P)for(const mode of ["dark","light"]){const p=await b.newPage({viewport:{width:1200,height:900},colorScheme:mode});
 await p.goto('file://'+D+'/../'+f);await p.waitForTimeout(1800);const path=D+`/all-${f}-${mode}.png`;await p.screenshot({path});await p.close();cells.push({n,mode,path})}
const html=`<html><body style="margin:0;background:#ece7da;font-family:sans-serif;padding:24px"><h1 style="margin:0 0 6px;font:800 30px sans-serif;color:#24321f">The Science Realms · all four homepages</h1><div style="display:grid;grid-template-columns:150px 1fr 1fr;gap:16px;align-items:center"><div></div><b style="font-size:20px;text-align:center">Dark mode</b><b style="font-size:20px;text-align:center">Light mode</b>${P.map(([n,f])=>`<b style="font-size:18px">${n}</b>${["dark","light"].map(m=>`<img src="data:image/png;base64,${fs.readFileSync(D+`/all-${f}-${m}.png`).toString("base64")}" style="width:100%;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,.15);display:block">`).join("")}`).join("")}</div></body></html>`;
const p=await b.newPage({viewport:{width:1500,height:900},deviceScaleFactor:2});await p.setContent(html);await p.waitForTimeout(800);
await p.screenshot({path:D+'/../science-realms-all-pages.png',fullPage:true});await b.close();console.log('done')})();
