const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../chemquest.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/z-'+n+'.png',fullPage:true});const big=async()=>p.textContent('.big').catch(()=>'NO');
// Hess architect
await p.goto(F+'#hessarch');await p.waitForTimeout(300);
for(let i=0;i<60;i++){if(await p.$('.big'))break;const st=await p.evaluate(()=>G.s.stage);const Q=await p.evaluate(()=>G.Q);
 if(st===0){await p.click(`[data-act="abot"][data-k="${Q.type==="f"?0:1}"]`);await p.click(`[data-act="aarr"][data-k="${Q.type==="f"?"up":"down"}"]`);if(i===0)await shot('arch0');await p.click('[data-act="acyc"]');continue}
 if(st===1){for(let j=0;j<Q.terms.length;j++){if(Q.terms[j].sign===1)await p.click(`[data-act="asg"][data-k="${j}"]`);else{await p.click(`[data-act="asg"][data-k="${j}"]`);await p.click(`[data-act="asg"][data-k="${j}"]`)}await p.fill(`.sm2[data-i="${j}"]`,String(Q.terms[j].n))}if(i<3)await shot('arch1');await p.click('[data-act="aterms"]');continue}
 if(st===2){await p.fill('#ain',String(Q.ans));await p.click('[data-act="acalc"]');continue}
 if(i<6)await shot('arch3');await p.click('#nx')}
console.log('arch',await big());
// roadmap
await p.goto(F+'#roadmap');await p.waitForTimeout(300);
for(let i=0;i<80;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}
 if(await p.$('[data-act="rtype"]:not([disabled])')){const n=await p.evaluate(()=>G.s.to.indexOf(G.s.edge[3]));await p.click(`[data-act="rtype"][data-k="${n}"]`);continue}
 const k=await p.evaluate(()=>{const M=G.ms[G.mi],s=G.s,out=RE.filter(e=>e[0]===s.cur);return out.findIndex(e=>e[1]===M.path[s.step])});if(i===0)await shot('road');await p.click(`[data-act="rgo"][data-k="${k}"]`)}
console.log('road',await big());
// lattice
await p.goto(F+'#lattice');await p.waitForTimeout(300);
for(let i=0;i<120;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}
 if(await p.$('[data-act="dcheck"]')){const D=await p.evaluate(()=>({i:G.do.indexOf(DETECT[G.det][1]),ev:G.eo.map((o,n)=>DETECT[G.det][3].includes(o)?n:-1).filter(n=>n>=0)}));await p.click(`[data-act="dpick"][data-k="${D.i}"]`);for(const n of D.ev)await p.click(`[data-act="dev"][data-k="${n}"]`);await p.click('[data-act="dcheck"]');continue}
 if(await p.$('[data-act="ltest"]:not([disabled])')){const n=await p.evaluate(()=>G.to.indexOf(LAT[G.li].tests[G.ti][1]));await p.click(`[data-act="ltest"][data-k="${n}"]`);continue}
 if(await p.$('[data-act="lcheck"]')){const id=await p.evaluate(()=>LAT[G.li].id);
  if(id==="nacl"){await p.evaluate(()=>{for(let n=0;n<27;n++){const i=Math.floor(n/9),j=Math.floor(n/3)%3,l=n%3;G.fill[i+","+j+","+l]=(i+j+l)%2?"na":"cl"}});await p.click('.lslot[data-k="0,0,1"]');await p.click('.lslot[data-k="0,0,1"]');await shot('lat-nacl')}
  if(id==="metal"){await p.evaluate(()=>{for(let n=0;n<27;n++)G.fill[[Math.floor(n/9),Math.floor(n/3)%3,n%3].join(",")]=true});await p.click('[data-act="lelec"]')}
  if(id==="diamond"){for(const k of [0,1,2,3])await p.click(`.lslot[data-k="${k}"]`);await shot('lat-dia')}
  if(id==="graphite"||id==="iodine"){const n=await p.evaluate(()=>G.qo.indexOf(LAT[G.li].id==="graphite"?"3":"Weak van der Waals forces"));await p.click(`[data-act="lq"][data-k="${n}"]`)}
  await p.click('[data-act="lcheck"]');continue}
 console.log('lat stuck',i);break}
console.log('lattice',await big());
// isotope
await p.goto(F+'#isotope');await p.waitForTimeout(300);
for(let i=0;i<40;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}
 if(await p.$('[data-act="ialg"]')){const x=await p.evaluate(()=>G.alg.x);await p.fill('#iin',String(x));await p.click('[data-act="ialg"]');continue}
 if(await p.$('[data-act="iar"]')){const ar=await p.evaluate(()=>{const C=G.cases[G.i];return (C.iso.reduce((s,[m,q])=>s+m*q,0)/100).toFixed(1)});await p.fill('#iin',ar);if(i===0)await shot('iso');await p.click('[data-act="iar"]');continue}
 const n=await p.evaluate(()=>G.o.indexOf(G.cases[G.i].el));await p.click(`[data-act="iel"][data-k="${n}"]`)}
console.log('iso',await big());
// heist
await p.goto(F+'#heist');await p.waitForTimeout(300);
for(let i=0;i<120;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}const part=await p.evaluate(()=>G.part);
 if(part===0){const v=await p.evaluate(()=>G.ox[G.i][2]);for(let j=0;j<Math.abs(v);j++)await p.click(`[data-act="hv"][data-k="${v>0?1:-1}"]`);await p.click('[data-act="hox"]');continue}
 if(part===1){if(await p.$('[data-act="hmove"]')){await p.click('[data-act="hmove"]');continue}const n=await p.evaluate(()=>G.ho.indexOf(G.hs[G.i].ox));await shot('heist');await p.click(`[data-act="hpick"][data-k="${n}"]`);continue}
 const H=await p.evaluate(()=>HALF[G.i]);for(const [s,arr] of [["l",H.l],["r",H.r]])for(let j=0;j<arr.length;j++)if(arr[j][2])for(let c=1;c<arr[j][1];c++)await p.click(`[data-act="hc"][data-k="${s}${j}:1"]`);if(i>20&&i<40)await shot('half');await p.click('[data-act="hhalf"]')}
console.log('heist',await big());
const m=await b.newPage({viewport:{width:390,height:844}});for(const h of ['#hessarch','#roadmap','#lattice','#isotope','#heist']){await m.goto(F+h);await m.waitForTimeout(400);console.log('mobile',h,await m.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
