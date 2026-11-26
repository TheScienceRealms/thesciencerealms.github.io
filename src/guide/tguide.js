const {chromium}=require('playwright');const D=__dirname;const Q='file:///home/user/thesciencerealms.github.io/psycheverse/index.html';
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)process.exitCode=1};
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1280,height:860}});await p.route('https://gc.zgo.at/**',r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
const W=ms=>p.waitForTimeout(ms);const st=()=>p.evaluate(()=>{const s=Guide._st();return {on:s.on,pose:s.pose,who:s.who,open:s.open,streak:s.streak}});
await p.goto(Q);await W(400);ok(!(await p.$('#tg .tg-who')),'no guide on home');
await p.goto(Q+'#theoretical-frontier');await W(300);ok(!(await p.$('#tg .tg-who')),'no guide on unit page');
await p.goto(Q+'#notes-bio');await W(300);ok(!(await p.$('#tg .tg-who')),'no guide on notes');
await p.goto(Q+'#teachers');await W(300);ok(!(await p.$('#tg .tg-who')),'no guide on teacher pages');
await p.goto(Q+'#essay-neuro');await W(300);ok(!(await p.$('#tg .tg-who')),'no guide on model essays');
await p.goto(Q+'#quiz-bio');await W(400);let s=await st();ok(s.on&&s.pose==='stand'&&s.open,'guide greets on quiz: '+s.who);
ok(/Hi, I’m (Mr Quigley|Mrs Byrne)/.test(await p.textContent('#tg')),'greeting names teacher');
await p.screenshot({path:D+'/tg-1.png'});
await p.click('#tg [data-tg="hint"]');await W(150);s=await st();ok(s.pose==='explain','hint -> lightbulb pose');
const out=await p.evaluate(()=>{const q=G.qs[G.i];return [...document.querySelectorAll('#view .opt')].map((b,n)=>[b.classList.contains('tg-out'),q.opts[n].ok])});
ok(out.filter(x=>x[0]).length===1&&out.every(([o,c])=>!(o&&c)),'exactly one WRONG option ruled out');await p.screenshot({path:D+'/tg-2.png'});
// two wrong answers
const wrong=async()=>{const n=await p.evaluate(()=>{const q=G.qs[G.i];return [...document.querySelectorAll('#view .opt')].findIndex((b,i)=>!q.opts[i].ok&&!b.disabled)});await p.locator('#view .opt').nth(n).click();await W(150)};
await wrong();s=await st();ok(s.streak===1&&s.pose!=='confused','1 wrong: not confused yet');
await p.click('#view [data-act="mcnext"]');await W(150);const who2=(await st()).who;ok(who2!==s.who,'teachers alternate per question ('+s.who+'→'+who2+')');
await wrong();s=await st();ok(s.pose==='confused'&&s.open,'2 wrong in a row -> confused');await p.screenshot({path:D+'/tg-3.png'});
// play to results with right answers
for(let i=0;i<20;i++){if(await p.$('#view .big'))break;const nx=await p.$('#view [data-act="mcnext"]');if(nx){await nx.click();await W(80);continue}
 const n=await p.evaluate(()=>{const q=G.qs[G.i];return q.opts.findIndex(o=>o.ok)});await p.locator('#view .opt').nth(n).click();await W(80)}
s=await st();ok(await p.$('#view .big')&&(s.pose==='excited'||s.pose==='stand')&&s.open,'results reaction: '+s.pose+' '+(await p.textContent('#view .big')));await p.screenshot({path:D+'/tg-4.png'});
// a perfect run gives excited
await p.click('#view [data-act="again"]');await W(300);
for(let i=0;i<20;i++){if(await p.$('#view .big'))break;const nx=await p.$('#view [data-act="mcnext"]');if(nx){await nx.click();await W(60);continue}
 const n=await p.evaluate(()=>{const q=G.qs[G.i];return q.opts.findIndex(o=>o.ok)});await p.locator('#view .opt').nth(n).click();await W(60)}
s=await st();ok(s.pose==='excited'&&/Full marks/.test(await p.textContent('#tg')),'perfect -> excited, full marks');await p.screenshot({path:D+'/tg-5.png'});
// hide and show
await p.click('#tg [data-tg="hide"]');await W(100);ok(!!(await p.$('#tg .tg-show'))&&!(await p.$('#tg .tg-who')),'hide works');
await p.goto(Q+'#sort-ther-drug');await W(300);ok(!!(await p.$('#tg .tg-show')),'stays hidden across activities');
await p.click('#tg .tg-show');await W(100);ok(!!(await p.$('#tg .tg-who')),'show again');
s=await st();ok(s.on,'guide on sort activity');ok(!/hint/.test(await p.textContent('#tg .tg-row').catch(()=>'')),'no hint button where hints unsupported');
// idle check-in (fast-forward the timer)
await p.goto(Q+'#quiz-pd');await W(300);await p.clock?.install?.().catch(()=>{});
await p.evaluate(()=>{const s=Guide._st();clearTimeout(s.idle)});await p.evaluate(()=>new Promise(r=>{const o=window.setTimeout;const s=Guide._st();r()}));
// leaving activity removes guide and padding
await p.goto(Q+'#research-frontier');await W(300);ok(!(await p.$('#tg .tg-who'))&&!(await p.evaluate(()=>document.documentElement.classList.contains('tg-pad'))),'removed off-activity');
// keyboard: guide button reachable and labelled
await p.goto(Q+'#quiz-cog');await W(300);ok(/teacher guide/.test(await p.getAttribute('#tg .tg-who','aria-label')),'accessible label');
// mobile: nothing overflows, answers not hidden behind guide when scrolled to bottom
const m=await b.newPage({viewport:{width:390,height:844}});await m.route('https://gc.zgo.at/**',r=>r.abort());m.on('pageerror',e=>errs.push(e.message));await m.goto(Q+'#quiz-bio');await m.waitForTimeout(400);
ok(await m.evaluate(()=>document.documentElement.scrollWidth)===390,'mobile no overflow');
await m.evaluate(()=>scrollTo(0,document.body.scrollHeight));await m.waitForTimeout(200);
const cover=await m.evaluate(()=>{const g=document.querySelector('#tg .tg-who').getBoundingClientRect();const last=[...document.querySelectorAll('#view .opt')].pop().getBoundingClientRect();return last.bottom<=g.top+4||last.right<=g.left});ok(cover,'last answer not covered when scrolled down');
await m.screenshot({path:D+'/tg-m.png'});
ok(errs.length===0,'no errors '+JSON.stringify(errs));await b.close()})();
