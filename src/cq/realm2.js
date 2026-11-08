/* ================= REACTION LAB 2: Halogen Lab, Group II Expedition, Inside the Atom, Collision Course, Equilibrium Engine ================= */
RL_KINDS.push("blab","atom","coll","equi");
/* ---------- first-person bench: test tubes ---------- */
// tube: {label, liq, top (hexane layer colour), ppt, fumes, bubbles, glow, solid}
function tubeSVG(t,x,sel){const h=150,y=40;
  return `<g class="ttube ${sel?"sel":""}" data-act="bsel" data-k="${t.id}"><rect x="${x-24}" y="${y-8}" width="48" height="${h+30}" class="thit"/>
  ${t.fumes?`<g class="fumes ${t.fumes}"><circle cx="${x-6}" cy="${y-14}" r="9"/><circle cx="${x+8}" cy="${y-26}" r="11"/><circle cx="${x-2}" cy="${y-40}" r="8"/></g>`:""}
  ${t.glow?`<circle cx="${x}" cy="${y+40}" r="38" class="glow ${t.glow}"/>`:""}
  <path d="M${x-16},${y} L${x-16},${y+h-16} Q${x},${y+h+6} ${x+16},${y+h-16} L${x+16},${y}" class="tglass"/>
  ${t.liq?`<path d="M${x-14},${y+60} L${x-14},${y+h-16} Q${x},${y+h+3} ${x+14},${y+h-16} L${x+14},${y+60} Z" style="fill:${t.liq}" class="tliq"/>`:""}
  ${t.top?`<rect x="${x-14}" y="${y+38}" width="28" height="22" style="fill:${t.top}" class="tliq"/>`:""}
  ${t.ppt?`<path d="M${x-12},${y+h-26} Q${x},${y+h-4} ${x+12},${y+h-26} Z" style="fill:${t.ppt}" class="tppt"/>`:""}
  ${t.solid?`<path d="M${x-10},${y+h-20} L${x+10},${y+h-20} L${x+6},${y+h-10} L${x-6},${y+h-10} Z" style="fill:${t.solid}"/>`:""}
  ${t.bubbles?[0,1,2,3].map(i=>`<circle cx="${x-7+i*5}" cy="${y+80+i*14}" r="${2+i%2}" class="bub"/>`).join(""):""}
  <text x="${x}" y="${y+h+28}" class="tname" text-anchor="middle">${t.label}</text></g>`}
function rackSVG(tubes,sel,extra=""){const n=tubes.length,gap=Math.min(120,420/n),x0=260-(n-1)*gap/2;
  return `<svg viewBox="0 0 520 250" class="bench rack" role="img" aria-label="Test tubes on the bench"><rect x="0" y="232" width="520" height="18" class="bwood"/><rect x="${x0-50}" y="150" width="${(n-1)*gap+100}" height="14" rx="4" class="brack"/>${tubes.map((t,i)=>tubeSVG(t,x0+i*gap,t.id===sel)).join("")}${extra}</svg>`}
