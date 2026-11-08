/* ================= REACTION LAB 3: Hess Architect, Reaction Roadmap, Lattice Builder, Isotope Investigator, Electron Heist ================= */
RL_KINDS.push("arch","road","latt","iso","heist");
const pick1=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- HESS'S LAW ARCHITECT (random exam-style) ---------- */
const DF={CH4:-75,C2H6:-85,C3H8:-104,C2H4:52,C2H5OH:-277,CH3OH:-239,CO2:-394,H2O:-286,NH3:-46,NO:90,NO2:33,SO2:-297,SO3:-396,CO:-111,HCl:-92};
const DC={C:-394,H2:-286,CH4:-890,C2H6:-1560,C3H8:-2220,C2H4:-1411,C2H5OH:-1367,CH3OH:-726};
const NICE={CH4:"CH₄(g)",C2H6:"C₂H₆(g)",C3H8:"C₃H₈(g)",C2H4:"C₂H₄(g)",C2H5OH:"C₂H₅OH(l)",CH3OH:"CH₃OH(l)",CO2:"CO₂(g)",H2O:"H₂O(l)",NH3:"NH₃(g)",NO:"NO(g)",NO2:"NO₂(g)",SO2:"SO₂(g)",SO3:"SO₃(g)",CO:"CO(g)",HCl:"HCl(g)",O2:"O₂(g)",H2:"H₂(g)",C:"C(s)",N2:"N₂(g)",S:"S(s)",Cl2:"Cl₂(g)"};
const ARCH_REACT=[
 {type:"f",R:[[1,"C2H4"],[1,"H2"]],P:[[1,"C2H6"]]},{type:"f",R:[[1,"CH4"],[2,"O2"]],P:[[1,"CO2"],[2,"H2O"]]},{type:"f",R:[[2,"SO2"],[1,"O2"]],P:[[2,"SO3"]]},
 {type:"f",R:[[4,"NH3"],[5,"O2"]],P:[[4,"NO"],[6,"H2O"]]},{type:"f",R:[[2,"NO"],[1,"O2"]],P:[[2,"NO2"]]},{type:"f",R:[[1,"CO"],[0.5,"O2"]],P:[[1,"CO2"]]},
 {type:"f",R:[[1,"C2H5OH"],[3,"O2"]],P:[[2,"CO2"],[3,"H2O"]]},{type:"f",R:[[1,"CH3OH"],[1.5,"O2"]],P:[[1,"CO2"],[2,"H2O"]]},
 {type:"c",R:[[1,"C2H4"],[1,"H2"]],P:[[1,"C2H6"]]},{type:"c",R:[[1,"C"],[2,"H2"]],P:[[1,"CH4"]]},{type:"c",R:[[2,"C"],[3,"H2"]],P:[[1,"C2H6"]]},{type:"c",R:[[3,"C"],[4,"H2"]],P:[[1,"C3H8"]]},
 {type:"c",R:[[2,"C"],[2,"H2"]],P:[[1,"C2H4"]]},{type:"c",R:[[1,"C"],[2,"H2"],[0.5,"O2"]],P:[[1,"CH3OH"]]}];
const zeroF=s=>["O2","H2","C","N2","S","Cl2"].includes(s);
const fmtN=n=>n===0.5?"½":n===1.5?"1½":String(n);
function archGen(){const r=pick1(ARCH_REACT),D=r.type==="f"?DF:DC;
  const terms=[];[["R",r.R],["P",r.P]].forEach(([side,list])=>list.forEach(([n,s])=>{const v=r.type==="f"?(zeroF(s)?0:D[s]):(s==="O2"?null:D[s]);if(v===null||v===undefined)return;terms.push({side,n,s,v,sign:r.type==="f"?(side==="P"?1:-1):(side==="R"?1:-1)})}));
  const ans=Math.round(terms.reduce((t,x)=>t+x.sign*x.n*x.v,0));
  const eq=r.R.map(([n,s])=>(n===1?"":fmtN(n))+NICE[s]).join(" + ")+" → "+r.P.map(([n,s])=>(n===1?"":fmtN(n))+NICE[s]).join(" + ");
  const data=terms.filter((x,i,a)=>a.findIndex(y=>y.s===x.s)===i).map(x=>`${r.type==="f"?"ΔfH":"ΔcH"}(${NICE[x.s]}) = ${fmtH(x.v)}`);
  return {...r,terms,ans,eq,data}}
function startArch(){G={kind:"arch",key:"hessarch",backHash:"molecular-realm",n:0,N:5,got:0,max:0};frame("2.8 Energetics · Reaction Lab","Hess’s Law Architect","molecular-realm","AS2",`<p class="lead" style="color:#d7ecf7">A new exam-style question every time. Build the cycle, choose the multipliers and signs, apply CW = ACW, then see the mark scheme.</p><section class="panel" id="g"></section>`);archNew()}
function archNew(){G.Q=archGen();G.s={stage:0,bottom:null,arrow:null,coef:{},sign:{},val:"",marks:[]};archRender()}
function archCycle(Q,s){const bot=s.bottom==null?"?":["Elements in their standard states","Combustion products: CO₂(g) + H₂O(l)","The reactants again"][s.bottom];const up=s.arrow==="up",dn=s.arrow==="down";
  const lhs=Q.R.map(([n,x])=>(n===1?"":fmtN(n))+NICE[x]).join(" + "),rhs=Q.P.map(([n,x])=>(n===1?"":fmtN(n))+NICE[x]).join(" + ");
  return `<svg viewBox="0 0 560 250" class="hsvg" role="img" aria-label="Enthalpy cycle"><defs><marker id="hah2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hhead"/></marker></defs>
  <text x="110" y="44" text-anchor="middle" class="hsp">${lhs}</text><text x="450" y="44" text-anchor="middle" class="hsp">${rhs}</text><text x="280" y="226" text-anchor="middle" class="hsp">${bot}</text>
  <line x1="${110+Math.min(150,lhs.length*4.6)}" y1="38" x2="${450-Math.min(150,rhs.length*4.6)}" y2="38" class="harr unk" marker-end="url(#hah2)"/><text x="280" y="24" text-anchor="middle" class="hlab unk">ΔH = ?</text>
  ${s.arrow?`<line x1="${up?235:150}" y1="${up?200:62}" x2="${up?150:235}" y2="${up?62:200}" class="harr" marker-end="url(#hah2)"/><line x1="${up?325:410}" y1="${up?200:62}" x2="${up?410:325}" y2="${up?62:200}" class="harr" marker-end="url(#hah2)"/>
  <text x="100" y="135" class="hlab" text-anchor="middle">${Q.type==="f"?"ΣΔfH(reactants)":"ΣΔcH(reactants)"}</text><text x="460" y="135" class="hlab" text-anchor="middle">${Q.type==="f"?"ΣΔfH(products)":"ΣΔcH(products)"}</text>`:""}</svg>`}
