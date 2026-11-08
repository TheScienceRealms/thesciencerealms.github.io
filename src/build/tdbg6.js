const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/../quiztoplasm.html#sim-cancer');await p.waitForTimeout(400);
for(let i=0;i<40;i++){const hud=await p.textContent('#sim .s-hud').catch(()=>'-');const acts=await p.$$eval('#sim [data-act]',d=>[...new Set(d.map(x=>x.dataset.act+(x.disabled?'(d)':'')))].join(','));console.log(i,hud,'|',acts);
 if(await p.$('#sim .big'))break;
 const n=await p.$('#sim [data-act="next"]');if(n){await n.click();await p.waitForTimeout(80);continue}
 if(await p.$('#sim [data-act="ccw"]')){for(const k of ['G1','S','G2','M','G0']){if(await p.$('#sim .explain.ok'))break;await p.locator(`#sim [data-act="ccw"][data-k="${k}"]`).click({timeout:1500}).catch(e=>console.log('fail',k));await p.waitForTimeout(40)}continue}
 if(await p.$('#sim [data-act="ccmut"]')){await p.click('#sim [data-act="ccmut"]');for(let j=0;j<40&&!(await p.$('#sim [data-act="next"]'));j++)await p.waitForTimeout(500);console.log('count',await p.textContent('#ccn'));continue}
 if(await p.$('#sim [data-act="ccd"]:not([disabled])')){await p.click('#sim [data-act="ccd"][data-k="vin"]');await p.waitForTimeout(3000);console.log('after drug',await p.textContent('#ccn'));continue}
 const o=await p.$('#sim .opt:not([disabled])');if(o){await o.click();await p.waitForTimeout(50);continue}
 console.log('stuck');await p.screenshot({path:__dirname+'/dbg-cc.png'});break}
await b.close()})();
