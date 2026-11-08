const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1100,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../psycheverse.html';const shot=n=>p.screenshot({path:__dirname+'/s-'+n+'.png',fullPage:true});
await p.goto(f);await p.waitForTimeout(1500);await shot('hub');
for(const h of ['theoretical-frontier','research-frontier']){await p.goto(f+'#'+h);await p.waitForTimeout(300);await shot(h)}
let hashes=new Set();for(const h of ['theoretical-frontier','research-frontier']){await p.goto(f+'#'+h);await p.waitForTimeout(200);(await p.$$eval('#view a[href^="#"]',as=>as.map(a=>a.getAttribute('href').slice(1)))).forEach(x=>x&&hashes.add(x))}
hashes=[...hashes].filter(h=>!['theoretical-frontier','research-frontier'].includes(h));console.log('routes',hashes.length);
async function playMC(){for(let i=0;i<40;i++){if(await p.$('.big'))return true;
  if(await p.$('#nx')){await p.click('#nx');continue}
  if(await p.$('#numin')){await p.fill('#numin','7');await p.click('[data-act="numcheck"]');continue}
  if(await p.$('[data-act="mcheck"]')){await p.locator('.opt').first().click();await p.click('[data-act="mcheck"]');continue}
  const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o){await o.click();continue}return false}return false}
async function playSort(){for(let i=0;i<200;i++){if(await p.$('.big'))return true;
  if(await p.$('#nx')){await p.click('#nx');continue}
  const c=await p.$('.pool .chipm');if(c){await c.click();await p.locator('.bin').nth(i%2).click();continue}
  const k=await p.$('[data-act="scheck"]:not([disabled])');if(k){await k.click();continue}return false}return false}
async function playBuild(){await p.locator('.kitbtn').first().click();await p.click('[data-act="pcheck"]');await p.click('#nx');
  await p.fill('#ans','One assumption is that behaviour is learnt through classical conditioning by association, e.g. Pavlov. Brain surgery lobotomy. Internal working model from childhood attachment. Schema framework from experience. Directional: participants who chew gum will score more on the 30 spelling test.');await p.click('[data-act="wmark"]');await p.click('[data-act="wdone"]');await p.click('#nx');await p.click('#nx');return !!(await p.$('.big'))}
async function playSD(){const s=await p.evaluate(()=>({mean:G.mean,dev:G.dev,sq:G.sq,tot:G.tot,sd:G.sd}));
  await p.fill('#numin',String(s.mean));await p.click('[data-act="sdcheck"]');await p.click('#nx');
  for(const arr of [s.dev,s.sq]){const ins=await p.$$('.numin.sm');for(let i=0;i<ins.length;i++)await ins[i].fill(String(arr[i]));await p.click('[data-act="sdcheck"]');await p.click('#nx')}
  await p.fill('#numin',String(s.tot));await p.click('[data-act="sdcheck"]');await p.click('#nx');
  await p.fill('#numin',s.sd.toFixed(2));await p.click('[data-act="sdcheck"]');await p.click('#nx');return await p.textContent('.big')}
const bad=[];
for(const h of hashes){await p.goto(f+'#'+h);await p.waitForTimeout(120);let ok=true;
  if(await p.$('#hub:not([hidden])')){bad.push(h+' fell to hub');continue}
  if(h.startsWith('quiz-')||h.startsWith('facts-')||h.startsWith('scen-')||h==='relate'||h==='cmdq')ok=await playMC();
  else if(h.startsWith('sort-'))ok=await playSort();
  else if(h.startsWith('build-'))ok=await playBuild();
  else if(h.startsWith('sd-')){const r=await playSD();ok=r==='5/5';if(!ok)bad.push(h+' sd '+r)}
  if(!ok)bad.push(h)}
for(const s of ['ethicsB','screen','anxiety','obs']){await p.goto(f+'#scen-'+s);await p.waitForTimeout(100);if(!(await playMC()))bad.push('scen-'+s)}
console.log('bad',bad);
await p.goto(f+'#sort-case-milgram');await p.locator('.pool .chipm').first().click();await shot('sort');
await p.goto(f+'#build-pd-rel');await p.locator('.kitbtn').nth(0).click();await p.locator('.kitbtn').nth(2).click();await p.click('[data-act="pcheck"]');await shot('build');
await p.goto(f+'#notes-deb');await p.waitForTimeout(200);await p.$$eval('details',d=>d.forEach(x=>x.open=true));await shot('notes-deb');
await p.goto(f+'#notes-bio');await shot('notes-bio');
await p.goto(f+'#essay-condition');await shot('essay');
await p.goto(f+'#scen-ethicsA');await shot('scen');
await p.goto(f+'#sd-c');await shot('sd');
const m=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});m.on('pageerror',e=>errs.push('m:'+e.message));
for(const h of ['','#theoretical-frontier','#sort-deb-mother','#essay-neuro','#sd-c','#build-cog-eval','#notes-deb','#scen-music']){await m.goto(f+h);await m.waitForTimeout(400);const sw=await m.evaluate(()=>document.documentElement.scrollWidth);if(sw>390)console.log('overflow',h,sw)}
await m.goto(f);await m.waitForTimeout(500);await m.screenshot({path:__dirname+'/s-mobile.png',fullPage:true});
console.log('errs',errs);await b.close()})();