function archRender(){const g=$("#g"),Q=G.Q,s=G.s;
  let h=`<div class="hud"><span>Question <strong>${G.n+1}</strong>/${G.N}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>
  <div class="qbox2"><b>Calculate the enthalpy change for:</b><div class="eqline">${Q.eq}</div><div class="small">Data (kJ mol⁻¹): ${Q.data.join(" · ")}</div></div>`;
  const stg=["1. Build the cycle","2. Multipliers and signs","3. Calculate","Mark scheme"];h+=`<div class="stages">${stg.map((x,i)=>`<span class="stg ${i===s.stage?"on":i<s.stage?"done":""}">${x}</span>`).join("")}</div>`;
  h+=`<div class="figbox">${archCycle(Q,s)}</div>`;
  if(s.stage===0){h+=`<p><b>What goes in the bottom box?</b></p><div class="row">${["Elements in their standard states","Combustion products (CO₂ + H₂O)","The reactants again"].map((t,i)=>`<button class="mbtn ${s.bottom===i?"on":""}" data-act="abot" data-k="${i}">${t}</button>`).join("")}</div>
    <p><b>Which way do the arrows point?</b> (F up, C down)</p><div class="row"><button class="mbtn ${s.arrow==="up"?"on":""}" data-act="aarr" data-k="up">↑ Up from the bottom box</button><button class="mbtn ${s.arrow==="down"?"on":""}" data-act="aarr" data-k="down">↓ Down to the bottom box</button></div>
    ${s.fb?`<div class="explain bad"><span>${s.fb}</span></div>`:""}<div class="row"><button class="primary" data-act="acyc" ${s.bottom==null||!s.arrow?"disabled":""}>Check cycle</button></div>`}
  else if(s.stage===1){h+=`<p>For each enthalpy value, set the <b>multiplier</b> (moles in the equation) and the <b>sign</b>: + if your clockwise route goes with the arrow, − if it goes against it.</p><div class="legs">${Q.terms.map((t,i)=>`<div class="legrow"><span><b>${Q.type==="f"?"ΔfH":"ΔcH"}(${NICE[t.s]})</b><small>${fmtH(t.v)} kJ mol⁻¹ · ${t.side==="R"?"reactant":"product"}</small></span>
    <button class="sbtn" data-act="asg" data-k="${i}">${s.sign[i]===1?"+":s.sign[i]===-1?"−":"±"}</button><span class="small">×</span><input class="numin sm2" data-i="${i}" inputmode="decimal" value="${s.coef[i]??""}" aria-label="multiplier"></div>`).join("")}</div>
    ${s.fb?`<div class="explain bad"><span>${s.fb}</span></div>`:""}<div class="row"><button class="primary" data-act="aterms">Check</button></div>`}
  else if(s.stage===2){const exp=Q.terms.map((t,i)=>`${t.sign>0?"+":"−"} ${fmtN(t.n)}(${fmtH(t.v)})`).join(" ").replace(/^\+ /,"");
    h+=`<div class="eqbox">ΔH = ${exp}</div><div class="row"><input id="ain" class="numin" inputmode="decimal" aria-label="Answer in kJ per mol"><span>kJ mol⁻¹</span><button class="primary" data-act="acalc">Check answer</button></div>`}
  else{h+=`<table class="bandtable ms"><tr><th>Mark scheme</th><th>Your answer</th></tr>${s.marks.map(([t,ok])=>`<tr class="${ok?"hit":"miss"}"><td>${t}</td><td>${ok?"✓ 1 mark":"✗ 0"}</td></tr>`).join("")}</table>
    <div class="explain"><span>Working: ΔH = ${Q.terms.map(t=>`${t.sign>0?"+":"−"}${fmtN(t.n)}(${fmtH(t.v)})`).join(" ")} = <b>${fmtH(Q.ans)} kJ mol⁻¹</b></span><span class="small">${Q.type==="f"?"Formation data: ΔH = ΣΔfH(products) − ΣΔfH(reactants). Elements in their standard states have ΔfH = 0.":"Combustion data: ΔH = ΣΔcH(reactants) − ΣΔcH(products). O₂ has no enthalpy of combustion."}</span></div>
    <div class="row"><button class="primary" id="nx" data-act="anext">${G.n<G.N-1?"Next question":"See results"}</button></div>`}
  g.innerHTML=h;const n=$("#nx")||$("#ain");if(n)n.focus()}
function archAct(a,k){const Q=G.Q,s=G.s;
  if(a==="abot"){s.bottom=+k;s.fb=null}
  if(a==="aarr"){s.arrow=k;s.fb=null}
  if(a==="acyc"){const ok=(Q.type==="f"?s.bottom===0&&s.arrow==="up":s.bottom===1&&s.arrow==="down");G.max++;s.marks.push([Q.type==="f"?"Cycle via the elements, formation arrows pointing UP":"Cycle via the combustion products, combustion arrows pointing DOWN",ok]);if(ok)G.got++;else{s.bottom=Q.type==="f"?0:1;s.arrow=Q.type==="f"?"up":"down"}s.stage=1}
  if(a==="asg"){document.querySelectorAll(".sm2").forEach(e=>{s.coef[+e.dataset.i]=e.value});s.sign[+k]=s.sign[+k]===1?-1:1}
  if(a==="aterms"){document.querySelectorAll(".sm2").forEach(e=>{s.coef[+e.dataset.i]=e.value});
    if(Q.terms.some((t,i)=>!s.sign[i]||s.coef[i]===undefined||s.coef[i]==="")){s.fb="Set a sign and a multiplier for every value.";return archRender()}
    const mOk=Q.terms.every((t,i)=>Math.abs(numIn(String(s.coef[i]).replace("½","0.5"))-t.n)<0.01),sOk=Q.terms.every((t,i)=>s.sign[i]===t.sign);
    G.max+=2;s.marks.push(["Multiplies each value by the number of moles in the equation",mOk],[Q.type==="f"?"Reverses the reactant arrows (−) and keeps the product arrows (+): CW = ACW":"Keeps the reactant arrows (+) and reverses the product arrows (−): CW = ACW",sOk]);G.got+=(mOk?1:0)+(sOk?1:0);s.stage=2}
  if(a==="acalc"){const v=numIn($("#ain").value);if(isNaN(v))return;const ok=Math.abs(v-Q.ans)<1.5;G.max++;s.marks.push([`Correct answer with sign: ${fmtH(Q.ans)} kJ mol⁻¹`,ok]);if(ok)G.got++;s.stage=3}
  if(a==="anext"){G.n++;if(G.n>=G.N)return $("#g").innerHTML=results(G.key,G.got,G.max);return archNew()}
  archRender()}

/* ---------- ORGANIC REACTION ROADMAP ---------- */
const RN={alkane:["Alkane",80,60],halo:["Halogenoalkane",300,180],alkene:["Alkene",80,190],poly:["Poly(alkene)",80,320],dibromo:["Dibromoalkane",300,320],nitrile:["Nitrile",300,50],amine:["Amine",470,60],alcohol:["Alcohol",520,190],alkoxide:["Sodium alkoxide",650,60],aldehyde:["Aldehyde",680,190],acid:["Carboxylic acid",680,320],ketone:["Ketone",520,320]};
const RE=[["alkane","halo","Cl₂ or Br₂, UV light","Radical substitution","sub"],["alkene","alkane","H₂, finely divided Ni, about 150 °C","Addition (hydrogenation)","add"],["alkene","halo","HBr (or HCl), room temperature","Electrophilic addition","add"],["alkene","dibromo","Br₂, room temperature","Electrophilic addition","add"],["alkene","poly","High pressure and a catalyst","Addition polymerisation","add"],
 ["halo","alcohol","Aqueous NaOH or KOH, warm","Nucleophilic substitution","sub"],["halo","alkene","KOH in ethanol, reflux","Elimination","elim"],["halo","nitrile","KCN, reflux","Nucleophilic substitution","sub"],["halo","amine","Excess concentrated NH₃","Nucleophilic substitution","sub"],
 ["alcohol","halo","HBr (or PCl₅ to give a chloroalkane)","Substitution","sub"],["alcohol","alkoxide","Sodium metal (H₂ given off)","Redox (alcohol + sodium)","ox"],["alcohol","aldehyde","Acidified K₂Cr₂O₇, warm, distil off as it forms (primary)","Oxidation","ox"],["aldehyde","acid","Acidified K₂Cr₂O₇, reflux","Oxidation","ox"],["alcohol","ketone","Acidified K₂Cr₂O₇, warm (secondary alcohol)","Oxidation","ox"]];