const C={cl2:"#eef7c9",br2:"#f0a43a",i2:"#9b5a2b",brown:"#7a4320",clear:"#eaf6fb",hexI:"#8e4bc4",hexBr:"#f08a2a",white:"#ffffff",cream:"#f3e6b8",yellow:"#f2df52",mg:"#c9ced3"};
/* task: {title, intro, tubes(), reagents:[[id,label]], need:{tube,reag} | null, after(t), q, a, w, exp, eq} */
const HAL=[
 {title:"Displacement 1",intro:"Tube A contains chlorine water. Add potassium bromide solution to it.",tubes:()=>[{id:"A",label:"Cl₂(aq)",liq:C.cl2},{id:"B",label:"Br₂(aq)",liq:C.br2},{id:"Cc",label:"I₂(aq)",liq:C.i2}],
  reag:[["kcl","KCl(aq)"],["kbr","KBr(aq)"],["ki","KI(aq)"],["hex","Hexane"]],need:["A","kbr"],after:t=>{t[0].liq=C.br2},
  q:"What colour change do you observe in tube A?",a:"Colourless/green to yellow/orange/brown",w:["No change","Colourless to violet/purple","Yellow to colourless"],eq:"Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂",exp:"Chlorine is a stronger oxidising agent than bromine, so it displaces bromine."},
 {title:"Displacement 2",intro:"Now add potassium iodide solution to fresh chlorine water in tube A.",tubes:()=>[{id:"A",label:"Cl₂(aq)",liq:C.cl2},{id:"B",label:"Br₂(aq)",liq:C.br2},{id:"Cc",label:"I₂(aq)",liq:C.i2}],
  reag:[["kcl","KCl(aq)"],["kbr","KBr(aq)"],["ki","KI(aq)"],["hex","Hexane"]],need:["A","ki"],after:t=>{t[0].liq=C.brown},
  q:"What colour change do you observe?",a:"Colourless/green to brown",w:["Colourless to yellow/orange","No change","Brown to colourless"],eq:"Cl₂ + 2I⁻ → 2Cl⁻ + I₂",exp:"Iodine in aqueous solution is brown."},
 {title:"Displacement 3",intro:"Add potassium iodide solution to the bromine water in tube B.",tubes:()=>[{id:"A",label:"Cl₂(aq)",liq:C.cl2},{id:"B",label:"Br₂(aq)",liq:C.br2},{id:"Cc",label:"I₂(aq)",liq:C.i2}],
  reag:[["kcl","KCl(aq)"],["kbr","KBr(aq)"],["ki","KI(aq)"],["hex","Hexane"]],need:["B","ki"],after:t=>{t[1].liq=C.brown},
  q:"What colour change do you observe?",a:"Yellow/orange/brown to darker brown",w:["Yellow to colourless","No change","Orange to green"],eq:"Br₂ + 2I⁻ → 2Br⁻ + I₂",exp:"Bromine displaces iodine. The two colours look alike, so hexane is used to confirm."},
 {title:"Confirm with hexane",intro:"Add hexane to tube B, stopper and shake. Let the layers settle.",tubes:()=>[{id:"A",label:"Cl₂(aq)",liq:C.cl2},{id:"B",label:"Br₂ + I⁻",liq:C.brown},{id:"Cc",label:"I₂(aq)",liq:C.i2}],
  reag:[["kcl","KCl(aq)"],["kbr","KBr(aq)"],["ki","KI(aq)"],["hex","Hexane"]],need:["B","hex"],after:t=>{t[1].liq="#f3e7d6";t[1].top=C.hexI},
  q:"What colour is the upper (hexane) layer?",a:"Violet/purple",w:["Yellow/orange/brown","Colourless","Blue-black"],eq:"Iodine is more soluble in non-polar hexane",exp:"Violet/purple in hexane shows iodine. Bromine in hexane would be yellow/orange/brown."},
 {title:"No reaction",intro:"Add potassium bromide solution to the iodine solution in tube C.",tubes:()=>[{id:"A",label:"Cl₂(aq)",liq:C.cl2},{id:"B",label:"Br₂(aq)",liq:C.br2},{id:"Cc",label:"I₂(aq)",liq:C.i2}],
  reag:[["kcl","KCl(aq)"],["kbr","KBr(aq)"],["ki","KI(aq)"],["hex","Hexane"]],need:["Cc","kbr"],after:()=>{},
  q:"What do you observe?",a:"No change: iodine cannot displace bromine",w:["Brown to yellow/orange","A cream precipitate","Steamy fumes"],eq:"I₂ + Br⁻ → no reaction",exp:"Oxidising ability: Cl₂ > Br₂ > I₂, so a halogen only displaces halides below it."},
 {title:"Silver nitrate test",intro:"Unknown solution X. Acidify with dilute nitric acid first, then add silver nitrate solution.",tubes:()=>[{id:"X",label:"X(aq)",liq:C.clear}],
  reag:[["hno3","Dilute HNO₃ then AgNO₃(aq)"],["agno3","AgNO₃(aq) only"],["nh3d","Dilute NH₃(aq)"],["nh3c","Conc. NH₃(aq)"]],need:["X","hno3"],after:t=>{t[0].ppt=C.cream;t[0].liq="#f5efda"},
  q:"A cream precipitate forms. It dissolves in concentrated ammonia but not dilute. Which ion is in X?",a:"Bromide (Br⁻)",w:["Chloride (Cl⁻)","Iodide (I⁻)","Sulfate (SO₄²⁻)"],eq:"Ag⁺(aq) + Br⁻(aq) → AgBr(s)",exp:"Chloride: white, soluble in dilute NH₃. Bromide: cream, soluble in concentrated NH₃. Iodide: yellow, insoluble. Nitric acid removes carbonate ions that would also give a precipitate."},
 {title:"Silver nitrate test",intro:"Unknown solution Y. Carry out the halide test.",tubes:()=>[{id:"Y",label:"Y(aq)",liq:C.clear}],
  reag:[["hno3","Dilute HNO₃ then AgNO₃(aq)"],["agno3","AgNO₃(aq) only"],["nh3d","Dilute NH₃(aq)"],["nh3c","Conc. NH₃(aq)"]],need:["Y","hno3"],after:t=>{t[0].ppt=C.yellow;t[0].liq="#f7f1cf"},
  q:"A yellow precipitate forms that is insoluble in concentrated ammonia. Which ion is in Y?",a:"Iodide (I⁻)",w:["Bromide (Br⁻)","Chloride (Cl⁻)","Carbonate (CO₃²⁻)"],eq:"Ag⁺(aq) + I⁻(aq) → AgI(s)",exp:"Yellow precipitate, insoluble in concentrated ammonia solution: iodide."},
 {title:"Concentrated sulfuric acid",intro:"Add a few drops of concentrated sulfuric acid to solid potassium chloride.",tubes:()=>[{id:"S",label:"KCl(s)",solid:"#f4f4f4"}],
  reag:[["h2so4","Conc. H₂SO₄"],["h3po4","Conc. H₃PO₄"],["water","Water"]],need:["S","h2so4"],after:t=>{t[0].fumes="misty"},
  q:"What is observed?",a:"Steamy/misty fumes (of HCl)",w:["Red-brown vapour","Violet/purple vapour","White precipitate"],eq:"KCl + H₂SO₄ → KHSO₄ + HCl",exp:"Test the gas: white fumes/smoke with a glass rod dipped in concentrated ammonia."},
 {title:"Concentrated sulfuric acid",intro:"Repeat with solid potassium bromide.",tubes:()=>[{id:"S",label:"KBr(s)",solid:"#f4f4f4"}],
  reag:[["h2so4","Conc. H₂SO₄"],["h3po4","Conc. H₃PO₄"],["water","Water"]],need:["S","h2so4"],after:t=>{t[0].fumes="brown"},
  q:"What is observed?",a:"Steamy/misty fumes and red-brown vapour",w:["Steamy/misty fumes only","Violet/purple vapour and a yellow solid","No change"],eq:"2HBr + H₂SO₄ → Br₂ + SO₂ + 2H₂O",exp:"Bromide is a strong enough reducing agent to reduce sulfuric acid to SO₂, forming bromine."},
 {title:"Concentrated sulfuric acid",intro:"Repeat with solid potassium iodide.",tubes:()=>[{id:"S",label:"KI(s)",solid:"#f4f4f4"}],
  reag:[["h2so4","Conc. H₂SO₄"],["h3po4","Conc. H₃PO₄"],["water","Water"]],need:["S","h2so4"],after:t=>{t[0].fumes="violet";t[0].solid="#e8d23a"},
  q:"Which list of observations is complete?",a:"Steamy/misty fumes, violet/purple vapour, smell of rotten eggs, yellow solid and grey-black solid",w:["Steamy/misty fumes and red-brown vapour","Steamy/misty fumes only","Violet/purple vapour only"],eq:"Iodide reduces H₂SO₄ to SO₂, S and H₂S",exp:"Iodide is the strongest reducing agent of the three halides. With phosphoric acid you would only see steamy fumes of HI."}];
