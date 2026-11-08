const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../quiztoplasm.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/s-'+n+'.png',fullPage:true});const big=async()=>p.textContent('#sim .big').catch(()=>'NO');
const clickText=async t=>{await p.locator('#sim [data-act]',{hasText:t}).first().click()};
// food tests: run all tests on every sample, then identify by logs
await p.goto(F+'#sim-food');await p.waitForTimeout(300);
for(let i=0;i<4;i++){await p.click(`#sim [data-act="ftsel"][data-k="${i}"]`,{force:true});
 for(const k of ["iod","fresh","ben","heat","fresh","biu","fresh","acid","ben","heat","fresh"]){await p.click(`#sim [data-act="ft"][data-k="${k}"]`)}}
await shot('food');
const logs=await p.$$eval('#sim .notebook div',d=>d.map(x=>x.textContent));
const ids=logs.map(t=>/blue-black/.test(t)?"starch":/purple/.test(t)?"protein":/heated\): brick/.test(t)?"glucose":"sucrose");
const L=["A","B","C","D"];for(let i=0;i<4;i++)await p.click(`#sim [data-act="ftid"][data-k="${L[i]}:${ids[i]}"]`);console.log(ids,await p.$$eval('#sim [data-act="ftid"].on',d=>d.map(x=>x.dataset.k)));await p.click('#sim [data-act="ftchk"]');console.log('food',await big());
// chromatography
await p.goto(F+'#sim-chroma');await p.waitForTimeout(300);
for(const a of ["Pencil","Small, concentrated","Below the origin"]){await clickText(a);await p.click('#sim [data-act="chn"]');await p.waitForTimeout(100)}
await p.click('#sim [data-act="chrun"]');await p.waitForTimeout(2500);await shot('chroma');await p.click('#sim [data-act="chn"]');
const spots=await p.$$eval('#sim .legrow',r=>r.map(x=>+x.textContent.match(/moved (\d+) mm/)[1]));const front=+(await p.textContent('#sim')).match(/front moved (\d+) mm/)[1];
const AA={glycine:0.26,alanine:0.38,valine:0.60,leucine:0.73,lysine:0.14,phenylalanine:0.68};
for(let i=0;i<spots.length;i++){const rf=spots[i]/front;await p.fill(`#sim .sm2[data-i="${i}"]`,rf.toFixed(2));const best=Object.entries(AA).sort((a,b)=>Math.abs(a[1]-rf)-Math.abs(b[1]-rf))[0][0];await p.selectOption(`#sim .aasel[data-i="${i}"]`,best)}
await p.click('#sim [data-act="chchk"]');console.log('chroma',await big());
// enzyme
await p.goto(F+'#sim-enzyme');await p.waitForTimeout(800);await shot('enzyme');
for(let i=0;i<10;i++){if(await p.$('#sim .big'))break;await p.locator('#sim [data-act="eq"]').first().click();await p.click('#sim [data-act="eqn"]');await p.waitForTimeout(100)}console.log('enzyme',await big());
// fick
await p.goto(F+'#sim-fick');await p.waitForTimeout(500);
await p.evaluate(()=>{const r=document.querySelector('#sim [data-sl="sa"]');r.value=8;r.dispatchEvent(new Event('input'))});await p.click('#sim [data-act="fchk"]');
await p.evaluate(()=>{for(const [k,v] of [["sa",8],["dc",8],["th",1]]){const r=document.querySelector(`#sim [data-sl="${k}"]`);r.value=v;r.dispatchEvent(new Event('input'))}});await shot('fick');await p.click('#sim [data-act="fchk"]');
await p.evaluate(()=>{const r=document.querySelector('#sim [data-sl="sa"]');r.value=1;r.dispatchEvent(new Event('input'))});await p.click('#sim [data-act="fchk"]');
for(let i=0;i<5;i++){if(await p.$('#sim .big'))break;await p.locator('#sim [data-act="fq"]').first().click();await p.click('#sim [data-act="fqn"]');await p.waitForTimeout(100)}console.log('fick',await big());
// oxygen
await p.goto(F+'#sim-oxygen');await p.waitForTimeout(300);
const sat=(p,P,n)=>100*p**n/(p**n+P**n);
for(const [v,b] of [[sat(12,3.5,2.7),0],[sat(4,3.5,2.7),0],[sat(4,4.6,2.7),1]]){if(b)await p.click('#sim [data-act="obohr"]');await p.fill('#oin',v.toFixed(0));await p.click('#sim [data-act="ochk"]')}
await shot('oxygen');for(let i=0;i<5;i++){if(await p.$('#sim .big'))break;await p.locator('#sim [data-act="oq"]').first().click();await p.click('#sim [data-act="oqn"]');await p.waitForTimeout(100)}console.log('oxygen',await big());
// ileum (games engine)
await p.goto(F+'#game-ileum');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/s-ileum.png',fullPage:true});
for(let i=0;i<80;i++){const t=await p.textContent('#gamewrap');if(/Play again/.test(t))break;const nx=await p.$('#gamewrap [data-act="next"]');if(nx){await nx.click();continue}
 const sp=await p.$('#gamewrap [data-act="spot"]');if(sp){await p.locator('#gamewrap [data-act="spot"]').first().click({force:true});continue}
 const op=await p.$('#gamewrap [data-act="opt"]:not([disabled])');if(op){await op.click();continue}
 const od=await p.$('#gamewrap [data-act="ord"]:not([disabled]):not(.on)');if(od){await od.click();continue}
 const ck=await p.$('#gamewrap [data-act="check"]:not([disabled])');if(ck){await ck.click();continue}break}
console.log('ileum',/Play again/.test(await p.textContent('#gamewrap')));
await p.goto(F+'#cellular-frontier');await p.waitForTimeout(300);console.log('links',(await p.$$('a[href^="#sim-"]')).length);
const m=await b.newPage({viewport:{width:390,height:844}});for(const h of ['food','chroma','enzyme','fick','oxygen']){await m.goto(F+'#sim-'+h);await m.waitForTimeout(400);console.log('mobile',h,await m.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