const RMISS=[{t:"Turn ethane into ethanol.",start:"alkane",path:["halo","alcohol"]},{t:"Turn ethene into ethanol (no hydration at AS: go via a halogenoalkane).",start:"alkene",path:["halo","alcohol"]},{t:"Turn bromoethane into poly(ethene).",start:"halo",path:["alkene","poly"]},
 {t:"Turn ethanol (a primary alcohol) into ethanal.",start:"alcohol",path:["aldehyde"]},{t:"Turn propan-2-ol (a secondary alcohol) into propanone.",start:"alcohol",path:["ketone"]},{t:"Turn ethanol into ethene.",start:"alcohol",path:["halo","alkene"]},
 {t:"Turn ethanol into ethanoic acid via ethanal.",start:"alcohol",path:["aldehyde","acid"]},{t:"Turn ethene into ethylamine.",start:"alkene",path:["halo","amine"]}];
function startRoad(){G={kind:"road",key:"roadmap",backHash:"molecular-realm",ms:shuffle(RMISS).slice(0,6),mi:0,got:0,max:0};frame("2.3–2.6 Organic · Reaction Lab","Organic Reaction Roadmap","molecular-realm","AS2",`<section class="panel" id="g"></section>`);roadBegin();roadRender()}
function roadBegin(){const M=G.ms[G.mi];G.s={cur:M.start,step:0,done:[],pick:null,tpick:null,fb:null,o:null,to:null}}
function roadSVG(M,s){const vis=[M.start,...s.done.map(d=>d[1])];
  const ed=RE.map(([a,b,,,c])=>{const [,x1,y1]=RN[a],[,x2,y2]=RN[b];const on=s.done.some(d=>d[0]===a&&d[1]===b);const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),o=RE.some(e=>e[0]===b&&e[1]===a)?8:0,nx=-dy/L*o,ny=dx/L*o;
    return `<line x1="${x1+dx/L*58+nx}" y1="${y1+dy/L*22+ny}" x2="${x2-dx/L*62+nx}" y2="${y2-dy/L*24+ny}" class="redge ${c} ${on?"on":""}" marker-end="url(#rah)"/>`}).join("");
  const nd=Object.entries(RN).map(([k,[l,x,y]])=>`<g class="rnode ${k===s.cur?"cur":""} ${vis.includes(k)?"vis":""} ${k===M.path[M.path.length-1]?"tgt":""}"><rect x="${x-60}" y="${y-20}" width="120" height="40" rx="12"/><text x="${x}" y="${y+5}" text-anchor="middle">${l}</text></g>`).join("");
  return `<svg viewBox="0 0 740 360" class="road" role="img" aria-label="Organic reaction map"><defs><marker id="rah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="rhead"/></marker></defs>${ed}${nd}</svg>`}
function roadRender(){const g=$("#g");if(G.mi>=G.ms.length)return g.innerHTML=results(G.key,G.got,G.max,`<p class="muted">Aqueous = alcohol, alcoholic = alkene. Distil for an aldehyde, reflux for an acid.</p>`);
  const M=G.ms[G.mi],s=G.s,out=RE.filter(e=>e[0]===s.cur);if(!s.o)s.o=shuffle(out.map((e,i)=>i));
  let h=`<div class="hud"><span>Mission <strong>${G.mi+1}</strong>/${G.ms.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div><p class="qtext">${M.t}</p><div class="figbox">${roadSVG(M,s)}</div>
  <div class="rkey"><span class="k-sub">substitution</span><span class="k-add">addition</span><span class="k-elim">elimination</span><span class="k-ox">oxidation / redox</span></div>`;
  if(s.pick===null){h+=`<p>You are at <b>${RN[s.cur][0]}</b>. Choose the reagents and conditions for the next step.</p><div class="opts">${s.o.map(i=>`<button class="opt" data-act="rgo" data-k="${i}"><span>${esc(out[i][2])}</span></button>`).join("")}</div>${s.fb?`<div class="explain bad"><span>${s.fb}</span></div>`:""}`}
  else{const e=s.edge;if(!s.to)s.to=shuffle(["Radical substitution","Electrophilic addition","Nucleophilic substitution","Elimination","Oxidation","Addition polymerisation"].filter((x,i,a)=>a.indexOf(x)===i&&x!==e[3]).slice(0,3).concat([e[3]]));
    h+=`<p>That makes <b>${RN[e[1]][0].toLowerCase()}</b>. What type of reaction is it?</p><div class="opts">${s.to.map((o,n)=>`<button class="opt ${s.tpick!=null?(o===e[3]?"right":n===s.tpick?"wrong":""):""}" data-act="rtype" data-k="${n}" ${s.tpick!=null?"disabled":""}><span>${esc(o)}</span></button>`).join("")}</div>${s.tpick!=null?`<div class="row"><button class="primary" id="nx" data-act="rnext">${s.cur===M.path[M.path.length-1]?"Mission complete →":"Next step"}</button></div>`:""}`}
  g.innerHTML=h;const n=$("#nx");if(n)n.focus()}
function roadAct(a,k){const M=G.ms[G.mi],s=G.s,out=RE.filter(e=>e[0]===s.cur);
  if(a==="rgo"&&s.pick===null){const e=out[+k];G.max++;if(e[1]===M.path[s.step]){G.got++;s.pick=+k;s.edge=e;s.fb=null;s.done.push([e[0],e[1]]);s.prev=s.cur}else{s.fb=`That would make ${RN[e[1]][0].toLowerCase()}, which is not on the route to the target. Try again.`}}
  else if(a==="rtype"&&s.tpick==null){const e=s.edge;s.tpick=+k;G.max++;if(s.to[+k]===e[3])G.got++;s.cur=e[1]}
  else if(a==="rnext"){if(s.cur===M.path[M.path.length-1]){G.mi++;if(G.mi<G.ms.length)roadBegin()}else{s.step++;s.pick=null;s.tpick=null;s.o=null;s.to=null;s.edge=null}}
  roadRender()}
// patch: rtype needs the edge list of the previous node
const _roadRender=roadRender;

