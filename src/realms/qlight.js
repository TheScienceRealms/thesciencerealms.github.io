const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../quiztoplasm.html';
const p=await b.newPage({viewport:{width:1100,height:1000},colorScheme:'light'});p.on('pageerror',e=>errs.push(e.message));
await p.goto(F+'#cellular-frontier');await p.waitForTimeout(800);
const hs=[...new Set(await p.$$eval('a[href^="#"]',a=>a.map(x=>x.getAttribute('href')).filter(h=>h.length>1)))];
console.log(hs.slice(0,40).join(' '));
await p.screenshot({path:__dirname+'/ql0.png'});
const pick=[hs.find(h=>/note/i.test(h)),hs.find(h=>/lab/i.test(h)),hs.find(h=>/(match|dna|osm|surg)/i.test(h))].filter(Boolean);
for(let i=0;i<pick.length;i++){await p.goto(F+pick[i]);await p.waitForTimeout(700);const o=await p.$('.opt, button.opt, [data-act]');await p.screenshot({path:__dirname+`/ql${i+1}.png`})}
console.log(pick,errs);await b.close()})();
