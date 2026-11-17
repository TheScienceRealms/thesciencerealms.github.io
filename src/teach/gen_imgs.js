const fs=require('fs');const {chromium}=require('playwright');const D=__dirname;
const OUT='/home/user/thesciencerealms.github.io/quiztoplasm/img/';fs.mkdirSync(OUT,{recursive:true});
const Q='file:///home/user/thesciencerealms.github.io/quiztoplasm/index.html';
const SET={t:'Leaf structure and meiosis',c:'13B',d:'Fri 28 Nov',s:['leaf','meiosis']};
(async()=>{const b=await chromium.launch();
 const pg=async(w,h,s=2)=>{const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:s});await p.route('https://gc.zgo.at/**',r=>r.abort());return p};
 let p=await pg(1200,900);await p.goto(Q);await p.waitForTimeout(400);
 const P=await p.evaluate(s=>Teach._enc(s),SET);const S=await p.evaluate(x=>Teach._setId(x),P);
 const names=[['Aoife M.',88,100],['Bronagh K.',71,83],['Caoimhe D.',94,92],['Dearbhla R.',59,null],['Erin F.',100,100],['Fionnuala O.',65,58],['Grace L.',82,92],['Hannah P.',76,67]];
 const codes=await p.evaluate(([P,SET,names])=>{const set=Teach._dec(P);return names.map(([n,a,m])=>{const sc={leaf:a};if(m!=null)sc.meiosis=m;return Teach._code(P,set,n,sc)})},[P,SET,names]);
 const niamh=await p.evaluate(([P])=>Teach._code(P,Teach._dec(P),'Niamh O.',{leaf:88,meiosis:92}),[P]);
 fs.writeFileSync(D+'/_sample.json',JSON.stringify({P,S,codes,niamh},null,1));
 // --- results page (real) ---
 await p.evaluate(()=>{localStorage.clear()});await p.goto(Q+'#results='+P);await p.waitForTimeout(400);
 await p.fill('#tq-codes',codes.join('\n'));await p.click('[data-tq="show"]');await p.waitForTimeout(300);
 await p.locator('#teachwrap').screenshot({path:D+'/_results.png'});await p.close();
 // --- student phones (real) ---
 for(const st of ['start','end']){p=await pg(390,844);await p.goto(Q);await p.evaluate(([S,st])=>{localStorage.clear();if(st==='end')localStorage.setItem('tsr-set-'+S,JSON.stringify({name:'Niamh O.',sc:{leaf:88,meiosis:92}}))},[S,st]);
  await p.goto(Q+'#set='+P);await p.waitForTimeout(400);if(st==='start')await p.fill('#tq-name','Niamh O.');
  if(st==='end')await p.evaluate(()=>{const c=document.querySelector('.tq-done');if(c)c.scrollIntoView({block:'start'});window.scrollBy(0,-90)});
  await p.screenshot({path:D+`/_stu-${st}.png`});await p.close()}
 p=await pg(1100,960,1.5);fs.writeFileSync(D+'/stu2.html',`<body style="margin:0;background:linear-gradient(135deg,#1d0f1a,#1f3322);display:flex;gap:60px;justify-content:center;align-items:center;height:960px;font-family:Arial,sans-serif;color:#fff">${['start','end'].map((n,i)=>`<div style="text-align:center"><div style="font:700 20px Arial;margin-bottom:12px">${['1. Open the link and type your name','2. Finish, then copy your code'][i]}</div><div style="width:390px;height:844px;border-radius:44px;border:12px solid #050806;overflow:hidden;box-shadow:0 30px 60px -20px #000"><img src="_stu-${n}.png" style="width:100%"></div></div>`).join('')}</body>`);
 await p.goto('file://'+D+'/stu2.html');await p.waitForTimeout(300);await p.screenshot({path:D+'/_student.png'});await p.close();
 // --- classroom-style illustration ---
 const short='thesciencerealms.github.io/quiztoplasm/#set='+P.slice(0,10)+'…';
 const CLASS=`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#202124}
#c{width:1280px;height:470px;display:grid;grid-template-rows:64px 1fr;background:#fff;position:relative}.top{display:flex;align-items:center;gap:16px;padding:0 24px;border-bottom:1px solid #dfe3df}.top b{font-size:20px;font-weight:600}.tabs{display:flex;gap:28px;margin-left:40px;font-size:15px;color:#5f6368}.tabs span.on{color:#2e7d32;border-bottom:3px solid #2e7d32;padding-bottom:18px;margin-bottom:-21px;font-weight:600}
.main{display:grid;grid-template-columns:1fr 340px;gap:28px;padding:28px 40px;background:#f8faf8}.post{background:#fff;border:1px solid #dfe3df;border-radius:10px;padding:24px;display:grid;gap:14px;align-content:start}
.ico{width:40px;height:40px;border-radius:50%;background:#2e7d32;display:grid;place-items:center;color:#fff;font-size:18px;font-weight:700}.ttl{font-size:26px}.meta{color:#5f6368;font-size:14px}.hr{height:1px;background:#e3e7e3}
.att{display:flex;border:1px solid #dfe3df;border-radius:8px;overflow:hidden;width:560px}.att .th{width:110px;background:#1f3322;display:grid;place-items:center}.att .tx{padding:12px 14px;display:grid;gap:4px}.att .tx b{font-size:15px}.att .tx span{font-size:13px;color:#5f6368}
.side{display:grid;gap:16px;align-content:start}.card{background:#fff;border:1px solid #dfe3df;border-radius:10px;padding:18px;display:grid;gap:12px}.btn{background:#2e7d32;color:#fff;border-radius:6px;padding:10px;text-align:center;font-weight:600}
.cm{border:2px solid #e2bd5a;border-radius:20px;padding:10px 14px;font-size:13px;font-family:monospace;word-break:break-all}.arrow{color:#b45309;font-weight:700;font-size:13px}.tagi{position:absolute;left:14px;bottom:10px;font:700 11px monospace;letter-spacing:.12em;color:#999}</style></head><body><div id="c">
<div class="top"><span style="font-size:22px">☰</span><div class="ico">13</div><b>13B Biology</b><div class="tabs"><span>Stream</span><span class="on">Classwork</span><span>People</span><span>Marks</span></div></div>
<div class="main"><div class="post"><div style="display:flex;gap:14px;align-items:center"><div class="ico">📋</div><div><div class="ttl">Leaf structure and meiosis</div><div class="meta">Mr Quigley · 24 Nov · Due Fri 28 Nov, 9:00</div></div></div><div class="hr"></div>
 <div style="font-size:15px;line-height:1.6">Complete <b>Leaf Anatomy Explorer</b> and <b>Meiosis Mission</b> (about 21 min) at the link below. At the end, copy your completion code and paste it as a <b>private comment</b> on this assignment, then click Turn in.</div>
 <div class="att"><div class="th"><svg width="54" height="54" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#e2bd5a" stroke="#8a6a1c" stroke-width="2.5"/><path d="M20,8.5 l3.4,7 l7.7,1 l-5.6,5.2 l1.5,7.6 l-7,-3.8 l-7,3.8 l1.5,-7.6 l-5.6,-5.2 l7.7,-1 z" fill="#fbf8f1"/></svg></div><div class="tx"><b>Quiztoplasm · Leaf structure and meiosis</b><span>${short}</span></div></div>
 <div class="hr"></div><div class="meta">💬 Class comments</div></div>
<div class="side"><div class="card"><div style="display:flex;justify-content:space-between"><b style="font-size:18px">Your work</b><span style="color:#2e7d32;font-weight:600">Assigned</span></div><div class="btn">Turn in</div><div class="arrow">② then click Turn in</div></div>
 <div class="card"><b>Private comments</b><div class="cm">${niamh}</div><div class="arrow">① paste your completion code here</div><div class="meta">Only you and your teacher can see this</div></div></div></div>
<div class="tagi">ILLUSTRATION · NOT A REAL GOOGLE CLASSROOM SCREEN</div></div></body></html>`;
 p=await pg(1280,470,1.5);fs.writeFileSync(D+'/class2.html',CLASS);await p.goto('file://'+D+'/class2.html');await p.waitForTimeout(300);await p.locator('#c').screenshot({path:D+'/_classroom.png'});await p.close();
 await b.close();console.log('ok',S,niamh)})();