/* ---------- 3D renderer for lattices ---------- */
function mount3D(el,build){const st={el,yaw:0.6,pitch:0.45,drag:null,auto:!matchMedia("(prefers-reduced-motion: reduce)").matches,build};
  el.innerHTML=`<svg viewBox="-170 -150 340 300" class="l3d" role="img" aria-label="3D model. Drag to rotate."><g></g></svg><span class="hint">Drag to rotate</span>`;
  const g=el.querySelector("g"),svg=el.querySelector("svg");
  st.paint=()=>{const M=st.build(),cy=Math.cos(st.yaw),sy=Math.sin(st.yaw),cp=Math.cos(st.pitch),sp=Math.sin(st.pitch);
    const P=M.pts.map(p=>{const x1=p.x*cy+p.z*sy,z1=-p.x*sy+p.z*cy,y2=p.y*cp-z1*sp,z2=p.y*sp+z1*cp;return {...p,X:x1*M.s,Y:-y2*M.s,Z:z2}});
    const bonds=(M.bonds||[]).map(([i,j,c])=>{const a=P[i],b=P[j];return {z:(a.Z+b.Z)/2,h:`<line x1="${a.X.toFixed(1)}" y1="${a.Y.toFixed(1)}" x2="${b.X.toFixed(1)}" y2="${b.Y.toFixed(1)}" class="lb ${c||""}"/>`}});
    const atoms=P.map(p=>({z:p.Z,h:`<g ${p.k!=null?`class="lslot" data-k="${p.k}"`:""}><circle cx="${p.X.toFixed(1)}" cy="${p.Y.toFixed(1)}" r="${(p.r*(1+p.Z*0.08)).toFixed(1)}" class="la ${p.c}"/>${p.t?`<text x="${p.X.toFixed(1)}" y="${(p.Y+4).toFixed(1)}" class="lt" text-anchor="middle">${p.t}</text>`:""}</g>`}));
    g.innerHTML=[...bonds,...atoms].sort((a,b)=>a.z-b.z).map(o=>o.h).join("")};st.paint();
  svg.addEventListener("pointerdown",e=>{const sl=e.target.closest(".lslot");if(sl){st.auto=false;e.preventDefault();if(G&&G.kind==="latt")lattAct("lslot",sl.dataset.k);else if(G&&typeof on3DTap==="function")on3DTap(sl.dataset.k);return}st.drag=[e.clientX,e.clientY];st.auto=false;svg.setPointerCapture(e.pointerId)});
  svg.addEventListener("pointermove",e=>{if(!st.drag)return;st.yaw+=(e.clientX-st.drag[0])*0.012;st.pitch+=(e.clientY-st.drag[1])*0.012;st.drag=[e.clientX,e.clientY];st.paint()});
  svg.addEventListener("pointerup",()=>{st.drag=null});MOL3D.push(st);return st}

/* ---------- LATTICE BUILDER + PROPERTY PREDICTOR + STRUCTURE DETECTIVE ---------- */
function naclModel(fill,n){const pts=[],bonds=[],idx={};let k=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let l=0;l<n;l++){const par=(i+j+l)%2,key=i+","+j+","+l,c=(n-1)/2;const v=fill?fill[key]:(par?"na":"cl");idx[key]=pts.length;
  pts.push({x:i-c,y:j-c,z:l-c,r:v==="na"?9:v==="cl"?15:8,c:v||"ghost",t:v==="na"?"+":v==="cl"?"−":"",k:fill?key:null})}
  for(const key in idx){const [i,j,l]=key.split(",").map(Number);[[1,0,0],[0,1,0],[0,0,1]].forEach(([a,b,c])=>{const k2=(i+a)+","+(j+b)+","+(l+c);if(idx[k2]!=null)bonds.push([idx[key],idx[k2],"ion"])})}
  return {pts,bonds,s:n>2?82:90}}
function diamondModel(sel){const pts=[{x:0,y:0,z:0,r:12,c:"cc",t:"C"}],T=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],O=[[1.6,0,0],[-1.6,0,0],[0,1.6,0],[0,-1.6,0],[0,0,1.6],[0,0,-1.6]];
  const all=[...T.map(v=>v.map(x=>x*0.92)),...O.map(v=>v.map(x=>x*0.8))],bonds=[];
  all.forEach((v,i)=>{const on=sel?sel.has(i):i<4;pts.push({x:v[0],y:v[1],z:v[2],r:on?11:8,c:on?"cc":"ghost",t:on?"C":"",k:sel?String(i):null});if(on)bonds.push([0,i+1,"cov"])});
  if(!sel){const n=pts.length;T.forEach((v,i)=>{const b=v.map(x=>x*0.92);[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(w=>w.map(x=>-x*0.92)).forEach(w=>{const p={x:b[0]+w[0],y:b[1]+w[1],z:b[2]+w[2],r:10,c:"cc",t:"C"};if(Math.hypot(p.x,p.y,p.z)<0.1)return;pts.push(p);bonds.push([i+1,pts.length-1,"cov"])})})}
  return {pts,bonds,s:58}}
function graphiteModel(){const pts=[],bonds=[];[-0.8,0.8].forEach((y,L)=>{const base=pts.length;const ring=[];for(let q=-1;q<=1;q++)for(let r=-1;r<=1;r++){const cx=(q+r*0.5)*1.5+(L?0.75:0),cz=r*1.3;for(let a=0;a<6;a++){const x=cx+Math.cos(a*Math.PI/3)*0.85,z=cz+Math.sin(a*Math.PI/3)*0.85;let f=pts.findIndex(p=>Math.abs(p.x-x)<0.05&&Math.abs(p.z-z)<0.05&&p.y===y);if(f<0){pts.push({x,y,z,r:7,c:"cc"});f=pts.length-1}ring.push(f)}}
    for(let i=base;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].z-pts[j].z);if(pts[i].y===pts[j].y&&d<0.9&&d>0.8)bonds.push([i,j,"cov"])}});
  return {pts,bonds,s:46}}
function metalModel(fill,e){const pts=[];for(let i=0;i<3;i++)for(let j=0;j<3;j++)for(let l=0;l<3;l++){const key=i+","+j+","+l;const on=fill?fill[key]:true;pts.push({x:i-1,y:j-1,z:l-1,r:on?13:8,c:on?"mg":"ghost",t:on?"2+":"",k:fill?key:null})}
  if(e)for(let i=0;i<30;i++)pts.push({x:Math.random()*2.4-1.2,y:Math.random()*2.4-1.2,z:Math.random()*2.4-1.2,r:3.5,c:"elec"});return {pts,bonds:[],s:70}}
function iodineModel(){const pts=[],bonds=[];for(let i=0;i<2;i++)for(let j=0;j<2;j++)for(let l=0;l<2;l++){const x=i*1.6-0.8,y=j*1.6-0.8,z=l*1.6-0.8,ang=(i+j+l)%2?0.6:-0.6;pts.push({x:x-Math.cos(ang)*0.35,y,z:z-Math.sin(ang)*0.35,r:11,c:"io",t:"I"},{x:x+Math.cos(ang)*0.35,y,z:z+Math.sin(ang)*0.35,r:11,c:"io",t:"I"});bonds.push([pts.length-2,pts.length-1,"cov"])}return {pts,bonds,s:70}}
const LAT=[
 {id:"nacl",name:"Sodium chloride",type:"Giant ionic lattice",build:"Tap each empty site to place ions. Each ion must be surrounded by ions of the opposite charge. Tap again to swap.",
  tests:[["Melting point","High (801 °C)",["Low"],"Strong electrostatic attractions between oppositely charged ions in a giant lattice need lots of energy to overcome."],
   ["Conducts as a solid?","No",["Yes"],"The ions are fixed in the lattice and cannot move."],
   ["Conducts when molten or dissolved?","Yes",["No"],"The ions are free to move and carry charge."],
   ["Hit it with a hammer","It shatters (brittle)",["It bends (malleable)"],"A blow shifts the layers so ions of the same charge line up and repel."]]},
 {id:"metal",name:"Magnesium",type:"Giant metallic lattice",build:"Fill the empty sites with Mg²⁺ ions, then add the delocalised electrons.",
  tests:[["Melting point","High",["Low"],"Strong attraction between the positive ions and the sea of delocalised electrons."],["Conducts as a solid?","Yes",["No"],"Delocalised electrons are free to move through the structure."],["Hit it with a hammer","It bends (malleable)",["It shatters (brittle)"],"Layers of ions can slide over each other while the delocalised electrons hold them together."]]},
 {id:"diamond",name:"Diamond",type:"Giant covalent (macromolecular)",build:"Tap the positions where the central carbon forms its covalent bonds. Choose wisely: think about the shape.",
  tests:[["Melting point","Very high",["Low"],"Many strong covalent bonds must be broken."],["Conducts electricity?","No",["Yes"],"All four outer electrons are used in covalent bonds: no delocalised electrons."],["Hardness","Very hard",["Soft and slippery"],"Each carbon is covalently bonded to four others in a rigid 3D tetrahedral network."]]},
 {id:"graphite",name:"Graphite",type:"Giant covalent (layered)",build:"Graphite is already built. Rotate it and answer the build questions.",
  tests:[["Conducts electricity?","Yes",["No"],"Each carbon uses three electrons in bonds; the fourth is delocalised and free to move along the layers."],["Hardness","Soft and slippery",["Very hard"],"Weak van der Waals forces between the layers let them slide."],["Melting point","Very high",["Low"],"Strong covalent bonds within the layers must be broken."]]},
 {id:"iodine",name:"Iodine",type:"Simple molecular (covalent) lattice",build:"Iodine is already built. Rotate it: strong covalent bonds inside each I₂, weak van der Waals forces between molecules.",
  tests:[["Melting point","Low",["High"],"Only weak van der Waals forces between molecules are overcome; the covalent bonds do not break."],["Conducts electricity?","No",["Yes"],"No ions or delocalised electrons."],["Heat it gently","It sublimes to a violet/purple vapour",["It melts to a conducting liquid"],"Weak intermolecular forces are easily overcome."]]}];
