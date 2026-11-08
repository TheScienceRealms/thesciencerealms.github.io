const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/../psycheverse.html#sort-ther-drug');await p.waitForTimeout(500);
for(let i=0;i<14;i++){const c=await p.$('.pool .chipm');if(!c)break;await c.click();console.log('sel',await p.evaluate(()=>G.r.sel));await p.locator('.bin').nth(0).click();console.log('placed',await p.evaluate(()=>G.r.items.filter(x=>x.at!==null).length))}
console.log(await p.$eval('#g',e=>e.innerHTML.slice(-400)));await b.close()})();
