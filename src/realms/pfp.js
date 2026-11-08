const fs=require('fs');const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:600,height:1700},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/pfp.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const out=__dirname+'/../';
for(const id of ['A','B','C'])await p.locator('#'+id).screenshot({path:out+`science-realms-pfp-${id}.png`});
// preview collage: square + circle crop as GitHub shows it
const imgs=['A','B','C'].map(id=>'data:image/png;base64,'+fs.readFileSync(out+`science-realms-pfp-${id}.png`).toString('base64'));
await p.setViewportSize({width:1200,height:760});
await p.setContent(`<body style="margin:0;background:#0d1117;font:700 22px sans-serif;color:#e6edf3;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center">${imgs.map((s,i)=>`<div><div style="margin-bottom:10px">Option ${i+1}</div><img src="${s}" style="width:340px;border-radius:12px"><div style="display:flex;justify-content:center;gap:14px;margin-top:14px;align-items:center"><img src="${s}" style="width:110px;border-radius:50%;border:2px solid #30363d"><img src="${s}" style="width:40px;border-radius:50%"></div></div>`).join('')}</body>`);
await p.waitForTimeout(300);await p.screenshot({path:out+'science-realms-pfp-options.png',fullPage:true});await b.close()})();
