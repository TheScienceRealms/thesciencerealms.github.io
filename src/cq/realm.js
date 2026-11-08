/* ================= REACTION LAB: Hess's Law Escape Room, Mechanism Missions, Mechanism Match-Up, Titration Lab ================= */
const RL_KINDS=["hess","mech","tit"];
const fmtH=v=>(v>0?"+":v<0?"−":"")+Math.abs(v);
const numIn=s=>parseFloat(String(s).replace(/[−–]/g,"-").replace(/[^\d.\-+]/g,""));

/* ---------- HESS'S LAW ESCAPE ROOM ---------- */
// Cycle: R (top left) -> P (top right) is the unknown. B is the bottom corner.
// legs: [{side:"R"|"P", up:true if the arrow points from B up to R/P, label, calc, v}]
const HESS=[
 {t:"Formation from combustion data",q:"Calculate the standard enthalpy of formation of methane.",R:"C(s) + 2H₂(g)",P:"CH₄(g)",B:"CO₂(g) + 2H₂O(l)",
  legs:[{side:"R",up:false,label:"ΔcH(C) + 2ΔcH(H₂)",calc:"−394 + 2(−286)",v:-966},{side:"P",up:false,label:"ΔcH(CH₄)",calc:"−890",v:-890}],tip:"Combustion data: the arrows point DOWN to CO₂ and H₂O."},
 {t:"Combustion from formation data",q:"Calculate the standard enthalpy of combustion of ethanol.",R:"C₂H₅OH(l) + 3O₂(g)",P:"2CO₂(g) + 3H₂O(l)",B:"2C(s) + 3H₂(g) + 3½O₂(g)",
  legs:[{side:"R",up:true,label:"ΔfH(C₂H₅OH)",calc:"−277 (O₂ is zero)",v:-277},{side:"P",up:true,label:"2ΔfH(CO₂) + 3ΔfH(H₂O)",calc:"2(−394) + 3(−286)",v:-1646}],tip:"Formation data: the arrows point UP from the elements."},
 {t:"Formation of ethane",q:"Calculate the standard enthalpy of formation of ethane.",R:"2C(s) + 3H₂(g)",P:"C₂H₆(g)",B:"2CO₂(g) + 3H₂O(l)",
  legs:[{side:"R",up:false,label:"2ΔcH(C) + 3ΔcH(H₂)",calc:"2(−394) + 3(−286)",v:-1646},{side:"P",up:false,label:"ΔcH(C₂H₆)",calc:"−1560",v:-1560}],tip:"Multiply each enthalpy by the number of moles in the equation."},
 {t:"Hydrogenation of ethene",q:"Calculate ΔH for C₂H₄(g) + H₂(g) → C₂H₆(g).",R:"C₂H₄(g) + H₂(g)",P:"C₂H₆(g)",B:"2C(s) + 3H₂(g)",
  legs:[{side:"R",up:true,label:"ΔfH(C₂H₄)",calc:"+52 (H₂ is zero)",v:52},{side:"P",up:true,label:"ΔfH(C₂H₆)",calc:"−85",v:-85}],tip:"Elements in their standard states have ΔfH = 0."},
 {t:"Sulfur trioxide",q:"Calculate ΔH for 2SO₂(g) + O₂(g) → 2SO₃(g).",R:"2SO₂(g) + O₂(g)",P:"2SO₃(g)",B:"2S(s) + 3O₂(g)",
  legs:[{side:"R",up:true,label:"2ΔfH(SO₂)",calc:"2(−297)",v:-594},{side:"P",up:true,label:"2ΔfH(SO₃)",calc:"2(−396)",v:-792}],tip:"The 2 in front of SO₂ and SO₃ doubles their ΔfH values."},
 {t:"Formation of propane",q:"Calculate the standard enthalpy of formation of propane.",R:"3C(s) + 4H₂(g)",P:"C₃H₈(g)",B:"3CO₂(g) + 4H₂O(l)",
  legs:[{side:"R",up:false,label:"3ΔcH(C) + 4ΔcH(H₂)",calc:"3(−394) + 4(−286)",v:-2326},{side:"P",up:false,label:"ΔcH(C₃H₈)",calc:"−2220",v:-2220}],tip:"Bigger multipliers, same method."}];
const HESS_SPOT=[
 {q:"A student calculates ΔfH(CH₄) from: ΔcH(C) = −394, ΔcH(H₂) = −286, ΔcH(CH₄) = −890 kJ mol⁻¹. Their working: ΔH = −394 + 2(−286) + (−890) = −1856 kJ mol⁻¹. What went wrong?",
  a:"They travelled against the ΔcH(CH₄) arrow but did not reverse its sign",w:["They forgot to multiply ΔcH(H₂) by 2","They should have used ΔcH(O₂)","Nothing: −1856 kJ mol⁻¹ is correct"],exp:"Route: elements → CO₂ + H₂O → CH₄. The last leg goes against the combustion arrow, so +890. Answer −76 kJ mol⁻¹."},
 {q:"For ΔcH(C₂H₅OH) a student writes: ΔH = (−394 − 286) − (−277) = −403 kJ mol⁻¹. What went wrong?",
  a:"They did not multiply by the moles of CO₂ (2) and H₂O (3)",w:["They reversed the wrong arrow","They should have added −277","Formation enthalpies cannot be used for combustion"],exp:"2(−394) + 3(−286) = −1646; −1646 − (−277) = −1369 kJ mol⁻¹."},
 {q:"Which statement of Hess’s Law would gain the mark?",a:"The enthalpy change for a reaction is independent of the route taken, provided the initial and final conditions are the same",w:["Energy cannot be created or destroyed in a reaction","The enthalpy change is the same whichever direction the reaction goes","The enthalpy change depends on the route taken"],exp:"Learn the CCEA wording: independent of the route, same initial and final conditions."}];
