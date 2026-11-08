/* ============ SHAPES OF MOLECULES (1.6) ============ */
// c: central atom, x: bonded atom(s) (array allows mixed), g: outer electrons of central atom, q: charge, be: electrons central uses in bonding
const MOLS=[
 {f:"BeCl₂",c:"Be",x:"Cl",bp:2,lp:0,g:2,q:0,be:2,shape:"linear",angle:"180°",lvl:1},
 {f:"CO₂",c:"C",x:"O",bp:2,lp:0,g:4,q:0,be:4,shape:"linear",angle:"180°",lvl:2,note:"Each C=O double bond counts as ONE region of electron density."},
 {f:"BF₃",c:"B",x:"F",bp:3,lp:0,g:3,q:0,be:3,shape:"trigonal planar",angle:"120°",lvl:1},
 {f:"GaH₃",c:"Ga",x:"H",bp:3,lp:0,g:3,q:0,be:3,shape:"trigonal planar",angle:"120°",lvl:2},
 {f:"CH₄",c:"C",x:"H",bp:4,lp:0,g:4,q:0,be:4,shape:"tetrahedral",angle:"109.5°",lvl:1},
 {f:"NH₄⁺",c:"N",x:"H",bp:4,lp:0,g:5,q:1,be:4,shape:"tetrahedral",angle:"109.5°",lvl:2,note:"NH₄⁺ has lost one electron, so N has 5 − 1 = 4 to use."},
 {f:"NH₃",c:"N",x:"H",bp:3,lp:1,g:5,q:0,be:3,shape:"pyramidal",angle:"107°",lvl:1},
 {f:"H₃O⁺",c:"O",x:"H",bp:3,lp:1,g:6,q:1,be:3,shape:"pyramidal",angle:"107°",lvl:2,note:"H₃O⁺ is pyramidal, 107°, like NH₃. Not 104.5° and not 109.5°."},
 {f:"H₂O",c:"O",x:"H",bp:2,lp:2,g:6,q:0,be:2,shape:"bent",angle:"104.5°",lvl:1},
 {f:"NH₂⁻",c:"N",x:"H",bp:2,lp:2,g:5,q:-1,be:2,shape:"bent",angle:"104.5°",lvl:3,note:"NH₂⁻ (the azanide ion) has gained an electron: 5 + 1 = 6."},
 {f:"PCl₅",c:"P",x:"Cl",bp:5,lp:0,g:5,q:0,be:5,shape:"trigonal bipyramidal",angle:"90° and 120°",lvl:3},
 {f:"SF₆",c:"S",x:"F",bp:6,lp:0,g:6,q:0,be:6,shape:"octahedral",angle:"90°",lvl:3},
 {f:"ClF₃",c:"Cl",x:"F",bp:3,lp:2,g:7,q:0,be:3,shape:"T-shaped",angle:"about 87.5°",lvl:3,note:"In a trigonal bipyramid the lone pairs sit in the equatorial positions, leaving a T shape."}];
