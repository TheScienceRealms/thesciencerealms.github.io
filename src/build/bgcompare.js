const fs=require('fs');const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:640}});
const old=fs.readFileSync(__dirname+'/../quiztoplasm.html','utf8').match(/html body\{background-image:url\("(data:image\/svg\+xml,[^"]*)"\)/)[1];
const nu='data:image/svg+xml,'+encodeURIComponent(fs.readFileSync(__dirname+'/bgtile.svg','utf8'));
fs.writeFileSync(__dirname+'/bgcmp.html',`<style>.t0{background-image:url("${old}")}.t1{background-image:url("${nu.replace(/'/g,'%27')}")}</style><body style="margin:0;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#000;font:700 18px sans-serif;color:#fff">${['Now (seams)','Fixed (seamless)'].map((t,i)=>`<div><div style="padding:6px">${t}</div><div class="t${i}" style="height:600px;background-color:#1d0f1a"></div></div>`).join('')}</body>`);
await p.goto('file://'+__dirname+'/bgcmp.html');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/bgcmp.png'});await b.close()})();
