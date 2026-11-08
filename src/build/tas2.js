const {chromium}=require('playwright');
const F='file://'+__dirname+'/../quiztoplasm.html';
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const W=ms=>p.waitForTimeout(ms);const has=async s=>!!(await p.$(s));const big=async()=>p.textContent('#sim .big').catch(()=>'NO');
const T=()=>p.evaluate(()=>{const S=Sims._s();const T=S.seq&&S.seq[S.i];return T?JSON.parse(JSON.stringify({...T,c:undefined,ok1:S.ok1,ms:S.ms,ord:S.ord,st:S.st,fq:S.fq&&{cur:S.fq.cur&&{c:S.fq.cur.c},n:S.fq.done.length}})):null});
const click=async s=>{await p.click(s);await W(50)};
const optText=async t=>{const os=await p.$$('#sim .opt:not([disabled])');for(const o of os){if((await o.textContent()).trim()===t.replace(/<[^>]+>/g,'')){await o.click();await W(40);return true}}return false};
const setSl=async(k,v)=>p.evaluate(([k,v])=>{const r=document.querySelector(`#sim [data-tt="${k}"]`);r.value=v;r.dispatchEvent(new Event('input'))},[k,v]);
async function solve(id){await p.goto(F+'#cellular-frontier');await W(100);await p.goto(F+'#sim-'+id);await W(300);await p.screenshot({path:__dirname+`/a2-${id}-0.png`,fullPage:true});let shots=0;
 for(let i=0;i<120;i++){if(await has('#sim .big'))break;const t=await T();if(!t)break;
  if(await has('#sim [data-act="next"]')){if(shots<3&&['run','rt','ch','flow','exp','build','quad','comp','samp','farm','ord'].includes(t.ty)){shots++;await p.screenshot({path:__dirname+`/a2-${id}-${shots}.png`,fullPage:true})}await click('#sim [data-act="next"]');continue}
  if(t.ty==='q'||(t.ty==='exp'&&await has('#sim .opt'))){if(!(await optText(t.Q[1])))console.log(id,'q opt not found',t.Q[1]);continue}
  if(t.ty==='exp'){await click('#sim [data-act="perun"]');continue}
  if(t.ty==='bin'){await p.locator('#sim [data-act="gbin"]',{hasText:t.ans}).first().click();await W(40);continue}
  if(t.ty==='num'){let v=t.ans;if(id==='simpson'&&t.site){/* independently recompute from the visible table */const rows=await p.$$eval('#sim .bd-tab tbody tr:not(.bd-tot)',r=>r.map(x=>+x.children[1].textContent));const N=rows.reduce((a,b)=>a+b,0),Sg=rows.reduce((a,n)=>a+n*(n-1),0);const exp={1:Sg,2:N*(N-1),3:+(Sg/(N*(N-1))).toFixed(2),4:+(Sg/(N*(N-1))).toFixed(2)}[i<3?i+1:0];v=/Σn/.test(t.t)?Sg:/N\(N−1\)/.test(t.t)?N*(N-1):+(Sg/(N*(N-1))).toFixed(2);if(Math.abs(v-t.ans)>0.006)console.log('SIMPSON MISMATCH',v,t.ans)}
    await p.fill('#gin',String(+(+v).toFixed(2)));await click('#sim [data-act="gnum"]');if(!(await has('#sim .explain.ok')))console.log(id,'num rejected',t.t,v);continue}
  if(t.ty==='multi'){for(let j=0;j<t.o.length;j++)if(t.o[j][1])await click(`#sim [data-act="gms"][data-k="${j}"]`);await click('#sim [data-act="gmc"]');continue}
  if(t.ty==='ord'){for(const it of t.items){await p.locator('#sim [data-act="gord"]',{hasText:it.replace(/<[^>]+>/g,'')}).first().click();await W(30)}continue}
  if(t.ty==='run'){await click('#sim [data-act="rsgo"]');await W(3000);continue}
  if(t.ty==='rt'){await click('#sim [data-act="rjr"][data-k="sym"]');await W(300);continue}
  if(t.ty==='ch'){const n=await p.textContent('#sim .qbox2');if(/fast/.test(n)){await setSl('light',3);await setSl('temp',35);await setSl('hum',20);await click('#sim [data-act="ttw"]')}if(/humidity/.test(n))await setSl('hum',90);if(/lower surface/.test(n))await click('#sim [data-act="ttv"][data-k="lower"]');await W(400);await click('#sim [data-act="ttc"]');if(!(await has('#sim .explain.ok')))console.log('tt chal fail',n);continue}
  if(t.ty==='meas'){await click('#sim [data-act="ttgo"]');await W(3000);continue}
  if(t.ty==='flow'){for(const [k,d] of [['u',t.ans[0]],['l',t.ans[1]]]){await click(`#sim [data-act="pea"][data-k="${k}"]`);if(d==='down')await click(`#sim [data-act="pea"][data-k="${k}"]`)}await click('#sim [data-act="pechk"]');continue}
  if(t.ty==='build'){for(const [s,tk] of [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]){await click(`#sim [data-act="cls"][data-k="${s}"]`);await click(`#sim [data-act="clt"][data-k="${tk}"]`)}await click('#sim [data-act="clchk"]');continue}
  if(t.ty==='quad'){if(await has('#sim [data-act="fegen"]')){await click('#sim [data-act="fegen"]');continue}const tt=await T();await p.fill('#fein',String(tt.fq.cur.c));await click('#sim [data-act="fec"]');continue}
  if(t.ty==='comp'){await click('#sim [data-act="nwr"][data-k="sep"]');await click('#sim [data-act="nwr"][data-k="tog"]');await W(1700);continue}
  if(t.ty==='samp'){for(let j=0;j<5;j++)await click(`#sim [data-act="pis"][data-k="${j}"]`);continue}
  if(t.ty==='farm'){for(const k of ['crop:poly','rot:yes','hedge:keep','margin:yes','pest:ipm'])await click(`#sim [data-act="cvs"][data-k="${k}"]`);await p.screenshot({path:__dirname+`/a2-${id}-farm.png`,fullPage:true});await click('#sim [data-act="cvc"]');continue}
  console.log(id,'unhandled',t.ty);break}
 console.log(id,await big())}
for(const id of ['resp','root','transp','phloem','clot','field','niche','simpson','eutro','bod','consv'])await solve(id);
await p.goto(F+'#natural-frontier');await W(300);console.log('w2 lab links',(await p.$$('a[href^="#sim-"]')).length);
const m=await b.newPage({viewport:{width:390,height:844}});m.on('pageerror',e=>errs.push(e.message));for(const h of ['resp','root','transp','phloem','clot','field','niche','simpson','eutro','bod','consv']){await m.goto(F+'#sim-'+h);await m.waitForTimeout(350);const w=await m.evaluate(()=>document.documentElement.scrollWidth);if(w!==390)console.log('MOBILE OVERFLOW',h,w)}
await m.goto(F+'#sim-clot');await m.waitForTimeout(300);await m.screenshot({path:__dirname+'/a2-m-clot.png',fullPage:true});
console.log('errors',errs);await b.close()})();