const DETECT=[["Melts at 1083 °C, conducts as a solid and when molten, malleable","Giant metallic lattice",["Giant ionic lattice","Simple molecular","Giant covalent"],["Conducts as a solid: delocalised electrons","Malleable: layers of ions slide","High melting point"],["Dissolves in water","Brittle"]],
 ["Melts at 714 °C, does not conduct as a solid, conducts when molten, dissolves in water","Giant ionic lattice",["Giant metallic lattice","Simple molecular","Giant covalent"],["Conducts only when molten: ions free to move","High melting point: strong ionic bonds"],["Conducts as a solid","Very low melting point"]],
 ["Melts at 1610 °C, very hard, insoluble, does not conduct","Giant covalent",["Giant ionic lattice","Giant metallic lattice","Simple molecular"],["Very high melting point: many covalent bonds","Does not conduct even when molten"],["Malleable","Conducts when molten"]],
 ["Melts at 114 °C, soft, does not conduct, sublimes on gentle heating","Simple molecular",["Giant covalent","Giant ionic lattice","Giant metallic lattice"],["Low melting point: weak intermolecular forces","Does not conduct: no ions or free electrons"],["Conducts when molten","Very hard"]]];
function startLatt(){G={kind:"latt",key:"lattice",backHash:"elemental-frontier",li:0,stage:0,got:0,max:0,fill:{},dsel:new Set(),e:false,ti:0,fb:null,det:0,dsel2:new Set()};frame("1.5 Structure · Reaction Lab","Lattice Builder","elemental-frontier","AS1",`<p class="lead" style="color:#d7ecf7">Build each giant structure in 3D, test its properties, then crack the Structure Detective cases.</p><section class="panel" id="g"></section>`);lattRender()}
function lattModel(){const L=LAT[G.li];
  if(L.id==="nacl")return ()=>naclModel(G.stage===0?Object.assign(Object.fromEntries(Array.from({length:27},(_,n)=>[[Math.floor(n/9),Math.floor(n/3)%3,n%3].join(","),null])),{"0,0,0":"cl","2,2,2":"cl","1,1,1":"na"},G.fill):null,3);
  if(L.id==="metal")return ()=>metalModel(G.stage===0?Object.assign(Object.fromEntries(Array.from({length:27},(_,n)=>[[Math.floor(n/9),Math.floor(n/3)%3,n%3].join(","),(n%4===0)])),G.fill):null,G.e||G.stage>0);
  if(L.id==="diamond")return ()=>diamondModel(G.stage===0?G.dsel:null);
  if(L.id==="graphite")return graphiteModel;return iodineModel}
