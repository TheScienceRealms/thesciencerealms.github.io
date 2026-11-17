const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
const Q='file:///home/user/thesciencerealms.github.io/quiztoplasm/index.html';
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
(async()=>{const b=await chromium.launch();const errs=[];
 const newCtx=async()=>{const c=await b.newContext({viewport:{width:1200,height:900},acceptDownloads:true});const p=await c.newPage();await p.route('https://gc.zgo.at/**',r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&!/ERR_FAILED|net::/.test(m.text())&&errs.push(m.text()));return p};
 const W=(p,ms)=>p.waitForTimeout(ms);
 // ===== teacher =====
 const T=await newCtx();await T.goto(Q);await W(T,400);
 ok(await T.isVisible('.tqhome'),'home card visible');
 const topicCards=await T.evaluate(()=>getComputedStyle(document.querySelector('.tqhome')).borderStyle);ok(topicCards==='dashed','home card styled');
 await T.click('.tqhome a[href="#teachers"]');await W(T,300);ok((await T.textContent('#teach-title'))==='For teachers','teachers page opens');
 const imgs=await T.$$eval('#teach img',a=>a.map(i=>i.complete&&i.naturalWidth>0));await W(T,500);
 const imgs2=await T.$$eval('#teach img',a=>a.map(i=>i.naturalWidth));ok(imgs2.length===3&&imgs2.every(w=>w>0),'3 images load '+JSON.stringify(imgs2));
 await T.click('a[href="#teach-new"]');await W(T,200);
 ok(await T.isDisabled('[data-tq="make"]'),'create disabled with no tasks');
 await T.click('[data-tq="unit"][data-k="w2"]');await W(T,100);
 await T.fill('#tq-t','Eutrophication and clotting');await T.fill('#tq-c','13B');await T.fill('#tq-d','Fri 28 Nov');
 await T.click('[data-tq="pick"][data-k="eutro"]');await T.click('[data-tq="pick"][data-k="clot"]');
 ok((await T.inputValue('#tq-t'))==='Eutrophication and clotting','title kept after picking');
 await T.click('[data-tq="make"]');await W(T,200);
 const link=await T.textContent('#tq-link');ok(/#set=/.test(link),'link created');
 const P=link.split('#set=')[1];
 const instr=await T.textContent('.tq-ro');ok(/Eutrophication Emergency and Clotting Crisis/.test(instr)&&/private comment/.test(instr),'instructions text');
 await T.screenshot({path:D+'/x-builder.png',fullPage:true});
 await T.goto(Q+'#teachers');await W(T,300);ok(/Eutrophication and clotting/.test(await T.textContent('#teach')),'saved in Your assignments');
 // ===== student (separate device) =====
 const S=await newCtx();await S.goto(Q+'#set='+P);await W(S,300);
 ok(/Eutrophication and clotting/.test(await S.textContent('#teach')),'student sees assignment');
 await S.click('[data-tq="name"]');await W(S,100);ok(await S.$eval('#tq-name',e=>e.classList.contains('tq-err')),'name required');
 await S.fill('#tq-name','Siobhán Ní Bhriain');await S.click('[data-tq="name"]');await W(S,200);
 ok(await S.isVisible('a[href="#sim-eutro"]'),'start link for task 1');
 // solve a lab with the engine state (same approach as the AS2 test)
 const T2=()=>S.evaluate(()=>{const s=Sims._s();const t=s.seq&&s.seq[s.i];return t?JSON.parse(JSON.stringify({...t,c:undefined})):null});
 async function solve(){for(let i=0;i<80;i++){if(await S.$('#sim .big'))return true;const t=await T2();if(!t)return false;
  if(await S.$('#sim [data-act="next"]')){await S.click('#sim [data-act="next"]');await W(S,40);continue}
  if(t.ty==='q'){for(const o of await S.$$('#sim .opt:not([disabled])'))if((await o.textContent()).trim()===t.Q[1]){await o.click();break}await W(S,40);continue}
  if(t.ty==='ord'){for(const it of t.items){await S.locator('#sim [data-act="gord"]',{hasText:it}).first().click();await W(S,30)}continue}
  if(t.ty==='multi'){for(let j=0;j<t.o.length;j++)if(t.o[j][1])await S.click(`#sim [data-act="gms"][data-k="${j}"]`);await S.click('#sim [data-act="gmc"]');await W(S,40);continue}
  if(t.ty==='build'){for(let s=0;s<8;s++){await S.click(`#sim [data-act="cls"][data-k="${s}"]`);await S.click(`#sim [data-act="clt"][data-k="${s}"]`)}await S.click('#sim [data-act="clchk"]');await W(S,40);continue}
  console.log('unhandled',t.ty);return false}return false}
 await S.click('a[href="#sim-eutro"]');await W(S,300);ok(await solve(),'eutro finished');
 ok(await S.isVisible('.tq-ban'),'assignment banner on results');ok(/1 of 2/.test(await S.textContent('.tq-ban')),'banner says 1 of 2');
 await S.click('.tq-ban a');await W(S,300);ok(await S.isVisible('#tq-code'),'partial code available');ok(/haven’t done/.test(await S.textContent('#teach')),'partial warning');
 await S.click('a[href="#sim-clot"]');await W(S,300);ok(await solve(),'clot finished');
 ok(/Get my completion code/.test(await S.textContent('.tq-ban')),'banner offers code');
 await S.click('.tq-ban a');await W(S,300);const code=(await S.textContent('#tq-code')).trim();ok(/^TSR-Q-[0-9A-Z]{4}-SIOBHAN\.NI\.BHRIAIN-100\.100-[0-9A-Z]{2}$/.test(code),'code format '+code);
 ok(/All done, Siobhán/.test(await S.textContent('#teach')),'all done message');
 // replay with a worse score keeps best
 await S.screenshot({path:D+'/x-student-done.png',fullPage:true});
 // ===== teacher results =====
 await T.goto(Q+'#results='+P);await W(T,300);
 const bad=code.replace('100.100','100.99');const other='TSR-Q-ZZZZ-ROISIN.M-80.70-AB';
 await T.fill('#tq-codes',`Private comment from Siobhán: ${code}\n${bad}\n${other}\nrandom text`);await T.click('[data-tq="show"]');await W(T,200);
 const rows=await T.$$eval('.tq-tab tr',r=>r.length);ok(rows===3,'1 student + header + average rows ('+rows+')');
 ok(/Siobhan Ni Bhriain/.test(await T.textContent('.tq-tab')),'name decoded nicely');
 ok(/2 flagged/.test(await T.textContent('#teach')),'tampered + other assignment flagged');
 const [dl]=await Promise.all([T.waitForEvent('download'),T.click('[data-tq="csv"]')]);const fp=await dl.path();const csv=fs.readFileSync(fp,'utf8');ok(/Siobhan Ni Bhriain/.test(csv)&&/"100","100","100"/.test(csv),'CSV contents');
 // results without link: auto-match from saved assignments
 await T.goto(Q+'#results');await W(T,200);await T.fill('#tq-codes',code);await T.click('[data-tq="show"]');await W(T,200);ok(await T.isVisible('.tq-tab'),'auto-matches saved assignment');
 // broken link
 await S.goto(Q+'#set=notarealpayload');await W(S,200);ok(/doesn’t work/.test(await S.textContent('#teach')),'broken link message');
 // students page
 await S.goto(Q+'#students');await W(S,300);ok(/Got an assignment link/.test(await S.textContent('#teach')),'students page');
 // XSS safety: malicious title in payload is escaped
 const evil=await T.evaluate(()=>Teach._enc({t:'<img src=x onerror=alert(1)>',c:'<b>x</b>',d:'',s:['eutro']}));
 await S.goto(Q+'#set='+evil);await W(S,200);ok(!(await S.$('#teach img[src="x"]')),'payload is escaped');
 // mobile widths
 const m=await b.newPage({viewport:{width:390,height:844}});await m.route('https://gc.zgo.at/**',r=>r.abort());for(const h of ['','#teachers','#students','#teach-new','#set='+P,'#results='+P]){await m.goto(Q+h);await W(m,300);const w=await m.evaluate(()=>document.documentElement.scrollWidth);ok(w===390,'mobile width '+(h||'home')+' '+w)}
 await m.goto(Q+'#teachers');await W(m,300);await m.screenshot({path:D+'/x-mobile-teachers.png',fullPage:true});
 ok(errs.length===0,'no page errors '+JSON.stringify(errs));await b.close()})();
