/* ============ IONIC EQUATION BUILDER (1.1) ============ */
// species: [formula, state, ions (null = stays together), coefficient]
const IONIC=[
 {L:[["AgNO₃","aq",["Ag⁺","NO₃⁻"],""],["NaCl","aq",["Na⁺","Cl⁻"],""]],R:[["AgCl","s",null,""],["NaNO₃","aq",["Na⁺","NO₃⁻"],""]],
  ans:"Ag⁺(aq) + Cl⁻(aq) → AgCl(s)",wrong:["AgNO₃(aq) + Cl⁻(aq) → AgCl(s) + NO₃⁻(aq)","Na⁺(aq) + NO₃⁻(aq) → NaNO₃(aq)","Ag⁺(aq) + Cl⁻(aq) + Na⁺(aq) + NO₃⁻(aq) → AgCl(s) + Na⁺(aq) + NO₃⁻(aq)"],why:"AgCl is a solid precipitate, so it stays together. Na⁺ and NO₃⁻ are unchanged on both sides."},
 {L:[["BaCl₂","aq",["Ba²⁺","Cl⁻"],""],["Na₂SO₄","aq",["Na⁺","SO₄²⁻"],""]],R:[["BaSO₄","s",null,""],["NaCl","aq",["Na⁺","Cl⁻"],"2"]],
  ans:"Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)",wrong:["BaCl₂(aq) + SO₄²⁻(aq) → BaSO₄(s) + 2Cl⁻(aq)","2Na⁺(aq) + 2Cl⁻(aq) → 2NaCl(aq)","Ba²⁺(aq) + 2Cl⁻(aq) → BaCl₂(s)"],why:"This is the reaction behind the sulfate test. BaSO₄ is the white precipitate."},
 {L:[["HCl","aq",["H⁺","Cl⁻"],""],["NaOH","aq",["Na⁺","OH⁻"],""]],R:[["NaCl","aq",["Na⁺","Cl⁻"],""],["H₂O","l",null,""]],
  ans:"H⁺(aq) + OH⁻(aq) → H₂O(l)",wrong:["Na⁺(aq) + Cl⁻(aq) → NaCl(aq)","H⁺(aq) + OH⁻(aq) → H₂O(aq)","HCl(aq) + OH⁻(aq) → Cl⁻(aq) + H₂O(l)"],why:"Water is a liquid made of molecules, so it is never split. Every strong acid + strong alkali neutralisation has this same ionic equation."},
 {L:[["CaCO₃","s",null,""],["HCl","aq",["H⁺","Cl⁻"],"2"]],R:[["CaCl₂","aq",["Ca²⁺","Cl⁻"],""],["H₂O","l",null,""],["CO₂","g",null,""]],
  ans:"CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + H₂O(l) + CO₂(g)",wrong:["CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)","Ca²⁺(aq) + 2Cl⁻(aq) → CaCl₂(aq)","CaCO₃(s) + 2HCl(aq) → Ca²⁺(aq) + 2Cl⁻(aq) + H₂O(l) + CO₂(g)"],why:"The trap: CaCO₃ is a SOLID, so it is not split into Ca²⁺ and CO₃²⁻. Compare with sodium carbonate solution, which is split."},
 {L:[["Na₂CO₃","aq",["Na⁺","CO₃²⁻"],""],["HCl","aq",["H⁺","Cl⁻"],"2"]],R:[["NaCl","aq",["Na⁺","Cl⁻"],"2"],["H₂O","l",null,""],["CO₂","g",null,""]],
  ans:"CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)",wrong:["Na₂CO₃(aq) + 2H⁺(aq) → 2Na⁺(aq) + H₂O(l) + CO₂(g)","CO₃²⁻(aq) + H⁺(aq) → H₂O(l) + CO₂(g)","2Na⁺(aq) + 2Cl⁻(aq) → 2NaCl(aq)"],why:"Sodium carbonate is dissolved (aq), so it IS split. Check the charges balance: 2− + 2(1+) = 0 on each side."},
 {L:[["MgCl₂","aq",["Mg²⁺","Cl⁻"],""],["NaOH","aq",["Na⁺","OH⁻"],"2"]],R:[["Mg(OH)₂","s",null,""],["NaCl","aq",["Na⁺","Cl⁻"],"2"]],
  ans:"Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)",wrong:["Mg²⁺(aq) + OH⁻(aq) → Mg(OH)₂(s)","MgCl₂(aq) + 2OH⁻(aq) → Mg(OH)₂(s) + 2Cl⁻(aq)","2Na⁺(aq) + 2Cl⁻(aq) → 2NaCl(aq)"],why:"Mg(OH)₂ is a precipitate (s). You need 2OH⁻ to balance the 2+ charge."},
 {L:[["Cl₂","aq",null,""],["KBr","aq",["K⁺","Br⁻"],"2"]],R:[["KCl","aq",["K⁺","Cl⁻"],"2"],["Br₂","aq",null,""]],
  ans:"Cl₂(aq) + 2Br⁻(aq) → 2Cl⁻(aq) + Br₂(aq)",wrong:["2Cl(aq) + 2Br⁻(aq) → 2Cl⁻(aq) + 2Br(aq)","2Cl⁻(aq) + Br₂(aq) → Cl₂(aq) + 2Br⁻(aq)","Cl₂(aq) + 2K⁺(aq) → 2KCl(aq)"],why:"Cl₂ and Br₂ are covalent MOLECULES. Even though they are (aq), they do not split into ions. Only ionic compounds and strong acids/alkalis in solution are split."},
 {L:[["Mg","s",null,""],["HCl","aq",["H⁺","Cl⁻"],"2"]],R:[["MgCl₂","aq",["Mg²⁺","Cl⁻"],""],["H₂","g",null,""]],
  ans:"Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g)",wrong:["Mg(s) + 2HCl(aq) → Mg²⁺(aq) + 2Cl⁻(aq) + H₂(g)","Mg(s) + H⁺(aq) → Mg²⁺(aq) + H₂(g)","Mg²⁺(aq) + 2Cl⁻(aq) → MgCl₂(aq)"],why:"The metal is a solid element, so it stays as Mg(s). Hydrogen is a gas made of molecules."},
 {L:[["Zn","s",null,""],["CuSO₄","aq",["Cu²⁺","SO₄²⁻"],""]],R:[["ZnSO₄","aq",["Zn²⁺","SO₄²⁻"],""],["Cu","s",null,""]],
  ans:"Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)",wrong:["Zn²⁺(aq) + Cu(s) → Zn(s) + Cu²⁺(aq)","Zn(s) + CuSO₄(aq) → Zn²⁺(aq) + SO₄²⁻(aq) + Cu(s)","Zn(s) + SO₄²⁻(aq) → ZnSO₄(aq)"],why:"SO₄²⁻ is the spectator ion. This is a redox reaction: zinc is oxidised and copper(II) ions are reduced."},
 {L:[["CuO","s",null,""],["H₂SO₄","aq",["H⁺","SO₄²⁻"],""]],R:[["CuSO₄","aq",["Cu²⁺","SO₄²⁻"],""],["H₂O","l",null,""]],
  ans:"CuO(s) + 2H⁺(aq) → Cu²⁺(aq) + H₂O(l)",wrong:["O²⁻(s) + 2H⁺(aq) → H₂O(l)","Cu²⁺(aq) + SO₄²⁻(aq) → CuSO₄(aq)","CuO(s) + H⁺(aq) → Cu²⁺(aq) + H₂O(l)"],why:"Copper(II) oxide is an insoluble solid, so it stays as CuO(s). H₂SO₄ gives 2H⁺ for every SO₄²⁻."}];
