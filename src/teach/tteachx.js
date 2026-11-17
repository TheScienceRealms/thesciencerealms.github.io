const {chromium}=require('playwright');const fs=require('fs');const D=__dirname;
const realm=process.argv[2];const CFG={chemquest:{tasks:['quiz-1-3','quiz-1-4'],unit:'as1',names:['Topic quiz: Bonding','Topic quiz: Intermolecular forces'],tag:'C'},psycheverse:{tasks:['quiz-bio','facts-raine'],unit:'u1',names:['Topic quiz: The biological approach','Fact Check: Raine et al. (1997)'],tag:'P'}}[realm];
const Q=`file:///home/user/thesciencerealms.github.io/${realm}/index.html`;
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+realm+': '+m);if(!c)process.exitCode=1};
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=async()=>{const c=await b.newContext({viewport:{width:1200,height:900},acceptDownloads:true});const p=await c.newPage();await p.route('https://gc.zgo.at/**',r=>r.abort());p.on('pageerror',e=>errs.push(e.message));return p};
 const W=(p,ms)=>p.waitForTimeout(ms);
 const T=await ctx();await T.goto(Q);await W(T,400);ok(await T.isVisible('.tqhome'),'home card visible');
 await T.click('.tqhome a[href="#teachers"]');await W(T,500);ok(/Set .* work through your Google Classroom/.test(await T.textContent('#view')),'teachers page');
 await T.click('#tq-root a[href="#teach-new"]');await W(T,200);ok(await T.isDisabled('[data-tq="make"]'),'create disabled when empty');
 await T.fill('#tq-t','Homework 1');await T.fill('#tq-c','13B');await T.fill('#tq-d','Fri 28 Nov');
 for(const h of CFG.tasks)await T.click(`[data-tq="pick"][data-k="${h}"]`);
 ok((await T.inputValue('#tq-t'))==='Homework 1','title kept');await T.click('[data-tq="make"]');await W(T,200);
 const link=await T.textContent('#tq-link');const P=link.split('#set=')[1];ok(!!P,'link made');
 ok((await T.textContent('.tq-ro')).includes(CFG.names[0]+' and '+CFG.names[1]),'instructions name the tasks');
 // student
 const S=await ctx();await S.goto(Q+'#set='+P);await W(S,300);ok(/Homework 1/.test(await S.textContent('#view')),'student sees assignment');
 await S.click('[data-tq="name"]');ok(await S.$eval('#tq-name',e=>e.classList.contains('tq-err')),'name required');
 await S.fill('#tq-name','Róisín McAleer');await S.click('[data-tq="name"]');await W(S,200);
 async function play(h){await S.click(`#tq-root a[href="#${h}"]`);await W(S,300);for(let i=0;i<40;i++){if(await S.$('#view .big'))return true;const o=await S.$('#view .opt:not([disabled])');if(o){await o.click();await W(S,40)}const n=await S.$('#view [data-act="mcnext"]');if(n){await n.click();await W(S,40)}}return false}
 ok(await play(CFG.tasks[0]),'task 1 played to the end');ok(/1 of 2/.test(await S.textContent('.tq-ban')),'banner 1 of 2');
 const s1=await S.textContent('#view .big');await S.click('.tq-ban a');await W(S,300);ok(await S.isVisible('#tq-code'),'partial code shown');
 ok(await play(CFG.tasks[1]),'task 2 played');ok(/Get my completion code/.test(await S.textContent('.tq-ban')),'banner offers code');
 await S.click('.tq-ban a');await W(S,300);const code=(await S.textContent('#tq-code')).trim();
 ok(new RegExp(`^TSR-${CFG.tag}-[0-9A-Z]{4}-ROISIN\\.MCALEER-\\d+\\.\\d+-[0-9A-Z]{2}$`).test(code),'code '+code);
 const [g1]=s1.split('/').map(Number);
 // teacher results
 await T.goto(Q+'#results='+P);await W(T,300);
 await T.fill('#tq-codes',`${code}\n${code.replace(/-(\d+)\./,'-1$1.')}\nTSR-Q-AMDK-SIOBHAN.NI.BHRIAIN-100.100-YC\nhello`);await T.click('[data-tq="show"]');await W(T,200);
 ok((await T.$$eval('.tq-tab tr',r=>r.length))===3,'grid has 1 student');ok(/Roisin Mcaleer/.test(await T.textContent('.tq-tab')),'name decoded');ok(/2 flagged/.test(await T.textContent('#view')),'edited + other-realm code flagged');
 const [dl]=await Promise.all([T.waitForEvent('download'),T.click('[data-tq="csv"]')]);ok(/Roisin Mcaleer/.test(fs.readFileSync(await dl.path(),'utf8')),'CSV');
 await T.goto(Q+'#results');await W(T,200);await T.fill('#tq-codes',code);await T.click('[data-tq="show"]');await W(T,200);ok(await T.isVisible('.tq-tab'),'auto-match saved assignment');
 await S.goto(Q+'#students');await W(S,300);ok(/Got an assignment link/.test(await S.textContent('#view')),'students page');
 await S.goto(Q+'#set=garbage');await W(S,200);ok(/doesn’t work/.test(await S.textContent('#view')),'broken link handled');
 const evil=await T.evaluate(()=>Teach._enc({t:'<img src=x onerror=alert(1)>',c:'',d:'',s:[TQ_CFG.cat[0][0]]}));await S.goto(Q+'#set='+evil);await W(S,200);ok(!(await S.$('#view img[src="x"]')),'payload escaped');
 // the normal site still works
 await S.goto(Q);await W(S,300);ok(await S.isVisible('#hub'),'hub still shows');await S.goto(Q+'#'+CFG.tasks[0]);await W(S,300);ok(!!(await S.$('#view .opt')),'activities still open normally');
 const m=await b.newPage({viewport:{width:390,height:844}});await m.route('https://gc.zgo.at/**',r=>r.abort());for(const h of ['','#teachers','#students','#teach-new','#set='+P,'#results='+P]){await m.goto(Q+h);await W(m,300);const w=await m.evaluate(()=>document.documentElement.scrollWidth);ok(w===390,'mobile '+(h.slice(0,12)||'home')+' '+w)}
 ok(errs.length===0,'no page errors '+JSON.stringify(errs));await b.close()})();