function lattRender(){const g=$("#g");
  if(G.li>=LAT.length){const D=DETECT[G.det];if(!D)return g.innerHTML=results(G.key,G.got,G.max);if(!G.do)G.do=shuffle([D[1],...D[2]]);if(!G.eo)G.eo=shuffle([...D[3],...D[4]]);
    g.innerHTML=`<div class="stages"><span class="stg done">Build and test</span><span class="stg on">Structure Detective ${G.det+1}/${DETECT.length}</span></div><p class="qtext">Mystery substance: ${D[0]}.</p>
    <p><b>1. Which structure?</b></p><div class="row">${G.do.map((o,n)=>`<button class="mbtn ${G.dpick===n?"on":""}" data-act="dpick" data-k="${n}" ${G.dchk?"disabled":""}>${o}</button>`).join("")}</div>
    <p><b>2. Select the evidence that supports your answer.</b></p><div class="kit">${G.eo.map((o,n)=>`<button class="kitbtn ${G.dchk?(D[3].includes(o)?(G.dsel2.has(n)?"right":"missed"):G.dsel2.has(n)?"wrong":""):G.dsel2.has(n)?"on":""}" data-act="dev" data-k="${n}" ${G.dchk?"disabled":""}>${o}</button>`).join("")}</div>
    ${G.dchk?`<div class="explain ${G.dok?"ok":"bad"}"><b>${G.do[G.dpick]===D[1]?"Correct structure":"It is a "+D[1].toLowerCase()}</b><span>Strong evidence links each property to the particles and forces.</span></div><div class="row"><button class="primary" id="nx" data-act="dnext">Next case</button></div>`:`<div class="row"><button class="primary" data-act="dcheck" ${G.dpick==null?"disabled":""}>Check</button></div>`}`;return}
  const L=LAT[G.li];
  let h=`<div class="stages"><span class="stg ${G.stage===0?"on":"done"}">1. Build</span><span class="stg ${G.stage===1?"on":G.stage>1?"done":""}">2. Property Predictor</span></div><div class="hud"><span>Structure <strong>${G.li+1}</strong>/${LAT.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>
  <h3>${L.name} · ${L.type}</h3><div class="shapebox"><div class="mol3d lat3d" id="m3"></div><div>`;
  if(G.stage===0){h+=`<p>${L.build}</p>`;
    if(L.id==="metal")h+=`<div class="row"><button class="mbtn ${G.e?"on":""}" data-act="lelec">${G.e?"Delocalised electrons added":"Add delocalised electrons"}</button></div>`;
    if(L.id==="graphite"||L.id==="iodine"){const q=L.id==="graphite"?["How many covalent bonds does each carbon form in graphite?","3",["4","2","1"]]:["Which forces hold the I₂ molecules together in the crystal?","Weak van der Waals forces",["Covalent bonds","Ionic bonds","Metallic bonds"]];if(!G.qo)G.qo=shuffle([q[1],...q[2]]);
      h+=`<p class="qtext">${q[0]}</p><div class="row">${G.qo.map((o,n)=>`<button class="mbtn ${G.qp===n?"on":""}" data-act="lq" data-k="${n}">${o}</button>`).join("")}</div>`}
    h+=`${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div>`:""}<div class="row">${G.fb&&G.fb.ok?`<button class="primary" id="nx" data-act="lgo">Test its properties →</button>`:`<button class="primary" data-act="lcheck">Check my structure</button>`}</div>`}
  else{const T=L.tests[G.ti];if(!T){h+=`<div class="explain ok"><span>${L.name}: done.</span></div><div class="row"><button class="primary" id="nx" data-act="lnext">${G.li<LAT.length-1?"Next structure":"Structure Detective →"}</button></div>`}
    else{if(!G.to)G.to=shuffle([T[1],...T[2]]);h+=`<p class="qtext">Test ${G.ti+1}/${L.tests.length}: ${T[0]}</p><p class="small muted">Predict first.</p><div class="opts">${G.to.map((o,n)=>`<button class="opt ${G.tp!=null?(o===T[1]?"right":n===G.tp?"wrong":""):""}" data-act="ltest" data-k="${n}" ${G.tp!=null?"disabled":""}><span>${o}</span></button>`).join("")}</div>
      ${G.tp!=null?`<div class="testfx">${lattFX(L,T)}</div><div class="explain ${G.to[G.tp]===T[1]?"ok":"bad"}"><span>${T[3]}</span></div><div class="row"><button class="primary" id="nx" data-act="ltnext">Next test</button></div>`:""}`}}
  h+=`</div></div>`;g.innerHTML=h;const m3=mount3D($("#m3"),lattModel());if(G.stage===0)m3.auto=false;const n=$("#nx");if(n)n.focus()}
function lattFX(L,T){const t=T[0];if(/Conduct/.test(t)){const on=T[1].startsWith("Yes");return `<svg viewBox="0 0 220 70" class="fx"><rect x="10" y="30" width="60" height="26" rx="4" class="fxsamp"/><path d="M70,43 L110,43 M150,43 L200,43 L200,10 L10,10 L10,30" class="fxw"/><circle cx="130" cy="43" r="16" class="bulb ${on?"on":""}"/><text x="130" y="68" text-anchor="middle" class="bnum">${on?"bulb lights":"bulb stays off"}</text></svg>`}
  if(/hammer/.test(t)){const br=/shatters/.test(T[1]);return `<svg viewBox="0 0 220 70" class="fx">${[0,1,2].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${40+c*24+(br&&r===1?12:0)}" cy="${18+r*20}" r="9" class="${(r+c+(br&&r===1?1:0))%2&&L.id==="nacl"?"fxa":"fxb"}"/>`).join("")).join("")}<text x="180" y="40" class="bnum">${br?"like charges repel: shatters":"layers slide: bends"}</text></svg>`}
  return `<svg viewBox="0 0 220 70" class="fx"><rect x="20" y="10" width="40" height="50" rx="4" class="fxsamp"/><path d="M90,55 Q100,20 110,55 Q120,20 130,55" class="fxflame"/><text x="150" y="40" class="bnum">${T[1]}</text></svg>`}
function lattAct(a,k){const L=LAT[G.li];
  if(G.li>=LAT.length){const D=DETECT[G.det];
    if(a==="dpick"&&!G.dchk)G.dpick=+k;if(a==="dev"&&!G.dchk){G.dsel2.has(+k)?G.dsel2.delete(+k):G.dsel2.add(+k)}
    if(a==="dcheck"){G.dchk=true;G.max+=2;const s=G.do[G.dpick]===D[1];const ev=G.eo.every((o,n)=>D[3].includes(o)===G.dsel2.has(n));G.got+=(s?1:0)+(ev?1:0);G.dok=s&&ev}
    if(a==="dnext"){G.det++;G.do=G.eo=null;G.dpick=null;G.dchk=false;G.dsel2=new Set()}return lattRender()}
  if(a==="lslot"&&G.stage===0){if(L.id==="nacl"){const fixed=["0,0,0","2,2,2","1,1,1"];if(fixed.includes(k))return;G.fill[k]=G.fill[k]==="na"?"cl":"na"}
    else if(L.id==="metal"){G.fill[k]=!(G.fill[k]??([...Array(27)].map((_,n)=>[Math.floor(n/9),Math.floor(n/3)%3,n%3].join(",")).indexOf(k)%4===0))}
    else if(L.id==="diamond"){const i=+k;G.dsel.has(i)?G.dsel.delete(i):G.dsel.add(i)}G.fb=null;
    const st=MOL3D[MOL3D.length-1];if(st){st.paint();return}}
  if(a==="lelec"){G.e=!G.e;G.fb=null}
  if(a==="lq"){G.qp=+k;G.fb=null}
  if(a==="lcheck"){G.max++;let ok=false,t="";
    if(L.id==="nacl"){const keys=[...Array(27)].map((_,n)=>[Math.floor(n/9),Math.floor(n/3)%3,n%3]);const bad=keys.filter(([i,j,l])=>{const key=i+","+j+","+l,v=G.fill[key]||({"0,0,0":"cl","2,2,2":"cl","1,1,1":"na"}[key]);return v!==((i+j+l)%2?"na":"cl")});ok=!bad.length;t=ok?"Every Na⁺ is surrounded by 6 Cl⁻ and every Cl⁻ by 6 Na⁺.":bad.some(([i,j,l])=>!G.fill[i+","+j+","+l]&&![["0,0,0"],["2,2,2"],["1,1,1"]].flat().includes(i+","+j+","+l))?"Fill every empty site.":"Some ions sit next to ions with the same charge. They must alternate."}
    else if(L.id==="metal"){const all=[...Array(27)].every((_,n)=>{const key=[Math.floor(n/9),Math.floor(n/3)%3,n%3].join(",");return G.fill[key]??(n%4===0)});ok=all&&G.e;t=ok?"A lattice of positive ions in a sea of delocalised electrons.":!all?"Fill every site with an Mg²⁺ ion.":"A metal needs its delocalised electrons."}
    else if(L.id==="diamond"){ok=G.dsel.size===4&&[0,1,2,3].every(i=>G.dsel.has(i));t=ok?"Four covalent bonds pointing to the corners of a tetrahedron (109.5°).":"Each carbon forms 4 covalent bonds arranged tetrahedrally, not at 90°."}
    else{const q=L.id==="graphite"?"3":"Weak van der Waals forces";ok=G.qo&&G.qo[G.qp]===q;t=ok?(L.id==="graphite"?"Three covalent bonds; the fourth electron is delocalised.":"Covalent bonds inside molecules, weak van der Waals forces between them."):"Not quite. Rotate the model and look again."}
    if(ok)G.got++;G.fb={ok,t}}
  if(a==="lgo"){G.stage=1;G.ti=0;G.tp=null;G.to=null;G.fb=null}
  if(a==="ltest"&&G.tp==null){const T=L.tests[G.ti];G.tp=+k;G.max++;if(G.to[G.tp]===T[1])G.got++}
  if(a==="ltnext"){G.ti++;G.tp=null;G.to=null}
  if(a==="lnext"){G.li++;G.stage=0;G.fill={};G.dsel=new Set();G.e=false;G.qo=null;G.qp=null;G.fb=null}
  lattRender()}

/* ---------- ISOTOPE INVESTIGATOR ---------- */
const ISO=[{el:"Cl",z:17,iso:[[35,75.77],[37,24.23]],w:["Ar","K","S"]},{el:"Mg",z:12,iso:[[24,78.99],[25,10.00],[26,11.01]],w:["Na","Al","Cr"]},{el:"B",z:5,iso:[[10,19.9],[11,80.1]],w:["Be","C","Na"]},{el:"Cu",z:29,iso:[[63,69.15],[65,30.85]],w:["Zn","Ni","Co"]},
 {el:"Li",z:3,iso:[[6,7.59],[7,92.41]],w:["Be","He","N"]},{el:"Ne",z:10,iso:[[20,90.48],[21,0.27],[22,9.25]],w:["Ca","F","Na"]},{el:"Ga",z:31,iso:[[69,60.11],[71,39.89]],w:["Zn","Ge","As"]},{el:"Br",z:35,iso:[[79,50.69],[81,49.31]],w:["Se","Kr","Ca"]}];
const AR={Cl:35.5,Ar:39.9,K:39.1,S:32.1,Mg:24.3,Na:23.0,Al:27.0,Cr:52.0,B:10.8,Be:9.0,C:12.0,Cu:63.5,Zn:65.4,Ni:58.7,Co:58.9,Li:6.9,He:4.0,N:14.0,Ne:20.2,Ca:40.1,F:19.0,Ga:69.7,Ge:72.6,As:74.9,Br:79.9,Se:79.0,Kr:83.8};
function startIso(){G={kind:"iso",key:"isotope",backHash:"elemental-frontier",cases:shuffle(ISO).slice(0,4),i:0,st:0,got:0,max:0,fb:null,alg:null};frame("1.2 Atomic structure · Reaction Lab","Isotope Investigator","elemental-frontier","AS1",`<p class="lead" style="color:#d7ecf7">A mystery element has been through the mass spectrometer. Calculate its relative atomic mass and identify it.</p><section class="panel" id="g"></section>`);isoRender()}
function specSVG(iso){const mx=Math.max(...iso.map(x=>x[1])),lo=iso[0][0]-2,hi=iso[iso.length-1][0]+2,X=m=>40+(m-lo)/(hi-lo)*420;
  return `<svg viewBox="0 0 480 220" class="hsvg" role="img" aria-label="Mass spectrum"><line x1="40" y1="190" x2="465" y2="190" class="gax"/><line x1="40" y1="20" x2="40" y2="190" class="gax"/>${iso.map(([m,p])=>`<rect x="${X(m)-6}" y="${190-p/mx*160}" width="12" height="${p/mx*160}" class="specbar"/><text x="${X(m)}" y="${184-p/mx*160}" text-anchor="middle" class="mbt">${p}%</text><text x="${X(m)}" y="206" text-anchor="middle" class="mbt">${m}</text>`).join("")}<text x="252" y="219" text-anchor="middle" class="mbt">m/z</text><text x="14" y="105" transform="rotate(-90 14 105)" text-anchor="middle" class="mbt">abundance / %</text></svg>`}
function isoRender(){const g=$("#g");
  if(G.i>=G.cases.length){if(!G.alg){const a=pick1([[63,65,63.5,"copper"],[35,37,35.5,"chlorine"],[10,11,10.8,"boron"]]);G.alg={a,x:+(((a[1]-a[2])/(a[1]-a[0]))*100).toFixed(1)}}const A=G.alg;
    if(G.algDone)return g.innerHTML=results(G.key,G.got,G.max);
    g.innerHTML=`<h3>Final case: work backwards</h3><p class="qtext">Element ${A.a[3]} has two isotopes, mass ${A.a[0]} and ${A.a[1]}, and Ar = ${A.a[2]}. What percentage is the isotope of mass ${A.a[0]}?</p><p class="small">Let x = % of mass ${A.a[0]}: ${A.a[0]}x + ${A.a[1]}(100 − x) = ${A.a[2]} × 100</p><div class="row"><input id="iin" class="numin" inputmode="decimal"><span>%</span><button class="primary" data-act="ialg">Check</button></div>${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div><div class="row"><button class="primary" id="nx" data-act="ifin">See results</button></div>`:""}`;return}
  const C=G.cases[G.i],ar=C.iso.reduce((s,[m,p])=>s+m*p,0)/100;
  let h=`<div class="hud"><span>Case <strong>${G.i+1}</strong>/${G.cases.length}</span><span>Marks <strong>${G.got}</strong>/${G.max}</span></div><div class="figbox">${specSVG(C.iso)}</div>`;
  if(G.st===0)h+=`<p><b>Step 1:</b> Ar = Σ(mass × abundance) ÷ 100. Give your answer to 1 decimal place.</p><div class="row"><input id="iin" class="numin" inputmode="decimal"><button class="primary" data-act="iar">Check</button></div>${G.fb?`<div class="explain bad"><span>${G.fb.t}</span></div>`:""}`;
  else{if(!G.o)G.o=shuffle([C.el,...C.w]);h+=`<div class="eqbox">Ar = (${C.iso.map(([m,p])=>`${m} × ${p}`).join(" + ")}) ÷ 100 = ${ar.toFixed(2)} ≈ ${ar.toFixed(1)}</div><p><b>Step 2:</b> Identify the element from the Periodic Table.</p><div class="opts">${G.o.map((o,n)=>`<button class="opt ${G.p!=null?(o===C.el?"right":n===G.p?"wrong":""):""}" data-act="iel" data-k="${n}" ${G.p!=null?"disabled":""}><span><b>${o}</b> · Ar ${AR[o]}</span></button>`).join("")}</div>${G.p!=null?`<div class="row"><button class="primary" id="nx" data-act="inext">Next case</button></div>`:""}`}
  g.innerHTML=h;const n=$("#nx")||$("#iin");if(n)n.focus()}
function isoAct(a,k){const C=G.cases[G.i];
  if(a==="iar"){const v=numIn($("#iin").value);if(isNaN(v))return;const ar=C.iso.reduce((s,[m,p])=>s+m*p,0)/100;G.max++;if(Math.abs(v-ar)<0.06){G.got++;G.st=1;G.fb=null}else{G.fb={t:"Multiply each mass by its percentage, add them up, then divide by 100."};G.st=1}}
  if(a==="iel"&&G.p==null){G.p=+k;G.max++;if(G.o[G.p]===C.el)G.got++}
  if(a==="inext"){G.i++;G.st=0;G.p=null;G.o=null;G.fb=null}
  if(a==="ialg"&&!G.fb){const v=numIn($("#iin").value);if(isNaN(v))return;G.max++;const ok=Math.abs(v-G.alg.x)<0.6;if(ok)G.got++;G.fb={ok,t:`x = ${G.alg.x}%. ${G.alg.a[0]}x + ${G.alg.a[1]}(100 − x) = ${G.alg.a[2]*100}, so ${G.alg.a[1]-G.alg.a[0]}x = ${(G.alg.a[1]*100-G.alg.a[2]*100).toFixed(0)}.`}}
  if(a==="ifin")G.algDone=true;
  isoRender()}

/* ---------- ELECTRON HEIST ---------- */
const OXS=[["Mn","MnO₄⁻",7],["Cr","Cr₂O₇²⁻",6],["S","SO₄²⁻",6],["S","H₂S",-2],["N","NH₄⁺",-3],["Cl","ClO₃⁻",5],["Fe","Fe₂O₃",3],["O","H₂O₂",-1],["S","SO₂",4],["Cl","Cl₂",0]];
const HEIST=[{a:"Zn",b:"Cu²⁺",n:2,eq:"Zn + Cu²⁺ → Zn²⁺ + Cu",ox:"Zn",oa:"Cu²⁺"},{a:"Mg",b:"Fe²⁺",n:2,eq:"Mg + Fe²⁺ → Mg²⁺ + Fe",ox:"Mg",oa:"Fe²⁺"},{a:"2I⁻",b:"Cl₂",n:2,eq:"Cl₂ + 2I⁻ → 2Cl⁻ + I₂",ox:"I⁻",oa:"Cl₂"},{a:"2Na",b:"Cl₂",n:2,eq:"2Na + Cl₂ → 2NaCl",ox:"Na",oa:"Cl₂"}];
const HALF=[{l:[["Fe³⁺",1,0],["e⁻",1,1]],r:[["Fe²⁺",1,0]],t:"Reduction of iron(III)"},{l:[["I⁻",2,1]],r:[["I₂",1,0],["e⁻",2,1]],t:"Oxidation of iodide"},
 {l:[["MnO₄⁻",1,0],["H⁺",8,1],["e⁻",5,1]],r:[["Mn²⁺",1,0],["H₂O",4,1]],t:"Reduction of manganate(VII)"},{l:[["H₂SO₄",1,0],["H⁺",2,1],["e⁻",2,1]],r:[["SO₂",1,0],["H₂O",2,1]],t:"Reduction of sulfuric acid (by bromide)"},
 {l:[["Cr₂O₇²⁻",1,0],["H⁺",14,1],["e⁻",6,1]],r:[["Cr³⁺",2,1],["H₂O",7,1]],t:"Reduction of dichromate(VI)"}];
function startHeist(){G={kind:"heist",key:"heist",backHash:"elemental-frontier",part:0,i:0,got:0,max:0,v:0,moved:0,fb:null,co:{},ox:shuffle(OXS).slice(0,5),hs:shuffle(HEIST).slice(0,3)};frame("1.7 Redox · Reaction Lab","Electron Heist","elemental-frontier","AS1",`<p class="lead" style="color:#d7ecf7">OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).</p><section class="panel" id="g"></section>`);heistRender()}
function heistRender(){const g=$("#g"),st=["1. Oxidation states","2. Steal the electrons","3. Half-equations"];
  let h=`<div class="stages">${st.map((s,i)=>`<span class="stg ${i===G.part?"on":i<G.part?"done":""}">${s}</span>`).join("")}</div><div class="hud"><span>Marks <strong>${G.got}</strong>/${G.max}</span></div>`;
  if(G.part===0){const [el,sp]=G.ox[G.i];h+=`<p class="qtext">What is the oxidation state of <b>${el}</b> in <b>${sp}</b>?</p><div class="stp"><span class="ostate">${G.v>0?"+":""}${G.v}</span><button class="sbtn" data-act="hv" data-k="-1">−</button><button class="sbtn" data-act="hv" data-k="1">+</button><button class="primary" data-act="hox" ${G.fb?"disabled":""}>Check</button></div>${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div><div class="row"><button class="primary" id="nx" data-act="hnext">Next</button></div>`:""}`}
  else if(G.part===1){const H=G.hs[G.i];h+=`<p class="qtext">${H.eq}. Move the electrons from the species that loses them to the one that gains them.</p>
    <div class="heist"><div class="hsp src"><b>${H.a}</b><div class="edots">${Array.from({length:H.n-G.moved},(_,i)=>`<button class="edot" data-act="hmove" aria-label="electron">e⁻</button>`).join("")}</div></div><div class="harrow">→</div><div class="hsp dst"><b>${H.b}</b><div class="edots">${Array.from({length:G.moved},()=>`<span class="edot got">e⁻</span>`).join("")}</div></div></div>
    ${G.moved>=H.n?(()=>{if(!G.ho)G.ho=shuffle([H.ox,H.oa]);return `<p><b>Which species is oxidised?</b></p><div class="row">${G.ho.map((o,n)=>`<button class="mbtn ${G.hp===n?"on":""}" data-act="hpick" data-k="${n}" ${G.hfb?"disabled":""}>${o}</button>`).join("")}</div>${G.hfb?`<div class="explain ${G.hfb.ok?"ok":"bad"}"><span>${H.ox} loses electrons, so it is oxidised and acts as the reducing agent. ${H.oa} gains electrons: it is reduced and is the oxidising agent.</span></div><div class="row"><button class="primary" id="nx" data-act="hnext">Next</button></div>`:""}`})():`<p class="small muted">Tap each electron to move it across.</p>`}`}
  else{const Hf=HALF[G.i];const side=(arr,s)=>arr.map(([sp,c,v],j)=>`${v?`<span class="cstep"><button class="sbtn" data-act="hc" data-k="${s}${j}:-1">−</button><b>${G.co[s+j]??1}</b><button class="sbtn" data-act="hc" data-k="${s}${j}:1">+</button></span>`:""}<span class="csp">${sp}</span>`).join(`<span class="plus">+</span>`);
    h+=`<p class="qtext">${Hf.t}: balance the half-equation.</p><div class="halfeq">${side(Hf.l,"l")}<span class="plus">→</span>${side(Hf.r,"r")}</div>${G.fb?`<div class="explain ${G.fb.ok?"ok":"bad"}"><span>${G.fb.t}</span></div>`:""}<div class="row">${G.fb&&G.fb.ok?`<button class="primary" id="nx" data-act="hnext">${G.i<HALF.length-1?"Next":"See results"}</button>`:`<button class="primary" data-act="hhalf">Check</button>`}</div>`}
  g.innerHTML=h;const n=$("#nx");if(n)n.focus()}
