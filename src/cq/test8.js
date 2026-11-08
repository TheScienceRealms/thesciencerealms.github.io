const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../chemquest.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const shot=n=>p.screenshot({path:__dirname+'/w-'+n+'.png',fullPage:true});const big=async()=>p.textContent('.big').catch(()=>'NO');const sh={};
const once=async n=>{if(!sh[n]){sh[n]=1;await shot(n)}};
await p.goto(F+'#bondbuilder');await p.waitForTimeout(300);
for(let i=0;i<300;i++){if(await p.$('.big'))break;
 if(await p.$('#nx')){const m=await p.evaluate(()=>G.mode);if(m<=1&&!(await p.$('#m3'))&&await p.$('[data-act="v3"]')){await p.click('[data-act="v3"]');await p.waitForTimeout(200);const e=await p.$('.lslot');if(e){const bb=await e.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)}await once('bw3d-'+m);continue}await p.click('#nx');continue}
 const m=await p.evaluate(()=>G.mode);
 if(m===0){const st=await p.evaluate(()=>({ph:G.st.phase,a:G.st.a.map(x=>({d:!!x.d,o:x.o,full:x.o+x.gain>=8,c:x.setc,ch:x.ch}))}));
  if(st.ph===0){const di=st.a.findIndex(x=>x.d&&x.o>0),ai=st.a.findIndex(x=>!x.d&&!x.full);await p.click(`[data-act="bat"][data-k="${di}"]`);await p.click(`[data-act="bat"][data-k="${ai}"]`);continue}
  const j=st.a.findIndex(x=>x.c!==x.ch);if(j>=0){await p.click(`[data-act="bat"][data-k="${j}"]`);continue}await once('ionic');await p.click('[data-act="ichk"]');continue}
 if(m===1){const C=await p.evaluate(()=>({b:BW_COV[G.i].b,o:G.st.ord}));const j=C.b.findIndex((b,k)=>C.o[k]!==b[2]);if(j>=0){await p.click(`[data-act="cbond"][data-k="${j}"]`,{force:true});continue}await once('cov');await p.click('[data-act="cchk"]');continue}
 if(m===2){await p.click('[data-act="dlp"]');await p.click('[data-act="dh"]');continue}
 if(m===3){await p.click('[data-act="mvolt"]');await once('metal');const n=await p.evaluate(()=>{const A=["Al","Delocalised electrons are free to move through the lattice","The attraction between positive ions and a sea of delocalised electrons"][G.st.q];return G.st.o?G.st.o.indexOf(A):-1});if(n>=0){await p.click(`[data-act="mq"][data-k="${n}"]`);if(await p.$('[data-act="mqn"]'))await p.click('[data-act="mqn"]')}continue}
 if(m===4){const sp=await p.evaluate(()=>BW_REPAIR[G.i].spots.filter(s=>s[2]).map(s=>s[0]));for(const s of sp)await p.click(`[data-act="rpick"][data-k="${s}"]`);await once('repair');await p.click('[data-act="rchk"]');continue}
 if(m===5){if(await p.$('[data-act="dmchk"]')){for(const x of ["Ionic","Covalent","Co-ordinate (dative)"])await p.click(`[data-act="dmk"][data-k="${x}"]`);await p.click('[data-act="dmchk"]');continue}const n=await p.evaluate(()=>G.st.o.indexOf(BW_DET[G.i][1]));await p.click(`[data-act="dpk"][data-k="${n}"]`);continue}
 if(m===6){if(await p.$('#wans')){await p.fill('#wans',await p.evaluate(()=>BW_WRITE[G.i].model));await p.click('[data-act="wmark"]');continue}await once('write');await p.click('[data-act="wdone"]');continue}}
console.log('bw',await big());
await p.goto(F+'#forcefield');await p.waitForTimeout(300);
for(let i=0;i<300;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}const m=await p.evaluate(()=>G.mode);
 if(m===0||m===5){const n=await p.evaluate(()=>{const ans=G.mode===0?FF_NAMES[G.list[G.i][1]]:FF_MYST[G.i][1];return G.st.o.indexOf(ans)});await p.click(`[data-act="${m===0?"ffpick":"mypk"}"][data-k="${n}"]`);continue}
 if(m===1){await p.evaluate(()=>{G.st.dist=30;ffRender()});const need=await p.evaluate(()=>FF_MAG[G.i].need);for(const k of need)await p.click(`[data-act="mgk"][data-k="${k}"]`);await once('magnet');await p.click('[data-act="mgchk"]');continue}
 if(m===2){const ans=await p.evaluate(()=>FF_BATTLE[G.i][2]);await p.click(`[data-act="bpick"][data-k="${ans}"]`);await once('battle');continue}
 if(m===3){await p.evaluate(()=>{G.st.T=150;ffRender()});await p.waitForTimeout(300);await once('temp');const n=await p.evaluate(()=>G.st.o.indexOf(["Only the van der Waals’ forces between I₂ molecules","Strong covalent bonds throughout the giant structure"][G.st.q]));await p.click(`[data-act="tq"][data-k="${n}"]`);continue}
 if(m===4){await once('exp');const n=await p.evaluate(()=>G.st.o.indexOf(["More electrons, so stronger van der Waals’ forces","It forms hydrogen bonds between molecules"][G.st.q]));await p.click(`[data-act="eq"][data-k="${n}"]`);continue}
 if(m===6){if(await p.$('#wans')){await p.fill('#wans',await p.evaluate(()=>FF_WRITE[G.i].model));await p.click('[data-act="wmark"]');continue}await p.click('[data-act="wdone"]');continue}}
console.log('ff',await big());
const mm=await b.newPage({viewport:{width:390,height:844}});for(const h of ['#bondbuilder','#forcefield']){await mm.goto(F+h);await mm.waitForTimeout(400);console.log('mobile',h,await mm.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