const SHAPES=["linear","trigonal planar","tetrahedral","pyramidal","bent","trigonal bipyramidal","octahedral","T-shaped"];
const ANGLES=["180°","120°","109.5°","107°","104.5°","90° and 120°","90°","about 87.5°"];
const ECOL={Be:"#bfe3a0",B:"#f4b183",C:"#4a4a4a",N:"#3f6fd1",O:"#e04848",F:"#8fdc52",Cl:"#2fa865",H:"#f4f4f4",S:"#e8c64a",P:"#f08a24",Ga:"#c79b6a"};
function geom(n){const r=Math.SQRT1_2,t=1/Math.sqrt(3);
  if(n===1)return [[1,0,0]];
  if(n===2)return [[1,0,0],[-1,0,0]];
  if(n===3)return [0,1,2].map(i=>{const a=Math.PI/2+i*2*Math.PI/3;return [Math.cos(a),Math.sin(a),0]});
  if(n===4)return [[0,1,0],[0.943,-0.333,0],[-0.471,-0.333,0.816],[-0.471,-0.333,-0.816]];
  if(n===5)return [[0,1,0],[0,-1,0],...[0,1,2].map(i=>{const a=i*2*Math.PI/3;return [Math.cos(a),0,Math.sin(a)]})];
  return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
}
function slots(bp,lp){const n=bp+lp;if(n<1||n>6)return [];const g=geom(n);let lpIdx;
  if(n===5)lpIdx=[2,3,4].slice(0,lp).concat([0,1]).slice(0,lp);else lpIdx=[...Array(lp).keys()];
  return g.map((v,i)=>({v,lp:lpIdx.includes(i)}));
}
const MOL3D=[];
function molSVG(m,bp,lp,yaw,pitch){
  const s=slots(bp,lp),R=74,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),spp=Math.sin(pitch);
  const rot=([x,y,z])=>{const x1=x*cy+z*sy,z1=-x*sy+z*cy;const y2=y*cp-z1*spp,z2=y*spp+z1*cp;return [x1,y2,z2]};
  const items=s.map(o=>{const [x,y,z]=rot(o.v);return {...o,x,y:-y,z}}).sort((a,b)=>a.z-b.z);
  const draw=o=>{const sc=1+o.z*0.18;
    if(o.lp){const ang=Math.atan2(o.y,o.x)*180/Math.PI,len=Math.hypot(o.x,o.y);return `<ellipse cx="${(o.x*R*0.55).toFixed(1)}" cy="${(o.y*R*0.55).toFixed(1)}" rx="${(12+18*len)*sc}" ry="${13*sc}" transform="rotate(${ang.toFixed(1)} ${(o.x*R*0.55).toFixed(1)} ${(o.y*R*0.55).toFixed(1)})" class="lpe" style="opacity:${(0.5+o.z*0.2).toFixed(2)}"/><circle cx="${(o.x*R*0.55-4).toFixed(1)}" cy="${(o.y*R*0.55).toFixed(1)}" r="2.6" class="lpd"/><circle cx="${(o.x*R*0.55+4).toFixed(1)}" cy="${(o.y*R*0.55).toFixed(1)}" r="2.6" class="lpd"/>`}
    const ax=o.x*R,ay=o.y*R,col=ECOL[m.x]||"#ccc";return `<line x1="0" y1="0" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" class="bnd" style="stroke-width:${(6*sc).toFixed(1)}"/><circle cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="${(15*sc).toFixed(1)}" style="fill:${col}" class="atm"/><text x="${ax.toFixed(1)}" y="${(ay+4).toFixed(1)}" class="atl" style="font-size:${(11*sc).toFixed(1)}px">${m.x}</text>`};
  const back=items.filter(o=>o.z<0).map(draw).join(""),front=items.filter(o=>o.z>=0).map(draw).join("");
  return `${back}<circle cx="0" cy="0" r="20" style="fill:${ECOL[m.c]||"#999"}" class="atm"/><text x="0" y="5" class="atl" style="font-size:13px;fill:${["C","N","Cl"].includes(m.c)?"#fff":"#0b2545"}">${m.c}</text>${front}<text x="0" y="5" class="atl" style="font-size:13px;fill:${["C","N","Cl"].includes(m.c)?"#fff":"#0b2545"}">${m.c}</text>`;
}
function mountMol(el,m,bp,lp){
  const st={el,m,bp,lp,yaw:0.6,pitch:0.35,drag:null,auto:!matchMedia("(prefers-reduced-motion: reduce)").matches};
  el.innerHTML=`<svg viewBox="-120 -120 240 240" class="m3d" role="img" aria-label="3D model of ${m.f}. Drag to rotate."><g></g></svg><span class="hint">Drag to rotate</span>`;
  const g=el.querySelector("g"),svg=el.querySelector("svg");st.paint=()=>{g.innerHTML=molSVG(st.m,st.bp,st.lp,st.yaw,st.pitch)};st.paint();
  svg.addEventListener("pointerdown",e=>{st.drag=[e.clientX,e.clientY];st.auto=false;svg.setPointerCapture(e.pointerId)});
  svg.addEventListener("pointermove",e=>{if(!st.drag)return;st.yaw+=(e.clientX-st.drag[0])*0.012;st.pitch+=(e.clientY-st.drag[1])*0.012;st.drag=[e.clientX,e.clientY];st.paint()});
  svg.addEventListener("pointerup",()=>{st.drag=null});
  MOL3D.push(st);return st;
}
(function spin(){for(let i=MOL3D.length-1;i>=0;i--){const s=MOL3D[i];if(!document.body.contains(s.el)){MOL3D.splice(i,1);continue}if(s.auto){s.yaw+=0.012;s.paint()}}requestAnimationFrame(spin)})();

