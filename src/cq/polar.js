/* ============ DIPOLE DETECTIVE (polarity) ============ */
const EN={H:2.1,Be:1.5,B:2.0,C:2.5,N:3.0,O:3.5,F:4.0,P:2.1,S:2.5,Cl:3.0};
// k: "pp" polar bonds & polar molecule, "pn" polar bonds but non-polar molecule, "nn" non-polar bonds & molecule
const PMOLS=[
 {f:"H₂",c:"H",xs:["H"],bp:1,lp:0,k:"nn"},{f:"Cl₂",c:"Cl",xs:["Cl"],bp:1,lp:0,k:"nn"},
 {f:"HCl",c:"H",xs:["Cl"],bp:1,lp:0,k:"pp"},{f:"H₂O",c:"O",xs:["H","H"],bp:2,lp:2,k:"pp"},
 {f:"NH₃",c:"N",xs:["H","H","H"],bp:3,lp:1,k:"pp"},{f:"CO₂",c:"C",xs:["O","O"],bp:2,lp:0,k:"pn"},
 {f:"BF₃",c:"B",xs:["F","F","F"],bp:3,lp:0,k:"pn"},{f:"CCl₄",c:"C",xs:["Cl","Cl","Cl","Cl"],bp:4,lp:0,k:"pn"},
 {f:"CHCl₃",c:"C",xs:["H","Cl","Cl","Cl"],bp:4,lp:0,k:"pp",note:"Same tetrahedral shape as CCl₄, but the C–H bond is different, so it is not symmetrical."},
 {f:"BeCl₂",c:"Be",xs:["Cl","Cl"],bp:2,lp:0,k:"pn"},{f:"SF₆",c:"S",xs:["F","F","F","F","F","F"],bp:6,lp:0,k:"pn"},
 {f:"ClF₃",c:"Cl",xs:["F","F","F"],bp:3,lp:2,k:"pp",note:"T-shaped, so the dipoles do not cancel."}];
