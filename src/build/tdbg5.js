const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/../quiztoplasm.html#sim-vesicle');await p.waitForTimeout(400);
for(const k of ['nuc','rer','tv','gol','sv','mem']){try{await p.locator(`#sim svg [data-act="vv"][data-k="${k}"]`).click({timeout:2000})}catch(e){console.log('click fail',k,e.message.split('\n').slice(0,6).join(' | '))}
 await p.waitForTimeout(100);console.log(k,await p.textContent('#sim .explain').catch(()=>'-'));const n=await p.$('#sim [data-act="next"]');if(n)await n.click();await p.waitForTimeout(100)}
await p.screenshot({path:__dirname+'/dbg-ves.png'});await b.close()})();