function heistAct(a,k){
  if(a==="hv"&&!G.fb)G.v=Math.max(-4,Math.min(8,G.v+ +k));
  if(a==="hox"){const [el,sp,v]=G.ox[G.i];G.max++;const ok=G.v===v;if(ok)G.got++;G.fb={ok,t:`${el} in ${sp} is ${v>0?"+":""}${v}. Oxygen is usually −2 and hydrogen +1; the oxidation states add up to the overall charge.`}}
  if(a==="hmove"){G.moved++}
  if(a==="hpick"&&!G.hfb){const H=G.hs[G.i];G.hp=+k;G.max++;const ok=G.ho[G.hp]===H.ox;if(ok)G.got++;G.hfb={ok}}
  if(a==="hc"){const s=k.slice(0,2),d=+k.split(":")[1];G.co[s]=Math.max(1,Math.min(16,(G.co[s]??1)+d));G.fb=null}
  if(a==="hhalf"){const Hf=HALF[G.i];G.max++;const ok=[["l",Hf.l],["r",Hf.r]].every(([s,arr])=>arr.every(([sp,c,v],j)=>!v||(G.co[s+j]??1)===c));if(ok)G.got++;G.fb={ok,t:ok?"Balanced for atoms and charge.":"Balance the atoms first (O with H₂O, then H with H⁺), then add electrons to balance the charge."};if(!ok)G.max--}
  if(a==="hnext"){G.fb=null;G.i++;G.v=0;G.moved=0;G.ho=null;G.hp=null;G.hfb=null;G.co={};
    if(G.part===0&&G.i>=G.ox.length){G.part=1;G.i=0}else if(G.part===1&&G.i>=G.hs.length){G.part=2;G.i=0}else if(G.part===2&&G.i>=HALF.length)return $("#g").innerHTML=results(G.key,G.got,G.max)}
  heistRender()}