const PCAT={pp:"Polar bonds, polar molecule",pn:"Polar bonds, non-polar molecule",nn:"Non-polar bonds, non-polar molecule"};
function polSVG(m,yaw,pitch,deltas){
  const s=slots(m.bp,m.lp),R=m.bp===1?66:74,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),spp=Math.sin(pitch);
  const rot=([x,y,z])=>{const x1=x*cy+z*sy,z1=-x*sy+z*cy;return [x1,y*cp-z1*spp,y*spp+z1*cp]};
  let ai=0;const items=s.map(o=>{const [x,y,z]=rot(o.v);const el=o.lp?null:m.xs[ai++];return {...o,el,x,y:-y,z}}).sort((a,b)=>a.z-b.z);
  const off=m.bp===1?-33:0;
  const d=(el,other)=>EN[el]>EN[other]?"δ−":EN[el]<EN[other]?"δ+":"";
  const draw=o=>{const sc=1+o.z*0.18,ax=o.x*R+off,ay=o.y*R;
    if(o.lp){const ang=Math.atan2(o.y,o.x)*180/Math.PI;return `<ellipse cx="${(o.x*R*.55).toFixed(1)}" cy="${(o.y*R*.55).toFixed(1)}" rx="${(26*sc).toFixed(1)}" ry="${(12*sc).toFixed(1)}" transform="rotate(${ang.toFixed(1)} ${(o.x*R*.55).toFixed(1)} ${(o.y*R*.55).toFixed(1)})" class="lpe"/>`}
    const dl=deltas?d(o.el,m.c):"";
    return `<line x1="${off}" y1="0" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" class="bnd" style="stroke-width:${(6*sc).toFixed(1)}"/><circle cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="${(15*sc).toFixed(1)}" style="fill:${ECOL[o.el]}" class="atm"/><text x="${ax.toFixed(1)}" y="${(ay+4).toFixed(1)}" class="atl" style="font-size:${(11*sc).toFixed(1)}px;${["C","N","Cl"].includes(o.el)?"fill:#fff":""}">${o.el}</text>${dl?`<text x="${(ax+o.x*20).toFixed(1)}" y="${(ay+o.y*20-16).toFixed(1)}" class="dlt ${dl==="δ+"?"dp":"dm"}">${dl}</text>`:""}`};
  const cd=deltas&&m.xs.some(x=>EN[x]!==EN[m.c])?(EN[m.xs[0]]>EN[m.c]||m.xs.some(x=>EN[x]>EN[m.c])?"δ+":"δ−"):"";
  return items.filter(o=>o.z<0).map(draw).join("")+`<circle cx="${off}" cy="0" r="20" style="fill:${ECOL[m.c]}" class="atm"/><text x="${off}" y="5" class="atl" style="font-size:13px;${["C","N","Cl"].includes(m.c)?"fill:#fff":""}">${m.c}</text>${cd?`<text x="${off-14}" y="-24" class="dlt ${cd==="δ+"?"dp":"dm"}">${cd}</text>`:""}`+items.filter(o=>o.z>=0).map(draw).join("");
}
function mountPol(el,m,deltas){
  const st={el,yaw:0.5,pitch:0.3,drag:null,auto:!matchMedia("(prefers-reduced-motion: reduce)").matches};
  el.innerHTML=`<svg viewBox="-120 -120 240 240" class="m3d" role="img" aria-label="3D model of ${m.f}. Drag to rotate."><g></g></svg><span class="hint">Drag to rotate</span>`;
  const g=el.querySelector("g"),svg=el.querySelector("svg");st.paint=()=>{g.innerHTML=polSVG(m,st.yaw,st.pitch,deltas)};st.paint();
  svg.addEventListener("pointerdown",e=>{st.drag=[e.clientX,e.clientY];st.auto=false;svg.setPointerCapture(e.pointerId)});
  svg.addEventListener("pointermove",e=>{if(!st.drag)return;st.yaw+=(e.clientX-st.drag[0])*0.012;st.pitch+=(e.clientY-st.drag[1])*0.012;st.drag=[e.clientX,e.clientY];st.paint()});
  svg.addEventListener("pointerup",()=>{st.drag=null});MOL3D.push(st);
}
function startDipole(){
  const easy=shuffle(PMOLS.filter(m=>["H₂","Cl₂","HCl","H₂O","NH₃","CO₂"].includes(m.f))).slice(0,3),hard=shuffle(PMOLS.filter(m=>!["H₂","Cl₂","HCl","H₂O","NH₃","CO₂"].includes(m.f))).slice(0,3);
  G={kind:"dipole",key:"dipole",backHash:"elemental-frontier",ms:[...easy,...hard],i:0,got:0,max:0,sort:null};
  frame("1.6 Shapes of molecules · polarity","Dipole Detective","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);dipBegin();
}
function dipQs(m){
  const other=m.xs.find(x=>x!==m.c)||m.xs[0],polarB=m.k!=="nn",more=EN[other]>EN[m.c]?other:EN[other]<EN[m.c]?m.c:"Neither: they are the same element";
  const reason={pp:"Polar bonds, and the molecule is not symmetrical, so the dipoles do not cancel",pn:"Polar bonds, but the molecule is symmetrical, so the bond dipoles cancel",nn:"The bonds are non-polar because both atoms are the same, so there is no dipole"};
  const qs=[{t:`Which atom is more electronegative: ${m.c} or ${other}?`,a:more,o:[...new Set([m.c,other,"Neither: they are the same element"])],why:`Electronegativity: ${m.c} ${EN[m.c]}, ${other} ${EN[other]}. The more electronegative atom becomes δ−.`},
   {t:"Are the bonds polar?",a:polarB?"Yes: electrons are shared unequally":"No: electrons are shared equally",o:["Yes: electrons are shared unequally","No: electrons are shared equally"],why:polarB?"Different electronegativities mean unequal sharing, so the bond is polar.":"Identical atoms share the electrons equally."}];
  if(polarB)qs.push({t:"Look at the 3D shape. Do the bond dipoles cancel?",a:m.k==="pn"?"Yes: the molecule is symmetrical":"No: the molecule is not symmetrical",o:["Yes: the molecule is symmetrical","No: the molecule is not symmetrical"],why:m.note||(m.k==="pn"?"Equal dipoles point in opposite or symmetrical directions, so they cancel.":"Lone pairs or different atoms make it unsymmetrical, so a net dipole remains.")});
  qs.push({t:`So, is ${m.f} polar, and why?`,a:(m.k==="pp"?"Polar. ":"Non-polar. ")+reason[m.k],o:shuffle([["pp","Polar. "],["pn","Non-polar. "],["nn","Non-polar. "],["pn","Polar. "]].map(([k,p])=>p+reason[k])),why:""});
  return qs;
}
function dipBegin(){G.r={qs:dipQs(G.ms[G.i]),d:0,picked:null};dipRender()}
function dipRender(){
  const g=$("#g");
  if(G.sort){return sortRender()}
  const m=G.ms[G.i],R=G.r,q=R.qs[R.d],last=R.d===R.qs.length-1&&R.picked!==null;
  g.innerHTML=`<div class="hud"><span>Molecule <strong>${G.i+1}</strong>/${G.ms.length}</span><span>Score <strong>${G.got}</strong>/${G.max}</span><span>Step ${R.d+1}/${R.qs.length}</span></div>
  <div class="shapebox"><div class="mol3d" id="mv"></div><div style="display:grid;gap:12px;min-width:0"><div class="card"><div class="ask"><small>INVESTIGATE</small>${esc(m.f)}</div></div>
  <div class="qtext">${esc(q.t)}</div><div class="opts">${q.o.map(o=>`<button class="opt ${R.picked!==null?(o===q.a?"right":o===R.picked?"wrong":""):""}" data-act="dpick" data-k="${esc(o)}" ${R.picked!==null?"disabled":""}>${esc(o)}</button>`).join("")}</div>
  ${R.picked!==null?`<div class="explain pop ${R.picked===q.a?"ok":"bad"}"><b>${R.picked===q.a?"Correct":"Not quite"}</b>${q.why?`<span>${esc(q.why)}</span>`:`<span><b>${esc(PCAT[m.k])}.</b> ${m.k==="pn"?"A molecule can have polar bonds and still be non-polar overall.":""}</span>`}</div><div class="row"><button class="primary" id="nx" data-act="dnext">${last?(G.i===G.ms.length-1?"Final round: sort them":"Next molecule"):"Next step"}</button></div>`:""}</div></div>`;
  mountPol($("#mv"),m,R.d>0||R.picked!==null);const n=$("#nx");if(n)n.focus();
}
function sortRender(){
  const S=G.sort,g=$("#g");
  if(S.done){g.innerHTML=results("dipole",G.got,G.max);return}
  g.innerHTML=`<div class="qhead">FINAL ROUND · POLARITY SORTER</div><p>Put each molecule in the right group. Tap a molecule, then a group.</p>
  <div class="bank">${S.items.filter(m=>!S.placed[m.f]).map(m=>`<button class="tilebtn ${S.sel===m.f?"on":""}" data-act="ssel" data-k="${esc(m.f)}">${esc(m.f)}</button>`).join("")||`<span class="small muted">All placed.</span>`}</div>
  <div class="bins">${Object.entries(PCAT).map(([k,t])=>`<button class="bin ${S.sel?"ready":""}" data-act="sbin" data-k="${k}" ${S.checked?"disabled":""}><b>${esc(t)}</b><span>${S.items.filter(m=>S.placed[m.f]===k).map(m=>`<span class="chipm ${S.checked?(m.k===k?"right":"wrong"):""}">${esc(m.f)}${S.checked&&m.k!==k?" ✗":""}</span>`).join("")}</span></button>`).join("")}</div>
  ${S.checked?`<div class="explain"><b>${S.score}/${S.items.length} sorted correctly</b><span>${S.items.map(m=>`${esc(m.f)}: ${esc(PCAT[m.k])}`).join("<br>")}</span></div><div class="row"><button class="primary" data-act="sdone">See results</button></div>`:`<div class="row"><button class="primary" data-act="scheck2" ${Object.keys(S.placed).length===S.items.length?"":"disabled"}>Check</button><button class="ghost" data-act="sclear">Clear</button></div>`}`;
}
function dipoleAct(a,k){
  if(G.sort){const S=G.sort;
    if(a==="ssel")S.sel=S.sel===k?null:k;
    if(a==="sbin"&&S.sel){S.placed[S.sel]=k;S.sel=null}
    if(a==="sclear"){S.placed={};S.sel=null}
    if(a==="scheck2"){S.checked=true;S.score=S.items.filter(m=>S.placed[m.f]===m.k).length;G.got+=S.score;G.max+=S.items.length}
    if(a==="sdone")S.done=true;
    return sortRender()}
  const R=G.r;
  if(a==="dpick"&&R.picked===null){R.picked=k;G.got+=k===R.qs[R.d].a?1:0;G.max++}
  if(a==="dnext"){if(R.d<R.qs.length-1){R.d++;R.picked=null}else{G.i++;if(G.i>=G.ms.length){G.sort={items:shuffle(PMOLS).slice(0,7),placed:{},sel:null};return sortRender()}return dipBegin()}}
  dipRender();
}
