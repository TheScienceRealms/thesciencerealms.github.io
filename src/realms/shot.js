const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const f='file://'+__dirname+'/../science-realms.html';
const p=await b.newPage({viewport:{width:1200,height:900}});p.on('pageerror',e=>errs.push(e.message));
await p.goto(f);await p.waitForTimeout(2000);await p.screenshot({path:__dirname+'/d.png',fullPage:true});
const m=await b.newPage({viewport:{width:390,height:844}});await m.goto(f);await m.waitForTimeout(1500);
console.log('sw',await m.evaluate(()=>document.documentElement.scrollWidth));await m.screenshot({path:__dirname+'/m.png'});
console.log(errs);await b.close()})();
