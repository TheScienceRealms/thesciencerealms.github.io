const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/../quiztoplasm.html#game-heart');await p.waitForTimeout(400);
const ks=await p.$$eval('#gamewrap [data-act="spot"]',a=>a.map(x=>x.dataset.k));console.log(ks.join(','));
await p.click('#gamewrap [data-act="spot"][data-k="ra"]',{force:true});await p.waitForTimeout(200);
console.log((await p.textContent('#gamewrap')).slice(0,400));
await b.close()})();
