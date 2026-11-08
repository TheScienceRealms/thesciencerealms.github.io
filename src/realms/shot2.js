const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const n of ['quiztoplasm','chemquest','psycheverse']){const p=await b.newPage({viewport:{width:1100,height:900}});p.on('pageerror',e=>errs.push(n+e.message));
await p.goto('file://'+__dirname+'/../'+n+'.html');await p.waitForTimeout(1200);
await p.screenshot({path:__dirname+'/top-'+n+'.png',clip:{x:0,y:0,width:1100,height:420}});
const a=await p.$('#about-h');await a.scrollIntoViewIfNeeded();await p.screenshot({path:__dirname+'/ab-'+n+'.png'});await p.close()}
console.log(errs);await b.close()})();
