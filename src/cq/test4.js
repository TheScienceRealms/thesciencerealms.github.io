const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../chemquest.html';
const p=await b.newPage({viewport:{width:1000,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/r-'+n+'.png',fullPage:true});
// Hess: answer correctly using in-page data
await p.goto(F+'#hess');await p.waitForTimeout(500);
for(let i=0;i<60;i++){if(await p.$('.big'))break;
  if(await p.$('#nx')){await p.click('#nx');continue}
  if(await p.$('[data-act="hspot"]:not([disabled])')){await p.locator('[data-act="hspot"]').first().click();continue}
  if(await p.$('[data-act="hcheck"]')){const L=await p.evaluate(()=>G.rooms[G.ri].legs.map(l=>legWith(l)));for(let j=0;j<L.length;j++)await p.click(`[data-act="hdir"][data-k="${j}:${L[j]?1:0}"]`);if(i===0)await shot('hess1');await p.click('[data-act="hcheck"]');continue}
  if(await p.$('#hin:not([disabled])')){const a=await p.evaluate(()=>hessAnswer(G.rooms[G.ri]));await p.fill('#hin',String(a));if(i<6)await shot('hess2');await p.click('[data-act="hcalc"]');continue}
  break}
console.log('hess',await p.textContent('.big').catch(()=>'NO'));
// Mechanisms: play correctly
for(const id of ['ethene-hbr','ethene-br2','propene-hbr','bromoethane-oh','tert-oh']){
 await p.goto(F+'#mech-'+id);await p.waitForTimeout(300);
 for(let i=0;i<40;i++){if(await p.$('.big'))break;
  if(await p.$('#nx')){await p.click('#nx');continue}
  const st=await p.evaluate(()=>G.stage);
  if(st===0){const t=await p.evaluate(()=>G.M.hunt[G.hi][1][0]);await p.click(`.msvg [data-k="${t}"]`,{force:true});continue}
  if(st===1){const n=await p.evaluate(()=>G.mo.indexOf(G.M.mech));await p.click(`[data-act="mmatch"][data-k="${n}"]`);continue}
  if(st===2){const arr=await p.evaluate(()=>G.M.steps[G.si].arrows);for(const [s,e] of arr){await p.click(`.msvg [data-k="${s}"]`,{force:true});await p.click(`.msvg [data-k="${e}"]`,{force:true})}if(id==='ethene-hbr'&&i<8)await shot('mech-draw');await p.click('[data-act="mcheck"]');continue}
  if(st===3){const n=await p.evaluate(()=>G.fo.indexOf(G.M.fin[G.fi][1]));await p.click(`[data-act="mfin"][data-k="${n}"]`);continue}
  break}
 const sc=await p.textContent('.big').catch(()=>'NO');console.log('mech',id,sc);if(id==='propene-hbr')await shot('mech-end')}
// match-up
await p.goto(F+'#mechmatch');await p.waitForTimeout(300);
for(let i=0;i<30;i++){if(await p.$('.big'))break;const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o)await o.click();const n=await p.$('#nx');if(n)await n.click()}
console.log('match',await p.textContent('.big').catch(()=>'NO'));
// titration
await p.goto(F+'#titration');await p.waitForTimeout(300);
const good=await p.evaluate(()=>TIT_SET.filter(x=>x[2]).map(x=>x[0]));
await p.click('[data-act="tset"][data-k="x-water"]');
for(const id of good)await p.click(`[data-act="tset"][data-k="${id}"]`);
await shot('tit-setup');await p.click('[data-act="tgo"]');
for(let run=0;run<6;run++){
 if(await p.$('[data-act="tcalc"]'))break;
 await p.click('[data-act="tnew"]');
 const init=await p.evaluate(()=>G.T.cur.init);await p.fill('#tin',init.toFixed(2));if(run===0)await shot('tit-read');await p.click('[data-act="tinit"]');
 // add volume directly to near end then drops
 await p.evaluate(()=>{const c=G.T.cur;c.vol=+(Math.max(0,c.end-0.3)).toFixed(2)});
 const fb=await p.$('#flow');const bb=await fb.boundingBox();await p.mouse.move(bb.x+5,bb.y+5);await p.mouse.down();await p.waitForTimeout(100);await p.mouse.up();
 for(let d=0;d<20;d++){const done=await p.evaluate(()=>G.T.cur.vol>=G.T.cur.end);if(done)break;await p.click('[data-act="tdrop"]')}
 if(run===0)await shot('tit-run');
 await p.click('[data-act="tstop"]');const fin=await p.evaluate(()=>G.T.cur.init+G.T.cur.vol);
 const r=Math.round(fin*20)/20;await p.fill('#tin',r.toFixed(2));await p.click('[data-act="tfinal"]');}
await p.click('[data-act="tcalc"]');
const e=await p.evaluate(()=>{const T=G.T,con=T.runs.filter(r=>r.con),m=con.reduce((s,r)=>s+r.t,0)/con.length;return {mean:m.toFixed(2),mol:(0.1*m/1000).toPrecision(3),conc:(0.1*m/1000*1000/25).toPrecision(3)}});
await p.fill('#c-mean',e.mean);await p.fill('#c-mol',e.mol);await p.fill('#c-conc',e.conc);await p.click('[data-act="tcheck"]');await shot('tit-end');
console.log('tit',await p.textContent('.big').catch(()=>'NO'));
await p.goto(F+'#molecular-realm');await p.waitForTimeout(300);await shot('as2');
const m=await b.newPage({viewport:{width:390,height:844}});for(const h of ['#hess','#mech-propene-hbr','#titration']){await m.goto(F+h);await m.waitForTimeout(400);const sw=await m.evaluate(()=>document.documentElement.scrollWidth);console.log('mobile',h,sw)}
await m.goto(F+'#mech-ethene-hbr');await m.waitForTimeout(300);await m.screenshot({path:__dirname+'/r-mobile.png',fullPage:true});
console.log(errs);await b.close()})();
