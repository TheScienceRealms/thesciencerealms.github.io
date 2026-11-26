
/* ================= ESSAY HALL: every 15/15 plan + CCEA Section B past questions, with games ================= */
const EH=(()=>{
const wrap=()=>$$("#essaywrap");
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const LS={get(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const UNIT={AS1:"AS1 Molecules and Cells",AS2:"AS2 Organisms and Biodiversity"};
/* every essay as one shape: {id,kind,topic,title,q,parts:[{lab,m,ask,p,b|t}],f,k} */
const ALL={};
TOPICS.forEach(t=>(ESSAYS[t.id]||[]).forEach((e,i)=>{const id=t.id+(i+1),x=ESX[id]||{f:[],k:[]};
 ALL[id]={id,kind:"plan",topic:t.id,title:e.q,parts:[{lab:"",m:15,ask:e.q,p:e.p,b:[[11,11,15],[6,6,10],[1,1,5]]}],f:x.f,k:x.k,past:e.past}}));
PP.forEach(p=>{ALL[p.id]={...p,kind:"pp",title:`${p.unit} ${p.ser}`}});
const pts=E=>E.parts.flatMap(p=>p.p);
const mode=(E,m)=>`#essay-${E.id}${m?"/"+m:""}`;
const MODES=E=>[["","📋 Plan"],["tf","✔✘ True or false"],["drag","🧩 Drag the key words"],...(E.kind==="pp"?[["mark","🖊 Mark it"]]:[])];
const bestK=(id,m)=>`eh-${id}-${m}`;
const stars=pct=>pct?`<span class="eh-st">${pct>=100?"★★★":pct>=67?"★★☆":pct>=34?"★☆☆":"☆☆☆"}</span>`:"";
const markFor=(part,n)=>{if(part.t){const r=part.t.find(([min])=>n>=min);return r?r[1]:0}
 const b=part.b.find(([min])=>n>=min);return b?Math.min(b[2],b[1]+(n-b[0])):0};
const bandTxt=part=>part.t?`Marked from a points table: ${part.t[0][0]}+ points = ${part.t[0][1]} marks.`:
 `Top band [${part.b[0][1]}–${part.b[0][2]}] needs ${part.b[0][0]}+ points · middle band [${part.b[1][1]}–${part.b[1][2]}] needs ${part.b[1][0]}+.`;
const tName=id=>{const t=topicById[id];return `${t.code} ${t.name}`};

/* ---------- hall ---------- */
function hall(){
 const ppCard=p=>`<article class="eh-card"><div class="eh-top"><span class="eh-tag">${p.unit} · ${escH(p.ser)}</span><span class="eh-mk">15 marks</span></div>
  <p class="eh-q">${p.parts.map(x=>`${x.lab?`<b>${x.lab}</b> `:""}${escH(x.ask)} <span class="eh-m">[${x.m}]</span>`).join("<br>")}</p>
  <p class="eh-sm">${escH(tName(p.topic))}</p>${btns(ALL[p.id])}</article>`;
 const plan=E=>`<article class="eh-card"><p class="eh-q">${escH(E.title)}</p>${btns(E)}</article>`;
 wrap().innerHTML=`<div style="display:grid;gap:18px"><div class="gamebar"><div><div class="kicker">Section B · 15-mark essays</div><h2 style="font-family:var(--body);font-weight:800">Essay Hall</h2></div><a class="home-link" href="#">← <b>Home</b></a></div>
 <section class="panel eh-intro"><p><b>Section B</b> of both AS1 and AS2 is one 15-mark question in continuous prose (about 20 minutes). The top band (11–15) needs at least <b>11 correct points of indicative content</b> with the right specialist terms and good spelling, punctuation and grammar. Some years split it into (a) 9 marks and (b) 6 marks.</p>
 <p>Every essay has four ways to learn it: read the <b>plan</b>, play <b>true or false</b>, <b>drag the key words</b> into the points, and for past papers <b>Mark it</b>: build an answer and see the mark an examiner would give.</p></section>
 <h3 class="sech eh-h">CCEA past paper Section B questions</h3>
 <p class="eh-note">The real Section B questions from 2022–2026 and the specimen papers. Questions and mark-scheme points are reworded in our own words but keep the same content. The original papers are on the CCEA website.</p>
 ${["AS1","AS2"].map(u=>`<h4 class="eh-u">${UNIT[u]}</h4><div class="eh-grid">${PP.filter(p=>p.unit===u).slice().reverse().map(ppCard).join("")}</div>`).join("")}
 <h3 class="sech eh-h">15/15 essay plans by topic</h3>
 ${TOPICS.filter(t=>ESSAYS[t.id]).map(t=>`<h4 class="eh-u">${escH(tName(t.id))} <a class="eh-nl" href="#notes-${t.id}">Slide Notes →</a></h4><div class="eh-grid">${ESSAYS[t.id].map((e,i)=>plan(ALL[t.id+(i+1)])).join("")}</div>`).join("")}</div>`;
}
function btns(E){return `<div class="eh-btns">${MODES(E).map(([m,l])=>`<a class="eh-b ${m?"":"p"}" href="${mode(E,m)}">${l}${m?stars(LS.get(bestK(E.id,m))):""}</a>`).join("")}</div>`}

/* ---------- one essay ---------- */
let G=null;
function page(id,m){const E=ALL[id];
 const head=E.kind==="pp"?`CCEA ${E.unit} · ${E.ser} · Section B`:`15/15 essay plan · ${tName(E.topic)}`;
 const back=E.kind==="pp"?`<a class="home-link" href="#essays">← <b>Essay Hall</b></a>`:`<a class="home-link" href="#essays">← <b>Essay Hall</b></a>`;
 wrap().innerHTML=`<div style="display:grid;gap:16px"><div class="gamebar"><div><div class="kicker">${escH(head)}</div><h2 style="font-family:var(--body);font-weight:800">${E.kind==="pp"?escH(tName(E.topic)):"Essay plan"}</h2></div>${back}</div>
 <section class="panel eh-qbox">${E.parts.map(x=>`<p>${x.lab?`<b>${x.lab}</b> `:""}${escH(x.ask)} <span class="eh-m">[${x.m}]</span></p>`).join("")}</section>
 <nav class="eh-tabs" aria-label="Essay modes">${MODES(E).map(([k,l])=>`<a class="eh-tab ${k===m?"on":""}" href="${mode(E,k)}" ${k===m?'aria-current="page"':""}>${l}</a>`).join("")}</nav>
 <section class="panel" id="eh-body"></section>
 <p class="eh-sm"><a href="#notes-${E.topic}">${escH(tName(E.topic))} Slide Notes →</a></p></div>`;
 G={E,m};({"":viewPlan,tf:tfStart,drag:dgStart,mark:mkStart})[m]()}
const body=()=>$$("#eh-body");

function viewPlan(){const {E}=G;
 body().innerHTML=E.parts.map(x=>`${E.parts.length>1?`<h3 class="eh-ph">Part ${x.lab} · ${x.m} marks</h3>`:`<h3 class="eh-ph">${E.kind==="pp"?"Mark scheme points (reworded)":"Points to include"}</h3>`}
  <p class="eh-sm">${bandTxt(x)}</p><ol class="es-pts">${x.p.map(p=>`<li>${escH(p)}</li>`).join("")}</ol>`).join("")+
  (E.f.length?`<h3 class="eh-ph">The examiner says no to…</h3><ul class="eh-no">${E.f.map(([a,b])=>`<li><s>${escH(a)}</s><span>${escH(b)}</span></li>`).join("")}</ul>`:"")+
  `<div class="row" style="margin-top:12px">${MODES(E).slice(1).map(([k,l])=>`<a class="primary" style="text-decoration:none" href="${mode(E,k)}">${l} →</a>`).join("")}</div>`}

/* true or false */
function tfStart(){const {E}=G;const T=shuf(pts(E)).slice(0,6).map(s=>({s,ok:true})),F=shuf(E.f).slice(0,4).map(([s,fix])=>({s,ok:false,fix}));
 G.tf={deck:shuf([...T,...F]),i:0,got:0,ans:null};tfRender()}
function tfRender(){const S=G.tf,n=S.deck.length;
 if(S.i>=n)return done("tf",S.got,n);
 const c=S.deck[S.i],a=S.ans;
 body().innerHTML=`<div class="eh-hud"><span>Statement ${S.i+1}/${n}</span><span>Score ${S.got}</span></div><div class="pr-prog"><i style="width:${S.i/n*100}%"></i></div>
 <p class="eh-stmt">${escH(c.s)}</p><p class="eh-sm" style="text-align:center">Would this statement get credit in the mark scheme?</p>
 <div class="row eh-tfb"><button class="eh-tf t ${a!==null?(c.ok?"right":a===true?"wrong":""):""}" data-eh="tf" data-k="1" ${a!==null?"disabled":""}>✔ True</button><button class="eh-tf f ${a!==null?(!c.ok?"right":a===false?"wrong":""):""}" data-eh="tf" data-k="0" ${a!==null?"disabled":""}>✘ False</button></div>
 ${a!==null?`<div class="explain ${a===c.ok?"ok":"bad"}"><b>${a===c.ok?"Correct!":"Not quite."}</b> ${c.ok?"This is a creditworthy point.":`<b>Examiner’s fix:</b> ${escH(c.fix)}`}</div><div class="row"><button class="primary" data-eh="tfn">${S.i+1<n?"Next →":"See results"}</button></div>`:""}`}

/* drag the key words */
function dgStart(){const {E}=G;const used=new Set(),items=[];
 for(const p of shuf(pts(E))){if(items.length>=6)break;
  for(const k of E.k){if(used.has(k.toLowerCase()))continue;const i=p.toLowerCase().indexOf(k.toLowerCase());
   if(i>=0){const w=p.slice(i,i+k.length);used.add(k.toLowerCase());items.push({pre:p.slice(0,i),w,post:p.slice(i+k.length),put:null});break}}}
 G.dg={items,bank:shuf(items.map((x,i)=>i)),sel:null,checked:false};dgRender()}
function dgRender(){const S=G.dg;
 const placed=new Set(S.items.map(x=>x.put).filter(x=>x!==null));
 body().innerHTML=`<p class="eh-sm">Drag each key word into the gap where it belongs. You can also tap a word, then tap a gap.</p>
 <div class="eh-bank" aria-label="Word bank">${S.bank.map(i=>placed.has(i)?"":`<button class="eh-chip ${S.sel===i?"sel":""}" data-eh="chip" data-k="${i}" aria-pressed="${S.sel===i}">${escH(S.items[i].w)}</button>`).join("")||`<span class="eh-sm">All words placed.</span>`}</div>
 <ol class="eh-gaps">${S.items.map((x,g)=>{const st=S.checked?(x.put!==null&&S.items[x.put].w===x.w?"ok":"bad"):"";
  return `<li>${escH(x.pre)}<button class="eh-gap ${x.put!==null?"full":""} ${st}" data-eh="gap" data-k="${g}" aria-label="Gap ${g+1}${x.put!==null?": "+escH(S.items[x.put].w):" (empty)"}">${x.put!==null?escH(S.items[x.put].w):"&nbsp;"}</button>${escH(x.post)}${S.checked&&st==="bad"?` <em class="eh-fix">→ ${escH(x.w)}</em>`:""}</li>`}).join("")}</ol>
 <div class="row">${S.checked?`<button class="primary" data-eh="dgdone">See results</button>`:`<button class="primary" data-eh="dgcheck" ${placed.size<S.items.length?"disabled":""}>Check my answers</button><button class="ghost" data-eh="dgclear">Clear</button>`}</div>`;
 dragWire()}
function place(chip,gap){const S=G.dg;if(S.checked)return;S.items.forEach(x=>{if(x.put===chip)x.put=null});S.items[gap].put=chip;S.sel=null;dgRender()}
function dragWire(){const B=body();let ghost=null,from=null,sx=0,sy=0,moved=false;
 B.querySelectorAll(".eh-chip,.eh-gap.full").forEach(el=>{el.addEventListener("pointerdown",e=>{if(G.dg.checked)return;
  const chip=el.classList.contains("eh-chip")?+el.dataset.k:G.dg.items[+el.dataset.k].put;from={chip,el};sx=e.clientX;sy=e.clientY;moved=false;
  const mv=ev=>{if(!moved&&Math.hypot(ev.clientX-sx,ev.clientY-sy)<6)return;
   if(!moved){moved=true;ghost=document.createElement("div");ghost.className="eh-ghost";ghost.textContent=G.dg.items[chip].w;document.body.appendChild(ghost)}
   ev.preventDefault();ghost.style.left=ev.clientX+"px";ghost.style.top=ev.clientY+"px";
   B.querySelectorAll(".eh-gap").forEach(g=>g.classList.remove("over"));const t=document.elementFromPoint(ev.clientX,ev.clientY);const g=t&&t.closest&&t.closest(".eh-gap");if(g)g.classList.add("over")};
  const up=ev=>{document.removeEventListener("pointermove",mv);document.removeEventListener("pointerup",up);
   if(ghost){ghost.remove();ghost=null;const t=document.elementFromPoint(ev.clientX,ev.clientY);const g=t&&t.closest&&t.closest(".eh-gap");
    G.dg.justDragged=true;setTimeout(()=>{G.dg.justDragged=false},0);
    if(g)place(chip,+g.dataset.k);else if(from.el.classList.contains("eh-gap")){G.dg.items[+from.el.dataset.k].put=null;dgRender()}}};
  document.addEventListener("pointermove",mv,{passive:false});document.addEventListener("pointerup",up)})});
 B.querySelectorAll(".eh-chip").forEach(c=>{c.style.touchAction="none"})}

/* mark it (examiner game) */
function mkStart(){const {E}=G;const F=shuf(E.f);
 G.mk={parts:E.parts.map((x,pi)=>({rows:shuf([...shuf(x.p).slice(0,x.t?x.p.length:Math.min(x.p.length,x.m===15?16:10)).map(s=>({s,ok:true})),...F.filter((_,i)=>i%E.parts.length===pi).map(([s,fix])=>({s,ok:false,fix}))]),pick:new Set()})),done:false};mkRender()}
function mkRender(){const {E}=G,S=G.mk;
 const res=S.done?S.parts.map((P,pi)=>{const good=[...P.pick].filter(i=>P.rows[i].ok).length,bad=[...P.pick].filter(i=>!P.rows[i].ok).length,n=Math.max(0,good-bad);return {good,bad,n,mark:markFor(E.parts[pi],n),of:E.parts[pi].m}}):null;
 const tot=res?res.reduce((a,r)=>a+r.mark,0):0;
 body().innerHTML=`<p class="eh-sm"><b>How to play:</b> you are writing this answer. Tick every statement you would put in your essay. Leave out anything wrong or too vague. Then the examiner marks it. <i>Game rule: each wrong or vague statement you tick cancels one correct point.</i></p>
 ${res?`<div class="eh-score"><div><span class="big">${tot}/15</span><span class="eh-sm">estimated mark</span></div><p>${tot>=11?"Top band! That would score in the 11–15 band.":tot>=6?"Middle band. Add more specific points to reach 11+.":"Bottom band. Read the plan, then try again."}</p></div>`:""}
 ${E.parts.map((x,pi)=>{const P=S.parts[pi],r=res&&res[pi];return `${E.parts.length>1?`<h3 class="eh-ph">Part ${x.lab} · ${x.m} marks</h3>`:""}
  ${r?`<p class="eh-sm"><b>${r.good}</b> correct point${r.good===1?"":"s"}${r.bad?`, <b>${r.bad}</b> wrong or vague (cancelled)`:""} → <b>${r.n}</b> creditworthy → <b>${r.mark}/${r.of}</b>. ${bandTxt(x)}</p>`:""}
  <div class="eh-mk-list">${P.rows.map((w,i)=>{const on=P.pick.has(i),cl=S.done?(w.ok&&on?"ok":!w.ok&&on?"bad":w.ok?"miss":"skip"):"";
   return `<button class="eh-row ${on?"on":""} ${cl}" data-eh="pick" data-p="${pi}" data-k="${i}" aria-pressed="${on}" ${S.done?"disabled":""}><span class="eh-cb">${on?"✓":""}</span><span>${escH(w.s)}${S.done?`<small>${w.ok?(on?"✓ Credited":"Missed: this point scores"):(on?"✘ "+escH(w.fix):"✓ Good call leaving this out")}</small>`:""}</span></button>`}).join("")}</div>`}).join("")}
 <div class="row">${S.done?`<button class="primary" data-eh="mkagain">Try again</button><a class="ghost" style="text-decoration:none;color:var(--fg)" href="${mode(E,"")}">Read the plan</a>`:`<button class="primary" data-eh="mksub">Hand it to the examiner →</button>`}</div>`;
 if(S.done){const pct=Math.round(tot/15*100),k=bestK(E.id,"mark");if(pct>LS.get(k))LS.set(k,pct)}}

function done(m,got,max){const {E}=G,pct=max?Math.round(got/max*100):0,k=bestK(E.id,m),prev=LS.get(k);if(pct>prev)LS.set(k,pct);
 body().innerHTML=`<div class="eh-score"><div><span class="big">${got}/${max}</span><span class="eh-sm">${pct}%${pct>prev&&prev?" · new best!":""}</span></div><p>${pct>=90?"Brilliant: you know this essay.":pct>=60?"Good. Play again to get new statements.":"Read the plan, then try again."}</p></div>
 <div class="row"><button class="primary" data-eh="again">Play again</button>${MODES(E).filter(([x])=>x&&x!==m).map(([x,l])=>`<a class="ghost" style="text-decoration:none;color:var(--fg)" href="${mode(E,x)}">${l}</a>`).join("")}<a class="ghost" style="text-decoration:none;color:var(--fg)" href="${mode(E,"")}">📋 Plan</a></div>`}

document.addEventListener("click",e=>{const b=e.target.closest("[data-eh]");if(!b||!G||!wrap().contains(b))return;const a=b.dataset.eh,k=+b.dataset.k;
 if(a==="tf"){const S=G.tf;if(S.ans!==null)return;S.ans=k===1;if(S.ans===S.deck[S.i].ok)S.got++;tfRender()}
 if(a==="tfn"){G.tf.i++;G.tf.ans=null;tfRender()}
 if(a==="again")({tf:tfStart,drag:dgStart})[G.m]();
 if(a==="chip"){if(G.dg.justDragged)return;G.dg.sel=G.dg.sel===k?null:k;dgRender()}
 if(a==="gap"){if(G.dg.justDragged)return;const S=G.dg;if(S.checked)return;if(S.sel!==null)place(S.sel,k);else if(S.items[k].put!==null){S.items[k].put=null;dgRender()}}
 if(a==="dgclear"){G.dg.items.forEach(x=>x.put=null);G.dg.sel=null;dgRender()}
 if(a==="dgcheck"){G.dg.checked=true;dgRender()}
 if(a==="dgdone"){const S=G.dg;done("drag",S.items.filter(x=>x.put!==null&&S.items[x.put].w===x.w).length,S.items.length)}
 if(a==="pick"){const P=G.mk.parts[+b.dataset.p];P.pick.has(k)?P.pick.delete(k):P.pick.add(k);mkRender()}
 if(a==="mksub"){G.mk.done=true;mkRender();window.scrollTo({top:0,behavior:"smooth"})}
 if(a==="mkagain")mkStart()});

function route(h){G=null;if(h==="essays")return hall();const m=h.match(/^essay-([a-z0-9-]+?)(?:\/(tf|drag|mark))?$/);page(m[1],m[2]||"")}
const ok=h=>h==="essays"||(()=>{const m=h.match(/^essay-([a-z0-9-]+?)(?:\/(tf|drag|mark))?$/);return !!(m&&ALL[m[1]]&&(m[2]!=="mark"||ALL[m[1]].kind==="pp"))})();
/* for Slide Notes: buttons under each plan + this topic's past papers */
function topicExtras(id){const pp=PP.filter(p=>p.topic===id);
 return pp.length?`<section class="panel eh-tp"><div class="es-head"><div><div class="kicker">CCEA past papers</div><h3>Section B questions on this topic</h3></div><a class="eh-b" href="#essays">All essays: Essay Hall →</a></div>
 ${pp.map(p=>`<div class="eh-card"><div class="eh-top"><span class="eh-tag">${p.unit} · ${escH(p.ser)}</span><span class="eh-mk">15 marks</span></div><p class="eh-q">${p.parts.map(x=>`${x.lab?`<b>${x.lab}</b> `:""}${escH(x.ask)} <span class="eh-m">[${x.m}]</span>`).join("<br>")}</p>${btns(ALL[p.id])}</div>`).join("")}</section>`:""}
const planBtns=(topic,i)=>{const E=ALL[topic+(i+1)];return E?btns(E):""};
return {route,ok,topicExtras,planBtns,_all:ALL,_markFor:markFor};
})();