const G2=[
 {title:"Magnesium + cold water",intro:"Drop a piece of magnesium ribbon into cold water.",tubes:()=>[{id:"T",label:"water",liq:C.clear}],reag:[["mg","Mg ribbon"],["ca","Ca granule"],["burn","Burn in O₂"],["h2so4","Dilute H₂SO₄"]],need:["T","mg"],after:t=>{t[0].solid=C.mg;t[0].bubbles=1},
  q:"What is observed?",a:"Few bubbles produced slowly, metal dulls",w:["Fizzing, metal rises and falls and disappears","Bright white light","No change at all"],eq:"Mg + 2H₂O → Mg(OH)₂ + H₂ (very slow)",exp:"Magnesium reacts very slowly with cold water but quickly with steam."},
 {title:"Calcium + water",intro:"Add a granule of calcium to water.",tubes:()=>[{id:"T",label:"water",liq:C.clear}],reag:[["mg","Mg ribbon"],["ca","Ca granule"],["burn","Burn in O₂"],["h2so4","Dilute H₂SO₄"]],need:["T","ca"],after:t=>{t[0].bubbles=1;t[0].liq="#f2f6f7";t[0].ppt="#ffffff"},
  q:"What is observed?",a:"Fizzing, mixture warms up, metal rises and falls, metal disappears, white solid produced",w:["Few bubbles produced slowly, metal dulls","Brick red flame","Fizzing initially but the reaction stops"],eq:"Ca + 2H₂O → Ca(OH)₂ + H₂",exp:"The white solid is calcium hydroxide, which is only slightly soluble."},
 {title:"Burning magnesium",intro:"Hold magnesium ribbon in tongs and burn it in oxygen.",tubes:()=>[{id:"T",label:"Mg in O₂"}],reag:[["mg","Mg ribbon"],["ca","Ca granule"],["burn","Burn it"],["h2so4","Dilute H₂SO₄"]],need:["T","burn"],after:t=>{t[0].glow="white";t[0].solid="#fff"},
  q:"What is observed?",a:"Bright white light to form a white powder",w:["Brick red/red flame to form a white powder","Lilac flame","Yellow solid forms"],eq:"2Mg + O₂ → 2MgO",exp:"Never look directly at burning magnesium."},
 {title:"Burning calcium",intro:"Burn calcium in oxygen.",tubes:()=>[{id:"T",label:"Ca in O₂"}],reag:[["mg","Mg ribbon"],["ca","Ca granule"],["burn","Burn it"],["h2so4","Dilute H₂SO₄"]],need:["T","burn"],after:t=>{t[0].glow="red";t[0].solid="#fff"},
  q:"What is observed?",a:"Brick red/red flame to form a white powder",w:["Bright white light to form a white powder","Green flame","Red-brown vapour"],eq:"2Ca + O₂ → 2CaO",exp:"The brick red colour is the calcium flame colour."},
 {title:"Calcium + dilute sulfuric acid",intro:"Add calcium to dilute sulfuric acid.",tubes:()=>[{id:"T",label:"H₂SO₄(aq)",liq:C.clear}],reag:[["mg","Mg ribbon"],["ca","Ca granule"],["burn","Burn in O₂"],["h2so4","Dilute H₂SO₄"]],need:["T","ca"],after:t=>{t[0].bubbles=1;t[0].solid="#f1f1f1"},
  q:"What is observed?",a:"Fizzing initially but the reaction stops",w:["Vigorous fizzing until all the calcium disappears","No reaction","Brick red flame"],eq:"Ca + H₂SO₄ → CaSO₄ + H₂",exp:"Calcium sulfate is sparingly soluble, so it coats the metal and stops the reaction."},
 {title:"Sulfate test",intro:"A solution is acidified, then barium chloride solution is added.",tubes:()=>[{id:"T",label:"Na₂SO₄(aq)",liq:C.clear}],reag:[["bacl2","BaCl₂(aq)"],["agno3","AgNO₃(aq)"],["naoh","NaOH(aq)"],["burn","Burn"]],need:["T","bacl2"],after:t=>{t[0].ppt="#ffffff";t[0].liq="#f4f7f8"},
  q:"What shows a sulfate is present?",a:"White precipitate",w:["Cream precipitate","Yellow precipitate","Fizzing"],eq:"Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)",exp:"Group II sulfates become less soluble down the group, so BaSO₄ is insoluble."}];
const G2_TREND=[
 ["What happens to the solubility of the Group II hydroxides down the group?","It increases",["It decreases","It stays the same","It increases then decreases"],"Mg(OH)₂ is sparingly soluble; Ba(OH)₂ is much more soluble."],
 ["What happens to the solubility of the Group II sulfates down the group?","It decreases",["It increases","It stays the same","They are all insoluble"],"BaSO₄ is insoluble, which is why it is used in the sulfate test."],
 ["What happens to the thermal stability of the Group II carbonates down the group?","It increases",["It decreases","It stays the same","They do not decompose"],"Larger cations with lower charge density polarise the carbonate ion less."]];
function startBLab(set){const tasks=set==="hal"?HAL:G2;
  G={kind:"blab",set,key:set==="hal"?"halolab":"group2",backHash:set==="hal"?"elemental-frontier":"molecular-realm",tasks,ti:0,got:0,max:0,extra:set==="g2"?G2_TREND.slice():[]};
  frame(set==="hal"?"1.8 The halogens · Reaction Lab":"2.11 Group II · Reaction Lab",set==="hal"?"Halogen Lab":"Group II Expedition",G.backHash,set==="hal"?"AS1":"AS2",`<section class="panel" id="g"></section>`);blBegin()}
