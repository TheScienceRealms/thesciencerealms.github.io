const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../chemquest.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/y-'+n+'.png',fullPage:true});const big=async()=>p.textContent('.big').catch(()=>'NO');
await p.goto(F+'#bondbuilder');await p.waitForTimeout(300);let s1=0,s2=0;
for(let i=0;i<120;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}const part=await p.evaluate(()=>G.part);
 if(part===0){const st=await p.evaluate(()=>({a:G.st.a.map(x=>({d:!!x.d,o:x.o,g:x.gain,full:x.o+x.gain>=8}))}));const di=st.a.findIndex(x=>x.d&&x.o>0),ai=st.a.findIndex(x=>!x.d&&!x.full);
  await p.click(`[data-act="bat"][data-k="${di}"]`);await p.click(`[data-act="bat"][data-k="${ai}"]`);if(!s1++)await shot('ionic');continue}
 if(part===1){const C=await p.evaluate(()=>BB_COV[G.i]);for(let j=0;j<C.b.length;j++)for(let c=1;c<C.b[j][2];c++)await p.click(`[data-act="bord"][data-k="${j}:1"]`);if(!s2++)await shot('cov');await p.click('[data-act="bcov"]');continue}
 await p.click('[data-act="dlp"]');await p.click('[data-act="dh"][data-k="h"]');await shot('dative')}
console.log('bond',await big());
await p.goto(F+'#forcefield');await p.waitForTimeout(300);
for(let i=0;i<80;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}const part=await p.evaluate(()=>G.part);
 if(part===0){const n=await p.evaluate(()=>["van der Waals forces only","Permanent dipole-dipole attractions","Hydrogen bonds"].indexOf(G.list[G.i][1]));await p.click(`[data-act="fimf"][data-k="${n}"]`);continue}
 if(part===1){await p.click('[data-act="fh"][data-k="H1"]');await p.click('[data-act="fh"][data-k="lpB"]');await shot('hbond');continue}
 const items=await p.evaluate(()=>FF_ORD[G.i].items);for(const x of items)await p.click(`[data-act="ford2"][data-k="${x}"]`)}
console.log('force',await big());
const m=await b.newPage({viewport:{width:390,height:844}});for(const h of ['#bondbuilder','#forcefield']){await m.goto(F+h);await m.waitForTimeout(400);console.log('mobile',h,await m.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
