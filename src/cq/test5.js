const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../chemquest.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/q-'+n+'.png',fullPage:true});
for(const lab of ['halolab','group2']){await p.goto(F+'#'+lab);await p.waitForTimeout(300);let k=0;
 for(let i=0;i<80;i++){if(await p.$('.big'))break;
  if(await p.$('#nx')){await p.click('#nx');continue}
  if(await p.$('[data-act="btrend"]:not([disabled])')){const n=await p.evaluate(()=>G.r.o.indexOf(G.extra[0][1]));await p.click(`[data-act="btrend"][data-k="${n}"]`);continue}
  if(await p.$('[data-act="bobs"]:not([disabled])')){const n=await p.evaluate(()=>G.r.o.indexOf(G.tasks[G.ti].a));await p.click(`[data-act="bobs"][data-k="${n}"]`);if(k++<1)await shot(lab+'-obs');continue}
  const need=await p.evaluate(()=>G.tasks[G.ti]&&G.tasks[G.ti].need);if(need){await p.click(`[data-act="bsel"][data-k="${need[0]}"]`,{force:true});await p.click(`[data-act="badd"][data-k="${need[1]}"]`);continue}
  break}
 console.log(lab,await p.textContent('.big').catch(()=>'NO'))}
await p.goto(F+'#halolab');await p.waitForTimeout(200);await p.click('[data-act="bsel"][data-k="A"]',{force:true});await p.click('[data-act="badd"][data-k="kbr"]');await shot('hal1');
// atom
await p.goto(F+'#atom');await p.waitForTimeout(300);
for(let i=0;i<40;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}
 const st=await p.evaluate(()=>G.stage);
 if(st===0){const T=await p.evaluate(()=>ATOM_T[G.i]);await p.evaluate(T=>{G.b={p:T.p,n:T.n,e:T.e}},T);await p.click('[data-act="aadj"][data-k="n:1"]');await p.click('[data-act="aadj"][data-k="n:-1"]');if(i===0)await shot('atom');await p.click('[data-act="acheck"]');continue}
 const ans=await p.evaluate(()=>CONF_T[G.i].ans);for(const [s,v] of Object.entries(ans))for(let j=0;j<v;j++)await p.click(`[data-act="cadj"][data-k="${s}:1"]`);if(i<12)await shot('conf');await p.click('[data-act="ccheck"]')}
console.log('atom',await p.textContent('.big').catch(()=>'NO'));
// collision
await p.goto(F+'#collision');await p.waitForTimeout(300);await p.click('[data-act="cT"][data-k="60"]');await p.click('[data-act="cK"]');await p.waitForTimeout(1500);await shot('coll');
for(let i=0;i<20;i++){if(await p.$('.big'))break;if(await p.$('[data-act="cnext"]')){await p.click('[data-act="cnext"]');continue}const n=await p.evaluate(()=>G.qo.indexOf(COLL_Q[G.qi][1]));await p.click(`[data-act="cq"][data-k="${n}"]`)}
console.log('coll',await p.textContent('.big').catch(()=>'NO'));
// equilibrium
await p.goto(F+'#equilibrium');await p.waitForTimeout(300);
for(let i=0;i<30;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.waitForTimeout(1000);if(i===1)await shot('equi');await p.click('#nx');continue}
 const n=await p.evaluate(()=>G.i<EQ_STEPS.length?G.o.indexOf(EQ_STEPS[G.i].a):G.o.indexOf(EQ_EXTRA[G.i-EQ_STEPS.length][1]));await p.click(`[data-act="${await p.evaluate(()=>G.i<EQ_STEPS.length?"epred":"eqx")}"][data-k="${n}"]`)}
console.log('equi',await p.textContent('.big').catch(()=>'NO'));
const m=await b.newPage({viewport:{width:390,height:844}});for(const h of ['#halolab','#group2','#atom','#collision','#equilibrium']){await m.goto(F+h);await m.waitForTimeout(400);console.log('mobile',h,await m.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
