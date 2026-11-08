const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:1000,height:1400}});p.on('pageerror',e=>errs.push(e.message));
const S=__dirname+'/../';
for(const [f,h] of [['quiztoplasm.html','#notes-h'],['quiztoplasm.html','#notes-m'],['chemquest.html','#notes-2-8'],['chemquest.html','#notes-1-9']]){await p.goto('file://'+S+f+h);await p.waitForTimeout(500);const t=await p.textContent('body');console.log(h,/CW = ACW|Valve rule|Meselson–Stahl: generation|Rinse it with/.test(t))}
await p.goto('file://'+S+'chemquest.html#notes-2-8');await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/n-hess.png',fullPage:true});
console.log(errs);await b.close()})();