function hessAnswer(r){const L=r.legs.find(l=>l.side==="R"),Rr=r.legs.find(l=>l.side==="P");return (L.up?-L.v:L.v)+(Rr.up?Rr.v:-Rr.v)}
// travel R -> B -> P. Leg R: arrow R->B (down) = with; B->R (up) = against. Leg P: arrow B->P (up) = with; P->B (down) = against.
const legWith=l=>l.side==="R"?!l.up:l.up;
function hessSVG(r,show){
  const pos={R:[90,60],P:[430,60],B:[260,215]};
  const arrow=(a,b,cls,lab,ly,dir)=>{const [x1,y1]=pos[a],[x2,y2]=pos[b];return `<line x1="${x1}" y1="${y1+16}" x2="${x2}" y2="${y2-18}" class="${cls}" marker-end="url(#hah)"/>`};
  const leg=(l,i)=>{const from=l.up?"B":l.side,to=l.up?l.side:"B";const [x1,y1]=pos[from],[x2,y2]=pos[to];
    const sx=x1+(x2-x1)*0.12,sy=y1+(y2-y1)*0.12+(from==="B"?-14:16),ex=x2-(x2-x1)*0.12,ey=y2-(y2-y1)*0.12+(to==="B"?-14:16);
    const mx=(x1+x2)/2+(l.side==="R"?-70:70),my=(y1+y2)/2+20;const st=show&&show[i];
    return `<g class="hleg ${st?st:""}" data-act="hflip" data-k="${i}"><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" class="harr" marker-end="url(#hah)"/><line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" class="hhit"/>
    <text x="${mx}" y="${my-8}" text-anchor="middle" class="hlab">${l.label}</text><text x="${mx}" y="${my+10}" text-anchor="middle" class="hval">= ${fmtH(l.v)} kJ mol⁻¹</text></g>`};
  return `<svg viewBox="0 0 520 270" class="hsvg" role="img" aria-label="Hess's Law cycle"><defs><marker id="hah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hhead"/></marker></defs>
  <text x="90" y="64" text-anchor="middle" class="hsp">${r.R}</text><text x="430" y="64" text-anchor="middle" class="hsp">${r.P}</text><text x="260" y="222" text-anchor="middle" class="hsp">${r.B}</text>
  <line x1="${90+70}" y1="58" x2="${430-60}" y2="58" class="harr unk" marker-end="url(#hah)"/><text x="260" y="44" text-anchor="middle" class="hlab unk">ΔH = ?</text>
  ${r.legs.map(leg).join("")}</svg>`;
}
function startHess(){
  G={kind:"hess",key:"hess",backHash:"molecular-realm",rooms:HESS.map((r,i)=>({...r,i})),ri:0,got:0,max:0,spot:shuffle(HESS_SPOT).slice(0,2)};
  frame("2.8 Energetics · Reaction Lab","Hess’s Law Escape Room","molecular-realm","AS2",`<section class="panel" id="g"></section>`);
  hessBegin();
}
function hessBegin(){G.r={stage:0,choice:G.rooms[G.ri]?G.rooms[G.ri].legs.map(()=>null):[],checked:false};hessRender()}
function hessDoors(){const n=G.rooms.length+G.spot.length;return `<div class="doors" aria-label="Rooms">${Array.from({length:n},(_,i)=>`<span class="door ${i<G.ri?"open":i===G.ri?"cur":""}">${i<G.ri?"🔓":"🔒"}</span>`).join("")}</div>`}
function hessRender(){
  const g=$("#g");
  if(G.ri>=G.rooms.length){const s=G.spot[G.ri-G.rooms.length],R=G.r;
    if(!R.o)R.o=shuffle([s.a,...s.w]);
    g.innerHTML=`<div class="hud"><span>Room <strong>${G.ri+1}</strong>/${G.rooms.length+G.spot.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>${hessDoors()}
    <h3>Spot the Hess mistake</h3><p class="qtext">${s.q}</p><div class="opts">${R.o.map((o,n)=>`<button class="opt ${R.checked?(o===s.a?"right":n===R.pick?"wrong":""):""}" data-act="hspot" data-k="${n}" ${R.checked?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>
    ${R.checked?`<div class="explain pop ${R.ok?"ok":"bad"}"><b>${R.ok?"Correct · door unlocked":"Not quite"}</b><span>${esc(s.exp)}</span></div><div class="row"><button class="primary" id="nx" data-act="hnext">${G.ri===G.rooms.length+G.spot.length-1?"Escape!":"Next room"}</button></div>`:""}`;
    const n=$("#nx");if(n)n.focus();return}
  const r=G.rooms[G.ri],R=G.r,ans=hessAnswer(r);
  let body="";
  if(R.stage===0){
    const show=R.checked?r.legs.map((l,i)=>R.choice[i]===legWith(l)?"good":"bad"):r.legs.map((l,i)=>R.choice[i]===null?"":R.choice[i]?"with":"against");
    body=`<p><b>Step 1: follow the route.</b> Travel from <b>${r.R}</b> down to <b>${r.B}</b> and up to <b>${r.P}</b>. For each arrow, decide whether you travel <b>with</b> it (keep the sign) or <b>against</b> it (reverse the sign).</p>
    <div class="figbox">${hessSVG(r,show)}</div>
    <div class="legs">${r.legs.map((l,i)=>`<div class="legrow"><span><b>${l.label}</b> <small>${fmtH(l.v)} kJ mol⁻¹</small></span><button class="mbtn ${R.choice[i]===true?"on":""}" data-act="hdir" data-k="${i}:1" ${R.checked?"disabled":""}>With → keep ${fmtH(l.v)}</button><button class="mbtn ${R.choice[i]===false?"on":""}" data-act="hdir" data-k="${i}:0" ${R.checked?"disabled":""}>Against → ${fmtH(-l.v)}</button></div>`).join("")}</div>
    ${R.checked?`<div class="explain pop ${R.dirOk===r.legs.length?"ok":"bad"}"><b>${R.dirOk}/${r.legs.length} directions right</b>${r.legs.map((l,i)=>R.choice[i]===legWith(l)?"":`<span>${esc(l.label)}: you travel <b>${legWith(l)?"with":"against"}</b> this arrow, so it counts as ${fmtH(legWith(l)?l.v:-l.v)}.</span>`).join("")}<span class="small">${esc(r.tip)}</span></div><div class="row"><button class="primary" id="nx" data-act="hstage">Step 2: calculate →</button></div>`:`<div class="row"><button class="primary" data-act="hcheck" ${R.choice.some(c=>c===null)?"disabled":""}>Check directions</button></div>`}`;
  } else {
    const terms=r.legs.map(l=>legWith(l)?l.v:-l.v);
    body=`<p><b>Step 2: calculate ΔH.</b> Add the values along your route.</p><div class="figbox">${hessSVG(r,r.legs.map(()=>"good"))}</div>
    <div class="eqbox">ΔH = ${terms.map((t,i)=>(i?" + ":"")+"("+fmtH(t)+")").join("")}</div>
    <div class="row"><label for="hin" class="small">ΔH / kJ mol⁻¹</label><input id="hin" class="numin" inputmode="decimal" ${R.done?"disabled":""} value="${R.val??""}"><button class="primary" data-act="hcalc" ${R.done?"disabled":""}>Check answer</button></div>
    ${R.done?`<div class="explain pop ${R.ok?"ok":"bad"}"><b>${R.ok?"Correct · door unlocked":"Not quite"}</b><span>${R.why}</span><span>ΔH = ${terms.map(fmtH).join(" + ").replace(/\+ −/g,"− ")} = <b>${fmtH(ans)} kJ mol⁻¹</b></span></div><div class="row"><button class="primary" id="nx" data-act="hnext">Next room</button></div>`:""}`;
  }
  g.innerHTML=`<div class="hud"><span>Room <strong>${G.ri+1}</strong>/${G.rooms.length+G.spot.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>${hessDoors()}<h3>${esc(r.t)}</h3><p class="qtext">${r.q}</p>${body}`;
  const n=$("#nx")||$("#hin");if(n)n.focus();
}
function hessAct(a,k){
  const R=G.r;
  if(a==="hnext"){G.ri++;if(G.ri<G.rooms.length+G.spot.length)return hessBegin();return $("#g").innerHTML=results(G.key,G.got,G.max,`<p class="muted">You escaped! Clockwise route = anticlockwise route, every time.</p>`)}
  if(G.ri>=G.rooms.length){if(a==="hspot"&&!R.checked){const s=G.spot[G.ri-G.rooms.length];R.checked=true;R.pick=+k;R.ok=R.o[+k]===s.a;G.max++;if(R.ok)G.got++}return hessRender()}
  const r=G.rooms[G.ri];
  if(a==="hdir"&&!R.checked){const [i,v]=k.split(":");R.choice[+i]=v==="1"}
  if(a==="hflip"&&!R.checked&&R.stage===0){const i=+k;R.choice[i]=R.choice[i]===null?true:!R.choice[i]}
  if(a==="hcheck"){R.checked=true;R.dirOk=r.legs.filter((l,i)=>R.choice[i]===legWith(l)).length;G.got+=R.dirOk;G.max+=r.legs.length}
  if(a==="hstage")R.stage=1;
  if(a==="hcalc"&&!R.done){const v=numIn($("#hin").value);if(isNaN(v))return;R.val=$("#hin").value;const ans=hessAnswer(r);R.done=true;R.ok=Math.abs(v-ans)<1.5;G.max+=2;if(R.ok){G.got+=2;R.why="Clockwise total = anticlockwise total."}
    else{const L=r.legs;const alt=[ -( (legWith(L[0])?L[0].v:-L[0].v) )+(legWith(L[1])?L[1].v:-L[1].v), (legWith(L[0])?L[0].v:-L[0].v)-(legWith(L[1])?L[1].v:-L[1].v)];
      if(Math.abs(v+ans)<1.5)R.why="Your sign is the wrong way round. Check which arrow you travel against.";
      else if(alt.some(x=>Math.abs(v-x)<1.5))R.why="One leg has the wrong sign: you travel against one arrow, so reverse that value.";
      else R.why="Add the two route values exactly as written in the box."}}
  hessRender();
}

/* ---------- MECHANISM MISSIONS ---------- */
// drawing helpers: atoms, bonds, lone pairs. Targets carry data-k ids.
const mA=(id,x,y,t,tg)=>`<g ${tg?`class="tgt" data-act="mtap" data-k="${id}"`:""}><circle cx="${x}" cy="${y}" r="17" class="hit"/><text x="${x}" y="${y+7}" class="mat" text-anchor="middle">${t}</text></g>`;
const mT=(x,y,t,c="")=>`<text x="${x}" y="${y+7}" class="mat ${c}" text-anchor="middle">${t}</text>`;
const mB=(id,x1,y1,x2,y2,dbl,tg)=>{const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,s=17;const a=[x1+ux*s,y1+uy*s,x2-ux*s,y2-uy*s];
  const ln=(o)=>`<line x1="${a[0]-uy*o}" y1="${a[1]+ux*o}" x2="${a[2]-uy*o}" y2="${a[3]+ux*o}" class="mbd"/>`;
  return `<g ${tg?`class="tgt" data-act="mtap" data-k="${id}"`:""}>${tg?`<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" class="hitl"/>`:""}${dbl?ln(-5)+ln(5):ln(0)}</g>`};
const mLP=(id,x,y,vert,tg)=>`<g ${tg?`class="tgt" data-act="mtap" data-k="${id}"`:""}><circle cx="${x}" cy="${y}" r="11" class="hit"/>${vert?`<circle cx="${x}" cy="${y-5}" r="2.6" class="dot"/><circle cx="${x}" cy="${y+5}" r="2.6" class="dot"/>`:`<circle cx="${x-5}" cy="${y}" r="2.6" class="dot"/><circle cx="${x+5}" cy="${y}" r="2.6" class="dot"/>`}</g>`;
const mD=(x,y,t)=>`<text x="${x}" y="${y}" class="mdel" text-anchor="middle">${t}</text>`;
const mQ=(x,y,t)=>`<text x="${x}" y="${y}" class="mchg" text-anchor="middle">${t}</text>`;
const MECH=[
 {id:"ethene-hbr",topic:"2.4",title:"Ethene + hydrogen bromide",reag:"Ethene gas is bubbled through hydrogen bromide at room temperature.",mech:"Electrophilic addition",attacker:"Electrophile",
  steps:[{cap:"Step 1: the C=C attacks the δ+ hydrogen; the H–Br bond breaks heterolytically.",pts:{pi:[160,140],H3:[330,90],hbr:[370,90],Br:[410,90]},
    svg:d=>mA("C1",120,140,"C")+mA("C2",200,140,"C")+mA("h1",80,100,"H")+mA("h2",80,180,"H")+mA("h3",240,100,"H")+mA("h4",240,180,"H")+mB("x",120,140,80,100)+mB("x",120,140,80,180)+mB("x",200,140,240,100)+mB("x",200,140,240,180)+mB("pi",120,140,200,140,1,1)+mA("H3",330,90,"H",1)+mA("Br",410,90,"Br",1)+mB("hbr",330,90,410,90,0,1)+(d?mD(330,62,"δ+")+mD(410,62,"δ−"):""),arrows:[["pi","H3"],["hbr","Br"]]},
   {cap:"Step 2: the bromide ion’s lone pair attacks the carbocation.",pts:{lpBr:[322,140],Cp:[200,140]},
    svg:()=>mT(110,140,"H₃C")+mB("x",135,140,200,140)+mA("Cp",200,140,"C",1)+mQ(222,120,"+")+mA("x",200,90,"H")+mA("x",200,190,"H")+mB("x",200,140,200,90)+mB("x",200,140,200,190)+mA("BrM",345,140,"Br",1)+mQ(372,120,"−")+mLP("lpBr",322,140,1,1)+mLP("x",345,116)+mLP("x",345,164),arrows:[["lpBr","Cp"]]}],
  hunt:[["Tap the atom in H–Br with a partial positive charge (δ+).",["H3"],"Bromine is more electronegative, so the H is δ+ and acts as the electrophile."],["Tap the region of high electron density in ethene.",["pi"],"The C=C double bond (the π bond) is a centre of high electron density."]],
  fin:[["What is the intermediate?","A carbocation (CH₃CH₂⁺)",["A free radical (CH₃CH₂•)","A carbanion (CH₃CH₂⁻)","A bromonium ion"]],["Name the product.","Bromoethane",["1,2-dibromoethane","Ethanol","Bromoethene"]]]},
 {id:"ethene-br2",topic:"2.4",title:"Ethene + bromine",reag:"Ethene reacts with bromine at room temperature (bromine water is decolourised).",mech:"Electrophilic addition",attacker:"Electrophile",
  steps:[{cap:"Step 1: the C=C induces a dipole in Br–Br; it attacks the δ+ bromine and the Br–Br bond breaks heterolytically.",pts:{pi:[160,140],BrA:[330,90],bb:[370,90],BrB:[410,90]},
    svg:d=>mA("C1",120,140,"C")+mA("C2",200,140,"C")+mA("x",80,100,"H")+mA("x",80,180,"H")+mA("x",240,100,"H")+mA("x",240,180,"H")+mB("x",120,140,80,100)+mB("x",120,140,80,180)+mB("x",200,140,240,100)+mB("x",200,140,240,180)+mB("pi",120,140,200,140,1,1)+mA("BrA",330,90,"Br",1)+mA("BrB",410,90,"Br",1)+mB("bb",330,90,410,90,0,1)+(d?mD(330,62,"δ+")+mD(410,62,"δ−"):""),arrows:[["pi","BrA"],["bb","BrB"]]},
   {cap:"Step 2: the bromide ion attacks the carbocation.",pts:{lpBr:[322,140],Cp:[200,140]},
    svg:()=>mT(105,140,"BrH₂C")+mB("x",143,140,200,140)+mA("Cp",200,140,"C",1)+mQ(222,120,"+")+mA("x",200,90,"H")+mA("x",200,190,"H")+mB("x",200,140,200,90)+mB("x",200,140,200,190)+mA("BrM",345,140,"Br",1)+mQ(372,120,"−")+mLP("lpBr",322,140,1,1)+mLP("x",345,116)+mLP("x",345,164),arrows:[["lpBr","Cp"]]}],
  hunt:[["As Br₂ approaches the C=C, which bromine atom becomes δ+?",["BrA"],"The electron-rich C=C repels the electrons in Br–Br, so the nearer bromine becomes δ+ (an induced dipole)."],["Tap the region of high electron density.",["pi"],"The C=C double bond."]],
  fin:[["What is the intermediate?","A carbocation (CH₂BrCH₂⁺)",["A free radical","A carbanion","An alkoxide ion"]],["Name the product.","1,2-dibromoethane",["Bromoethane","1,1-dibromoethane","Dibromoethene"]]]},
 {id:"propene-hbr",topic:"2.4",title:"Propene + hydrogen bromide (major product)",reag:"Propene reacts with hydrogen bromide. Draw the route to the MAJOR product.",mech:"Electrophilic addition",attacker:"Electrophile",
  steps:[{cap:"Step 1: the H adds to the end carbon, giving the more stable secondary carbocation.",pts:{pi:[150,150],H3:[350,70],hbr:[390,70],Br:[430,70]},
    svg:d=>mA("C1",110,150,"C")+mA("C2",190,150,"C",1)+mA("x",70,110,"H")+mA("x",70,190,"H")+mA("x",190,100,"H")+mB("x",110,150,70,110)+mB("x",110,150,70,190)+mB("x",190,150,190,100)+mB("pi",110,150,190,150,1,1)+mB("x",190,150,250,150)+mT(272,150,"CH₃")+mA("H3",350,70,"H",1)+mA("Br",430,70,"Br",1)+mB("hbr",350,70,430,70,0,1)+(d?mD(350,42,"δ+")+mD(430,42,"δ−"):""),arrows:[["pi","H3"],["hbr","Br"]]},
   {cap:"Step 2: the bromide ion attacks the secondary carbocation.",pts:{lpBr:[190,222],Cp:[190,150]},
    svg:()=>mT(110,150,"H₃C")+mB("x",133,150,190,150)+mA("Cp",190,150,"C",1)+mQ(212,130,"+")+mA("x",190,100,"H")+mB("x",190,150,190,100)+mB("x",190,150,250,150)+mT(272,150,"CH₃")+mA("BrM",190,245,"Br",1)+mQ(218,240,"−")+mLP("lpBr",190,222,0,1)+mLP("x",166,245,1)+mLP("x",214,262),arrows:[["lpBr","Cp"]]}],
  hunt:[["Tap the δ+ atom that the C=C attacks.",["H3"],"The δ+ hydrogen of H–Br is the electrophile."],["Tap the carbon that will carry the positive charge in the MAJOR route.",["C2"],"If H adds to the end carbon (C1), the positive charge sits on the middle carbon: a secondary carbocation."]],
  fin:[["Why is 2-bromopropane the major product?","The secondary carbocation is more stable than the primary carbocation",["The primary carbocation is more stable","Bromine always adds to the end carbon","Hydrogen bromide is a nucleophile"]],["Name the minor product.","1-bromopropane",["2-bromopropane","1,2-dibromopropane","Propan-1-ol"]]]},
 {id:"bromoethane-oh",topic:"2.5",title:"Bromoethane + aqueous alkali (primary)",reag:"Bromoethane is warmed with aqueous potassium hydroxide.",mech:"Nucleophilic substitution",attacker:"Nucleophile",
  steps:[{cap:"One step: the OH⁻ lone pair attacks the δ+ carbon as the C–Br bond breaks heterolytically.",pts:{lpO:[172,150],C:[250,150],cbr:[295,150],Br:[340,150]},
    svg:d=>mT(110,150,"H")+mB("x",120,150,150,150)+mA("O",150,150,"O",1)+mQ(150,120,"−")+mLP("lpO",172,150,1,1)+mLP("x",150,174)+mA("C",250,150,"C",1)+mA("x",250,100,"H")+mB("x",250,150,250,100)+mB("x",250,150,250,200)+mT(250,215,"CH₃")+mA("x",205,190,"H")+mB("x",250,150,213,182)+mA("Br",340,150,"Br",1)+mB("cbr",250,150,340,150,0,1)+(d?mD(250,128,"")+mD(232,120,"δ+")+mD(342,120,"δ−"):""),arrows:[["lpO","C"],["cbr","Br"]]}],
  hunt:[["Tap the nucleophile.",["O","lpO"],"OH⁻ has a lone pair it can donate to an electron-deficient carbon."],["Tap the δ+ carbon.",["C"],"Bromine is more electronegative, so the carbon bonded to it is δ+."]],
  fin:[["What are the products?","Ethanol and bromide ions",["Ethene, water and bromide ions","Bromoethanol","Ethanal and HBr"]],["Why is OH⁻ called a nucleophile?","It donates a lone pair to an electron-deficient carbon",["It accepts a lone pair of electrons","It has a positive charge","It is a free radical"]]]},
 {id:"tert-oh",topic:"2.5",title:"2-bromo-2-methylpropane + aqueous alkali (tertiary)",reag:"2-bromo-2-methylpropane is warmed with aqueous sodium hydroxide.",mech:"Nucleophilic substitution",attacker:"Nucleophile",
  steps:[{cap:"Step 1: the C–Br bond breaks heterolytically, forming a tertiary carbocation and a bromide ion.",pts:{cbr:[295,150],Br:[340,150]},
    svg:d=>mA("C",250,150,"C",1)+mB("x",250,150,250,100)+mT(250,88,"CH₃")+mB("x",250,150,250,200)+mT(250,215,"CH₃")+mB("x",250,150,195,150)+mT(172,150,"H₃C")+mA("Br",340,150,"Br",1)+mB("cbr",250,150,340,150,0,1)+(d?mD(272,128,"δ+")+mD(342,120,"δ−"):""),arrows:[["cbr","Br"]]},
   {cap:"Step 2: the OH⁻ lone pair attacks the carbocation.",pts:{lpO:[338,150],Cp:[250,150]},
    svg:()=>mA("Cp",250,150,"C",1)+mQ(272,128,"+")+mB("x",250,150,250,100)+mT(250,88,"CH₃")+mB("x",250,150,250,200)+mT(250,215,"CH₃")+mB("x",250,150,195,150)+mT(172,150,"H₃C")+mA("O",360,150,"O",1)+mQ(360,120,"−")+mLP("lpO",338,150,1,1)+mLP("x",360,174)+mB("x",360,150,395,150)+mT(405,150,"H"),arrows:[["lpO","Cp"]]}],
  hunt:[["Tap the bond that breaks first.",["cbr"],"In a tertiary halogenoalkane, the C–Br bond breaks first to give a stable tertiary carbocation."],["Tap the δ− atom.",["Br"],"Bromine is more electronegative than carbon."]],
  fin:[["Name the organic product.","2-methylpropan-2-ol",["2-methylpropan-1-ol","Butan-2-ol","2-methylpropene"]],["How does this differ from the primary mechanism?","It happens in two steps via a carbocation",["It happens in one step","It uses an electrophile","No curly arrows are needed"]]]}];
const MECH_MATCH=[
 ["2.4","Ethene + hydrogen bromide at room temperature","Electrophilic addition",["Nucleophilic substitution","Elimination","Radical substitution"],"The C=C is attacked by the δ+ hydrogen (an electrophile)."],
 ["2.4","Propene + bromine at room temperature","Electrophilic addition",["Radical substitution","Nucleophilic substitution","Elimination"],"Halogens add across the C=C."],
 ["2.5","Bromoethane + aqueous potassium hydroxide, warm","Nucleophilic substitution",["Elimination","Electrophilic addition","Radical substitution"],"Aqueous OH⁻ substitutes for the halogen, giving an alcohol."],
 ["2.5","2-bromopropane + potassium hydroxide in ethanol, reflux","Elimination",["Nucleophilic substitution","Electrophilic addition","Radical substitution"],"Ethanolic KOH removes HBr to give propene. Aqueous = substitution; ethanolic = elimination."],
 ["2.5","1-bromobutane + potassium cyanide, reflux","Nucleophilic substitution",["Elimination","Electrophilic addition","Radical substitution"],"CN⁻ is a nucleophile; the product is a nitrile."],
 ["2.5","Bromoethane + excess concentrated ammonia","Nucleophilic substitution",["Electrophilic addition","Elimination","Radical substitution"],"NH₃ uses its lone pair as a nucleophile; the product is an amine."],
 ["2.3","Methane + chlorine in ultraviolet light","Radical substitution",["Electrophilic addition","Nucleophilic substitution","Elimination"],"UV light causes homolytic fission of Cl–Cl. No curly arrows are used for radical mechanisms at AS."],
 ["2.4","Ethene + hydrogen with finely divided nickel","Addition (hydrogenation)",["Elimination","Nucleophilic substitution","Radical substitution"],"Catalytic hydrogenation adds H₂ across the C=C."],
 ["2.4","Which species is an electrophile?","H⁺ (or the δ+ H in H–Br)",["OH⁻","NH₃","CN⁻"],"An electrophile accepts a pair of electrons."],
 ["2.5","Which species is a nucleophile?","OH⁻",["H⁺","Br₂","NO₂⁺"],"A nucleophile donates a lone pair to an electron-deficient atom."],
 ["2.4","Which carbocation is the most stable?","(CH₃)₃C⁺ (tertiary)",["CH₃⁺","CH₃CH₂⁺ (primary)","(CH₃)₂CH⁺ (secondary)"],"More alkyl groups push electron density towards the positive carbon."],
 ["2.4","Where must a curly arrow start?","At a lone pair or a covalent bond",["At the atom that receives electrons","At a positive charge","Anywhere near the molecule"],"A curly arrow shows a pair of electrons moving, so it starts where the electrons are."],
 ["2.4","What is heterolytic fission?","A covalent bond breaks and both electrons go to one atom",["A covalent bond breaks and each atom gets one electron","Two ions join together","A bond forms between two radicals"],"Homolytic fission gives radicals; heterolytic gives ions."]];
function startMechMatch(){const pool=shuffle(MECH_MATCH).slice(0,10);
  G={kind:"colour",quiz:true,key:"mechmatch",qs:pool.map(o=>({o,opts:[o[2],...o[3]],order:shuffle([0,1,2,3])})),i:0,score:0,streak:0,correct:0,backHash:"molecular-realm",timed:false};
  frame("2.4 and 2.5 · Reaction Lab","Mechanism Match-Up","molecular-realm","AS2",`<section class="panel" id="g"></section>`);mcAsk()}
function startMech(id){
  const M=MECH.find(m=>m.id===id);
  G={kind:"mech",key:"mech-"+id,backHash:"molecular-realm",M,stage:0,hi:0,si:0,fi:0,scores:[0,0,0,0],max:[M.hunt.length,1,M.steps.reduce((s,x)=>s+x.arrows.length*2,0),M.fin.length],sel:null,drawn:M.steps.map(()=>[]),checked:M.steps.map(()=>false),fb:null};
  frame(M.topic+" · Mechanism Mission",M.title,"molecular-realm","AS2",`<p class="lead" style="color:#d7ecf7">${esc(M.reag)}</p><section class="panel" id="g"></section>`);
  mechRender();
}
function curl(p1,p2,k){const [x1,y1]=p1,[x2,y2]=p2,dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1;let nx=-dy/L,ny=dx/L;if(ny>0){nx=-nx;ny=-ny}const b=Math.min(60,L*0.45);const cx=(x1+x2)/2+nx*b,cy=(y1+y2)/2+ny*b;const ex=x2-(x2-cx)/Math.hypot(x2-cx,y2-cy)*16,ey=y2-(y2-cy)/Math.hypot(x2-cx,y2-cy)*16;return `<path d="M${x1},${y1} Q${cx},${cy} ${ex},${ey}" class="curl ${k||""}" marker-end="url(#mah)"/>`}
function mechSVG(step,{delta,arrows,sel,cls}){return `<svg viewBox="0 0 470 280" class="msvg ${cls||""}" role="img" aria-label="${esc(step.cap)}"><defs><marker id="mah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="mhead"/></marker></defs>${step.svg(delta).replace(`data-k="${sel}"`,`data-k="${sel}" data-sel="1"`)}${(arrows||[]).map(a=>curl(step.pts[a[0]]||[0,0],step.pts[a[1]]||[0,0],a[2])).join("")}</svg>`}
function mechRender(){
  const M=G.M,g=$("#g"),st=["Electron Hunter","Match-Up","Curly arrows","Finish it"];
  let h=`<div class="stages">${st.map((s,i)=>`<span class="stg ${i===G.stage?"on":i<G.stage?"done":""}">${i+1}. ${s}</span>`).join("")}</div>`;
  if(G.stage===0){const [q,ok,why]=M.hunt[G.hi];const f=G.fb;
    h+=`<p class="qtext">${q}</p><div class="figbox mfig">${mechSVG(M.steps[0],{delta:false,cls:f?"":"hunt"})}</div>`+(f?`<div class="explain pop ${f.ok?"ok":"bad"}"><b>${f.ok?"Correct":"Not quite"}</b><span>${esc(why)}</span></div><div class="row"><button class="primary" id="nx" data-act="mnext">Next</button></div>`:`<p class="small muted">Tap an atom, bond or lone pair on the diagram.</p>`)}
  else if(G.stage===1){const f=G.fb;if(!G.mo)G.mo=shuffle(["Electrophilic addition","Nucleophilic substitution","Elimination","Radical substitution"]);
    h+=`<p class="qtext">${esc(M.reag)} Which mechanism is this?</p><div class="opts">${G.mo.map((o,n)=>`<button class="opt ${f?(o===M.mech?"right":n===f.pick?"wrong":""):""}" data-act="mmatch" data-k="${n}" ${f?"disabled":""}><kbd>${n+1}</kbd><span>${o}</span></button>`).join("")}</div>`+(f?`<div class="explain pop ${f.ok?"ok":"bad"}"><b>${f.ok?"Correct":"It is "+M.mech.toLowerCase()}</b><span>The attacking species is ${M.attacker==="Electrophile"?"an electrophile: it accepts a pair of electrons from the C=C.":"a nucleophile: it donates a lone pair to the δ+ carbon."}</span></div><div class="row"><button class="primary" id="nx" data-act="mnext">Draw the curly arrows →</button></div>`:"")}
  else if(G.stage===2){const step=M.steps[G.si],dr=G.drawn[G.si],ck=G.checked[G.si];
    const shown=ck?dr.map(d=>[d[0],d[1],d[2]]).concat(step.arrows.filter(r=>!dr.some(d=>d[0]===r[0]&&d[1]===r[1])).map(r=>[r[0],r[1],"miss"])):dr;
    h+=`<p class="qtext">${M.steps.length>1?`Step ${G.si+1} of ${M.steps.length}. `:""}Draw ${step.arrows.length} curly arrow${step.arrows.length>1?"s":""}.</p><p class="small muted">Tap where the electrons start (a lone pair or a bond), then tap where they go. ${G.sel?`<b>Start: selected. Now tap the destination.</b>`:""}</p>
    <div class="figbox mfig">${mechSVG(step,{delta:true,arrows:shown,sel:G.sel})}</div>
    ${ck?`<div class="explain pop ${G.fb.ok?"ok":"bad"}"><b>${G.fb.got}/${step.arrows.length*2} marks</b>${G.fb.lines.map(l=>`<span>${l}</span>`).join("")}<span class="small">${esc(step.cap)}</span></div><div class="row"><button class="primary" id="nx" data-act="mnext">${G.si<M.steps.length-1?"Next step →":"Finish it →"}</button></div>`
      :`<div class="row"><button class="ghost" data-act="mundo" ${dr.length?"":"disabled"}>Undo arrow</button><button class="primary" data-act="mcheck" ${dr.length?"":"disabled"}>Check arrows</button><span class="small muted">${dr.length} drawn</span></div>`}`}
  else if(G.stage===3){const [q,a,w]=M.fin[G.fi],f=G.fb;if(!G.fo)G.fo=shuffle([a,...w]);
    h+=`<p class="qtext">${q}</p><div class="opts">${G.fo.map((o,n)=>`<button class="opt ${f?(o===a?"right":n===f.pick?"wrong":""):""}" data-act="mfin" data-k="${n}" ${f?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>`+(f?`<div class="row"><button class="primary" id="nx" data-act="mnext">${G.fi<M.fin.length-1?"Next":"See the full mechanism"}</button></div>`:"")}
  else{const tot=G.scores.reduce((a,b)=>a+b,0),max=G.max.reduce((a,b)=>a+b,0);
    h+=`<h3>The full mechanism</h3>${M.steps.map(s=>`<div class="figbox mfig">${mechSVG(s,{delta:true,arrows:s.arrows,cls:"replay"})}</div><p class="small">${esc(s.cap)}</p>`).join("")}
    <table class="bandtable"><tr><th>Stage</th><th>Marks</th></tr>${["Electron Hunter","Match-Up","Curly arrows","Finish it"].map((s,i)=>`<tr><td>${s}</td><td>${G.scores[i]}/${G.max[i]}</td></tr>`).join("")}</table>`+results(G.key,tot,max)}
  g.innerHTML=h;const n=$("#nx");if(n)n.focus();
}
function mechAct(a,k){
  const M=G.M;
  if(a==="mnext"){G.fb=null;
    if(G.stage===0){G.hi++;if(G.hi>=M.hunt.length)G.stage=1}
    else if(G.stage===1)G.stage=2
    else if(G.stage===2){G.si++;G.sel=null;if(G.si>=M.steps.length)G.stage=3}
    else if(G.stage===3){G.fi++;G.fo=null;if(G.fi>=M.fin.length)G.stage=4}
    return mechRender()}
  if(G.stage===0&&a==="mtap"&&!G.fb){const ok=M.hunt[G.hi][1].includes(k);G.fb={ok};if(ok)G.scores[0]++;return mechRender()}
  if(G.stage===1&&a==="mmatch"&&!G.fb){const ok=G.mo[+k]===M.mech;G.fb={ok,pick:+k};if(ok)G.scores[1]++;return mechRender()}
  if(G.stage===2){const step=M.steps[G.si],dr=G.drawn[G.si];if(G.checked[G.si])return;
    if(a==="mtap"){if(!step.pts[k]){G.sel=null;return mechRender()}if(!G.sel)G.sel=k;else if(G.sel===k)G.sel=null;else{dr.push([G.sel,k]);G.sel=null}return mechRender()}
    if(a==="mundo"){dr.pop();G.sel=null;return mechRender()}
    if(a==="mcheck"){let got=0;const lines=[];
      step.arrows.forEach(([s,e])=>{const d=dr.find(x=>x[0]===s);const nm=id=>({pi:"the C=C bond",hbr:"the H–Br bond",bb:"the Br–Br bond",cbr:"the C–Br bond",lpBr:"the bromide lone pair",lpO:"the oxygen lone pair"}[id]||"that atom");
        if(d){got++;if(d[1]===e){got++;d[2]="good"}else{d[2]="bad";lines.push(`Arrow from ${nm(s)}: right start, wrong destination.`)}}
        else{const wrong=dr.find(x=>x[1]===e);if(wrong){got++;wrong[2]="bad";lines.push(`An arrow reaches the right place but starts in the wrong place. It should start at ${nm(s)}.`)}else lines.push(`Missing an arrow from ${nm(s)}.`)}});
      dr.forEach(d=>{if(!d[2])d[2]="bad"});
      if(dr.length>step.arrows.length)lines.push("Extra arrows lose marks in the exam: draw only the electron movements that happen.");
      if(!lines.length)lines.push("Every arrow starts at a lone pair or bond and ends at the right atom.");
      got=Math.max(0,Math.min(got,step.arrows.length*2)-(dr.length>step.arrows.length?1:0));
      G.scores[2]+=got;G.checked[G.si]=true;G.fb={ok:got===step.arrows.length*2,got,lines};return mechRender()}}
  if(G.stage===3&&a==="mfin"&&!G.fb){const ok=G.fo[+k]===M.fin[G.fi][1];G.fb={ok,pick:+k};if(ok)G.scores[3]++;return mechRender()}
}

/* ---------- TITRATION LAB (first person) ---------- */
const TIT_SET=[
 ["b-rinse","Rinse the burette with the hydrochloric acid",1,"Rinsing with the acid stops water diluting it."],
 ["b-fill","Fill the burette with acid using a small funnel",1,"Fill above the zero line, below eye level."],
 ["b-funnel","Remove the funnel",1,"Drips from the funnel would change the reading."],
 ["b-jet","Run some acid through so the jet below the tap is full (no air bubble)",1,"An air bubble in the jet makes the titre wrong."],
 ["p-rinse","Rinse the pipette with the sodium hydroxide solution",1,"Rinsing with water would dilute the alkali."],
 ["p-fill","Use a pipette filler to fill to the line (bottom of meniscus on the line at eye level)",1,"Read at eye level to avoid parallax error."],
 ["p-out","Run the alkali into a conical flask and touch the tip on the surface",1,"Never blow out the last drop; the pipette is calibrated for it."],
 ["ind","Add 3–5 drops of methyl orange indicator",1,"Only a few drops: indicators are weak acids themselves."],
 ["tile","Stand the flask on a white tile",1,"A white tile makes the colour change easier to see."],
 ["x-water","Rinse the burette with deionised water only",0,"Water left in the burette dilutes the acid, so the titre is too big."],
 ["x-blow","Blow out the last drop from the pipette",0,"The pipette is calibrated to leave that drop behind."],
 ["x-ind","Add 1 cm³ of indicator to be safe",0,"Too much indicator affects the result. Use 3–5 drops."],
 ["x-flask","Rinse the conical flask with sodium hydroxide",0,"Extra alkali in the flask increases the titre. Rinse it with deionised water instead."]];
function startTit(){
  const conc=+(0.0800+Math.round(Math.random()*30)*0.0010).toFixed(4);
  G={kind:"tit",key:"titration",backHash:"elemental-frontier",T:{stage:0,done:new Set(),wrong:new Set(),conc,acid:0.100,runs:[],cur:null,marks:0,max:0,calc:{}},opts:shuffle(TIT_SET)};
  frame("1.9 Acid–base titrations · Reaction Lab","Titration Lab","elemental-frontier","AS1",`<p class="lead" style="color:#d7ecf7">Find the concentration of a sodium hydroxide solution. 25.0 cm³ of the alkali is titrated with 0.100 mol dm⁻³ hydrochloric acid using methyl orange.</p><section class="panel" id="g"></section>`);
  titRender();
}
const titTrue=()=>25.0*G.T.conc/G.T.acid;
function titNewRun(){const T=G.T;const init=Math.round(Math.random()*20)*0.05;T.cur={init,vol:0,end:+(titTrue()+(Math.random()*0.1-0.05)).toFixed(2),readInit:null,readFinal:null,flash:0,phase:"init"}}
function benchSVG(T){const run=T.cur,lvl=run?Math.min(50,run.init+run.vol):(T.done.has("b-fill")?0.5:50);const fill=T.done.has("b-fill");
  const end=run&&run.vol>=run.end,flash=run&&run.flash>0&&!end;const col=!T.done.has("ind")?"#eef6fb":end?"#e8475a":flash?"#f08c3c":"#f6d53b";
  const y0=24,y1=276,yl=y0+(lvl/50)*(y1-y0),hasL=T.done.has("p-out");
  return `<svg viewBox="0 0 520 430" class="bench" role="img" aria-label="Lab bench with burette and conical flask">
  <rect x="0" y="400" width="520" height="30" class="bwood"/><rect x="170" y="20" width="10" height="382" class="bstand"/><rect x="120" y="394" width="120" height="8" rx="3" class="bstand"/>
  <rect x="180" y="120" width="70" height="9" rx="3" class="bclamp"/>
  <rect x="246" y="${y0}" width="22" height="${y1-y0}" rx="3" class="btube"/>${fill?`<rect x="248" y="${yl.toFixed(1)}" width="18" height="${(y1-yl).toFixed(1)}" class="bacid"/>`:""}
  ${[0,10,20,30,40,50].map(v=>`<line x1="246" x2="255" y1="${y0+v/50*(y1-y0)}" y2="${y0+v/50*(y1-y0)}" class="btick"/><text x="240" y="${y0+v/50*(y1-y0)+4}" class="bnum" text-anchor="end">${v}</text>`).join("")}
  ${T.done.has("b-funnel")||!fill?"":`<path d="M240,4 L274,4 L262,24 L252,24 Z" class="bglass"/>`}
  <path d="M250,276 L264,276 L261,296 L253,296 Z" class="bglass"/><rect x="243" y="284" width="28" height="7" rx="2" class="btap"/><path d="M257,296 L257,${T.done.has("b-jet")?318:306}" class="bjet ${T.done.has("b-jet")?"full":""}"/>
  ${run&&run.drip?`<circle cx="257" cy="326" r="3.2" class="bdrop"/>`:""}
  ${T.done.has("tile")?`<rect x="186" y="392" width="142" height="8" rx="2" class="btile"/>`:""}
  <path d="M245,330 L269,330 L269,348 L306,392 L208,392 L245,348 Z" class="bflask"/>
  ${hasL?`<path d="M227,370 L287,370 L306,392 L208,392 Z" style="fill:${col}" class="bliq"/>`:""}
  <g opacity="${hasL?0.35:1}"><rect x="402" y="70" width="8" height="240" rx="3" class="bglass"/><ellipse cx="406" cy="200" rx="14" ry="26" class="bglass"/><rect x="398" y="50" width="16" height="26" rx="6" class="bfiller"/>${T.done.has("p-fill")&&!hasL?`<ellipse cx="406" cy="200" rx="11" ry="22" class="balk"/><rect x="404" y="120" width="4" height="150" class="balk"/>`:""}<text x="406" y="326" text-anchor="middle" class="bnum">pipette</text></g>
  <rect x="30" y="306" width="56" height="88" rx="8" class="bbottle"/><text x="58" y="346" text-anchor="middle" class="blabel">HCl</text><text x="58" y="361" text-anchor="middle" class="bnum">0.100</text>
  <rect x="94" y="320" width="50" height="74" rx="8" class="bbottle"/><text x="119" y="361" text-anchor="middle" class="blabel">NaOH</text>
  <rect x="446" y="342" width="36" height="52" rx="6" class="bbottle"/><text x="464" y="372" text-anchor="middle" class="blabel" style="font-size:10px">M.O.</text></svg>`}
function zoomSVG(r){const top=Math.max(-0.1,r-0.8),px=100;let t="";for(let v=Math.max(0,Math.ceil(top*10)/10);v<=top+1.6+1e-9;v=+(v+0.1).toFixed(1)){const y=10+(v-top)*px,major=Math.abs(v-Math.round(v))<1e-6,half=Math.abs(v*10%5)<1e-6;t+=`<line x1="60" x2="${major?110:half?96:86}" y1="${y}" y2="${y}" class="ztick"/>${major?`<text x="54" y="${y+5}" text-anchor="end" class="znum">${Math.round(v)}</text>`:half?`<text x="54" y="${y+4}" text-anchor="end" class="znum s">${v.toFixed(1)}</text>`:""}`}
  const ym=10+(r-top)*px;return `<svg viewBox="0 0 200 180" class="zoom" role="img" aria-label="Close-up of the burette scale"><rect x="60" y="0" width="90" height="180" class="ztube"/><path d="M60,${ym-7} Q105,${ym+8} 150,${ym-7} L150,180 L60,180 Z" class="zliq"/><line x1="0" x2="200" y1="${ym}" y2="${ym}" class="zeye"/>${t}<text x="196" y="${ym-4}" text-anchor="end" class="zlab">eye level</text></svg>`}
function titRender(){
  const T=G.T,g=$("#g"),st=["Set up","Titrate","Calculate"];
  let h=`<div class="stages">${st.map((s,i)=>`<span class="stg ${i===T.stage?"on":i<T.stage?"done":""}">${i+1}. ${s}</span>`).join("")}</div>`;
  if(T.stage===0){const need=TIT_SET.filter(x=>x[2]).length;
    h+=`<div class="titgrid"><div class="figbox">${benchSVG(T)}</div><div><p><b>Prepare the burette and the flask.</b> Choose the correct steps. Some are mistakes students often make.</p><div class="kit">${G.opts.map(([id,txt,ok])=>`<button class="kitbtn ${T.done.has(id)?"right":T.wrong.has(id)?"wrong":""}" data-act="tset" data-k="${id}" ${T.done.has(id)||T.wrong.has(id)?"disabled":""}>${esc(txt)}</button>`).join("")}</div>
    ${T.fb?`<div class="explain pop ${T.fb.ok?"ok":"bad"}"><b>${T.fb.ok?"Good":"That would cause an error"}</b><span>${esc(T.fb.t)}</span></div>`:""}
    <div class="row"><button class="primary" data-act="tgo" ${T.done.size<need?"disabled":""}>Start titrating →</button><span class="small muted">${T.done.size}/${need} steps done</span></div></div></div>`}
  else if(T.stage===1){const c=T.cur,acc=T.runs.filter(r=>!r.rough);
    const conc=titConcordant()||T.runs.length>=5;
    h+=`<div class="titgrid"><div class="figbox">${benchSVG(T)}</div><div>`;
    if(!c){h+=`<p>${T.runs.length?"Refill the burette and set up a fresh flask.":"Ready for your rough titration."}</p><div class="row"><button class="primary" data-act="tnew" ${conc?"disabled":""}>${T.runs.length?"Next titration":"Start rough titration"}</button>${conc?`<button class="primary" data-act="tcalc">Two concordant titres: calculate →</button>`:""}</div>`}
    else if(c.phase==="init"){h+=`<p><b>Read the initial burette reading</b> at eye level, from the bottom of the meniscus. Give it to 2 decimal places (ending in 0 or 5).</p><div class="figbox zbox">${zoomSVG(c.init)}</div><div class="row"><input id="tin" class="numin" inputmode="decimal" aria-label="Initial reading in cm3"><span>cm³</span><button class="primary" data-act="tinit">Record</button></div>${T.fb?`<div class="explain bad"><b>Check again</b><span>${T.fb.t}</span></div>`:""}`}
    else if(c.phase==="run"){h+=`<p><b>Titrate.</b> ${T.runs.length?"Run in quickly to about 1 cm³ before the rough titre, then add drop by drop, swirling.":"This is the rough titration: run it in quickly and stop when the colour changes."}</p>
      <div class="row"><button class="primary" data-act="tflow" id="flow">Open tap (hold)</button><button class="ghost" data-act="tdrop">Add one drop</button><button class="ghost" data-act="tswirl">Swirl</button></div>
      <p class="small muted">Methyl orange: yellow in alkali, turning red at the end point (acid added to alkali: yellow to red).</p><div class="row"><button class="primary" data-act="tstop">Stop and read the burette</button></div>`}
    else if(c.phase==="final"){h+=`<p><b>Read the final burette reading.</b></p><div class="figbox zbox">${zoomSVG(c.init+c.vol)}</div><div class="row"><input id="tin" class="numin" inputmode="decimal" aria-label="Final reading in cm3"><span>cm³</span><button class="primary" data-act="tfinal">Record</button></div>${T.fb?`<div class="explain bad"><b>Check again</b><span>${T.fb.t}</span></div>`:""}`}
    h+=`<table class="bandtable titt"><tr><th></th>${["Rough","1","2","3","4"].map(x=>`<th>${x}</th>`).join("")}</tr>
    <tr><td>Final reading / cm³</td>${[0,1,2,3,4].map(i=>`<td>${T.runs[i]?T.runs[i].f.toFixed(2):""}</td>`).join("")}</tr>
    <tr><td>Initial reading / cm³</td>${[0,1,2,3,4].map(i=>`<td>${T.runs[i]?T.runs[i].i.toFixed(2):""}</td>`).join("")}</tr>
    <tr><td>Titre / cm³</td>${[0,1,2,3,4].map(i=>`<td class="${T.runs[i]&&T.runs[i].con?"hl":""}">${T.runs[i]?T.runs[i].t.toFixed(2):""}</td>`).join("")}</tr></table>
    ${T.note?`<div class="explain ${T.note.ok?"ok":"bad"}"><span>${T.note.t}</span></div>`:""}</div></div>`}
  else if(T.stage===2){const con=T.runs.filter(r=>r.con),mean=con.reduce((s,r)=>s+r.t,0)/con.length,C=T.calc;
    const exp={mean:+mean.toFixed(2),mol:T.acid*mean/1000,conc:T.acid*mean/1000*1000/25};
    const row=(id,lab,unit)=>`<div class="row"><label class="small" for="c-${id}" style="min-width:220px">${lab}</label><input id="c-${id}" class="numin" inputmode="decimal" value="${C[id]?.v??""}" ${C[id]?"disabled":""}><span class="small">${unit}</span>${C[id]?`<b class="${C[id].ok?"okt":"badt"}">${C[id].ok?"✓":"✗ "+C[id].ans}</b>`:""}</div>`;
    h+=`<p><b>Calculate the concentration of the sodium hydroxide.</b> HCl + NaOH → NaCl + H₂O (1 : 1)</p><p class="small">Concordant titres: ${con.map(r=>r.t.toFixed(2)).join(" and ")} cm³</p>
    ${row("mean","1. Mean titre","cm³")}${row("mol","2. Moles of HCl = 0.100 × titre ÷ 1000","mol")}${row("conc","3. Concentration of NaOH = moles × 1000 ÷ 25.0","mol dm⁻³")}
    ${Object.keys(C).length<3?`<div class="row"><button class="primary" data-act="tcheck">Check calculation</button></div>`:`<div class="explain ok"><span>True concentration: ${T.conc.toFixed(4)} mol dm⁻³. Your titres gave ${exp.conc.toFixed(4)} mol dm⁻³.</span></div>${results(G.key,T.marks,T.max)}`}`;G.exp=exp}
  g.innerHTML=h;const n=$("#tin");if(n)n.focus();
}
function titConcordant(){const T=G.T,acc=T.runs.filter(r=>!r.rough);for(let i=0;i<acc.length;i++)for(let j=i+1;j<acc.length;j++)if(Math.abs(acc[i].t-acc[j].t)<=0.20+1e-9){T.runs.forEach(r=>r.con=false);acc[i].con=acc[j].con=true;return true}return false}
let titTimer=null;
function titStopFlow(){clearInterval(titTimer);titTimer=null;if(G&&G.T&&G.T.cur){G.T.cur.drip=false}}
function titAdd(v){const c=G.T.cur;if(!c||c.phase!=="run")return;c.vol=+(c.vol+v).toFixed(2);if(c.init+c.vol>50){c.vol=50-c.init}const near=c.end-c.vol;if(near>0&&near<1.2)c.flash=1;titRender()}
function titAct(a,k,el){
  const T=G.T;
  if(T.stage===0){
    if(a==="tset"){const o=TIT_SET.find(x=>x[0]===k);T.max++;if(o[2]){T.done.add(k);T.marks++;T.fb={ok:true,t:o[3]}}else{T.wrong.add(k);T.fb={ok:false,t:o[3]}}return titRender()}
    if(a==="tgo"){T.stage=1;T.fb=null;return titRender()}}
  if(T.stage===1){const c=T.cur;
    if(a==="tnew"){titNewRun();T.note=null;T.fb=null;return titRender()}
    if(a==="tcalc"){T.stage=2;return titRender()}
    if(a==="tinit"||a==="tfinal"){const v=numIn($("#tin").value),truth=a==="tinit"?c.init:c.init+c.vol;if(isNaN(v))return;
      const s=$("#tin").value.trim();const dp=(s.split(".")[1]||"").length;
      if(dp!==2){T.fb={t:"Burette readings are recorded to 2 decimal places, for example 0.50 or 23.35."};return titRender()}
      if(Math.abs(v-truth)>0.051){T.fb={t:"Read the bottom of the meniscus at eye level. Each small division is 0.10 cm³; readings end in 0 or 5."};T.max++;return titRender()}
      T.max++;T.marks++;T.fb=null;
      if(a==="tinit"){c.readInit=v;c.phase="run"}
      else{c.readFinal=v;const t=+(v-c.readInit).toFixed(2),rough=T.runs.length===0;T.runs.push({i:c.readInit,f:v,t,rough});const over=c.vol-c.end;
        T.note=c.vol<c.end-0.001?{ok:false,t:"You stopped before the end point (the colour had not changed), so this titre is too small."}:over>0.15?{ok:false,t:`You overshot the end point by about ${over.toFixed(2)} cm³. ${rough?"That is fine for a rough titre.":"Add drop by drop near the end point."}`}:{ok:true,t:rough?"Rough titre recorded. Now do accurate titrations until two agree within 0.20 cm³.":"Good end point: one drop turned it red."};
        if(!rough&&over<=0.15&&c.vol>=c.end-0.001){T.max++;T.marks++}else if(!rough)T.max++;
        T.cur=null;if(titConcordant())T.note={ok:true,t:"Two titres agree within 0.20 cm³: they are concordant. You can now calculate."};
        if(T.runs.length>=5&&!titConcordant()){T.note={ok:false,t:"Five titrations without concordant results. Use your two closest titres."};const acc=T.runs.filter(r=>!r.rough).sort((x,y)=>x.t-y.t);let best=[acc[0],acc[1]];for(let i=1;i<acc.length;i++)if(acc[i].t-acc[i-1].t<best[1].t-best[0].t)best=[acc[i-1],acc[i]];best.forEach(r=>r.con=true)}}
      return titRender()}
    if(c&&c.phase==="run"){
      if(a==="tdrop"){c.drip=true;titAdd(0.05);setTimeout(()=>{if(G&&G.T&&G.T.cur){G.T.cur.drip=false}},150);return}
      if(a==="tswirl"){c.flash=0;return titRender()}
      if(a==="tstop"){titStopFlow();c.phase="final";return titRender()}}}
  if(T.stage===2&&a==="tcheck"){const e=G.exp,C=T.calc;
    const chk=(id,ans,tol)=>{if(C[id])return;const el=$("#c-"+id);if(!el||el.value.trim()==="")return;const v=numIn(el.value);C[id]={v:el.value,ok:Math.abs(v-ans)<=tol,ans:+ans.toPrecision(3)};T.max++;if(C[id].ok)T.marks++};
    chk("mean",e.mean,0.011);chk("mol",e.mol,e.mol*0.01);chk("conc",e.conc,e.conc*0.01);if(C.mean&&!C.mean.ok)C.mean.ans=e.mean.toFixed(2);return titRender()}
}
function titPointer(e,down){const t=e.target.closest('[data-act="tflow"]');if(!G||G.kind!=="tit")return;if(down&&t){e.preventDefault();const c=G.T.cur;if(!c||c.phase!=="run")return;c.drip=true;titStopFlow();c.drip=true;titTimer=setInterval(()=>{const c=G&&G.T&&G.T.cur;if(!c||c.phase!=="run"){titStopFlow();return}titAdd(0.20)},90)}else if(!down)titStopFlow()}
document.addEventListener("pointerdown",e=>titPointer(e,true));document.addEventListener("pointerup",e=>titPointer(e,false));document.addEventListener("pointercancel",e=>titPointer(e,false));

/* ---------- hooks ---------- */
function realmActs(code){const L=[];
  if(code==="1.9")L.push(["titration","Titration Lab","First-person practical · 3 stages"]);
  if(code==="2.8")L.push(["hess","Hess’s Law Escape Room","Follow the arrows · 8 rooms"]);
  MECH.filter(m=>m.topic===code).forEach(m=>L.push(["mech-"+m.id,"Mechanism Mission: "+m.title.split(" (")[0],m.mech+" · 4 stages"]));
  if(code==="2.5")L.push(["mechmatch","Mechanism Match-Up","Reagents and conditions → mechanism"]);
  return L.map(([h,n,s])=>`<a class="act" href="#${h}"><span>${n}<small>${s}</small></span><span class="sc">${bestTxt(h)||"Play"}</span></a>`).join("")}
function realmRoute(h,show){let m;
  if(h==="hess"){show(false);startHess();return true}
  if(h==="titration"){show(false);startTit();return true}
  if(h==="mechmatch"){show(false);startMechMatch();return true}
  if((m=h.match(/^mech-([\w-]+)$/))&&MECH.some(x=>x.id===m[1])){show(false);startMech(m[1]);return true}
  return false}
function realmAct(a,k,t){if(G.kind==="hess")return hessAct(a,k);if(G.kind==="mech")return mechAct(a,k);if(G.kind==="tit")return titAct(a,k,t)}
