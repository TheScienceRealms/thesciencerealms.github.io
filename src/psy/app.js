/* ============ HELPERS ============ */
const $=s=>document.querySelector(s);
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={get(k){try{return +localStorage.getItem("pv-"+k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem("pv-"+k,v)}catch(e){}}};
const starsOf=f=>{const n=f>=.9?3:f>=.6?2:f>=.3?1:0;return "★".repeat(n)+"☆".repeat(3-n)};
const AP_NAME={bio:"Biological",pd:"Psychodynamic",beh:"Behaviourist",cog:"Cognitive",pos:"Positive"};
const view=$("#view");
let G=null;
const unitOfTopic=t=>unitById(topicById(t).u);
const bestTxt=k=>{const b=store.get(k);return b?b+"%":""};
const MINI=`<a class="mini" href="#" aria-label="The Psycheverse home"><svg viewBox="0 0 40 32" aria-hidden="true"><path d="M8,17 C4,9 11,3 20,4 C29,3 36,9 32,17 C35,24 29,30 23,28 C21,31 19,31 17,28 C11,30 5,24 8,17 Z" fill="#ff9ad5" stroke="#fff" stroke-width="2"/><path d="M20,5 V28 M12,13 c3,-3 7,0 5,3 M28,12 c-3,0 -3,4 0,5" fill="none" stroke="#3b1a78" stroke-width="1.8" stroke-linecap="round"/></svg><span>The <i>Psyche</i>verse</span></a>`;
function frame(kicker,title,back,backLabel,body){
  view.innerHTML=`<div style="display:grid;gap:18px">${MINI}<div class="bar"><div><div class="kk">${esc(kicker)}</div><h2 class="gt">${esc(title)}</h2></div><a class="back" href="#${back}">← ${esc(backLabel)}</a></div>${body}</div>`;
}
function results(key,got,max,extra=""){
  const pct=max?Math.round(got/max*100):0,prev=store.get(key),best=pct>prev;if(best)store.set(key,pct);
  return `<div class="pop" style="display:grid;gap:14px"><div class="row" style="gap:28px;align-items:flex-end"><div><div class="big">${got}/${max}</div><div class="muted">${pct}% ${best?"· new best":"· best "+Math.max(prev,pct)+"%"}</div></div><div class="stars" style="font-size:30px">${starsOf(max?got/max:0)}</div></div>${extra}
  <div class="row"><button class="primary" data-act="again">Play again</button><a class="ghost" href="#${G.back}">Back to topics</a></div></div>`;
}
const act=(href,name,sub,key,cls="")=>`<a class="act ${cls}" href="#${href}"><span>${name}<small>${sub}</small></span><span class="sc">${key===null?"Read":bestTxt(key)||"Play"}</span></a>`;

/* ============ HUB AND UNITS ============ */
function renderHub(){
  UNITS.forEach(u=>{
    const ts=TOPICS.filter(t=>t.u===u.id);
    $(`#${u.id}-chips`).innerHTML=ts.map(t=>`<li>${esc(t.short)}</li>`).join("");
    const played=ts.filter(t=>store.get("quiz-"+t.id)>0).length;
    $(`#${u.id}-prog`).innerHTML=played?`Topic quizzes played: <b>${played}/${ts.length}</b>`:"All topics open. Start anywhere.";
  });
}
function topicActs(t){
  let a=act("notes-"+t.id,"Mind Notes","Key points and exam tips",null,"ff-act");
  if(QB.some(q=>q.t===t.id))a+=act("quiz-"+t.id,"Topic Quiz",QB.filter(q=>q.t===t.id).length+" WJEC-style questions","quiz-"+t.id);
  if(APS.includes(t.id)){
    THER.filter(x=>x.ap===t.id).forEach(x=>a+=act("sort-ther-"+x.id,"Therapy Lab: "+x.name,"Components, strengths, weaknesses","sort-ther-"+x.id));
    CASES.filter(c=>c.ap===t.id).forEach(c=>{a+=act("sort-case-"+c.id,"Case File: "+c.short,"Sort method to ethics","sort-case-"+c.id);a+=act("facts-"+c.id,"Fact Check: "+c.short,"Exact details","facts-"+c.id)});
  }
  if(t.id==="ex1"){a+=act("sort-arena","Approach Arena","Sort 30 ideas into the five approaches","sort-arena")+act("relate","Relationship Builder","Assumption → explanation","relate")+act("sort-cmd","Command Word Sort","AO1, AO2 or AO3?","sort-cmd")+act("cmdq","Describe vs Evaluate","Pick the answer that fits","cmdq")}
  if(t.id==="deb")DEBATES.forEach(d=>{a+=`<div class="debrow"><b>${esc(d.title)}</b><div class="row"><a class="mbtn" href="#sort-deb-${d.id}">Debate Arena</a><a class="mbtn" href="#essay-${d.id}">Model essay + 20/20 plan</a></div></div>`});
  if(t.id==="cls")CASES.filter(c=>c.u==="u2").forEach(c=>{a+=act("sort-case-"+c.id,"Case File: "+c.short,"Sort method to ethics","sort-case-"+c.id);a+=act("facts-"+c.id,"Fact Check: "+c.short,"Exact details","facts-"+c.id)});
  TRAITS.filter(x=>x.topic===t.id).forEach(x=>a+=act("sort-trait-"+x.id,x.title,x.sub,"sort-trait-"+x.id));
  if(t.id==="data")SDSETS.forEach((s,i)=>a+=act("sd-"+s.id,"Standard Deviation Lab "+(i+1),s.xs.length+" scores · step by step","sd-"+s.id));
  SCEN.filter(s=>s.topic===t.id).forEach(s=>a+=act("scen-"+s.id,s.title,s.title.startsWith("Ethics")?"Ethics Committee":"Novel scenario","scen-"+s.id));
  BUILD.filter(b=>b.t===t.id).forEach(b=>a+=act("build-"+b.id,"Answer Builder ["+b.marks+"]",b.q.slice(0,60)+(b.q.length>60?"…":""),"build-"+b.id));
  return a;
}
function renderUnit(u){
  const ts=TOPICS.filter(t=>t.u===u.id);
  const cards=ts.map((t,i)=>`<article class="tcard"><div class="thead"><span class="tcode">${u.id==="u1"?"1.":"2."}${i+1}</span><h3>${esc(t.name)}</h3></div><div class="acts">${topicActs(t)}</div></article>`).join("");
  const builds=BUILD.filter(b=>topicById(b.t).u===u.id);
  view.innerHTML=`<div style="display:grid;gap:18px" class="${u.cls}w">${MINI}<div class="bar"><div><div class="kk">${u.kick}</div><h2>${u.name}</h2></div><a class="back" href="#">← Both units</a></div>
  <p class="unitpaper">${esc(u.paper)}</p>
  <div class="wtop">
   <div class="panel"><h3>Mixed practice</h3>${act("quiz-"+u.id,"Unit "+u.id.slice(1)+" Bank","10 random multiple-choice questions","quiz-"+u.id)}${u.id==="u1"?act("sort-arena","Approach Arena","Which approach does it belong to?","sort-arena"):act("scen-music","Scenario Lab","Novel scenarios, Section B style","scen-music")}</div>
   <div class="panel"><h3>Exam technique</h3>${u.id==="u1"?act("sort-cmd","Command Word Sort","AO1, AO2 or AO3?","sort-cmd")+act("cmdq","Describe vs Evaluate","Pick the answer that fits","cmdq"):act("essay-condition","Debate essays","Five model essays and 20/20 plans",null)+act("sd-a","Standard Deviation Lab","Step-by-step, n − 1","sd-a")}<p class="small muted">${builds.length} Answer Builder questions are in the topics below.</p></div>
  </div>
  <div class="tgrid">${cards}</div></div>`;
}

/* ============ MULTIPLE-CHOICE ENGINE (quizzes, fact checks, scenarios) ============ */
// q: {q,a,w,exp} | {q,num,tol,exp} | {q,multi:[],w:[],exp}; optional ctx
function startMC(o){
  const qs=o.qs.map(q=>{
    if(q.num!==undefined)return Object.assign({type:"num"},q);
    if(q.multi){const opts=shuffle([...q.multi.map(t=>({t,ok:true})),...q.w.map(t=>({t,ok:false}))]);return Object.assign({type:"multi",opts},q)}
    const opts=shuffle([{t:q.a,ok:true},...q.w.map(t=>({t,ok:false}))]);return Object.assign({type:"mc",opts},q)});
  G={kind:"mc",key:o.key,back:o.back,qs,i:0,got:0,ctx:o.ctx,label:o.label||"Question"};
  frame(o.kicker,o.title,o.back,o.backLabel,`${o.ctx?`<div class="scenario"><b>Scenario</b><p>${esc(o.ctx)}</p></div>`:""}<section class="panel" id="g"></section>`);
  mcAsk();
}
function mcAsk(){
  const q=G.qs[G.i];G.answered=false;G.sel=new Set();
  let body;
  if(q.type==="num")body=`<div class="row"><input id="numin" inputmode="decimal" class="numin" aria-label="Your answer" placeholder="Answer"><button class="primary" data-act="numcheck">Check</button></div>`;
  else body=`<div class="opts">${q.opts.map((x,n)=>`<button class="opt" data-act="${q.type==="multi"?"mtog":"mc"}" data-k="${n}"><kbd>${q.type==="multi"?"☐":n+1}</kbd><span>${esc(x.t)}</span></button>`).join("")}</div>${q.type==="multi"?`<div class="row"><button class="primary" data-act="mcheck">Check</button><span class="small muted">Select all that apply.</span></div>`:""}`;
  $("#g").innerHTML=`<div class="hud"><span>${G.label} <strong>${G.i+1}</strong>/${G.qs.length}</span><span>Correct <strong>${G.got}</strong></span></div>
  <div class="qcard slidein">${q.ctx?`<small>${esc(q.ctx)}</small>`:""}${esc(q.q)}</div>${body}<div id="after"></div>`;
  const n=$("#numin");if(n)n.focus();
}
function mcFeedback(ok,extra=""){
  const q=G.qs[G.i],last=G.i===G.qs.length-1;if(ok)G.got++;
  $("#after").innerHTML=`<div class="explain pop ${ok?"ok":"bad"}"><b>${ok?"Correct":"Not quite"}</b>${extra}${q.exp?`<span>${esc(q.exp)}</span>`:""}</div><div class="row" style="margin-top:12px"><button class="primary" id="nx" data-act="mcnext">${last?"See results":"Next"}</button></div>`;
  $("#nx").focus();
}
function mcAct(a,k){
  const q=G.qs[G.i];
  if(a==="mcnext"){G.i++;if(G.i<G.qs.length)return mcAsk();return $("#g").innerHTML=results(G.key,G.got,G.qs.length)}
  if(G.answered)return;
  if(a==="mc"){G.answered=true;const ok=q.opts[+k].ok;document.querySelectorAll('.opt').forEach((b,n)=>{b.disabled=true;if(q.opts[n].ok)b.classList.add("right");else if(n===+k)b.classList.add("wrong")});mcFeedback(ok,ok?"":`<span>Answer: ${esc(q.a)}</span>`)}
  if(a==="mtog"){const n=+k;G.sel.has(n)?G.sel.delete(n):G.sel.add(n);document.querySelectorAll('.opt').forEach((b,i)=>{b.classList.toggle("on",G.sel.has(i));b.querySelector("kbd").textContent=G.sel.has(i)?"☑":"☐"})}
  if(a==="mcheck"){G.answered=true;let ok=true;document.querySelectorAll('.opt').forEach((b,n)=>{b.disabled=true;const s=G.sel.has(n),c=q.opts[n].ok;if(c)b.classList.add(s?"right":"missed");else if(s){b.classList.add("wrong")}if(s!==c)ok=false});mcFeedback(ok,ok?"":`<span>Dashed outlines show the ones you missed.</span>`)}
  if(a==="numcheck"){const v=parseFloat(($("#numin").value||"").replace(/[^\d.\-]/g,""));if(isNaN(v))return;G.answered=true;$("#numin").disabled=true;const ok=Math.abs(v-q.num)<=(q.tol||0.01);mcFeedback(ok,ok?"":`<span>Answer: ${q.num}</span>`)}
}

/* ============ SORTER ENGINE ============ */
function startSort(o){
  G={kind:"sort",key:o.key,back:o.back,rounds:o.rounds,ri:0,got:0,max:0};
  frame(o.kicker,o.title,o.back,o.backLabel,`${o.intro?`<p class="intro">${o.intro}</p>`:""}<section class="panel" id="g"></section>`);
  sortBegin();
}
function sortBegin(){const R=G.rounds[G.ri];G.r={items:shuffle(R.items).map((x,i)=>({id:i,t:x[0],bin:x[1],at:null})),sel:null,checked:false,anim:false};sortRender()}
function sortRender(){
  const R=G.rounds[G.ri],r=G.r,pool=r.items.filter(x=>x.at===null);
  const chip=x=>`<button class="chipm ${r.checked?(x.at===x.bin?"right":"wrong"):""} ${r.sel===x.id?"on":""}" data-act="${r.checked?"":"chip"}" data-k="${x.id}" ${r.checked?"disabled":""}>${esc(x.t)}${r.checked&&x.at!==x.bin?`<em>→ ${esc(R.bins.find(b=>b[0]===x.bin)[1])}</em>`:""}</button>`;
  $("#g").innerHTML=`<div class="hud">${G.rounds.length>1?`<span>Round <strong>${G.ri+1}</strong>/${G.rounds.length}</span>`:""}<span>Placed <strong>${r.items.length-pool.length}</strong>/${r.items.length}</span><span>Correct so far <strong>${G.got}</strong>/${G.max}</span></div>
  ${R.name?`<h3>${esc(R.name)}</h3>`:""}${R.sub?`<p class="small muted">${esc(R.sub)}</p>`:""}
  ${r.checked?"":`<div class="pool ${r.anim?"":"slidein"}">${pool.length?pool.map(chip).join(""):`<span class="small muted">All placed. Check your answers.</span>`}</div><p class="small muted">Tap a card, then tap the box it belongs in. Tap a placed card to send it back.</p>`}
  <div class="bins">${R.bins.map(([id,label])=>`<div class="bin ${r.sel!==null&&!r.checked?"ready":""}" role="button" tabindex="0" data-act="${r.checked?"":"bin"}" data-k="${id}"><b>${esc(label)}</b><span>${r.items.filter(x=>x.at===id).map(chip).join("")}</span></div>`).join("")}</div>
  ${r.checked?`<div class="explain pop ${r.score===r.items.length?"ok":"bad"}"><b>${r.score}/${r.items.length} in the right place</b>${r.score<r.items.length?"<span>Red cards show where they really belong.</span>":""}</div><div class="row"><button class="primary" id="nx" data-act="snext">${G.ri===G.rounds.length-1?"See results":"Next round"}</button></div>`:`<div class="row"><button class="primary" data-act="scheck" ${pool.length?"disabled":""}>Check</button></div>`}`;
  r.anim=true;const n=$("#nx");if(n)n.focus();
}
function sortAct(a,k,e){
  const r=G.r;
  if(a==="snext"){G.ri++;if(G.ri<G.rounds.length)return sortBegin();return $("#g").innerHTML=results(G.key,G.got,G.max)}
  if(r.checked)return;
  if(a==="chip"){const x=r.items[+k];if(x.at!==null&&r.sel!==null&&r.sel!==x.id){r.items[r.sel].at=x.at;r.sel=null}else if(x.at!==null){x.at=null;r.sel=null}else r.sel=r.sel===x.id?null:x.id;e.stopPropagation()}
  else if(a==="bin"){if(r.sel!==null){r.items[r.sel].at=k;r.sel=null}}
  else if(a==="scheck"){r.checked=true;r.score=r.items.filter(x=>x.at===x.bin).length;G.got+=r.score;G.max+=r.items.length}
  sortRender();
}
function sortDef(id){
  let m;
  if(id==="arena"){const it=shuffle(ARENA);const bins=APS.map(a=>[a,AP_NAME[a]]);return {kicker:"Unit 1 exam skills",title:"Approach Arena",back:"theoretical-frontier",backLabel:"Unit 1",intro:"Assumptions, therapies, studies and key terms are all mixed up. Send each one to its approach.",rounds:[0,1,2].map(i=>({name:"Round "+(i+1),bins,items:it.slice(i*10,i*10+10)}))}}
  if(id==="cmd")return {kicker:"Unit 1 exam skills",title:CMD_SORT.title,back:"theoretical-frontier",backLabel:"Unit 1",intro:"Read the command word first. It tells you which skill (assessment objective) is being marked.",rounds:[{sub:CMD_SORT.sub,bins:CMD_SORT.bins,items:CMD_SORT.items}]};
  if((m=id.match(/^ther-(\w+)$/))){const t=THER.find(x=>x.id===m[1]);if(!t)return null;return {kicker:AP_NAME[t.ap]+" approach · Therapy Lab",title:t.name,back:"theoretical-frontier",backLabel:"Unit 1",intro:"Sort each card: is it a <b>main component</b> (describe questions) or <b>evaluation</b> (strength or weakness)?",rounds:[{bins:[["comp","Main component"],["str","Strength"],["weak","Weakness"]],items:t.items}]}}
  if((m=id.match(/^case-(\w+)$/))){const c=CASES.find(x=>x.id===m[1]);if(!c)return null;const it=shuffle(c.sort),h=Math.ceil(it.length/2);const u=unitById(c.u);return {kicker:"Case File",title:c.title,back:u.hash,backLabel:"Unit "+u.id.slice(1),intro:"<b>Aim:</b> "+esc(c.aim),rounds:[{name:"Part 1",bins:CASE_BINS,items:it.slice(0,h)},{name:"Part 2",bins:CASE_BINS,items:it.slice(h)}]}}
  if((m=id.match(/^deb-(\w+)$/))){const d=DEBATES.find(x=>x.id===m[1]);if(!d)return null;return {kicker:"Contemporary debate · Debate Arena",title:d.title,back:"research-frontier",backLabel:"Unit 2",intro:esc(d.core),rounds:[{name:"Round 1: pick a side",sub:"Which side of the debate does each argument support?",bins:[["A",d.sideA],["B",d.sideB]],items:d.args},{name:"Round 2: implications",sub:"WJEC wants ethical, economic and social implications.",bins:[["eth","Ethical"],["eco","Economic"],["soc","Social"]],items:d.imps}]}}
  if((m=id.match(/^trait-(\w+)$/))){const t=TRAITS.find(x=>x.id===m[1]);if(!t)return null;return {kicker:topicById(t.topic).name,title:t.title,back:"research-frontier",backLabel:"Unit 2",rounds:[{sub:t.sub,bins:t.bins,items:t.items}]}}
  return null;
}

/* ============ ANSWER BUILDER ============ */
const LEVELS=[[.8,"Well detailed, accurate, with effective use of terminology"],[.55,"Reasonably detailed and mostly accurate, with appropriate terminology"],[.3,"Basic or limited detail, some accuracy"],[.01,"Superficial, with little relevant detail"],[0,"No creditworthy material"]];
function startBuild(id){
  const B=BUILD.find(b=>b.id===id),u=unitOfTopic(B.t);
  G={kind:"build",key:"build-"+id,back:u.hash,B,stage:0,plan:{sel:new Set(),checked:false,opts:shuffle([...B.points.map((p,i)=>({t:p[0],ok:true,i})),...B.decoys.map(d=>({t:d[0],ok:false,why:d[1]}))])},write:{text:"",ticks:new Set(),marked:false,done:false},scores:[0,0]};
  frame(topicById(B.t).name+" · Answer Builder",B.cmd+" ["+B.marks+" marks]",u.hash,"Unit "+u.id.slice(1),`<div class="qbox"><span class="cw">${esc(B.cmd)}</span> ${esc(B.q)} <b>[${B.marks}]</b></div><section class="panel" id="g"></section>`);
  buildRender();
}
function buildRender(){
  const B=G.B,P=G.plan,W=G.write,st=["Plan","Write","Model answer"];
  let h=`<div class="stages">${st.map((s,i)=>`<span class="stg ${i===G.stage?"on":i<G.stage?"done":""}">${i+1}. ${s}</span>`).join("")}</div>`;
  if(G.stage===0){
    h+=`<p>The command word is <b>${esc(B.cmd)}</b>. Pick the points that answer <i>this</i> question. Some are traps: evaluation in a describe question, or the wrong approach.</p>
    <div class="kit">${P.opts.map((o,n)=>`<button class="kitbtn ${P.checked?(o.ok&&P.sel.has(n)?"right":!o.ok&&P.sel.has(n)?"wrong":o.ok?"missed":""):P.sel.has(n)?"on":""}" data-act="ptog" data-k="${n}" ${P.checked?"disabled":""}>${esc(o.t)}${P.checked&&!o.ok?`<small>${esc(o.why)}</small>`:""}</button>`).join("")}</div>
    ${P.checked?`<div class="explain ${P.score===P.opts.length?"ok":"bad"}"><b>${P.score}/${P.opts.length} decisions right</b><span>Green = relevant and chosen. Dashed = relevant but missed. Red = a trap.</span></div><div class="row"><button class="primary" id="nx" data-act="bnext">Now write it →</button></div>`:`<div class="row"><button class="primary" data-act="pcheck" ${P.sel.size?"":"disabled"}>Check plan</button></div>`}`;
  } else if(G.stage===1){
    h+=`<p>Write your answer in full sentences, then mark it against the indicative content. Aim for about ${B.marks*25} words.</p><textarea id="ans" aria-label="Your answer" ${W.marked?"disabled":""}>${esc(W.text)}</textarea>`;
    if(!W.marked)h+=`<div class="row"><button class="primary" data-act="wmark">Mark my answer</button><span class="small muted">Key words are spotted automatically. You can adjust the ticks.</span></div>`;
    else{
      const r=W.ticks.size/B.points.length,lv=LEVELS.find(l=>r>=l[0]),est=Math.round(r*B.marks);
      h+=`<p class="small muted">Tick each point your answer makes clearly. Be honest: examiners credit detail and accuracy, not just the word.</p><div class="acts">${B.points.map((p,i)=>`<button class="check ${W.ticks.has(i)?"on":""}" data-act="wtick" data-k="${i}" ${W.done?"disabled":""}><span class="box">${W.ticks.has(i)?"✓":""}</span><span>${esc(p[0])}</span></button>`).join("")}</div>
      <table class="bandtable"><tr><th>WJEC-style level</th></tr>${LEVELS.slice(0,4).map(l=>`<tr class="${l===lv?"hit":""}"><td>${l[1]}</td></tr>`).join("")}</table>
      <div class="explain"><b>Estimated mark: ${est}/${B.marks}</b><span>${esc(lv[1])}.</span></div>
      <div class="row">${W.done?`<button class="primary" id="nx" data-act="bnext">See model answer →</button>`:`<button class="ghost" data-act="wedit">Edit answer</button><button class="primary" data-act="wdone">Confirm mark</button>`}</div>`;
    }
  } else {
    h+=`<div class="model"><b>Model answer</b><p>${esc(B.model)}</p></div><div class="explain"><b>Plan ${G.scores[0]}/${P.opts.length} · Answer ${G.scores[1]}/${B.marks}</b><span>Compare your answer with the model. Look for terms you could add.</span></div><div class="row"><button class="primary" id="nx" data-act="bnext">See results</button></div>`;
  }
  $("#g").innerHTML=h;const n=$("#nx");if(n)n.focus();
}
function buildAct(a,k){
  const B=G.B,P=G.plan,W=G.write;
  if(a==="bnext"){if(G.stage<2){G.stage++;return buildRender()}return $("#g").innerHTML=results(G.key,G.scores[0]+G.scores[1],P.opts.length+B.marks,`<p class="muted">Plan ${G.scores[0]}/${P.opts.length} · Answer ${G.scores[1]}/${B.marks}</p>`)}
  if(G.stage===0&&!P.checked){
    if(a==="ptog"){const n=+k;P.sel.has(n)?P.sel.delete(n):P.sel.add(n)}
    if(a==="pcheck"){P.checked=true;P.score=P.opts.filter((o,n)=>o.ok===P.sel.has(n)).length;G.scores[0]=P.score}
  }
  if(G.stage===1){
    if(a==="wmark"){W.text=($("#ans")||{}).value||W.text;if(!W.text.trim())return;W.marked=true;W.ticks=new Set(B.points.map((p,i)=>new RegExp(p[1],"i").test(W.text)?i:-1).filter(i=>i>=0))}
    if(a==="wtick"&&!W.done){const i=+k;W.ticks.has(i)?W.ticks.delete(i):W.ticks.add(i)}
    if(a==="wedit"){W.marked=false}
    if(a==="wdone"){W.done=true;G.scores[1]=Math.round(W.ticks.size/B.points.length*B.marks)}
  }
  buildRender();
}

/* ============ STANDARD DEVIATION LAB ============ */
const r2=x=>Math.round(x*100)/100;
function startSD(id){
  const S=SDSETS.find(s=>s.id===id),xs=S.xs,n=xs.length,mean=xs.reduce((a,b)=>a+b,0)/n,dev=xs.map(x=>x-mean),sq=dev.map(d=>d*d),tot=sq.reduce((a,b)=>a+b,0),sd=Math.sqrt(tot/(n-1));
  G={kind:"sd",key:"sd-"+id,back:"research-frontier",S,n,mean,dev,sq,tot,sd,step:0,marks:0,fb:"",shown:false};
  frame("Levels of measurement, graphs and statistics","Standard Deviation Lab","research-frontier","Unit 2",`<div class="scenario"><b>${esc(S.ctx)}</b><p class="mono">${xs.join(", ")}</p><p class="small">s = √( Σ(x − x̄)² ÷ (n − 1) ) · WJEC gives a mark for each step.</p></div><section class="panel" id="g"></section>`);
  sdRender();
}
function sdRender(){
  const g=G,st=["Mean (x̄)","x − x̄","(x − x̄)²","Σ(x − x̄)²","Standard deviation"];
  const showDev=g.step>1||(g.step===1&&g.shown),showSq=g.step>2||(g.step===2&&g.shown);
  const cell=(i,col)=>{if(col==="d"){if(showDev)return r2(g.dev[i]);if(g.step===1)return `<input class="numin sm" data-i="${i}" inputmode="decimal" aria-label="x minus mean for row ${i+1}">`;return ""}
    if(showSq)return r2(g.sq[i]);if(g.step===2)return `<input class="numin sm" data-i="${i}" inputmode="decimal" aria-label="squared deviation for row ${i+1}">`;return ""};
  let h=`<div class="stages">${st.map((s,i)=>`<span class="stg ${i===g.step?"on":i<g.step?"done":""}">${s}</span>`).join("")}</div>
  <div class="tblwrap"><table class="bandtable sdt"><tr><th>x</th><th>x − x̄</th><th>(x − x̄)²</th></tr>${g.S.xs.map((x,i)=>`<tr><td>${x}</td><td>${cell(i,"d")}</td><td>${cell(i,"s")}</td></tr>`).join("")}<tr><th>n = ${g.n}${g.step>0?` · x̄ = ${r2(g.mean)}`:""}</th><th></th><th>${g.step>3||(g.step===3&&g.shown)?"Σ = "+r2(g.tot):""}</th></tr></table></div>`;
  if(g.step<5){
    const prompt=["Calculate the mean.","Fill in x − x̄ for every score.","Square each deviation.","Add up the squared deviations.","Divide the total by n − 1, then square root. Give your answer to 2 decimal places."][g.step];
    h+=`<p><b>Step ${g.step+1}:</b> ${prompt}</p>`;
    if(!g.shown)h+=`<div class="row">${g.step===0||g.step>=3?`<input id="numin" class="numin" inputmode="decimal" aria-label="Your answer">`:""}<button class="primary" data-act="sdcheck">Check</button></div>`;
    else h+=`<div class="explain pop ${g.fbok?"ok":"bad"}"><b>${g.fbok?"Correct · +1 mark":"Not quite"}</b><span>${g.fb}</span></div><div class="row"><button class="primary" id="nx" data-act="sdnext">${g.step===4?"See results":"Next step"}</button></div>`;
  }
  $("#g").innerHTML=h;const f=$("#nx")||$("#numin")||document.querySelector(".numin");if(f)f.focus();
}
function sdAct(a){
  const g=G,num=v=>parseFloat(String(v).replace(/[^\d.\-]/g,""));
  if(a==="sdnext"){if(g.step===4)return $("#g").innerHTML=results(g.key,g.marks,5,`<p class="muted">s = ${r2(g.sd).toFixed(2)}</p>`);g.step++;g.shown=false;return sdRender()}
  if(a!=="sdcheck"||g.shown)return;
  let ok=false,fb="";
  if(g.step===0){const v=num($("#numin").value);if(isNaN(v))return;ok=Math.abs(v-g.mean)<.01;fb=`x̄ = ${g.S.xs.join(" + ")} = ${g.S.xs.reduce((a,b)=>a+b,0)}, ÷ ${g.n} = ${r2(g.mean)}`}
  else if(g.step===1||g.step===2){const ins=[...document.querySelectorAll(".numin.sm")];if(ins.some(i=>i.value.trim()===""))return;const ref=g.step===1?g.dev:g.sq;ok=ins.every((i,n)=>Math.abs(num(i.value)-ref[n])<.01);fb=g.step===1?"Subtract the mean from each score. Negative values are fine.":"Squaring removes the minus signs, so every value is positive."}
  else if(g.step===3){const v=num($("#numin").value);if(isNaN(v))return;ok=Math.abs(v-g.tot)<.01;fb=`Σ(x − x̄)² = ${g.sq.map(r2).join(" + ")} = ${r2(g.tot)}`}
  else{const v=num($("#numin").value);if(isNaN(v))return;ok=Math.abs(v-g.sd)<.006;fb=`${r2(g.tot)} ÷ ${g.n-1} = ${r2(g.tot/(g.n-1))}; √${r2(g.tot/(g.n-1))} = ${g.sd.toFixed(2)}. ${Math.abs(v-Math.sqrt(g.tot/g.n))<.006?"You divided by n, not n − 1.":""}`}
  if(ok)g.marks++;g.fbok=ok;g.fb=fb;g.shown=true;sdRender();
}

/* ============ NOTES AND ESSAYS ============ */
function planHTML(id){
  const P=PLANS[id];if(!P)return "";
  const side={for:"FOR",against:"AGAINST",extra:"EXTRA"};
  return `<div class="plan"><div class="planhead"><b>Possible conclusion</b><p>“${esc(P.con)}”</p></div>
  <div class="pcard"><h4>AO1 intro</h4><ul>${P.intro.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
  ${P.args.map((a,i)=>`<div class="pcard ${a.side}"><span class="side">${side[a.side]}</span><h4>${i+1}. ${esc(a.title)}</h4><ul>${a.points.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>${a.evidence?`<p class="lab">Research support</p><ul>${a.evidence.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}<p class="lab">AO3 evaluation</p><ul class="ao3">${a.eval.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}
  <div class="pcard killer"><h4>Killer conclusion</h4><ul>${P.killer.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`;
}
function exemplarHTML(E){
  const body=E.sections?E.sections.map(([h,p])=>`<h4>${esc(h)}</h4><p>${esc(p)}</p>`).join(""):E.text.map(p=>`<p>${esc(p)}</p>`).join("");
  return `<details class="exm"><summary><span>${esc(E.title)}</span><b>${esc(E.mark)}</b></summary><div class="exbody">${body}</div>
  <div class="fbgrid"><div class="fb good"><h4>What it does well</h4><ul>${E.good.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div class="fb lost"><h4>${E.id==="studentB"?"Why it lost 2 marks":"What pushes it to a definite 20"}</h4><ul>${E.lost.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div></details>`;
}
function tipsHTML(){
  const T=DEB_TIPS;
  return `<div class="ffgrid"><div class="panel"><h3>Safe 20/20 structure</h3><ol class="kp">${T.structure.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><p class="small">${esc(T.note)}</p></div>
  <div class="panel"><h3>30-minute strategy</h3><div class="timing">${T.timing.map(([m,t])=>`<div><b>${m}</b><span>${esc(t)}</span></div>`).join("")}</div><p class="small"><b>Golden rule:</b> ${esc(T.golden)}</p></div>
  <div class="panel"><h3>To hit the top band, always</h3><ul class="kp">${T.always.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="small"><b>Terms to drop in:</b> ${T.terms.join(", ")}</p></div>
  <div class="panel"><h3>Phrases examiners love</h3><ul class="kp">${T.phrases.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`;
}
function renderNotes(tid){
  const t=topicById(tid),N=NOTES[tid],u=unitById(t.u);
  let extra="";
  if(tid==="deb"){
    extra=`<h3 class="sech">Exam technique for the 20-mark essay</h3>${tipsHTML()}<h3 class="sech">20/20 plans for every debate</h3>${DEBATES.map(d=>`<details class="exm"><summary><span>${esc(d.title)}</span><b>20/20 plan</b></summary>${planHTML(d.id)}<div class="row" style="margin-top:10px"><a class="mbtn" href="#essay-${d.id}">Read the full model essay</a><a class="mbtn" href="#sort-deb-${d.id}">Debate Arena</a></div></details>`).join("")}<h3 class="sech">Exemplar answers</h3>${EXEMPLARS.map(exemplarHTML).join("")}`;
  }
  frame(u.kick+" · Mind Notes",t.name,u.hash,"Unit "+u.id.slice(1),`<div class="panel notelead"><p>${esc(N.lead)}</p></div><div class="ffgrid">${N.cards.map(([h,bs])=>`<div class="panel"><h3>${esc(h)}</h3><ul class="kp">${bs.map(b=>`<li>${b}</li>`).join("")}</ul></div>`).join("")}</div>
  ${N.tips?`<div class="panel tipbox"><h3>Exam tips</h3><ul class="kp">${N.tips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}${extra}
  <div class="row"><a class="primary" href="#quiz-${tid}" style="text-decoration:none">Test yourself: Topic Quiz →</a></div>`);
}
function renderEssay(id){
  const d=DEBATES.find(x=>x.id===id),ex=EXEMPLARS.filter(e=>e.deb===id);
  const nav=DEBATES.map(x=>`<a class="mbtn ${x.id===id?"cur":""}" href="#essay-${x.id}">${esc(x.title.split(" ").slice(0,4).join(" "))}${x.title.split(" ").length>4?"…":""}</a>`).join("");
  frame("Contemporary debate · Model essay",d.title,"research-frontier","Unit 2",`<div class="row">${nav}</div>
  <div class="panel"><p class="small muted">A model 20-mark answer. Each paragraph is labelled so you can see the structure: intro, both sides with named evidence, implications, conclusion.</p>
  <article class="essay">${d.essay.map(([h,p])=>`<section><h4>${esc(h)}</h4><p>${esc(p)}</p></section>`).join("")}</article></div>
  <h3 class="sech">Your 20/20 plan</h3>${planHTML(id)}
  ${ex.length?`<h3 class="sech">Exemplar answer</h3>${ex.map(exemplarHTML).join("")}`:""}
  <div class="row"><a class="primary" href="#sort-deb-${id}" style="text-decoration:none">Practise: Debate Arena →</a></div>`);
}

/* ============ EVENTS ============ */
view.addEventListener("click",e=>{
  const t=e.target.closest("[data-act]");if(!t||t.disabled||!G)return;const a=t.dataset.act,k=t.dataset.k;if(!a)return;
  if(a==="again")return route();
  if(G.kind==="mc")return mcAct(a,k);
  if(G.kind==="sort")return sortAct(a,k,e);
  if(G.kind==="build")return buildAct(a,k);
  if(G.kind==="sd")return sdAct(a);
});
view.addEventListener("input",e=>{if(e.target.id==="ans"&&G&&G.kind==="build")G.write.text=e.target.value});
document.addEventListener("keydown",e=>{
  if(!G||view.hidden)return;
  if((e.key==="Enter"||e.key===" ")&&e.target.classList&&e.target.classList.contains("bin")){e.preventDefault();e.target.click();return}
  if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("numin")){const b=document.querySelector('[data-act="numcheck"],[data-act="sdcheck"]');b&&b.click();return}
  if(G.kind==="mc"&&!G.answered&&/^[1-4]$/.test(e.key)&&e.target.tagName!=="INPUT"){const b=document.querySelectorAll('.opt[data-act="mc"]')[+e.key-1];b&&b.click()}
});

/* ============ ROUTER ============ */
function route(){
  G=null;const h=location.hash.slice(1);let m,ok=true;
  const show=hub=>{$("#hub").hidden=!hub;view.hidden=hub};
  const u=UNITS.find(x=>x.hash===h);
  if(u){show(false);renderUnit(u)}
  else if((m=h.match(/^notes-(\w+)$/))&&NOTES[m[1]]&&topicById(m[1])){show(false);renderNotes(m[1])}
  else if((m=h.match(/^quiz-(\w+)$/))&&(unitById(m[1])||topicById(m[1]))){
    const U=unitById(m[1]),T=topicById(m[1]),pool=U?QB.filter(q=>topicById(q.t).u===U.id):QB.filter(q=>q.t===m[1]);
    if(!pool.length)ok=false;else{const back=U||unitById(T.u);show(false);startMC({key:"quiz-"+m[1],kicker:U?U.kick:back.kick,title:U?"Unit "+U.id.slice(1)+" Bank":T.name+": Topic Quiz",back:back.hash,backLabel:"Unit "+back.id.slice(1),qs:shuffle(pool).slice(0,10)})}}
  else if((m=h.match(/^sort-([\w-]+)$/))&&sortDef(m[1])){const d=sortDef(m[1]);show(false);startSort(Object.assign({key:"sort-"+m[1]},d))}
  else if((m=h.match(/^facts-(\w+)$/))&&CASES.some(c=>c.id===m[1])){const c=CASES.find(x=>x.id===m[1]),U=unitById(c.u);show(false);startMC({key:"facts-"+c.id,kicker:"Fact Check",title:c.short,back:U.hash,backLabel:"Unit "+U.id.slice(1),qs:shuffle(c.facts.map(f=>({q:f[0],a:f[1],w:f[2]})))})}
  else if(h==="relate"){show(false);const qs=RELS.map(r=>({q:`Which explanation of relationship formation applies the ${AP_NAME[r[0]].toLowerCase()} assumption ‘${r[1]}’?`,a:r[2],w:shuffle(RELS.filter(x=>x[0]!==r[0])).slice(0,3).map(x=>x[2]),exp:"Name the assumption, then apply it to how two people come together."}));startMC({key:"relate",kicker:"Unit 1 exam skills",title:"Relationship Builder",back:"theoretical-frontier",backLabel:"Unit 1",qs:[...shuffle(qs),...REL_RULES]})}
  else if(h==="cmdq"){show(false);startMC({key:"cmdq",kicker:"Unit 1 exam skills",title:"Describe vs Evaluate",back:"theoretical-frontier",backLabel:"Unit 1",qs:shuffle(CMD_MC)})}
  else if((m=h.match(/^build-([\w-]+)$/))&&BUILD.some(b=>b.id===m[1])){show(false);startBuild(m[1])}
  else if((m=h.match(/^scen-(\w+)$/))&&SCEN.some(s=>s.id===m[1])){const s=SCEN.find(x=>x.id===m[1]),U=unitById("u2");show(false);startMC({key:"scen-"+s.id,kicker:s.title.startsWith("Ethics")?"Ethics Committee":"Scenario Lab",title:s.title,back:U.hash,backLabel:"Unit 2",ctx:s.text,qs:s.qs});
    const others=SCEN.filter(x=>x.id!==s.id);$("#g").insertAdjacentHTML("afterend",`<div class="row small">More scenarios: ${others.map(x=>`<a class="mbtn" href="#scen-${x.id}">${esc(x.title)}</a>`).join("")}</div>`)}
  else if((m=h.match(/^sd-(\w+)$/))&&SDSETS.some(s=>s.id===m[1])){show(false);startSD(m[1])}
  else if((m=h.match(/^essay-(\w+)$/))&&DEBATES.some(d=>d.id===m[1])){show(false);renderEssay(m[1])}
  else ok=false;
  if(!ok){show(true);renderHub()}
  window.scrollTo({top:0});
}
window.addEventListener("hashchange",route);