/* ---------- hooks ---------- */
const _ra2=realmActs;realmActs=function(code){let s=_ra2(code);const L=[];
  if(code==="1.2")L.push(["isotope","Isotope Investigator","Mass spectra · calculate Ar"]);
  if(code==="1.5")L.push(["lattice","Lattice Builder","Build in 3D · test properties · Structure Detective"]);
  if(code==="1.7")L.push(["heist","Electron Heist","Oxidation states · move electrons · half-equations"]);
  if(code==="2.8")L.push(["hessarch","Hess’s Law Architect","Random exam questions · mark scheme"]);
  if(code==="2.6")L.push(["roadmap","Organic Reaction Roadmap","Navigate 2.3–2.6 reactions"]);
  return s+L.map(([h,n,t])=>`<a class="act" href="#${h}"><span>${n}<small>${t}</small></span><span class="sc">${bestTxt(h)||"Play"}</span></a>`).join("")};
const _rr2=realmRoute;realmRoute=function(h,show){if(_rr2(h,show))return true;const M={hessarch:startArch,roadmap:startRoad,lattice:startLatt,isotope:startIso,heist:startHeist};if(M[h]){show(false);M[h]();return true}return false};
const _rac2=realmAct;realmAct=function(a,k,t){const M={arch:archAct,road:roadAct,latt:lattAct,iso:isoAct,heist:heistAct};if(M[G.kind])return M[G.kind](a,k);return _rac2(a,k,t)};