/* ---- Shape Shifter: build the molecule ---- */
function startShifter(){
  const pick=l=>shuffle(MOLS.filter(m=>m.lvl===l));
  G={kind:"shifter",key:"shifter",backHash:"elemental-frontier",ms:[...pick(1).slice(0,2),...pick(2).slice(0,2),...pick(3).slice(0,2)],i:0,got:0,max:0};
  frame("1.6 Shapes of molecules","Shape Shifter","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);shifterBegin();
}
function shifterBegin(){G.r={bp:1,lp:0,step:0};shifterRender()}
function shifterRender(){
  const g=$("#g");if(G.i>=G.ms.length){g.innerHTML=results("shifter",G.got,G.max);return}
  const m=G.ms[G.i],R=G.r;
  R.so=R.so||shuffle(SHAPES).filter(x=>x!==m.shape).slice(0,3).concat(m.shape).sort(()=>Math.random()-.5);
  R.ao=R.ao||shuffle(ANGLES).filter(x=>x!==m.angle).slice(0,3).concat(m.angle).sort(()=>Math.random()-.5);
  const lvl=["","Level 1 · Recognise","Level 2 · Predict","Level 3 · Expanded octets"][m.lvl];
  let ctl="";
  if(R.step===0)ctl=`<p>Build <b>${esc(m.f)}</b> around the central <b>${m.c}</b>. Set the number of bonded atoms and lone pairs. The model rearranges itself using electron-pair repulsion.</p>
   <div class="steppers"><div class="stp"><span>Bonded atoms (${m.x})</span><button class="sbtn" data-act="sbp" data-k="-1" aria-label="Fewer atoms">−</button><b>${R.bp}</b><button class="sbtn" data-act="sbp" data-k="1" aria-label="More atoms">+</button></div>
   <div class="stp"><span>Lone pairs on ${m.c}</span><button class="sbtn" data-act="slp" data-k="-1" aria-label="Fewer lone pairs">−</button><b>${R.lp}</b><button class="sbtn" data-act="slp" data-k="1" aria-label="More lone pairs">+</button></div></div>
   <div class="row"><button class="primary" data-act="scheck">Check structure</button><span class="small muted">${R.bp+R.lp} regions of electron density</span></div>`;
  else{
    ctl=`<div class="explain ${R.ok0?"ok":"bad"}"><b>${R.ok0?"Structure correct":"Not quite"}</b><span>${esc(m.f)}: ${m.bp} bonding pair${m.bp>1?"s":""} and ${m.lp} lone pair${m.lp===1?"":"s"} around ${m.c}.${m.note?" "+esc(m.note):""}</span></div>`;
    ctl+=`<div class="qhead">NAME THE SHAPE</div><div class="opts two">${R.so.map(o=>`<button class="opt ${R.step>1?(o===m.shape?"right":o===R.s1?"wrong":""):""}" data-act="sshape" data-k="${esc(o)}" ${R.step>1?"disabled":""}>${esc(o)}</button>`).join("")}</div>`;
    if(R.step>1)ctl+=`<div class="qhead">BOND ANGLE</div><div class="opts two">${R.ao.map(o=>`<button class="opt ${R.step>2?(o===m.angle?"right":o===R.s2?"wrong":""):""}" data-act="sangle" data-k="${esc(o)}" ${R.step>2?"disabled":""}>${esc(o)}</button>`).join("")}</div>`;
    if(R.step>2)ctl+=`<div class="explain pop ${R.s2===m.angle&&R.s1===m.shape?"ok":"bad"}"><b>${esc(m.f)}: ${esc(m.shape)}, ${esc(m.angle)}</b><span>${m.lp?"Lone pairs repel more than bonding pairs, so the bond angle is squeezed below the ideal value.":"With no lone pairs, the bonding pairs repel equally and spread out as far apart as possible."}</span></div><div class="row"><button class="primary" id="nx" data-act="snext">${G.i===G.ms.length-1?"See results":"Next molecule"}</button></div>`;
  }
  g.innerHTML=`<div class="hud"><span>Molecule <strong>${G.i+1}</strong>/${G.ms.length}</span><span>Score <strong>${G.got}</strong>/${G.max}</span><span>${lvl}</span></div>
  <div class="shapebox"><div class="mol3d" id="mv"></div><div style="display:grid;gap:12px;min-width:0"><div class="card"><div class="ask"><small>BUILD THIS</small>${esc(m.f)}</div></div>${ctl}</div></div>`;
  mountMol($("#mv"),m,R.step?m.bp:R.bp,R.step?m.lp:R.lp);const n=$("#nx");if(n)n.focus();
}
function shifterAct(a,k){
  const m=G.ms[G.i],R=G.r;
  if(a==="sbp"&&R.step===0){R.bp=Math.max(1,Math.min(6,R.bp+ +k));if(R.bp+R.lp>6)R.lp=6-R.bp;const st=MOL3D[MOL3D.length-1];if(st){st.bp=R.bp;st.lp=R.lp;st.paint()}$(".stp b").textContent=R.bp;document.querySelectorAll(".stp b")[1].textContent=R.lp;$(".row .small").textContent=(R.bp+R.lp)+" regions of electron density";return}
  if(a==="slp"&&R.step===0){R.lp=Math.max(0,Math.min(3,R.lp+ +k));if(R.bp+R.lp>6)R.lp=6-R.bp;const st=MOL3D[MOL3D.length-1];if(st){st.bp=R.bp;st.lp=R.lp;st.paint()}document.querySelectorAll(".stp b")[1].textContent=R.lp;$(".row .small").textContent=(R.bp+R.lp)+" regions of electron density";return}
  if(a==="scheck"){R.ok0=R.bp===m.bp&&R.lp===m.lp;G.got+=R.ok0?1:0;G.max++;R.step=1}
  if(a==="sshape"&&R.step===1){R.s1=k;G.got+=k===m.shape?1:0;G.max++;R.step=2}
  if(a==="sangle"&&R.step===2){R.s2=k;G.got+=k===m.angle?1:0;G.max++;R.step=3}
  if(a==="snext"){G.i++;return shifterBegin()}
  shifterRender();
}

/* ---- Electron Pair Escape: work it out room by room ---- */
function startEscape(){
  G={kind:"escape",key:"escape",backHash:"elemental-frontier",ms:shuffle(MOLS).slice(0,5),i:0,got:0,max:0};
  frame("1.6 Shapes of molecules","Electron Pair Escape","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);escBegin();
}
function escQs(m){
  const outer=m.g-m.q,lp=m.lp,reg=m.bp+m.lp;
  const near=(v,arr)=>shuffle([...new Set([v,...arr.filter(x=>x!==v&&x>=0)])]).slice(0,4);
  return [
   {t:`Room 1 · How many outer electrons does ${m.c} have to use${m.q?` in ${m.f} (remember the charge)`:""}?`,a:String(outer),o:near(outer,[outer-1,outer+1,m.g,outer+2]).map(String),why:`${m.c} is in Group ${["","I","II","III","IV","V","VI","VII"][m.g]} so has ${m.g} outer electrons${m.q>0?`; the ion has lost ${m.q}, so ${outer}`:m.q<0?`; the ion has gained ${-m.q}, so ${outer}`:""}.`},
   {t:`Room 2 · How many bonding regions (bonded atoms) are around ${m.c}?`,a:String(m.bp),o:near(m.bp,[m.bp-1,m.bp+1,m.bp+2]).map(String),why:`${m.c} is bonded to ${m.bp} atoms.${m.f==="CO₂"?" Each double bond is one region.":""}`},
   {t:`Room 3 · How many lone pairs are on ${m.c}?`,a:String(lp),o:near(lp,[lp+1,lp-1,lp+2,3]).map(String),why:`${outer} electrons − ${m.be} used in bonding = ${outer-m.be}, which is ${lp} lone pair${lp===1?"":"s"}.`},
   {t:`Room 4 · ${reg} regions of electron density. What is the shape of ${m.f}?`,a:m.shape,o:shuffle(SHAPES.filter(x=>x!==m.shape)).slice(0,3).concat(m.shape).sort(()=>Math.random()-.5),why:`${m.bp} bonding pairs and ${lp} lone pairs give a ${m.shape} shape.`},
   {t:`Final door · Why is the bond angle in ${m.f} ${m.angle}?`,a:lp?"Lone pairs repel more than bonding pairs, squeezing the bonds closer together":"The bonding pairs repel equally and get as far apart as possible",o:null,why:""}];
}
function escBegin(){const m=G.ms[G.i];G.r={qs:escQs(m),d:0,picked:null};const f=G.r.qs[4];f.o=shuffle([f.a,m.lp?"The bonding pairs repel equally and get as far apart as possible":"Lone pairs repel more than bonding pairs, squeezing the bonds closer together","Bonding pairs repel more than lone pairs","The atoms are attracted to each other"]);escRender()}
function escRender(){
  const g=$("#g");if(G.i>=G.ms.length){g.innerHTML=results("escape",G.got,G.max);return}
  const m=G.ms[G.i],R=G.r,q=R.qs[R.d];
  const doors=R.qs.map((_,i)=>`<span class="door ${i<R.d||(i===R.d&&R.picked!==null)?"open":""} ${i===R.d?"cur":""}">${i<R.d||(i===R.d&&R.picked!==null)?"🔓":"🔒"}</span>`).join("");
  const done=R.d===4&&R.picked!==null;
  g.innerHTML=`<div class="hud"><span>Molecule <strong>${G.i+1}</strong>/${G.ms.length}</span><span>Keys <strong>${G.got}</strong>/${G.max}</span></div>
  <div class="doors" aria-label="Progress through the rooms">${doors}</div>
  <div class="shapebox"><div class="mol3d" id="mv"></div><div style="display:grid;gap:12px;min-width:0"><div class="card"><div class="ask"><small>ESCAPE WITH</small>${esc(m.f)}</div></div>
  <div class="qtext">${esc(q.t)}</div><div class="opts ${q.o.length>3&&q.o[0].length<20?"two":""}">${q.o.map(o=>`<button class="opt ${R.picked!==null?(o===q.a?"right":o===R.picked?"wrong":""):""}" data-act="epick" data-k="${esc(o)}" ${R.picked!==null?"disabled":""}>${esc(o)}</button>`).join("")}</div>
  ${R.picked!==null?`<div class="explain pop ${R.picked===q.a?"ok":"bad"}"><b>${R.picked===q.a?"Door unlocked":"Locked. The answer is "+esc(q.a)}</b>${q.why?`<span>${esc(q.why)}</span>`:""}${done?`<span><b>${esc(m.f)}: ${esc(m.shape)}, ${esc(m.angle)}.</b>${m.note?" "+esc(m.note):""}</span>`:""}</div><div class="row"><button class="primary" id="nx" data-act="enext">${done?(G.i===G.ms.length-1?"See results":"Next molecule"):"Next room"}</button></div>`:""}</div></div>`;
  mountMol($("#mv"),m,done?m.bp:R.d>=3?m.bp:R.d>=2?m.bp:0,done||R.d>=3?m.lp:0);const n=$("#nx");if(n)n.focus();
}
function escapeAct(a,k){
  const R=G.r;
  if(a==="epick"&&R.picked===null){R.picked=k;G.got+=k===R.qs[R.d].a?1:0;G.max++}
  if(a==="enext"){if(R.d<4){R.d++;R.picked=null}else{G.i++;if(G.i<G.ms.length)return escBegin()}}
  escRender();
}

/* ---- Bond Angle Blitz: timed ---- */
function startBlitz(){
  G={kind:"blitz",key:"blitz",backHash:"elemental-frontier",ms:shuffle([...MOLS,...shuffle(MOLS)]).slice(0,10),i:0,got:0,max:0,T:12};
  frame("1.6 Shapes of molecules","Bond Angle Blitz","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);blitzAsk();
}
function blitzAsk(){
  stopTimer();const g=$("#g");if(G.i>=G.ms.length){g.innerHTML=results("blitz",G.got,G.max,`<p class="muted">Bonus points are included in the score.</p>`);return}
  const m=G.ms[G.i];G.r={opts:shuffle(ANGLES.filter(x=>x!==m.angle)).slice(0,3).concat(m.angle).sort(()=>Math.random()-.5)};
  g.innerHTML=`<div class="hud"><span>Molecule <strong>${G.i+1}</strong>/${G.ms.length}</span><span>Score <strong>${G.got}</strong>/${G.max}</span><span>Time <strong id="tt">${G.T}</strong>s</span></div><div class="meter"><i id="tm"></i></div>
  <div class="shapebox"><div class="mol3d" id="mv"></div><div style="display:grid;gap:12px;min-width:0"><div class="card"><div class="ask"><small>BOND ANGLE?</small>${esc(m.f)}</div></div><div class="opts two" id="bo">${G.r.opts.map((o,n)=>`<button class="opt" data-act="bpick" data-k="${esc(o)}"><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div><div id="after"></div></div></div>`;
  mountMol($("#mv"),m,m.bp,m.lp);
  const t0=performance.now();timer=setInterval(()=>{const left=Math.max(0,G.T-(performance.now()-t0)/1000),a=$("#tt"),b=$("#tm");if(!a){stopTimer();return}a.textContent=Math.ceil(left);b.style.width=(left/G.T*100)+"%";if(left<=0)blitzAct("bpick","__timeout")},100);
}
function blitzAct(a,k){
  const m=G.ms[G.i],R=G.r;
  if(a==="bpick"&&!R.done){stopTimer();R.done=true;R.ok=k===m.angle;G.got+=R.ok?1:0;G.max++;
    document.querySelectorAll('[data-act="bpick"]').forEach(b=>{b.disabled=true;if(b.dataset.k===m.angle)b.classList.add("right");else if(b.dataset.k===k)b.classList.add("wrong")});
    const bonus=m.lp>0&&m.bp+m.lp===4;
    $("#after").innerHTML=`<div class="explain pop ${R.ok?"ok":"bad"}"><b>${k==="__timeout"?"Time’s up":R.ok?"Correct":"Not quite"}: ${esc(m.angle)} (${esc(m.shape)})</b></div>${bonus?`<div class="qtext" style="font-size:16px">Bonus: why is it less than 109.5°?</div><div class="opts">${shuffle(["Lone pairs repel more than bonding pairs","Bonding pairs repel more than lone pairs","The bonds are longer","The molecule is ionic"]).map(o=>`<button class="opt" data-act="bbonus" data-k="${esc(o)}">${esc(o)}</button>`).join("")}</div>`:`<div class="row"><button class="primary" id="nx" data-act="bnext">Next</button></div>`}`;
    const n=$("#nx");if(n)n.focus();return}
  if(a==="bbonus"&&!R.bdone){R.bdone=true;const ok=k==="Lone pairs repel more than bonding pairs";G.got+=ok?1:0;G.max++;
    document.querySelectorAll('[data-act="bbonus"]').forEach(b=>{b.disabled=true;if(b.dataset.k==="Lone pairs repel more than bonding pairs")b.classList.add("right");else if(b.dataset.k===k)b.classList.add("wrong")});
    $("#after").insertAdjacentHTML("beforeend",`<div class="row" style="margin-top:10px"><button class="primary" id="nx" data-act="bnext">Next</button></div>`);$("#nx").focus();return}
  if(a==="bnext"){G.i++;blitzAsk()}
}
