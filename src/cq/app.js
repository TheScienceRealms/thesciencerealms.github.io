/* ============ HELPERS ============ */
const $=s=>document.querySelector(s);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={get(k){try{return +localStorage.getItem("cq-"+k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem("cq-"+k,v)}catch(e){}}};
const starsOf=f=>{const n=f>=.9?3:f>=.6?2:f>=.3?1:0;return "★".repeat(n)+"☆".repeat(3-n)};
const worldById=id=>WORLDS.find(w=>w.id===id);
const topicByCode=c=>TOPICS.find(t=>t.code===c);
const topicById=id=>TOPICS.find(t=>t.id===id);
const view=$("#view");
let G=null,timer=null;
const stopTimer=()=>{clearInterval(timer);timer=null};

function scopeInfo(scope){
  const w=worldById(scope);
  if(w)return {world:w,label:w.unit+" mixed",topics:TOPICS.filter(t=>t.w===w.id).map(t=>t.code)};
  const t=topicById(scope);return {world:worldById(t.w),label:t.code+" "+t.name,topics:[t.code],topic:t};
}
const defsFor=scope=>{const s=scopeInfo(scope);return DEFS.filter(d=>s.topics.includes(d.topic))};
const obsFor=scope=>{const s=scopeInfo(scope);return OBS.filter(o=>s.topics.includes(o[0]))};

const MINI=`<a class="mini" href="#" aria-label="ChemQuest home">${"CHEM".split("").map(c=>`<span>${c}</span>`).join("")}${"QUEST".split("").map(c=>`<span class="q">${c}</span>`).join("")}</a>`;
function frame(kicker,title,backHash,backLabel,body){
  view.innerHTML=`<div style="display:grid;gap:18px">${MINI}<div class="bar"><div><div class="kk">${esc(kicker)}</div><h2 class="gt">${esc(title)}</h2></div><a class="back" href="#${backHash}">← ${esc(backLabel)}</a></div>${body}</div>`;
}

function results(key,got,max,extra=""){
  const pct=Math.round(got/max*100),prev=store.get(key),best=pct>prev;if(best)store.set(key,pct);
  return `<div class="pop" style="display:grid;gap:14px"><div class="row" style="gap:28px;align-items:flex-end"><div><div class="big">${got}/${max}</div><div class="muted">${pct}% ${best?"· new best":"· best "+Math.max(prev,pct)+"%"}</div></div><div class="stars" style="font-size:30px">${starsOf(got/max)}</div></div>${extra}
  <div class="row"><button class="primary" data-act="again">Play again</button><a class="ghost" href="#${G.backHash}">Back to topics</a></div></div>`;
}

/* ============ HUB AND WORLDS ============ */
function renderHub(){
  WORLDS.forEach(w=>{
    const ts=TOPICS.filter(t=>t.w===w.id);
    $(`#${w.id}-chips`).innerHTML=ts.map(t=>`<li>${t.code} ${esc(t.name)}</li>`).join("");
    const played=ts.filter(topicPlayed).length;
    $(`#${w.id}-prog`).innerHTML=played?`Topics practised: <b>${played}/${ts.length}</b>`:"All topics open. Start anywhere.";
  });
}
function topicPlayed(t){return ["dash","fill"].some(g=>["all","random"].some(m=>store.get(`${g}-${t.id}-${m}`)>0))||store.get("colour-"+t.id)>0||(t.code==="1.10"&&store.get("flame")>0)||PRACS.some(p=>p.topic===t.code&&store.get("prac-"+p.id)>0)}
const bestTxt=k=>{const b=store.get(k);return b?b+"%":""};
function pairRow(game,label,scope,n){
  return `<div class="pair"><span><b>${label}</b><small>${n} ${n===1?"term":"terms"}${bestTxt(`${game}-${scope}-all`)?" · best "+bestTxt(`${game}-${scope}-all`):""}</small></span><a class="mbtn" href="#${game}-${scope}-all">Test all</a><a class="mbtn" href="#${game}-${scope}-random">Random</a></div>`;
}
function renderWorld(w){
  const ts=TOPICS.filter(t=>t.w===w.id),allDefs=defsFor(w.id),allObs=obsFor(w.id),pr=PRACS.filter(p=>ts.some(t=>t.code===p.topic));
  const cards=ts.map(t=>{
    const d=defsFor(t.id),o=obsFor(t.id),ps=PRACS.filter(p=>p.topic===t.code);let acts=`<a class="act ff-act" href="#notes-${t.id}"><span>Lab Book<small>Key points and exam tips</small></span><span class="sc">Read</span></a>`;acts+=`<a class="act" href="#quiz-${t.id}"><span>Topic Quiz<small>${qbFor(t.id).length} CCEA-style questions</small></span><span class="sc">${bestTxt("quiz-"+t.id)||"Play"}</span></a>`;const base=acts.length;
    if(d.length)acts+=pairRow("dash","Definition Dash",t.id,d.length)+pairRow("fill","Definition Builder",t.id,d.length);
    if(o.length)acts+=`<a class="act" href="#colour-${t.id}"><span>Colour Lab<small>${o.length} observations</small></span><span class="sc">${bestTxt("colour-"+t.id)||"Play"}</span></a>`;
    if(t.code==="1.1")acts+=`<a class="act" href="#ionic"><span>Ionic Equation Builder<small>Split · cross out · write</small></span><span class="sc">${bestTxt("ionic")||"Play"}</span></a>`;
    if(t.code==="1.10")acts+=`<a class="act" href="#flame"><span>Flame Test Lab<small>Learn the six flame colours</small></span><span class="sc">${bestTxt("flame")||"Play"}</span></a>`;
    if(t.code==="1.6")[["shifter","Shape Shifter","Build molecules in 3D"],["escape","Electron Pair Escape","Work out shapes room by room"],["blitz","Bond Angle Blitz","Timed bond angles"],["dipole","Dipole Detective","Polar or non-polar, and why"]].forEach(([h,n,s])=>acts+=`<a class="act" href="#${h}"><span>${n}<small>${s}</small></span><span class="sc">${bestTxt(h)||"Play"}</span></a>`);
    acts+=realmActs(t.code);
    ps.forEach(p=>acts+=`<a class="act" href="#prac-${p.id}"><span>${esc(p.title)}<small>${p.msm?"Mark Scheme Mechanic":"Practical Builder"} · 6 marks</small></span><span class="sc">${bestTxt("prac-"+p.id)||"Play"}</span></a>`);
    if(acts.length===base)acts+=`<p class="soon">More games for this topic are on the way.</p>`;
    return `<article class="tcard"><div class="thead"><span class="tcode">${t.code}</span><h3>${esc(t.name)}</h3></div><div class="acts">${acts}</div></article>`}).join("");
  view.innerHTML=`<div style="display:grid;gap:18px" class="${w.cls}">${MINI}<div class="bar"><div><div class="kk">${w.unit}</div><h2>${w.name}</h2></div><a class="back" href="#">← All worlds</a></div>
  <div class="wtop">
   <div class="panel"><h3>Mixed practice</h3><a class="act" href="#quiz-${w.id}"><span>Section A Bank<small>10 random multiple-choice questions</small></span><span class="sc">${bestTxt("quiz-"+w.id)||"Play"}</span></a><p class="small muted">Questions from every ${w.unit.replace("CHEMISTRY ","")} topic.</p>${pairRow("dash","Definition Dash",w.id,allDefs.length)}${pairRow("fill","Definition Builder",w.id,allDefs.length)}</div>
   <div class="panel"><h3>Practicals</h3><p class="small muted">Colour changes, tests and 6-mark methods.</p>
    <div class="acts">${allObs.length?`<a class="act" href="#colour-${w.id}"><span>Colour Lab: mixed<small>${allObs.length} observations</small></span><span class="sc">${bestTxt("colour-"+w.id)||"Play"}</span></a>`:""}
    ${w.id==="as1"?`<a class="act" href="#flame"><span>Flame Test Lab<small>1.10 Qualitative tests</small></span><span class="sc">${bestTxt("flame")||"Play"}</span></a>`:""}
    <p class="small muted">${pr.filter(p=>!p.msm).length} Practical Builder questions are in the topics below.</p></div></div>
  </div>
  <div class="tgrid">${cards}</div></div>`;
}

/* ============ MULTIPLE-CHOICE ENGINE (Definition Dash and Colour Lab) ============ */
function startDash(scope,mode){
  const pool=defsFor(scope),info=scopeInfo(scope),worldDefs=DEFS.filter(d=>d.w===info.world.id);
  let picks=mode==="all"?shuffle(pool):shuffle(pool).slice(0,Math.min(10,pool.length));
  const qs=picks.map((d,i)=>{
    const dir=mode==="all"?(i%2?"d2t":"t2d"):(Math.random()<.5?"d2t":"t2d");
    const same=shuffle(worldDefs.filter(x=>x!==d&&x.topic===d.topic)),other=shuffle(worldDefs.filter(x=>x!==d&&x.topic!==d.topic));
    const dis=[...same,...other].filter((x,j,a)=>a.findIndex(y=>(dir==="t2d"?y.def:y.term)===(dir==="t2d"?x.def:x.term))===j).slice(0,3);
    const opts=[d,...dis].map(x=>dir==="t2d"?x.def:x.term);
    return {d,dir,opts,order:shuffle([0,1,2,3].slice(0,opts.length))};
  });
  G={kind:"dash",key:`dash-${scope}-${mode}`,scope,mode,qs,i:0,score:0,streak:0,correct:0,backHash:info.world.hash,timed:true,T:30};
  frame(info.label+(mode==="all"?" · Test all":" · Random"),"Definition Dash",info.world.hash,info.world.unit.replace("CHEMISTRY ",""),`<section class="panel" id="g"></section>`);
  mcAsk();
}
function startColour(scope){
  const info=scopeInfo(scope),pool=obsFor(scope);
  const picks=shuffle(pool).slice(0,scope.startsWith("as")?12:pool.length);
  const qs=picks.map(o=>({o,opts:[o[2],...shuffle(o[3]).slice(0,3)],order:shuffle([0,1,2,3])}));
  G={kind:"colour",key:"colour-"+scope,scope,qs,i:0,score:0,streak:0,correct:0,backHash:info.world.hash,timed:false};
  frame(info.label,"Colour Lab",info.world.hash,info.world.unit.replace("CHEMISTRY ",""),`<section class="panel" id="g"></section>`);
  mcAsk();
}
const mult=()=>G.streak>=6?3:G.streak>=3?2:1;
function mcAsk(){
  const q=G.qs[G.i],g=$("#g");G.answered=false;stopTimer();
  let card;
  if(G.kind==="dash"){
    const sym=q.d.term.replace(/[^A-Za-z]/g,"").slice(0,2);
    card=`<div class="card slidein"><div class="tile"><span class="n">${G.i+1}</span><span class="s">${esc(sym.charAt(0).toUpperCase()+sym.charAt(1).toLowerCase())}</span><span class="w">${q.d.ref}</span></div><div class="ask">${q.dir==="t2d"?`<small>WHICH IS THE CCEA DEFINITION OF</small>${esc(q.d.term)}?`:`<small>WHICH TERM IS DEFINED HERE?</small>“${esc(q.d.def)}”`}</div></div>`;
  } else {
    card=`<div class="card slidein"><svg width="54" height="88" viewBox="0 0 54 88" aria-hidden="true"><path d="M14,4 h26 v4 h-3 v60 a10,10 0 0 1 -20,0 v-60 h-3 z" fill="none" stroke="#4cc9f0" stroke-width="2.5"/><path d="M17,44 h20 v24 a10,10 0 0 1 -20,0 z" fill="#ffd60a" opacity=".85"/></svg><div class="ask"><small>${G.quiz?"QUESTION":"COLOUR LAB"} · ${q.o[0]}</small>${esc(q.o[1])}</div></div>`;
  }
  g.innerHTML=`<div class="hud"><span>Question <strong>${G.i+1}</strong>/${G.qs.length}</span><span>Score <strong>${G.score}</strong></span>${G.kind==="dash"?`<span>Streak <strong>${G.streak}</strong>${G.streak>=3?` <span class="x">×${mult()}</span>`:""}</span><span>Time <strong id="tt">${G.T}</strong>s</span>`:`<span>Correct <strong>${G.correct}</strong></span>`}</div>
  ${G.timed?`<div class="meter"><i id="tm"></i></div>`:""}${card}
  <div class="opts">${q.order.map((o,n)=>`<button class="opt" data-act="mc" data-k="${o}"><kbd>${n+1}</kbd><span>${esc(q.opts[o])}</span></button>`).join("")}</div><div id="after"></div>`;
  if(G.timed){const t0=performance.now();G.left=G.T;timer=setInterval(()=>{G.left=Math.max(0,G.T-(performance.now()-t0)/1000);const a=$("#tt"),b=$("#tm");if(!a){stopTimer();return}a.textContent=Math.ceil(G.left);b.style.width=(G.left/G.T*100)+"%";if(G.left<=0)mcAnswer(-1)},100)}
}
function mcAnswer(o){
  if(G.answered)return;G.answered=true;stopTimer();
  const q=G.qs[G.i],ok=o===0;let gained=0;
  if(ok){G.correct++;G.streak++;gained=G.kind==="dash"?(100+Math.round(G.left*4))*mult():100;G.score+=gained}else G.streak=0;
  document.querySelectorAll('.opt[data-act="mc"]').forEach(b=>{b.disabled=true;const v=+b.dataset.k;if(v===0)b.classList.add("right");else if(v===o)b.classList.add("wrong")});
  const last=G.i===G.qs.length-1;
  const body=G.kind==="dash"?`<span><b style="color:var(--navy)">${esc(q.d.term)}</b> (${q.d.ref}): ${esc(q.d.def)}</span>`:`${q.o[4]?`<span>${esc(q.o[4])}</span>`:""}${q.o[5]?`<div class="eqbox">${q.o[5]}</div>`:""}`;
  $("#after").innerHTML=`<div class="explain pop ${ok?"ok":"bad"}"><b>${ok?(G.kind==="dash"?`Correct · +${gained}`:"Correct"):o<0?"Time’s up":"Not quite"}</b>${!ok&&G.kind==="colour"?`<span>Answer: ${esc(q.o[2])}</span>`:""}${body}</div>
  <div class="row" style="margin-top:12px"><button class="primary" id="nx" data-act="mcnext">${last?"See results":"Next"}</button></div>`;
  $("#nx").focus();
}
function mcNext(){G.i++;if(G.i<G.qs.length)return mcAsk();$("#g").innerHTML=results(G.key,G.correct,G.qs.length,G.kind==="dash"?`<p class="muted">Points: ${G.score}</p>`:"")}

/* ============ DEFINITION BUILDER (fill the gaps) ============ */
const PRIORITY=new Set("gaseous mole one single double triple positive negative protons neutrons electrons nucleus nuclei average weighted mean one-twelfth carbon-12 isotope atoms ions molecule molecules electrostatic attraction shared pair lone unpaired neighbouring instantaneous induced permanent electronegative unequal loss gain increase decrease acceptor donor same element fully partially dissociates known simplest whole actual general gradation functional structural arrangement hydrogen carbon replacing each both linear sideways overlap distance high low density directly repeated boiling condensing water small larger proportions layer lowest reciprocal wavelength greater less products reactants 298 100 constant pressure completely burnt oxygen formed elements produced independent route initial final break averaged concentration time minimum forward backward equal amount physical different phase highest s-subshell maximum solute stated temperature crystallisation chemically crystal covalently charge overall eight outer shell freely fixed orbitals monomers polymer halogen dipoles dipole δ+ δ− mass removed reaction amount acceptor bonded".split(" "));
const OPP={gaseous:["liquid","solid"],positive:["negative"],negative:["positive"],single:["double"],double:["single","triple"],triple:["double"],gain:["loss"],loss:["gain"],increase:["decrease"],decrease:["increase"],acceptor:["donor"],donor:["acceptor"],fully:["partially"],partially:["fully"],high:["low"],low:["high"],greater:["less"],less:["greater"],forward:["backward"],backward:["forward"],linear:["sideways"],sideways:["linear"],same:["different"],different:["same"],minimum:["maximum"],maximum:["minimum"],one:["two"],unequal:["equal"],equal:["unequal"],simplest:["actual"],actual:["simplest"],instantaneous:["permanent"],permanent:["instantaneous"],protons:["neutrons","electrons"],neutrons:["protons"],electrons:["protons"],atoms:["molecules","ions"],ions:["atoms"],molecules:["atoms"],electrostatic:["magnetic"],shared:["transferred"],unpaired:["paired"],completely:["partially"],initial:["final"],final:["initial"],products:["reactants"],reactants:["products"],"298":["273"],independent:["dependent"],neighbouring:["the same"],lowest:["highest"],highest:["lowest"],small:["large"],larger:["smaller"],known:["unknown"],constant:["changing"]};
function tokenise(def){return def.split(" ").map(w=>{const m=w.match(/^([(“"']*)(.*?)([).,;:”"']*)$/);return {pre:m[1],core:m[2],post:m[3]}})}
function makeGaps(d,pool){
  const tk=tokenise(d.def),n=tk.length,k=Math.max(2,Math.min(4,Math.round(n/7)));
  const cand=tk.map((t,i)=>({i,s:PRIORITY.has(t.core.toLowerCase())?3:t.core.length>=8?1:0,r:Math.random()})).filter(c=>c.s>0&&tk[c.i].core.length>1);
  let chosen=cand.sort((a,b)=>b.s-a.s||a.r-b.r).slice(0,k);
  if(chosen.length<2){chosen=chosen.concat(tk.map((t,i)=>({i})).filter(c=>tk[c.i].core.length>=5&&!chosen.some(x=>x.i===c.i)).slice(0,2-chosen.length))}
  const idx=chosen.map(c=>c.i).sort((a,b)=>a-b),ans=idx.map(i=>tk[i].core);
  let extra=[];ans.forEach(a=>{const o=OPP[a.toLowerCase()];if(o)extra.push(...o)});
  const pl=shuffle(pool.filter(w=>!ans.some(a=>a.toLowerCase()===w.toLowerCase())));
  extra=extra.filter(x=>!ans.includes(x));while(extra.length<3&&pl.length)extra.push(pl.pop());
  extra=[...new Set(extra)].slice(0,4);
  return {tk,idx,ans,tiles:shuffle([...ans.map((a,j)=>({id:"t"+j,v:a})),...extra.map((e,j)=>({id:"x"+j,v:e}))])};
}
function startFill(scope,mode){
  const info=scopeInfo(scope),pool=defsFor(scope),worldDefs=DEFS.filter(d=>d.w===info.world.id);
  const words=[...new Set(worldDefs.flatMap(d=>tokenise(d.def).map(t=>t.core)).filter(w=>PRIORITY.has(w.toLowerCase())))];
  const picks=mode==="all"?shuffle(pool):shuffle(pool).slice(0,Math.min(8,pool.length));
  G={kind:"fill",key:`fill-${scope}-${mode}`,scope,qs:picks.map(d=>({d,g:makeGaps(d,words)})),i:0,got:0,max:0,backHash:info.world.hash};
  frame(info.label+(mode==="all"?" · Test all":" · Random"),"Definition Builder",info.world.hash,info.world.unit.replace("CHEMISTRY ",""),`<section class="panel" id="g"></section>`);
  fillBegin();
}
function fillBegin(){G.r={placed:{},sel:null,checked:false};fillRender()}
function fillRender(){
  const q=G.qs[G.i],r=G.r,g=q.g;
  const used=new Set(Object.values(r.placed));
  const text=g.tk.map((t,i)=>{const j=g.idx.indexOf(i);if(j<0)return esc(t.pre+t.core+t.post);
    const v=r.placed[j],tile=v&&g.tiles.find(x=>x.id===v),ok=r.checked?(tile&&tile.v.toLowerCase()===g.ans[j].toLowerCase()?"ok":"bad"):"";
    return esc(t.pre)+`<button class="gap ${tile?"filled":""} ${ok} ${!r.checked&&r.sel?"ready":""}" data-act="gap" data-k="${j}" ${r.checked?"disabled":""}>${tile?esc(tile.v):"<i>…</i>"}${r.checked&&ok==="bad"?` <span class="fix">${esc(g.ans[j])}</span>`:""}</button>`+esc(t.post)}).join(" ");
  const all=g.idx.every((_,j)=>r.placed[j]!==undefined);
  $("#g").innerHTML=`<div class="hud"><span>Definition <strong>${G.i+1}</strong>/${G.qs.length}</span><span>Gaps correct <strong>${G.got}</strong>/${G.max}</span></div>
  <div class="card ${r.anim?"":"slidein"}"><div class="tile"><span class="n">${G.i+1}</span><span class="s">${esc(q.d.term.replace(/[^A-Za-z]/g,"").slice(0,1).toUpperCase()+q.d.term.replace(/[^A-Za-z]/g,"").slice(1,2).toLowerCase())}</span><span class="w">${q.d.ref}</span></div><div class="ask"><small>COMPLETE THE CCEA DEFINITION</small>${esc(q.d.term)}</div></div>
  <div class="deftext">${text}</div>
  ${r.checked?"":`<div class="bank">${g.tiles.filter(t=>!used.has(t.id)).map(t=>`<button class="tilebtn ${r.sel===t.id?"on":""}" data-act="tile" data-k="${t.id}" aria-pressed="${r.sel===t.id}">${esc(t.v)}</button>`).join("")}</div>
  <div class="row"><button class="primary" data-act="fillcheck" ${all?"":"disabled"}>Check</button><span class="small muted">Tap a word, then tap a gap. Tap a filled gap to clear it. Some words are traps.</span></div>`}
  ${r.checked?`<div class="explain pop ${r.got===g.idx.length?"ok":"bad"}"><b>${r.got===g.idx.length?"Full marks":r.got+" of "+g.idx.length+" gaps correct"}</b><span><b style="color:var(--navy)">${esc(q.d.term)}</b> (${q.d.ref}): ${esc(q.d.def)}</span></div>
  <div class="row"><button class="primary" id="nx" data-act="fillnext">${G.i===G.qs.length-1?"See results":"Next definition"}</button></div>`:""}`;
  r.anim=true;const n=$("#nx");if(n)n.focus();
}
function fillAct(a,k){
  const r=G.r,g=G.qs[G.i].g;
  if(a==="fillnext"){G.i++;if(G.i<G.qs.length)return fillBegin();return $("#g").innerHTML=results(G.key,G.got,G.max)}
  if(r.checked)return;
  if(a==="tile")r.sel=r.sel===k?null:k;
  else if(a==="gap"){if(r.sel){r.placed[k]=r.sel;r.sel=null}else delete r.placed[k]}
  else if(a==="fillcheck"){r.checked=true;r.got=g.idx.filter((_,j)=>{const t=g.tiles.find(x=>x.id===r.placed[j]);return t&&t.v.toLowerCase()===g.ans[j].toLowerCase()}).length;G.got+=r.got;G.max+=g.idx.length}
  fillRender();
}

/* ============ FLAME TEST LAB ============ */
function flameSVG(f,cobalt){
  const c1=f?(cobalt&&f.cob?f.cob:f.c1):"#3d7bff",c2=f?(cobalt&&f.cob?"#f7b3d4":f.c2):"#9ec5ff";
  return `<svg viewBox="0 0 200 330" role="img" aria-label="Bunsen burner flame${f?" coloured "+(cobalt&&f.cob?"pink":f.col):""}">
  <g class="flick"><path class="fl-outer" d="M100,40 C126,92 150,130 146,180 C142,222 122,240 100,240 C78,240 58,222 54,180 C50,130 74,92 100,40 Z" style="fill:${c1};opacity:.85"/>
  <path d="M100,110 C114,140 124,160 122,192 C120,218 110,232 100,232 C90,232 80,218 78,192 C76,160 86,140 100,110 Z" style="fill:${c2};opacity:.9"/>
  <path d="M100,170 C108,186 112,200 110,214 C108,226 104,232 100,232 C96,232 92,226 90,214 C88,200 92,186 100,170 Z" style="fill:#bcd6ff;opacity:.9"/></g>
  ${cobalt?`<rect x="30" y="60" width="140" height="160" rx="10" style="fill:#1f3fbf;opacity:.35"/><text x="100" y="54" text-anchor="middle" style="fill:#fff;font:700 11px var(--mono)">COBALT GLASS</text>`:""}
  <rect x="88" y="240" width="24" height="62" style="fill:#9aa7b4;stroke:#0b2545;stroke-width:2"/><rect x="92" y="262" width="16" height="8" style="fill:#0b2545"/>
  <rect x="58" y="300" width="84" height="18" rx="4" style="fill:#5b6b7a;stroke:#0b2545;stroke-width:2"/>
  ${f?`<path d="M190,120 L130,150" style="stroke:#c9d2da;stroke-width:3"/><circle cx="128" cy="151" r="5" style="fill:none;stroke:#c9d2da;stroke-width:2.5"/>`:""}
  </svg>`;
}
function startFlame(mode){
  G={kind:"flame",key:"flame",mode,backHash:"elemental-frontier",cobalt:false,sel:null};
  frame("1.10 Qualitative tests","Flame Test Lab","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);
  if(mode==="test"){
    const rounds=[];shuffle(FLAMES).forEach((f,i)=>rounds.push({type:i%2?"ion":"col",f}));
    rounds.push({type:"order"});
    Object.assign(G,{rounds,i:0,got:0,max:0});
  }
  flameRender();
}
function flameRender(){
  const g=$("#g");
  if(G.mode!=="test"){
    const f=FLAMES.find(x=>x.ion===G.sel);
    g.innerHTML=`<div class="row"><span class="stg on">Explore</span><a class="stg" href="#flame-test" style="text-decoration:none">Test yourself →</a></div>
    <p>Tap a sample to hold it in a blue Bunsen flame. Learn the colour <b>exactly as CCEA words it</b>.</p>
    <div class="flamebox">${flameSVG(f,G.cobalt)}<div style="display:grid;gap:12px">
      <div class="samples">${FLAMES.map(x=>`<button class="samp ${G.sel===x.ion?"on":""}" data-act="samp" data-k="${x.ion}"><b>${x.ion}</b><small>${x.name} chloride</small></button>`).join("")}</div>
      ${f?`<div class="readout pop"><span class="small" style="color:var(--cyanl)">${f.name} ion, ${f.ion}</span><span class="c">${esc(f.col)}</span>${f.cob?`<label class="toggle"><input type="checkbox" data-act="cobalt" ${G.cobalt?"checked":""}> View through cobalt glass</label>`:""}</div>`:`<div class="readout"><span class="small" style="color:var(--cyanl)">No sample</span><span class="c">Blue flame</span></div>`}
      <div class="explain"><b>Method (CCEA)</b><span>${FLAME_METHOD.map((s,i)=>`${i+1}. ${esc(s)}`).join("<br>")}</span></div></div></div>`;
    return;
  }
  if(G.i>=G.rounds.length){g.innerHTML=results("flame",G.got,G.max);return}
  const R=G.rounds[G.i];
  let body="",prompt="";
  if(R.type==="order"){
    R.seq=R.seq||[];R.shown=R.shown||shuffle([0,1,2,3]);
    prompt="Put the flame test method in order.";
    body=`<div class="opts">${R.shown.map(i=>{const p=R.seq.indexOf(i);return `<button class="step ${p>=0?"on":""} ${R.checked?(R.seq[i]===i?"right":"wrong"):""}" data-act="ford" data-k="${i}" ${R.checked?"disabled":""}><span class="num">${p>=0?p+1:"·"}</span><span>${esc(FLAME_METHOD[i])}</span></button>`}).join("")}</div>
    ${R.checked?"":`<div class="row"><button class="primary" data-act="fordcheck" ${R.seq.length===4?"":"disabled"}>Check order</button><button class="ghost" data-act="fordclear">Clear</button></div>`}`;
  } else {
    R.opts=R.opts||(R.type==="ion"?shuffle(FLAMES.map(x=>x.ion)):shuffle(FLAMES.map(x=>x.col)));
    const ans=R.type==="ion"?R.f.ion:R.f.col;
    prompt=R.type==="ion"?"Which ion gives this flame colour?":`What flame colour does ${R.f.ion} give? Pick CCEA’s wording.`;
    body=`<div class="flamebox">${R.type==="ion"?flameSVG(R.f,false):flameSVG(null,false)}<div class="opts">${R.opts.map(o=>`<button class="opt ${R.checked?(o===ans?"right":o===R.pick?"wrong":""):""}" data-act="fpick" data-k="${esc(o)}" ${R.checked?"disabled":""}>${esc(o)}</button>`).join("")}</div></div>`;
  }
  const fb=R.checked?`<div class="explain pop ${R.ok?"ok":"bad"}"><b>${R.ok?"Correct":"Not quite"}</b>${R.f?`<span>${R.f.ion} (${R.f.name}): ${esc(R.f.col)}</span>`:`<span>${FLAME_METHOD.map((s,i)=>`${i+1}. ${esc(s)}`).join("<br>")}</span>`}</div><div class="row"><button class="primary" id="nx" data-act="fnext">${G.i===G.rounds.length-1?"See results":"Next"}</button></div>`:"";
  g.innerHTML=`<div class="row"><a class="stg" href="#flame" style="text-decoration:none">← Explore</a><span class="stg on">Test</span></div><div class="hud"><span>Round <strong>${G.i+1}</strong>/${G.rounds.length}</span><span>Score <strong>${G.got}</strong>/${G.max}</span></div><div class="qtext">${prompt}</div>${body}${fb}`;
  const n=$("#nx");if(n)n.focus();
}
function flameAct(a,k,el){
  if(G.mode!=="test"){if(a==="samp"){G.sel=k;G.cobalt=false}if(a==="cobalt")G.cobalt=el.checked;return flameRender()}
  const R=G.rounds[G.i];
  if(a==="fnext"){G.i++;return flameRender()}
  if(R.checked)return;
  if(a==="fpick"){R.pick=k;R.ok=k===(R.type==="ion"?R.f.ion:R.f.col);R.checked=true;G.got+=R.ok?1:0;G.max+=1}
  if(a==="ford"){const i=+k,p=R.seq.indexOf(i);p>=0?R.seq.splice(p,1):R.seq.push(i)}
  if(a==="fordclear")R.seq=[];
  if(a==="fordcheck"){R.checked=true;const g=R.seq.filter((v,i)=>v===i).length;R.ok=g===4;G.got+=g;G.max+=4}
  flameRender();
}

/* ============ PRACTICAL BUILDER (6-mark questions) ============ */
const STAGES=["1 Kit","2 Method","3 Key terms","4 Write it"];
function startPrac(id){
  const p=PRACS.find(x=>x.id===id),t=topicByCode(p.topic),w=worldById(t.w);
  G={kind:"prac",p,key:"prac-"+id,stage:0,scores:[],backHash:w.hash,order:[p.kit?0:-1,p.steps?1:-1,2,3].filter(x=>x>=0),si:0,
     kit:{order:shuffle((p.kit||[]).map((_,i)=>i)),on:new Set(),checked:false},
     meth:{items:shuffle([...(p.steps||[]).map((s,i)=>({s,i})),...(p.decoys||[]).map(([s,why],j)=>({s,i:-1-j,why}))]),seq:[],checked:false},
     gaps:{placed:{},sel:null,checked:false,tiles:shuffle([...Object.entries(p.gaps.ans).map(([k,v])=>({id:k,v})),...p.gaps.extra.map((v,j)=>({id:"x"+j,v}))])},
     write:{text:"",marked:false,ticks:new Set(),done:false}};
  G.stage=G.order[0];
  frame(t.code+" "+t.name+(p.msm?" · Mark Scheme Mechanic":" · Practical Builder"),p.title,w.hash,w.unit.replace("CHEMISTRY ",""),`<section class="panel" id="g"></section>`);
  pracRender();
}
function pracRender(){
  const P=G.p,g=$("#g"),st=G.stage;
  const head=`<div class="stages">${G.order.map((s,i)=>`<span class="stg ${s===st?"on":(i<G.si||st===4)?"done":""}">${i+1} ${STAGES[s].slice(2)}</span>`).join("")}</div><div class="qhead">${P.msm?"6-MARK EXPLANATION QUESTION":"6-MARK PRACTICAL QUESTION"}</div><div class="qtext">${esc(P.q)}</div>`;
  let body="";
  if(st===0){const K=G.kit;
    body=`<p>Select <b>all</b> the apparatus you need, and nothing you don’t.</p><div class="kit">${K.order.map(i=>{const [name,need]=P.kit[i],on=K.on.has(i);let c=on?"on":"";if(K.checked)c=on?(need?"right":"wrong"):(need?"missed":"");return `<button class="kitbtn ${c}" data-act="kit" data-k="${i}" ${K.checked?"disabled":""}>${esc(name)}${K.checked&&!on&&need?" <span class='small' style='color:var(--good)'>(needed)</span>":""}</button>`}).join("")}</div>
    ${K.checked?`<div class="explain pop ${K.score===K.max?"ok":"bad"}"><b>Kit: ${K.score}/${K.max}</b><span>Green items are needed. Red items are wrong for this practical.</span></div><div class="row"><button class="primary" data-act="pnext">Next: method</button></div>`:`<div class="row"><button class="primary" data-act="kitcheck" ${K.on.size?"":"disabled"}>Check kit</button></div>`}`;}
  if(st===1){const M=G.meth;
    body=`<p>Tap the correct steps in order. <b>Some steps are mistakes</b>, so leave them out.</p><div class="opts">${M.items.map((it,j)=>{const p=M.seq.indexOf(j);let c=p>=0?"on":"";if(M.checked){if(it.i<0)c=p>=0?"wrong":"";else c=p===it.i?"right":"wrong"}return `<button class="step ${c}" data-act="mstep" data-k="${j}" ${M.checked?"disabled":""}><span class="num">${p>=0?p+1:"·"}</span><span>${esc(it.s)}${M.checked&&it.i<0?`<br><span class="small" style="color:var(--bad)">✗ ${esc(it.why)}</span>`:""}</span></button>`}).join("")}</div>
    ${M.checked?`<div class="explain pop ${M.score===M.max?"ok":"bad"}"><b>Method: ${M.score}/${M.max}</b><span>The correct order:<br>${P.steps.map((s,i)=>`${i+1}. ${esc(s)}`).join("<br>")}</span></div><div class="row"><button class="primary" data-act="pnext">Next: key terms</button></div>`:`<div class="row"><button class="primary" data-act="mcheck" ${M.seq.length?"":"disabled"}>Check method</button><button class="ghost" data-act="mclear">Clear</button></div>`}`;}
  if(st===2){const Q=G.gaps,ans=P.gaps.ans,used=new Set(Object.values(Q.placed));
    const text=esc(P.gaps.text).replace(/\{(\w+)\}/g,(m,k)=>{const v=Q.placed[k],t=v&&Q.tiles.find(x=>x.id===v),ok=Q.checked?(t&&t.v===ans[k]?"ok":"bad"):"";return `<button class="gap ${t?"filled":""} ${ok} ${!Q.checked&&Q.sel?"ready":""}" data-act="pgap" data-k="${k}" ${Q.checked?"disabled":""}>${t?esc(t.v):"<i>…</i>"}${Q.checked&&ok==="bad"?` <span class="fix">${esc(ans[k])}</span>`:""}</button>`});
    const all=Object.keys(ans).every(k=>Q.placed[k]);
    body=`<p>Use the CCEA terms. Examiners want the exact names of apparatus and actions.</p><div class="deftext">${text}</div>
    ${Q.checked?`<div class="explain pop ${Q.score===Q.max?"ok":"bad"}"><b>Key terms: ${Q.score}/${Q.max}</b></div><div class="row"><button class="primary" data-act="pnext">Next: write the full answer</button></div>`:`<div class="bank">${Q.tiles.filter(t=>!used.has(t.id)).map(t=>`<button class="tilebtn ${Q.sel===t.id?"on":""}" data-act="ptile" data-k="${t.id}">${esc(t.v)}</button>`).join("")}</div><div class="row"><button class="primary" data-act="pgcheck" ${all?"":"disabled"}>Check</button></div>`}`;}
  if(st===3){const W=G.write,[a,b,c]=P.bands,n=P.points.length;
    if(!W.marked) body=`<p>Write the whole answer from memory, as you would in the exam. Then mark it against the indicative content.</p><textarea id="ans" placeholder="Write your answer here…" aria-label="Your answer">${esc(W.text)}</textarea><div class="row"><button class="primary" data-act="wmark">Mark my answer</button><span class="small muted">${W.text.trim().split(/\s+/).filter(Boolean).length} words</span></div>`;
    else{const hits=W.ticks.size,band=hits>=a?"A":hits>=b?"B":hits>=c?"C":"D",mark={A:6,B:4,C:2,D:0}[band];
      body=`<p><b>Tick each point your answer makes.</b> Points your answer seems to mention are already ticked, so check them.</p>
      <div class="opts">${P.points.map(([t],i)=>`<button class="check ${W.ticks.has(i)?"on":""}" data-act="wtick" data-k="${i}" ${W.done?"disabled":""}><span class="box">${W.ticks.has(i)?"✓":""}</span><span>${esc(t)}</span></button>`).join("")}</div>
      <table class="bandtable"><tr><th>Band</th><th>Indicative points</th><th>Marks</th></tr>
      <tr class="${band==="A"?"hit":""}"><td>A</td><td>${a} or more, with specialist terms and good spelling, punctuation and grammar</td><td>5–6</td></tr>
      <tr class="${band==="B"?"hit":""}"><td>B</td><td>${b} to ${a-1}</td><td>3–4</td></tr>
      <tr class="${band==="C"?"hit":""}"><td>C</td><td>${c} to ${b-1}, a brief and partial answer</td><td>1–2</td></tr>
      <tr class="${band==="D"?"hit":""}"><td>D</td><td>Fewer than ${c}</td><td>0</td></tr></table>
      <div class="explain ${band==="A"?"ok":"bad"}"><b>${hits} of ${n} points · Band ${band} · about ${mark}/6</b><span>The upper mark in a band is usually given unless spelling, punctuation and grammar are very poor.</span></div>
      <details class="model"><summary><b>See your answer and a model answer</b></summary><p style="margin-top:8px"><b>Your answer:</b> ${esc(W.text)||"<i>(empty)</i>"}</p><p style="margin-top:8px"><b>Model answer:</b> ${P.model?esc(P.model):P.steps.map(esc).join(". ")+"."}</p></details>
      ${W.done?"":`<div class="row"><button class="primary" data-act="wdone">Finish</button><button class="ghost" data-act="wedit">Edit my answer</button></div>`}`;}
  }
  if(st===4){const total=G.scores.reduce((s,x)=>s+(x?x[0]:0),0),max=G.scores.reduce((s,x)=>s+(x?x[1]:0),0);
    g.innerHTML=head+`<div class="explain"><b>Your stages</b><span>${G.scores.map((x,i)=>x?`${STAGES[i].slice(2)}: ${x[0]}/${x[1]}`:"").filter(Boolean).join("<br>")}</span></div>`+results(G.key,total,max);return}
  g.innerHTML=head+body;
}
function detect(text,points){const t=text.toLowerCase();return new Set(points.map((p,i)=>p[1].some(k=>t.includes(k.toLowerCase()))?i:-1).filter(i=>i>=0))}
function pracAct(a,k){
  const P=G.p;
  if(a==="pnext"){G.si++;G.stage=G.order[G.si];return pracRender()}
  if(G.stage===0){const K=G.kit;if(K.checked)return;
    if(a==="kit"){const i=+k;K.on.has(i)?K.on.delete(i):K.on.add(i)}
    if(a==="kitcheck"){K.checked=true;const need=P.kit.filter(x=>x[1]).length,hit=[...K.on].filter(i=>P.kit[i][1]).length,wrong=K.on.size-hit;K.max=need;K.score=Math.max(0,hit-wrong);G.scores[0]=[K.score,K.max]}}
  if(G.stage===1){const M=G.meth;if(M.checked)return;
    if(a==="mstep"){const j=+k,p=M.seq.indexOf(j);p>=0?M.seq.splice(p,1):M.seq.push(j)}
    if(a==="mclear")M.seq=[];
    if(a==="mcheck"){M.checked=true;M.max=P.steps.length;const right=M.seq.filter((j,p)=>M.items[j].i===p).length,dec=M.seq.filter(j=>M.items[j].i<0).length;M.score=Math.max(0,right-dec);G.scores[1]=[M.score,M.max]}}
  if(G.stage===2){const Q=G.gaps;if(Q.checked)return;
    if(a==="ptile")Q.sel=Q.sel===k?null:k;
    if(a==="pgap"){if(Q.sel){Q.placed[k]=Q.sel;Q.sel=null}else delete Q.placed[k]}
    if(a==="pgcheck"){Q.checked=true;const ks=Object.keys(P.gaps.ans);Q.max=ks.length;Q.score=ks.filter(x=>{const t=Q.tiles.find(y=>y.id===Q.placed[x]);return t&&t.v===P.gaps.ans[x]}).length;G.scores[2]=[Q.score,Q.max]}}
  if(G.stage===3){const W=G.write;
    if(a==="wmark"){W.text=($("#ans")||{}).value||W.text;W.ticks=detect(W.text,P.points);W.marked=true}
    if(a==="wedit"){W.marked=false}
    if(a==="wtick"&&!W.done){const i=+k;W.ticks.has(i)?W.ticks.delete(i):W.ticks.add(i)}
    if(a==="wdone"){const [A,B,C]=P.bands,h=W.ticks.size,band=h>=A?6:h>=B?4:h>=C?2:0;W.done=true;G.scores[3]=[band,6];G.stage=4}}
  pracRender();
}

/* ============ EVENTS ============ */
view.addEventListener("click",e=>{
  const t=e.target.closest("[data-act]");if(!t||t.disabled||!G)return;const a=t.dataset.act,k=t.dataset.k;
  if(a==="again"){return route()}
  if(G.kind==="dash"||G.kind==="colour"){if(a==="mc")mcAnswer(+k);if(a==="mcnext")mcNext();return}
  if(G.kind==="fill")return fillAct(a,k);
  if(G.kind==="flame"){if(a==="cobalt")return;return flameAct(a,k,t)}
  if(G.kind==="prac")return pracAct(a,k);
  if(G.kind==="ionic")return ionicAct(a,k);
  if(G.kind==="shifter")return shifterAct(a,k);
  if(G.kind==="escape")return escapeAct(a,k);
  if(G.kind==="blitz")return blitzAct(a,k);
  if(G.kind==="dipole")return dipoleAct(a,k);
  if(RL_KINDS.includes(G.kind))return realmAct(a,k,t);
});
view.addEventListener("change",e=>{if(e.target.dataset&&e.target.dataset.act==="cobalt"&&G&&G.kind==="flame")flameAct("cobalt",null,e.target)});
view.addEventListener("input",e=>{if(e.target.id==="ans"&&G&&G.kind==="prac"){G.write.text=e.target.value;const c=e.target.parentNode.querySelector(".row .small");}});
document.addEventListener("keydown",e=>{
  if(!G||view.hidden)return;
  if((G.kind==="dash"||G.kind==="colour")&&!G.answered&&/^[1-4]$/.test(e.key)&&e.target.tagName!=="TEXTAREA"){const b=document.querySelectorAll('.opt[data-act="mc"]')[+e.key-1];b&&b.click()}
});

/* ============ ROUTER ============ */
function route(){
  stopTimer();if(typeof titStopFlow==="function")titStopFlow();G=null;
  const h=location.hash.slice(1);let m;
  const w=WORLDS.find(x=>x.hash===h);
  const show=hub=>{$("#hub").hidden=!hub;view.hidden=hub};
  if(w){show(false);renderWorld(w)}
  else if((m=h.match(/^(dash|fill)-(as1|as2|\d+-\d+)-(all|random)$/))&&(worldById(m[2])||topicById(m[2]))&&defsFor(m[2]).length){show(false);m[1]==="dash"?startDash(m[2],m[3]):startFill(m[2],m[3])}
  else if((m=h.match(/^colour-(as1|as2|\d+-\d+)$/))&&(worldById(m[1])||topicById(m[1]))&&obsFor(m[1]).length){show(false);startColour(m[1])}
  else if((m=h.match(/^notes-(\d+-\d+)$/))&&topicById(m[1])){show(false);renderNotes(m[1])}
  else if(h==="ionic"){show(false);startIonic()}
  else if(["shifter","escape","blitz","dipole"].includes(h)){show(false);({shifter:startShifter,escape:startEscape,blitz:startBlitz,dipole:startDipole})[h]()}
  else if((m=h.match(/^quiz-(as1|as2|\d+-\d+)$/))&&(worldById(m[1])||topicById(m[1]))&&qbFor(m[1]).length){show(false);startQuiz(m[1])}
  else if(h==="flame"||h==="flame-test"){show(false);startFlame(h==="flame-test"?"test":"explore")}
  else if((m=h.match(/^prac-([\w-]+)$/))&&PRACS.some(p=>p.id===m[1])){show(false);startPrac(m[1])}
  else if(realmRoute(h,show)){}
  else{show(true);renderHub()}
  window.scrollTo({top:0});
}
window.addEventListener("hashchange",route);