const sp=s=>`${s[3]}${s[0]}(${s[1]})`;
const fullEq=e=>e.L.map(sp).join(" + ")+" → "+e.R.map(sp).join(" + ");
const LEARN=`<div class="explain"><b>How to write an ionic equation</b><span>1. Write the balanced symbol equation <b>with state symbols</b>.<br>
2. <b>Split</b> only what is dissolved AND ionic: soluble ionic compounds (aq) and strong acids/alkalis (aq), e.g. NaCl(aq) → Na⁺(aq) + Cl⁻(aq).<br>
3. <b>Do not split</b> solids (s), including precipitates, liquids (l) such as water, gases (g), or covalent molecules even when (aq), such as Cl₂(aq) and Br₂(aq).<br>
4. <b>Cross out the spectator ions</b>: ions that appear unchanged on both sides.<br>
5. Write what is left and check the <b>atoms and charges</b> balance.</span></div>
<div class="explain"><b>Worked example</b><span>AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)<br>
Split: Ag⁺(aq) + <s>NO₃⁻(aq)</s> + <s>Na⁺(aq)</s> + Cl⁻(aq) → AgCl(s) + <s>Na⁺(aq)</s> + <s>NO₃⁻(aq)</s><br>
AgCl is a solid precipitate, so it stays together. Na⁺ and NO₃⁻ are spectators.<br>
<b>Ionic equation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s)</b></span></div>
<div class="explain"><b>Why the state matters</b><span>Na₂CO₃(aq) + 2HCl(aq) → … gives <b>CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)</b><br>
but CaCO₃(s) + 2HCl(aq) → … gives <b>CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + H₂O(l) + CO₂(g)</b><br>
Same carbonate, different state. The solid CaCO₃ cannot be split.</span></div>`;
function startIonic(){
  const t=topicByCode("1.1");
  G={kind:"ionic",key:"ionic",backHash:"elemental-frontier",eqs:shuffle(IONIC).slice(0,6),i:-1,stage:0,got:0,max:0};
  frame("1.1 Formulae, equations and amounts of substance","Ionic Equation Builder","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);
  ionicRender();
}
function ionicRender(){
  const g=$("#g");
  if(G.i<0){g.innerHTML=`<p>Learn the rules, then build ionic equations for six reactions in three steps: <b>split</b>, <b>cross out</b>, <b>write</b>.</p>${LEARN}<div class="row"><button class="primary" data-act="istart">Start</button></div>`;return}
  if(G.i>=G.eqs.length){g.innerHTML=results("ionic",G.got,G.max,`<details class="model"><summary><b>Review the rules</b></summary>${LEARN}</details>`);return}
  const e=G.eqs[G.i],R=G.r;
  const all=[...e.L.map((s,j)=>["L"+j,s]),...e.R.map((s,j)=>["R"+j,s])];
  const ions=[...new Set(all.filter(([,s])=>s[2]).flatMap(([,s])=>s[2]))];
  const spec=ions.filter(x=>e.L.some(s=>s[2]&&s[2].includes(x))&&e.R.some(s=>s[2]&&s[2].includes(x)));
  let body="";
  const eqBtns=(side,pref)=>side.map((s,j)=>{const id=pref+j,on=R.split.has(id),need=!!s[2];let c=on?"on":"";if(R.s1)c=(on===need)?"right":"wrong";return `<button class="spc ${c}" data-act="isplit" data-k="${id}" ${R.s1?"disabled":""}>${esc(sp(s))}${R.s1?`<small>${need?"split":"keep"}</small>`:""}</button>`}).join(`<span class="plus">+</span>`);
  body+=`<div class="qhead">STEP 1 · SPLIT</div><p>Tap every substance that splits into ions.</p><div class="eqline">${eqBtns(e.L,"L")}<span class="plus">→</span>${eqBtns(e.R,"R")}</div>`;
  if(!R.s1) body+=`<div class="row"><button class="primary" data-act="is1">Check step 1</button></div>`;
  else{
    body+=`<div class="explain ${R.ok1?"ok":"bad"}"><b>${R.ok1?"Correct":"Not quite"}</b><span>Split: ${all.filter(([,s])=>s[2]).map(([,s])=>`${esc(sp(s))} → ${s[2].map(x=>esc(x)+"(aq)").join(" + ")}`).join("<br>")}${all.some(([,s])=>!s[2])?`<br>Keep together: ${all.filter(([,s])=>!s[2]).map(([,s])=>esc(sp(s))).join(", ")}`:""}</span></div>
    <div class="qhead">STEP 2 · CROSS OUT</div><p>Tap the spectator ions: the ones that are unchanged on both sides.</p><div class="eqline">${ions.map(x=>{const on=R.spec.has(x),need=spec.includes(x);let c=on?"on":"";if(R.s2)c=(on===need)?"right":"wrong";return `<button class="spc ${c} ${R.s2&&need?"strike":""}" data-act="ispec" data-k="${esc(x)}" ${R.s2?"disabled":""}>${esc(x)}(aq)</button>`}).join("")}</div>`;
    if(!R.s2) body+=`<div class="row"><button class="primary" data-act="is2">Check step 2</button></div>`;
    else{
      R.opts=R.opts||shuffle([e.ans,...e.wrong]);
      body+=`<div class="explain ${R.ok2?"ok":"bad"}"><b>${R.ok2?"Correct":"Not quite"}</b><span>Spectator ions: ${spec.map(x=>esc(x)).join(", ")}</span></div>
      <div class="qhead">STEP 3 · WRITE</div><p>Which is the correct ionic equation?</p><div class="opts">${R.opts.map(o=>`<button class="opt ${R.s3?(o===e.ans?"right":o===R.pick?"wrong":""):""}" data-act="ipick" data-k="${esc(o)}" ${R.s3?"disabled":""}>${esc(o)}</button>`).join("")}</div>`;
      if(R.s3) body+=`<div class="explain pop ${R.ok3?"ok":"bad"}"><b>${R.ok3?"Correct":"Not quite"}: ${esc(e.ans)}</b><span>${esc(e.why)}</span></div><div class="row"><button class="primary" id="nx" data-act="inext">${G.i===G.eqs.length-1?"See results":"Next reaction"}</button></div>`;
    }
  }
  g.innerHTML=`<div class="hud"><span>Reaction <strong>${G.i+1}</strong>/${G.eqs.length}</span><span>Score <strong>${G.got}</strong>/${G.max}</span></div>
  <div class="card"><div class="ask"><small>BALANCED SYMBOL EQUATION</small>${esc(fullEq(e))}</div></div>${body}
  <details class="model"><summary><b>Rules</b></summary>${LEARN}</details>`;
  const n=$("#nx");if(n)n.focus();
}
function ionicAct(a,k){
  if(a==="istart"){G.i=0;G.r={split:new Set(),spec:new Set()};return ionicRender()}
  if(a==="inext"){G.i++;G.r={split:new Set(),spec:new Set()};return ionicRender()}
  const e=G.eqs[G.i],R=G.r;
  if(a==="isplit"&&!R.s1){R.split.has(k)?R.split.delete(k):R.split.add(k)}
  if(a==="is1"){R.s1=true;const need=[...e.L.map((s,j)=>s[2]?"L"+j:null),...e.R.map((s,j)=>s[2]?"R"+j:null)].filter(Boolean);R.ok1=need.length===R.split.size&&need.every(x=>R.split.has(x));G.got+=R.ok1?1:0;G.max++}
  if(a==="ispec"&&!R.s2){R.spec.has(k)?R.spec.delete(k):R.spec.add(k)}
  if(a==="is2"){R.s2=true;const ions=[...new Set([...e.L,...e.R].filter(s=>s[2]).flatMap(s=>s[2]))],spec=ions.filter(x=>e.L.some(s=>s[2]&&s[2].includes(x))&&e.R.some(s=>s[2]&&s[2].includes(x)));R.ok2=spec.length===R.spec.size&&spec.every(x=>R.spec.has(x));G.got+=R.ok2?1:0;G.max++}
  if(a==="ipick"&&!R.s3){R.s3=true;R.pick=k;R.ok3=k===e.ans;G.got+=R.ok3?1:0;G.max++}
  ionicRender();
}
