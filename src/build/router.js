/* ================= Worlds, hub and routing ================= */
let lastWorld=null;
const escH=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const starsOf=f=>{const n=f>=1?3:f>=.67?2:f>=.34?1:0;return "★".repeat(n)+"☆".repeat(3-n)};
const worldById=id=>WORLDS.find(w=>w.id===id);
function topicPlayed(t){return Run.best(t.id)>0||t.lab.some(id=>Lab.best(id)>0)}

function topicCard(t){
  const qb=Run.best(t.id);
  return `<article class="tcard"><div class="thead"><span class="tcode">${t.code}</span><h3>${escH(t.name)}</h3></div>
  <p class="tsum">${escH(t.sum)}</p>
  <div class="acts"><a class="act" href="#run-${t.id}"><span>Slide Run quiz<small>${Run.count(t.id)} questions · 20 s each</small></span><span class="sc">${qb?qb+"%":"Play"}</span></a>
  ${t.lab.map(id=>{const p=Lab.P.find(x=>x.id===id),b=Lab.best(id);return `<a class="act" href="#lab-${id}"><span>${escH(p.title)}<small>Slide Lab · ${p.kind}</small></span><span class="sc">${b?starsOf(b/100):"Play"}</span></a>`}).join("")}</div></article>`;
}
function worldHTML(w){
  const ts=TOPICS.filter(t=>t.w===w.id),b=Run.best(w.id),done=ts.filter(topicPlayed).length;
  return `<div style="display:grid;gap:18px">
  <div class="gamebar"><div><div class="kicker">${w.num} · ${w.unit} ${w.full}</div><h2>${w.name}</h2></div><a class="home-link" href="#">← <b>Quiztoplasm</b></a></div>
  <div class="wq"><div class="copy"><b>World quiz</b><span class="muted">12 questions from every ${w.unit} topic. ${done}/${ts.length} topics played so far.</span></div><a class="play" href="#run-${w.id}">Play world quiz${b?` · best ${b}%`:""}</a></div>
  <div class="wgrid">${ts.map(topicCard).join("")}</div></div>`;
}
function renderHub(){
  WORLDS.forEach(w=>{
    const ts=TOPICS.filter(t=>t.w===w.id),done=ts.filter(topicPlayed).length;
    $$(`#${w.id}-preview`).innerHTML=Lab.thumb(w.id==="w1"?"cell-label":"heart-label");
    $$(`#${w.id}-topics`).innerHTML=ts.map(t=>`<li><span class="tcode sm">${t.code}</span>${escH(t.name)}</li>`).join("");
    $$(`#${w.id}-best`).innerHTML=done?`Topics played: <b>${done}/${ts.length}</b>`:"Not started yet";
  });
}
function setBack(id,w){const a=$$("#"+id),ww=worldById(w);a.href="#"+ww.hash;a.innerHTML=`← <b>${ww.num}</b>`}
function goBack(){location.hash=worldById(lastWorld||"w1").hash}

function route(){
  const h=location.hash.slice(1);
  Run.stop();
  const show=id=>["hub","worldwrap","runwrap","labwrap"].forEach(x=>{$$("#"+x).hidden=x!==id});
  const w=WORLDS.find(x=>x.hash===h);
  if(w){lastWorld=w.id;show("worldwrap");$$("#worldwrap").innerHTML=worldHTML(w)}
  else if(h.startsWith("run-")&&(topicById[h.slice(4)]||worldById(h.slice(4)))){
    const sc=h.slice(4);lastWorld=Run.worldOf(sc);setBack("run-back",lastWorld);show("runwrap");Run.start(sc)}
  else if(h.startsWith("lab-")&&Lab.P.some(p=>p.id===h.slice(4))){
    const id=h.slice(4);if(!lastWorld||!TOPICS.some(t=>t.w===lastWorld&&t.lab.includes(id)))lastWorld=TOPICS.find(t=>t.lab.includes(id)).w;
    setBack("lab-back",lastWorld);show("labwrap");Lab.open(id)}
  else{show("hub");renderHub()}
  window.scrollTo({top:0});
}
window.addEventListener("hashchange",route);
route();