function blBegin(){const T=G.tasks[G.ti];G.r={tubes:T?T.tubes():[],sel:null,done:false,fb:null,q:null};blRender()}
function blRender(){const g=$("#g");
  if(G.ti>=G.tasks.length){const e=G.extra[0];if(!e){return g.innerHTML=results(G.key,G.got,G.max,`<p class="muted">${G.set==="hal"?"Oxidising ability: Cl₂ > Br₂ > I₂. Reducing ability of halides: I⁻ > Br⁻ > Cl⁻.":"Down Group II: hydroxides more soluble, sulfates less soluble, carbonates more stable."}</p>`)}
    const R=G.r;if(!R.o)R.o=shuffle([e[1],...e[2]]);
    g.innerHTML=`<div class="hud"><span>Trend check</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div><p class="qtext">${e[0]}</p><div class="opts">${R.o.map((o,n)=>`<button class="opt ${R.ans!=null?(o===e[1]?"right":n===R.ans?"wrong":""):""}" data-act="btrend" data-k="${n}" ${R.ans!=null?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>${R.ans!=null?`<div class="explain ${R.o[R.ans]===e[1]?"ok":"bad"}"><span>${esc(e[3])}</span></div><div class="row"><button class="primary" id="nx" data-act="bnextx">Next</button></div>`:""}`;return}
  const T=G.tasks[G.ti],R=G.r;
  let h=`<div class="hud"><span>Station <strong>${G.ti+1}</strong>/${G.tasks.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div><h3>${esc(T.title)}</h3><p>${esc(T.intro)}</p>
  <div class="figbox">${rackSVG(R.tubes,R.sel)}</div>`;
  if(!R.done){h+=`<p class="small muted">${R.sel?"Now choose what to add.":"Tap a test tube to pick it up."}</p><div class="reagents">${T.reag.map(([id,l])=>`<button class="reag" data-act="badd" data-k="${id}" ${R.sel?"":"disabled"}>${l}</button>`).join("")}</div>${R.fb?`<div class="explain bad"><span>${R.fb}</span></div>`:""}`}
  else{if(!R.o)R.o=shuffle([T.a,...T.w]);
    h+=`<p class="qtext">${esc(T.q)}</p><div class="opts">${R.o.map((o,n)=>`<button class="opt ${R.ans!=null?(o===T.a?"right":n===R.ans?"wrong":""):""}" data-act="bobs" data-k="${n}" ${R.ans!=null?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>
    ${R.ans!=null?`<div class="explain pop ${R.o[R.ans]===T.a?"ok":"bad"}"><b>${R.o[R.ans]===T.a?"Correct":"Answer: "+esc(T.a)}</b><span class="eqline">${T.eq}</span><span>${esc(T.exp)}</span></div><div class="row"><button class="primary" id="nx" data-act="bnext">Next station</button></div>`:""}`}
  g.innerHTML=h;const n=$("#nx");if(n)n.focus()}
function blAct(a,k){const R=G.r,T=G.tasks[G.ti];
  if(a==="bnext"){G.ti++;return blBegin()}
  if(a==="bnextx"){G.extra.shift();G.r={};return blRender()}
  if(a==="btrend"&&R.ans==null){R.ans=+k;G.max++;if(R.o[R.ans]===G.extra[0][1])G.got++;return blRender()}
  if(!T)return;
  if(a==="bsel"&&!R.done){R.sel=k;R.fb=null;return blRender()}
  if(a==="badd"&&!R.done){G.max++;if(R.sel===T.need[0]&&k===T.need[1]){G.got++;T.after(R.tubes);R.done=true}
    else{R.fb=k!==T.need[1]&&T.need[1]==="hno3"&&k==="agno3"?"Acidify with dilute nitric acid first: it removes carbonate ions, which would also form a precipitate.":R.sel!==T.need[0]?"Check which tube the instructions say to use.":"That is not the reagent for this step. Read the instructions again."}
    return blRender()}
  if(a==="bobs"&&R.ans==null){R.ans=+k;G.max++;if(R.o[R.ans]===T.a)G.got++;return blRender()}}

/* ---------- INSIDE THE ATOM ---------- */
const EL=["","H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn"];
const SUBS=[["1s",2],["2s",2],["2p",6],["3s",2],["3p",6],["4s",2],["3d",10],["4p",6]];
const ATOM_T=[{p:17,n:18,e:17,t:"Build an atom of chlorine-35 (³⁵Cl)."},{p:17,n:20,e:18,t:"Build a ³⁷Cl⁻ ion."},{p:12,n:12,e:10,t:"Build a ²⁴Mg²⁺ ion."},{p:6,n:8,e:6,t:"Build carbon-14, an isotope of carbon."},{p:8,n:8,e:10,t:"Build an oxide ion, ¹⁶O²⁻."},{p:11,n:12,e:10,t:"Build a ²³Na⁺ ion."}];
const CONF_T=[{z:20,c:0,t:"Fill the subshells for a calcium atom (20 electrons).",ans:{"1s":2,"2s":2,"2p":6,"3s":2,"3p":6,"4s":2}},
 {z:26,c:0,t:"Fill the subshells for an iron atom (26 electrons).",ans:{"1s":2,"2s":2,"2p":6,"3s":2,"3p":6,"4s":2,"3d":6},tip:"4s fills before 3d."},
 {z:24,c:0,t:"Fill the subshells for a chromium atom (24 electrons). Watch out!",ans:{"1s":2,"2s":2,"2p":6,"3s":2,"3p":6,"4s":1,"3d":5},tip:"Chromium is 3d⁵ 4s¹: a half-filled d subshell is more stable."},
 {z:29,c:0,t:"Fill the subshells for a copper atom (29 electrons). Watch out!",ans:{"1s":2,"2s":2,"2p":6,"3s":2,"3p":6,"4s":1,"3d":10},tip:"Copper is 3d¹⁰ 4s¹: a full d subshell is more stable."},
 {z:26,c:2,t:"Fill the subshells for an Fe²⁺ ion.",ans:{"1s":2,"2s":2,"2p":6,"3s":2,"3p":6,"3d":6},tip:"Electrons are lost from 4s before 3d when forming ions."}];
function startAtom(){G={kind:"atom",key:"atom",backHash:"elemental-frontier",stage:0,i:0,got:0,max:0,b:{p:1,n:0,e:1},cf:{},fb:null};frame("1.2 Atomic structure · Reaction Lab","Inside the Atom","elemental-frontier","AS1",`<section class="panel" id="g"></section>`);atRender()}
function atomSVG(b){const sh=[2,8,8,2];let left=b.e,rings="";const parts=[];for(let i=0;i<b.p+b.n;i++)parts.push(i<b.p?"p":"n");
  const nuc=shuffle(parts).slice(0,60).map((t,i)=>{const a=i*2.4,r=Math.sqrt(i)*4.2;return `<circle cx="${(Math.cos(a)*r).toFixed(1)}" cy="${(Math.sin(a)*r).toFixed(1)}" r="5" class="nu ${t}"/>`}).join("");
  sh.forEach((cap,i)=>{const R=48+i*30,k=Math.min(cap,left);left-=k;if(k||i<1)rings+=`<circle r="${R}" class="orb"/>`+Array.from({length:k},(_,j)=>{const a=j/k*6.283-1.57;return `<circle cx="${(Math.cos(a)*R).toFixed(1)}" cy="${(Math.sin(a)*R).toFixed(1)}" r="5" class="el"/>`}).join("")});
  return `<svg viewBox="-170 -170 340 340" class="atomsvg" role="img" aria-label="Atom model"><g class="spin">${rings}</g>${nuc}</svg>`}
function atRender(){const g=$("#g"),b=G.b;
  if(G.stage===0){const T=ATOM_T[G.i],ch=b.p-b.e,sym=EL[b.p]||"?";
    g.innerHTML=`<div class="stages"><span class="stg on">1. Build atoms and ions</span><span class="stg">2. Electron configurations</span></div><div class="hud"><span>Challenge <strong>${G.i+1}</strong>/${ATOM_T.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>
    <p class="qtext">${T.t}</p><div class="shapebox"><div class="figbox atombox">${atomSVG(b)}</div><div class="steppers">
    ${[["p","Protons","+1 charge, mass 1"],["n","Neutrons","no charge, mass 1"],["e","Electrons","−1 charge, mass 1/1840"]].map(([k,l,s])=>`<div class="stp"><span>${l}<small class="muted" style="display:block;font:500 11px var(--mono)">${s}</small></span><button class="sbtn" data-act="aadj" data-k="${k}:-1">−</button><b>${b[k]}</b><button class="sbtn" data-act="aadj" data-k="${k}:1">+</button></div>`).join("")}
    <div class="readout"><span class="small">You have built</span><span class="c"><sup>${b.p+b.n}</sup>${sym}${ch?`<sup>${Math.abs(ch)>1?Math.abs(ch):""}${ch>0?"+":"−"}</sup>`:""}</span><span class="small">${ch===0?"a neutral atom":ch>0?"a positive ion (cation)":"a negative ion (anion)"}</span></div>
    ${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div>`:""}<div class="row">${G.fb&&G.fb.ok?`<button class="primary" id="nx" data-act="anext">Next</button>`:`<button class="primary" data-act="acheck">Check</button>`}</div></div></div>`}
  else{const T=CONF_T[G.i],tot=Object.values(G.cf).reduce((s,v)=>s+v,0);
    g.innerHTML=`<div class="stages"><span class="stg done">1. Build atoms and ions</span><span class="stg on">2. Electron configurations</span></div><div class="hud"><span>Challenge <strong>${G.i+1}</strong>/${CONF_T.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>
    <p class="qtext">${T.t}</p><div class="subs">${SUBS.map(([s,cap])=>`<div class="sub"><b>${s}</b><div class="boxes">${Array.from({length:cap/2},(_,j)=>{const n=G.cf[s]||0,inb=Math.max(0,Math.min(2,n-j))+0;const up=n>j,down=n>j+cap/2;return `<span class="obox">${up?"↑":""}${down?"↓":""}</span>`}).join("")}</div><div class="row" style="gap:4px"><button class="sbtn" data-act="cadj" data-k="${s}:-1">−</button><button class="sbtn" data-act="cadj" data-k="${s}:1">+</button></div></div>`).join("")}</div>
    <p class="small">Electrons placed: <b>${tot}</b> · Configuration: <b>${SUBS.filter(([s])=>G.cf[s]).map(([s])=>s+"<sup>"+G.cf[s]+"</sup>").join(" ")||"–"}</b></p>
    ${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div>`:""}<div class="row">${G.fb&&G.fb.ok?`<button class="primary" id="nx" data-act="anext">${G.i===CONF_T.length-1?"See results":"Next"}</button>`:`<button class="primary" data-act="ccheck">Check</button><button class="ghost" data-act="cclear">Clear</button>`}</div>`}
  const n=$("#nx");if(n)n.focus()}
function atAct(a,k){const b=G.b;
  if(a==="aadj"){const [p,d]=k.split(":");b[p]=Math.max(0,Math.min(30,b[p]+ +d));if(p==="p"&&b.p<1)b.p=1;G.fb=null}
  if(a==="acheck"){const T=ATOM_T[G.i];G.max++;const ok=b.p===T.p&&b.n===T.n&&b.e===T.e;if(ok){G.got++;G.fb={ok,t:`Correct: ${T.p} protons, ${T.n} neutrons, ${T.e} electrons.`}}else G.fb={ok:false,t:b.p!==T.p?"Check the protons: the atomic number decides the element.":b.n!==T.n?"Check the neutrons: neutrons = mass number − protons.":"Check the electrons: a positive ion has lost electrons, a negative ion has gained them."}}
  if(a==="anext"){G.fb=null;G.i++;if(G.stage===0&&G.i>=ATOM_T.length){G.stage=1;G.i=0}else if(G.stage===1&&G.i>=CONF_T.length)return $("#g").innerHTML=results(G.key,G.got,G.max);G.cf={};G.b={p:1,n:0,e:1}}
  if(a==="cadj"){const [s,d]=k.split(":"),cap=SUBS.find(x=>x[0]===s)[1];G.cf[s]=Math.max(0,Math.min(cap,(G.cf[s]||0)+ +d));if(!G.cf[s])delete G.cf[s];G.fb=null}
  if(a==="cclear"){G.cf={};G.fb=null}
  if(a==="ccheck"){const T=CONF_T[G.i];G.max++;const keys=new Set([...Object.keys(T.ans),...Object.keys(G.cf)]);const ok=[...keys].every(s=>(T.ans[s]||0)===(G.cf[s]||0));
    if(ok){G.got++;G.fb={ok,t:"Correct! "+(T.tip||"Fill in order: 1s 2s 2p 3s 3p 4s 3d.")}}else{const tot=Object.values(G.cf).reduce((s,v)=>s+v,0),need=T.z-T.c;G.fb={ok:false,t:tot!==need?`You have ${tot} electrons; you need ${need}.`:(T.tip||"Fill each subshell completely before the next: 1s 2s 2p 3s 3p 4s 3d.")}}}
  atRender()}

/* ---------- COLLISION COURSE (Maxwell–Boltzmann) ---------- */
function startColl(){G={kind:"coll",key:"collision",backHash:"molecular-realm",T:300,conc:24,cat:false,hits:0,succ:0,qi:0,got:0,max:0,ans:null};
  frame("2.9 Kinetics · Reaction Lab","Collision Course","molecular-realm","AS2",`<section class="panel" id="g"></section>`);collRender();collStart()}
const COLL_Q=[["Increase the temperature. What happens to the peak of the Maxwell–Boltzmann curve?","It moves to the right and gets lower",["It moves to the left and gets higher","It stays in the same place","It moves to the right and gets higher"],"More molecules have higher energies, so the curve flattens and shifts right. The area under it stays the same."],
 ["Increase the temperature. Why does the rate increase?","More molecules have energy greater than or equal to the activation energy, so there are more successful collisions per second",["The activation energy decreases","The molecules get bigger","There are more molecules"],"The shaded area beyond Ea grows. Collisions are also more frequent, but the energy effect is the main reason."],
 ["Switch the catalyst on. What changes on the graph?","The activation energy moves left; the curve does not change",["The curve moves right","The area under the curve increases","The peak gets higher"],"A catalyst provides an alternative route with a lower activation energy."],
 ["Increase the concentration. Why does the rate increase?","More particles in the same volume, so more collisions per second",["Each particle has more energy","The activation energy is lower","The curve moves right"],"The proportion of particles with E ≥ Ea is unchanged; there are just more collisions."],
 ["Which statement about the Maxwell–Boltzmann curve gains the mark?","It starts at the origin and never touches the energy axis at high energy",["It touches the x-axis at high energy","It is symmetrical","The area increases at higher temperature"],"No molecules have zero energy, and there is no maximum energy."]];
let collAnim=null;
function collStart(){cancelAnimationFrame(collAnim);const cv=$("#cv");if(!cv)return;const ctx=cv.getContext("2d");let P=[];
  const reset=()=>{P=Array.from({length:G.conc},(_,i)=>({x:Math.random()*300+10,y:Math.random()*200+10,vx:0,vy:0,t:i%2,f:0}));P.forEach(q=>{const sp=collSpeed();const a=Math.random()*6.283;q.vx=Math.cos(a)*sp;q.vy=Math.sin(a)*sp})};reset();G._reset=reset;
  const step=()=>{if(!document.body.contains(cv))return;const W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
    for(const q of P){q.x+=q.vx;q.y+=q.vy;if(q.x<6||q.x>W-6)q.vx*=-1;if(q.y<6||q.y>H-6)q.vy*=-1;q.x=Math.max(6,Math.min(W-6,q.x));q.y=Math.max(6,Math.min(H-6,q.y));q.f=Math.max(0,q.f-1)}
    for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j];if(a.t===b.t)continue;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<13&&d>0){const rv=Math.hypot(a.vx-b.vx,a.vy-b.vy),E=rv*rv;G.hits++;const Ea=G.cat?9:16;if(E>Ea){G.succ++;a.f=b.f=18}
      const nx=dx/d,ny=dy/d,p=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;a.vx-=p*nx;a.vy-=p*ny;b.vx+=p*nx;b.vy+=p*ny;a.x-=nx*(13-d)/2;a.y-=ny*(13-d)/2;b.x+=nx*(13-d)/2;b.y+=ny*(13-d)/2}}
    for(const q of P){ctx.beginPath();ctx.arc(q.x,q.y,6,0,6.283);ctx.fillStyle=q.f?"#ffd60a":q.t?"#4cc9f0":"#ff8fa8";ctx.fill();if(q.f){ctx.strokeStyle="#ff9f1c";ctx.lineWidth=3;ctx.stroke()}}
    const s=$("#csr");if(s)s.textContent=G.succ;const h=$("#chit");if(h)h.textContent=G.hits;collAnim=requestAnimationFrame(step)};step()}
function collSpeed(){const base=Math.sqrt(G.T/300)*2.1;const r=()=>{let s=0;for(let i=0;i<3;i++){const g=(Math.random()+Math.random()+Math.random()-1.5);s+=g*g}return Math.sqrt(s)};return base*r()*0.9}
function mbPath(T){let d="";for(let x=0;x<=300;x+=4){const E=x/60,k=T/300,y=170*Math.sqrt(E)*Math.exp(-E/k)/Math.pow(k,1.5)*1.2;d+=(x?"L":"M")+(30+x)+","+(180-Math.min(170,y)).toFixed(1)}return d}
function mbShade(T,EaX){let d=`M${30+EaX},180`;for(let x=EaX;x<=300;x+=4){const E=x/60,k=T/300,y=170*Math.sqrt(E)*Math.exp(-E/k)/Math.pow(k,1.5)*1.2;d+=`L${30+x},${(180-Math.min(170,y)).toFixed(1)}`}return d+`L330,180Z`}
function collRender(){const g=$("#g"),EaX=G.cat?150:215,Q=COLL_Q[G.qi];
  g.innerHTML=`<div class="titgrid"><div class="figbox"><canvas id="cv" width="320" height="220" class="collcv" aria-label="Particles colliding"></canvas><p class="small">Collisions <b id="chit">0</b> · Successful <b id="csr">0</b> <span class="muted">(flash = enough energy)</span></p></div>
  <div><div class="figbox"><svg viewBox="0 0 340 205" class="mbg" role="img" aria-label="Maxwell–Boltzmann distribution"><line x1="30" y1="180" x2="335" y2="180" class="gax"/><line x1="30" y1="10" x2="30" y2="180" class="gax"/>
  ${G.T!==300?`<path d="${mbPath(300)}" class="mbold"/>`:""}<path d="${mbShade(G.T,EaX)}" class="mbshade"/><path d="${mbPath(G.T)}" class="mbcur"/><line x1="${30+EaX}" x2="${30+EaX}" y1="20" y2="180" class="mbea"/><text x="${32+EaX}" y="30" class="mbt">E${G.cat?"a(cat)":"a"}</text>
  <text x="180" y="200" class="mbt" text-anchor="middle">Energy</text><text x="12" y="100" class="mbt" transform="rotate(-90 12 100)" text-anchor="middle">Number of molecules</text></svg></div>
  <div class="steppers"><div class="stp"><span>Temperature: ${G.T} K</span><button class="sbtn" data-act="cT" data-k="-60">−</button><button class="sbtn" data-act="cT" data-k="60">+</button></div>
  <div class="stp"><span>Concentration: ${G.conc} particles</span><button class="sbtn" data-act="cC" data-k="-8">−</button><button class="sbtn" data-act="cC" data-k="8">+</button></div>
  <div class="stp"><span>Catalyst: ${G.cat?"on":"off"}</span><button class="mbtn ${G.cat?"on":""}" data-act="cK">${G.cat?"Remove":"Add"}</button></div></div></div></div>
  ${Q?`<h3>Challenge ${G.qi+1}/${COLL_Q.length}</h3><p class="qtext">${Q[0]}</p><div class="opts">${(G.qo||(G.qo=shuffle([Q[1],...Q[2]]))).map((o,n)=>`<button class="opt ${G.ans!=null?(o===Q[1]?"right":n===G.ans?"wrong":""):""}" data-act="cq" data-k="${n}" ${G.ans!=null?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>${G.ans!=null?`<div class="explain ${G.qo[G.ans]===Q[1]?"ok":"bad"}"><span>${esc(Q[3])}</span></div><div class="row"><button class="primary" data-act="cnext">${G.qi===COLL_Q.length-1?"See results":"Next challenge"}</button></div>`:""}`:results(G.key,G.got,G.max)}`}
function collAct(a,k){
  if(a==="cT"){G.T=Math.max(180,Math.min(600,G.T+ +k));G.hits=G.succ=0}
  if(a==="cC"){G.conc=Math.max(8,Math.min(48,G.conc+ +k));G.hits=G.succ=0}
  if(a==="cK"){G.cat=!G.cat;G.hits=G.succ=0}
  if(a==="cq"&&G.ans==null){G.ans=+k;G.max++;if(G.qo[G.ans]===COLL_Q[G.qi][1])G.got++}
  if(a==="cnext"){G.qi++;G.ans=null;G.qo=null}
  collRender();collStart()}

/* ---------- EQUILIBRIUM ENGINE ---------- */
// 2NO2 (brown) ⇌ N2O4 (colourless), forward exothermic. x = fraction as NO2 (0..1)
const EQ_STEPS=[
 {act:"press",q:"You push the plunger in (increase the pressure). Predict what happens to the colour once equilibrium re-establishes.",a:"It gets paler: the position moves right, to fewer moles of gas",w:["It gets darker: the position moves left","No change: pressure has no effect","It turns colourless immediately and stays"],exp:"2 moles of gas on the left, 1 on the right. At first the colour darkens (same gas, smaller volume), then fades as the position moves right.",dx:-0.25},
 {act:"heat",q:"You place the syringe in hot water. Predict the colour change.",a:"It gets darker: the position moves left, in the endothermic direction",w:["It gets paler: the position moves right","No change","It turns green"],exp:"The forward reaction is exothermic (ΔH = −58 kJ mol⁻¹), so heating favours the endothermic backward reaction, making more brown NO₂.",dx:0.35},
 {act:"cool",q:"You place the syringe in ice. Predict the colour change.",a:"It gets paler: the position moves right, in the exothermic direction",w:["It gets darker","No change","It boils"],exp:"Cooling favours the exothermic direction, producing more colourless N₂O₄.",dx:-0.4},
 {act:"pull",q:"You pull the plunger out (decrease the pressure). Predict what happens.",a:"It gets darker: the position moves left, to more moles of gas",w:["It gets paler","No change","The reaction stops"],exp:"Lower pressure favours the side with more moles of gas.",dx:0.25},
 {act:"cat",q:"You add a catalyst. What happens to the position of equilibrium?",a:"No change; equilibrium is reached faster",w:["It moves right","It moves left","It moves to the exothermic side"],exp:"A catalyst speeds up the forward and backward reactions equally.",dx:0}];
const EQ_EXTRA=[["The Haber process: N₂ + 3H₂ ⇌ 2NH₃, ΔH = −92 kJ mol⁻¹. Why is a moderate temperature (about 450 °C) used?","It is a compromise: a lower temperature gives a higher yield but too slow a rate",["High temperature gives the highest yield","Low temperature gives the fastest rate","Temperature has no effect on the yield"],"Lower temperature favours the exothermic forward reaction but is slow; 450 °C plus an iron catalyst gives an acceptable rate."],
 ["Why is a pressure of about 200 atm used rather than a much higher one?","Higher pressure gives a higher yield, but is expensive and needs stronger equipment",["Higher pressure lowers the yield","Pressure does not affect the yield","Lower pressure gives a higher yield"],"4 moles of gas on the left, 2 on the right, so high pressure moves the position right."],
 ["What is meant by dynamic equilibrium?","The rates of the forward and backward reactions are equal and the amounts stay constant",["The reaction has stopped","There are equal amounts of reactants and products","Only the forward reaction occurs"],"Both reactions continue, at the same rate, in a closed system."]];
function startEqui(){G={kind:"equi",key:"equilibrium",backHash:"molecular-realm",x:0.5,vol:1,i:0,got:0,max:0,pred:null,anim:null};
  frame("2.10 Equilibrium · Reaction Lab","Equilibrium Engine","molecular-realm","AS2",`<p class="lead" style="color:#d7ecf7">2NO₂(g) ⇌ N₂O₄(g) &nbsp; ΔH = −58 kJ mol⁻¹. NO₂ is brown; N₂O₄ is colourless.</p><section class="panel" id="g"></section>`);eqRender()}
function syringeSVG(){const v=G.vol,len=120+180*v,dens=Math.min(1,G.x/Math.max(0.55,v));const col=`rgba(150,70,20,${(0.15+dens*0.8).toFixed(2)})`;const n=Math.round(30*G.x),m=Math.round(15*(1-G.x));
  let mol="";for(let i=0;i<n;i++)mol+=`<circle cx="${(70+Math.random()*(len-20)).toFixed(0)}" cy="${(70+Math.random()*60).toFixed(0)}" r="4" class="no2"/>`;for(let i=0;i<m;i++){const cx=70+Math.random()*(len-30),cy=70+Math.random()*60;mol+=`<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="4" class="n2o4"/><circle cx="${(cx+7).toFixed(0)}" cy="${cy.toFixed(0)}" r="4" class="n2o4"/>`}
  return `<svg viewBox="0 0 520 200" class="syr" role="img" aria-label="Gas syringe of nitrogen dioxide"><rect x="60" y="60" width="${len}" height="80" rx="6" style="fill:${col}" class="sgas"/>${mol}<rect x="50" y="56" width="${len+20}" height="88" rx="8" class="sglass"/>
  <rect x="${60+len}" y="62" width="14" height="76" class="splunger"/><rect x="${74+len}" y="94" width="${440-len}" height="12" class="srod"/><rect x="${510-6}" y="70" width="12" height="60" rx="3" class="srod"/>
  ${G.bath?`<rect x="40" y="40" width="${len+60}" height="130" rx="12" class="bath ${G.bath}"/>`:""}<text x="60" y="190" class="bnum">● NO₂ (brown) &nbsp; ●● N₂O₄ (colourless)</text></svg>`}
function eqRender(){const g=$("#g");
  if(G.i>=EQ_STEPS.length){const e=EQ_EXTRA[G.i-EQ_STEPS.length];if(!e)return g.innerHTML=results(G.key,G.got,G.max);if(!G.o)G.o=shuffle([e[1],...e[2]]);
    g.innerHTML=`<h3>Equilibrium in industry</h3><p class="qtext">${e[0]}</p><div class="opts">${G.o.map((o,n)=>`<button class="opt ${G.pred!=null?(o===e[1]?"right":n===G.pred?"wrong":""):""}" data-act="eqx" data-k="${n}" ${G.pred!=null?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>${G.pred!=null?`<div class="explain"><span>${esc(e[3])}</span></div><div class="row"><button class="primary" id="nx" data-act="enext">Next</button></div>`:""}`;return}
  const S=EQ_STEPS[G.i];if(!G.o)G.o=shuffle([S.a,...S.w]);
  g.innerHTML=`<div class="hud"><span>Experiment <strong>${G.i+1}</strong>/${EQ_STEPS.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div><div class="figbox">${syringeSVG()}</div>
  <p class="qtext">${S.q}</p><div class="opts">${G.o.map((o,n)=>`<button class="opt ${G.pred!=null?(o===S.a?"right":n===G.pred?"wrong":""):""}" data-act="epred" data-k="${n}" ${G.pred!=null?"disabled":""}><kbd>${n+1}</kbd><span>${esc(o)}</span></button>`).join("")}</div>
  ${G.pred!=null?`<div class="explain ${G.o[G.pred]===S.a?"ok":"bad"}"><b>Now watch the syringe</b><span>${esc(S.exp)}</span></div><div class="row"><button class="primary" id="nx" data-act="enext">Next experiment</button></div>`:`<p class="small muted">Predict first, then the experiment runs.</p>`}`;
  const n=$("#nx");if(n)n.focus()}
function eqAct(a,k){
  if(a==="epred"&&G.pred==null){const S=EQ_STEPS[G.i];G.pred=+k;G.max++;if(G.o[G.pred]===S.a)G.got++;
    if(S.act==="press")G.vol=0.55;if(S.act==="pull")G.vol=1;G.bath=S.act==="heat"?"hot":S.act==="cool"?"cold":null;eqRender();
    if(S.dx){const target=Math.max(0.1,Math.min(0.95,G.x+S.dx));setTimeout(()=>{if(G&&G.kind==="equi"){G.x=target;eqRender()}},900)}return}
  if(a==="eqx"&&G.pred==null){const e=EQ_EXTRA[G.i-EQ_STEPS.length];G.pred=+k;G.max++;if(G.o[G.pred]===e[1])G.got++;return eqRender()}
  if(a==="enext"){G.i++;G.pred=null;G.o=null;return eqRender()}}

/* ---------- hooks ---------- */
const _ra1=realmActs;realmActs=function(code){let s=_ra1(code);const L=[];
  if(code==="1.2")L.push(["atom","Inside the Atom","Build atoms, ions and configurations"]);
  if(code==="1.8")L.push(["halolab","Halogen Lab","First-person practical · 10 stations"]);
  if(code==="2.9")L.push(["collision","Collision Course","Particle simulator · Boltzmann curve"]);
  if(code==="2.10")L.push(["equilibrium","Equilibrium Engine","NO₂/N₂O₄ syringe · predict and watch"]);
  if(code==="2.11")L.push(["group2","Group II Expedition","First-person practical · 6 stations"]);
  return s+L.map(([h,n,t])=>`<a class="act" href="#${h}"><span>${n}<small>${t}</small></span><span class="sc">${bestTxt(h)||"Play"}</span></a>`).join("")};
const _rr1=realmRoute;realmRoute=function(h,show){if(_rr1(h,show))return true;const M={halolab:()=>startBLab("hal"),group2:()=>startBLab("g2"),atom:startAtom,collision:startColl,equilibrium:startEqui};if(M[h]){show(false);M[h]();return true}return false};
const _rac1=realmAct;realmAct=function(a,k,t){if(G.kind==="blab")return blAct(a,k);if(G.kind==="atom")return atAct(a,k);if(G.kind==="coll")return collAct(a,k);if(G.kind==="equi")return eqAct(a,k);return _rac1(a,k,t)};
