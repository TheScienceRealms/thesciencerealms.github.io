/* ================= Mini-games (shared engine) ================= */
const Games=(()=>{
const root=$$("#game");
const store={get(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.random()*a.length|0];
const rint=(a,b,step=1)=>a+step*Math.floor(Math.random()*((b-a)/step+1));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt=n=>Number(n.toFixed(2)).toLocaleString("en-GB");
let gid=null,st=null;
const R=()=>st.rounds[st.i];
const S=()=>st.r;

/* ---------- helpers used inside round views ---------- */
const label=(Rd,v)=>(Rd.labels&&Rd.labels[v])||v;
function slotInfo(Rd,id){const v=S().placed[id],ok=S().checked?(Rd.slots[id].includes(v)?"ok":"bad"):"";return {v,ok}}
function slot(Rd,id,cls=""){
  const {v,ok}=slotInfo(Rd,id),c=S().checked;
  return `<button class="gslot ${cls} ${v?"filled":""} ${ok} ${!c&&S().sel?"ready":""}" data-act="slot" data-k="${id}" ${c?"disabled":""}>${v?esc(label(Rd,v)):`<i>${S().sel?"place here":"drop here"}</i>`}${c&&ok==="bad"?`<span class="fixv">${esc(label(Rd,Rd.slots[id][0]))}</span>`:""}</button>`;
}
function sslot(Rd,id,x,y,w=54,h=30){
  const {v,ok}=slotInfo(Rd,id),c=S().checked;
  return `<g class="sslot ${v?"filled":""} ${ok} ${!c&&S().sel?"ready":""}" data-act="slot" data-k="${id}" tabindex="0" role="button" aria-label="Slot ${v?label(Rd,v):"empty"}"><rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="6"/><text x="${x}" y="${y}">${v?esc(label(Rd,v)):"?"}</text>${c&&ok==="bad"?`<text class="fixs" x="${x+w/2+6}" y="${y}">${esc(label(Rd,Rd.slots[id][0]))}</text>`:""}</g>`;
}
const gaps=(Rd,text)=>`<p class="gaptext">${text.replace(/\{(\w+)\}/g,(m,id)=>slot(Rd,id,"inline"))}</p>`;
const matchRows=(Rd,rows)=>`<div class="mrows">${rows.map(([id,txt])=>`<div class="mrow"><span>${txt}</span>${slot(Rd,id)}</div>`).join("")}</div>`;
function spotCls(Rd,id){const p=S().picks;if(!S().checked)return p.includes(id)?"picked":"";return Rd.ans.includes(id)?"ok":p.includes(id)?"bad":""}
const org=(Rd,id,inner)=>`<g class="org ${spotCls(Rd,id)}" data-act="spot" data-k="${id}">${inner}</g>`;

/* ---------- 1. Molecule Match-Up ---------- */
function glucose(Rd,c1){
  const sub=(x1,y1,x2,y2,t,tx,ty)=>`<line class="lead" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text class="atom" x="${tx}" y="${ty}">${t}</text>`;
  let s=`<svg class="dg" viewBox="0 0 360 250" role="img" aria-label="Ring structure of glucose">
  <path class="ln" d="M130,90 L220,90 M240,96 L280,140 L230,180 M130,90 L80,140 L130,180"/><path class="ln" style="stroke-width:5" d="M130,180 L230,180"/>
  <text class="atom" x="230" y="90">O</text>
  ${sub(130,90,130,58,"CH₂OH",130,46)}${sub(80,140,80,114,"H",80,104)}${sub(80,140,80,166,"OH",80,178)}
  ${sub(130,180,130,154,"OH",130,144)}${sub(130,180,130,206,"H",130,218)}${sub(230,180,230,154,"H",230,144)}${sub(230,180,230,206,"OH",230,218)}
  <text class="cnum" x="298" y="146">1</text><text class="cnum" x="244" y="172">2</text><text class="cnum" x="116" y="172">3</text><text class="cnum" x="64" y="136">4</text><text class="cnum" x="116" y="84">5</text>
  <line class="lead" x1="280" y1="140" x2="280" y2="110"/><line class="lead" x1="280" y1="140" x2="280" y2="170"/>`;
  s+=c1?`<text class="atom c1" x="280" y="98">${c1[0]}</text><text class="atom c1" x="280" y="184">${c1[1]}</text>`:sslot(Rd,"up",280,94)+sslot(Rd,"down",280,186);
  return s+`</svg>`;
}
const ABBA="ABBA: Alpha Below, Beta Above. In α-glucose the OH on carbon 1 is below the ring. In β-glucose it is above.";
function makeMolecules(){
  const first=pick(["α","β"]),second=first==="α"?"β":"α";
  const build=t=>({kind:"slots",title:`Build ${t}-glucose`,prompt:`Drag H and OH onto carbon 1 to make ${t}-glucose.`,tiles:["H","OH"],
    slots:t==="α"?{up:["H"],down:["OH"]}:{up:["OH"],down:["H"]},view:Rd=>`<div class="diagram narrow">${glucose(Rd)}</div>`,explain:ABBA});
  const idf=pick(["α","β"]);
  const identify={kind:"choice",title:"Alpha or beta?",prompt:"Which form of glucose is this?",opts:[`${idf}-glucose`,`${idf==="α"?"β":"α"}-glucose`],ans:0,
    view:Rd=>`<div class="diagram narrow">${glucose(Rd,idf==="α"?["H","OH"]:["OH","H"])}</div>`,explain:ABBA};
  const pool=[
   {kind:"slots",title:"Making maltose",prompt:"Complete the description.",tiles:["condensation","hydrolysis","α-1,4 glycosidic","peptide","water","carbon dioxide","maltose","sucrose"],
    slots:{a:["condensation"],b:["α-1,4 glycosidic"],c:["water"],d:["maltose"]},
    view:Rd=>gaps(Rd,"Two α-glucose molecules join in a {a} reaction. This forms an {b} bond and releases one molecule of {c}. The disaccharide formed is {d}."),
    explain:"Breaking the bond again by adding water is hydrolysis."},
   {kind:"slots",title:"Sucrose",prompt:"Complete the description.",tiles:["glucose","fructose","ribose","non-reducing","reducing","hydrolysed","denatured"],
    slots:{a:["glucose","fructose"],b:["fructose","glucose"],c:["non-reducing"],d:["hydrolysed"]},
    view:Rd=>gaps(Rd,"Sucrose is a disaccharide made from {a} and {b}. It is a {c} sugar, so it only gives a positive Benedict’s test after it has been {d} by boiling with dilute acid."),
    explain:"Maltose and sucrose are the two disaccharides named in the spec."},
   {kind:"slots",title:"Polysaccharide match-up",prompt:"Fill in the table.",tiles:["α-glucose","α-glucose","β-glucose","Amylose and amylopectin","Highly branched","Straight chains in microfibrils","Storage in plants","Storage in animals","Structural, in cell walls"],
    slots:{"s-m":["α-glucose"],"s-s":["Amylose and amylopectin"],"s-f":["Storage in plants"],"g-m":["α-glucose"],"g-s":["Highly branched"],"g-f":["Storage in animals"],"c-m":["β-glucose"],"c-s":["Straight chains in microfibrils"],"c-f":["Structural, in cell walls"]},
    view:Rd=>`<div class="tbl"><table class="mtab"><thead><tr><th></th><th>Monomer</th><th>Structure</th><th>Function</th></tr></thead><tbody>${[["s","Starch"],["g","Glycogen"],["c","Cellulose"]].map(([k,n])=>`<tr><th>${n}</th>${["m","s","f"].map(c=>`<td>${slot(Rd,k+"-"+c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
    explain:"In cellulose every other β-glucose is inverted, giving straight chains held together by hydrogen bonds."},
   {kind:"slots",title:"Building a triglyceride",prompt:"Complete the description.",tiles:["glycerol","fatty acids","amino acids","condensation","hydrolysis","ester","glycosidic","3","1"],
    slots:{a:["glycerol"],b:["fatty acids"],c:["condensation"],d:["ester"],e:["3"]},
    view:Rd=>gaps(Rd,"A triglyceride forms when one {a} molecule joins three {b} in {c} reactions. Each forms an {d} bond, so {e} molecules of water are released."),
    explain:"Hydrolysis of a triglyceride releases glycerol and three fatty acids again."},
   {kind:"slots",title:"Levels of protein structure",prompt:"Match each level to what holds it together.",tiles:["Peptide bonds (amino acid sequence)","Hydrogen bonds (α-helix, β-pleated sheet)","Hydrogen, ionic and disulfide bonds, hydrophobic interactions","More than one polypeptide"],
    slots:{p:["Peptide bonds (amino acid sequence)"],s:["Hydrogen bonds (α-helix, β-pleated sheet)"],t:["Hydrogen, ionic and disulfide bonds, hydrophobic interactions"],q:["More than one polypeptide"]},
    view:Rd=>matchRows(Rd,[["p","Primary"],["s","Secondary"],["t","Tertiary"],["q","Quaternary"]]),
    explain:"Haemoglobin has a quaternary structure and is a conjugated protein with haem prosthetic groups."},
   {kind:"slots",title:"Ions in molecules",prompt:"Match each molecule to the inorganic ion it contains.",tiles:["Magnesium","Iron","Phosphate","Calcium"],
    slots:{a:["Magnesium"],b:["Iron"],c:["Phosphate"],d:["Calcium"]},
    view:Rd=>matchRows(Rd,[["a","Chlorophyll"],["b","Haemoglobin"],["c","ATP and nucleic acids"],["d","Calcium pectate"]]),explain:"Phosphate is also part of phospholipids."},
   {kind:"slots",title:"Phospholipids",prompt:"Complete the description.",tiles:["hydrophilic","hydrophobic","bilayer","double helix","saturated","unsaturated"],
    slots:{a:["hydrophilic"],b:["hydrophobic"],c:["bilayer"],d:["unsaturated"]},
    view:Rd=>gaps(Rd,"A phospholipid has a {a} phosphate head and two {b} fatty acid tails, so in water phospholipids form a {c}. A fatty acid with a C=C double bond is {d}."),
    explain:"This bilayer is the basis of the fluid mosaic model."}];
  return [build(first),build(second),identify,...shuffle(pool).slice(0,5)];
}

/* ---------- 2. DNA Detective ---------- */
const PAIR={A:"T",T:"A",G:"C",C:"G"};
const randBases=n=>Array.from({length:n},()=>pick(["A","T","G","C"]));
function ladder(Rd,top,bottom,opts={}){
  const n=top.length,x0=60,dx=52,W=x0*2+dx*(n-1);
  let s=`<svg class="dg" viewBox="0 0 ${W} 210" role="img" aria-label="Section of DNA"><line class="bb" x1="${x0-24}" y1="30" x2="${x0+dx*(n-1)+24}" y2="30"/><line class="bb" x1="${x0-24}" y1="180" x2="${x0+dx*(n-1)+24}" y2="180"/>
  <text class="cnum" x="${x0-38}" y="30">5′</text><text class="cnum" x="${x0+dx*(n-1)+38}" y="30">3′</text><text class="cnum" x="${x0-38}" y="180">3′</text><text class="cnum" x="${x0+dx*(n-1)+38}" y="180">5′</text>`;
  top.forEach((b,i)=>{const x=x0+i*dx;
    let col=`<line class="lead" x1="${x}" y1="30" x2="${x}" y2="44"/><rect class="base b${b}" x="${x-17}" y="44" width="34" height="30" rx="4"/><text class="atom" x="${x}" y="59">${b}</text>`;
    if(opts.bonds){const bb=bottom[i];if(PAIR[b]===bb){const k=b==="A"||b==="T"?2:3;for(let j=0;j<k;j++)col+=`<line class="hb" x1="${x-8+j*(16/(k-1))}" y1="80" x2="${x-8+j*(16/(k-1))}" y2="128"/>`}}
    if(opts.slots) col+=sslot(Rd,"b"+i,x,150,34,30);
    else col+=`<rect class="base b${bottom[i]}" x="${x-17}" y="135" width="34" height="30" rx="4"/><text class="atom" x="${x}" y="150">${bottom[i]}</text>`;
    col+=`<line class="lead" x1="${x}" y1="166" x2="${x}" y2="180"/>`;
    s+=opts.spot?org(Rd,"p"+i,`<rect x="${x-24}" y="40" width="48" height="130" rx="6" class="hitbox"/>`+col):col});
  return s+"</svg>";
}
function tubes(Rd,gen){
  const tube=(x,label,inner)=>`<path class="ln" d="M${x-22},30 L${x-22},190 Q${x-22},215 ${x},215 Q${x+22},215 ${x+22},190 L${x+22},30"/>${inner}<text class="cnum" x="${x}" y="236">${label}</text>`;
  const ys={L:80,I:120,H:160},band=(x,y,c="")=>`<rect class="band ${c}" x="${x-20}" y="${y-5}" width="40" height="10" rx="3"/>`;
  let s=`<svg class="dg" viewBox="0 0 420 250" role="img" aria-label="Centrifuge tubes">`;
  s+=Object.entries({L:"Light (¹⁴N)",I:"Intermediate",H:"Heavy (¹⁵N)"}).map(([k,t])=>`<line class="guide" x1="40" y1="${ys[k]}" x2="330" y2="${ys[k]}"/><text class="tick" x="338" y="${ys[k]+4}">${t}</text>`).join("");
  s+=tube(90,"Generation 0",band(90,ys.H));
  s+=tube(230,`Generation ${gen}`,["L","I","H"].map(k=>org(Rd,k,`<rect class="hitbox" x="${230-24}" y="${ys[k]-16}" width="48" height="32"/>${S().picks.includes(k)||(S().checked&&Rd.ans.includes(k))?band(230,ys[k]):`<rect class="bandslot" x="210" y="${ys[k]-5}" width="40" height="10" rx="3"/>`}`)).join(""));
  return s+"</svg>";
}
function nucleotide(Rd){
  return `<svg class="dg" viewBox="0 0 420 210" role="img" aria-label="A nucleotide"><circle class="cyto" cx="70" cy="80" r="26"/><line class="ln" x1="96" y1="85" x2="140" y2="95"/>
  <path class="cyto" d="M175,62 L208,86 L196,124 L154,124 L142,86 Z"/><line class="ln" x1="208" y1="92" x2="262" y2="92"/><rect class="cyto" x="262" y="66" width="80" height="52" rx="4"/>
  ${sslot(Rd,"p",70,170,120)}${sslot(Rd,"s",175,170,120)}${sslot(Rd,"b",302,170,120)}
  <line class="lead" x1="70" y1="106" x2="70" y2="155"/><line class="lead" x1="175" y1="124" x2="175" y2="155"/><line class="lead" x1="302" y1="118" x2="302" y2="155"/></svg>`;
}
function makeDNA(){
  const top=randBases(6);
  const mm=randBases(7),bot=mm.map(b=>PAIR[b]),bad=shuffle([0,1,2,3,4,5,6]).slice(0,2);
  bad.forEach(i=>{bot[i]=pick(["A","T","G","C"].filter(x=>x!==PAIR[mm[i]]))});
  const a=rint(15,35),g=50-a,gen=pick([1,2]);
  const feats=shuffle([["Contains uracil","RNA"],["Contains thymine","DNA"],["Contains deoxyribose","DNA"],["Contains ribose","RNA"],["Usually a double-stranded helix","DNA"],["Contains phosphate","Both"],["Contains adenine","Both"]]).slice(0,5);
  return [
   {kind:"slots",title:"Pair the bases",prompt:"Drag bases onto the bottom strand to make it complementary to the top strand.",tiles:["A","T","G","C"],infinite:true,
    slots:Object.fromEntries(top.map((b,i)=>["b"+i,[PAIR[b]]])),view:Rd=>`<div class="diagram">${ladder(Rd,top,top.map(b=>PAIR[b]),{slots:true,bonds:S().checked})}</div>`,
    explain:"A pairs with T using two hydrogen bonds. G pairs with C using three. The strands are antiparallel."},
   {kind:"spot",multi:true,title:"Spot the mismatches",prompt:"Two base pairs in this DNA are wrong. Tap both, then check.",ans:bad.map(i=>"p"+i),
    view:Rd=>`<div class="diagram">${ladder(Rd,mm,bot,{spot:true})}</div>`,explain:"Only A–T and G–C pairs are complementary."},
   {kind:"slots",title:"DNA or RNA?",prompt:"Sort each feature.",tiles:["DNA","RNA","Both"],infinite:true,
    slots:Object.fromEntries(feats.map((f,i)=>["f"+i,[f[1]]])),view:Rd=>matchRows(Rd,feats.map((f,i)=>["f"+i,f[0]])),
    explain:"Both are polynucleotides made by condensation of nucleotides, each with a pentose sugar, a base and phosphate."},
   {kind:"slots",title:"Label the nucleotide",prompt:"Name the three parts of this nucleotide.",tiles:["Phosphate","Pentose sugar","Nitrogenous base","Glycerol","Amino acid"],
    slots:{p:["Phosphate"],s:["Pentose sugar"],b:["Nitrogenous base"]},view:Rd=>`<div class="diagram narrow">${nucleotide(Rd)}</div>`,
    explain:"A nucleotide is a condensation product of a pentose sugar, a nitrogenous base and inorganic phosphate."},
   {kind:"order",title:"Replicate the DNA",prompt:"Put the steps of DNA replication in order.",items:["DNA helicase opens the helix by breaking hydrogen bonds between bases","Free DNA nucleotides pair with complementary bases on each exposed strand","DNA polymerase joins the nucleotides to make new chains","Two identical DNA molecules form, each with one original and one new strand"],
    explain:"This is semi-conservative replication."},
   {kind:"spot",multi:true,title:"Meselson and Stahl",prompt:`Bacteria grown for many generations in ¹⁵N are moved to ¹⁴N. Tap where the DNA band${gen===1?"":"s"} will be after ${gen} generation${gen===1?"":"s"}, then check.`,
    ans:gen===1?["I"]:["I","L"],view:Rd=>`<div class="diagram narrow">${tubes(Rd,gen)}</div>`,
    explain:gen===1?"After one generation every molecule has one ¹⁵N strand and one ¹⁴N strand, so there is one intermediate band.":"After two generations, half the molecules are hybrid (intermediate) and half contain only ¹⁴N (light)."},
   {kind:"num",title:"Base percentages",prompt:`In a sample of double-stranded DNA, ${a}% of the bases are adenine. What percentage are guanine?`,ans:g,tol:0.01,unit:"%",show:`${g}%`,
    explain:`A = T, so A + T = ${2*a}%. That leaves ${100-2*a}% for G + C, so G = ${g}%.`},
   {kind:"slots",title:"Semi-conservative replication",prompt:"Complete the description.",tiles:["semi-conservative","conservative","original","new","antiparallel","parallel","hydrogen","peptide"],
    slots:{a:["semi-conservative"],b:["original"],c:["new"],d:["antiparallel"],e:["hydrogen"]},
    view:Rd=>gaps(Rd,"DNA replication is {a}: each new molecule has one {b} strand and one {c} strand. The two strands are {d} and held together by {e} bonds between complementary bases."),
    explain:"The Meselson–Stahl experiment supported this model."}];
}

/* ---------- 3. Osmosis Challenge ---------- */
function beaker(Rd,type,cellPsi,solPsi,state){
  let cell="";
  if(type==="animal"){
    if(state==="crenated"){let d="";for(let i=0;i<=28;i++){const a=i/28*Math.PI*2,r=i%2?30:38;d+=(i?"L":"M")+(180+Math.cos(a)*r).toFixed(1)+","+(150+Math.sin(a)*r).toFixed(1)}cell=`<path class="cyto" d="${d}Z"/>`}
    else if(state==="lysed")cell=`<path class="ln" d="M140,130 A48,48 0 0 1 185,100 M200,104 A48,48 0 0 1 226,150 M222,170 A48,48 0 0 1 170,197 M150,188 A48,48 0 0 1 133,152"/><text class="tick" x="180" y="153" text-anchor="middle">burst</text>`;
    else cell=`<circle class="cyto" cx="180" cy="150" r="${state==="swollen"?48:40}"/><circle class="nucl" cx="172" cy="146" r="11"/>`;
  } else {
    cell=`<rect class="green" x="120" y="108" width="120" height="84" rx="8"/>`;
    if(state==="plasmolysed")cell+=`<path class="cyto" d="M150,130 C170,118 205,120 215,138 C225,158 205,176 180,174 C155,172 138,160 140,146 C141,138 144,134 150,130 Z"/><circle class="nucl" cx="160" cy="146" r="8"/>`;
    else cell+=`<rect class="cyto" x="${state==="turgid"?123:128}" y="${state==="turgid"?111:116}" width="${state==="turgid"?114:104}" height="${state==="turgid"?78:68}" rx="6"/><rect class="vacf" x="150" y="128" width="72" height="44" rx="14"/><circle class="nucl" cx="138" cy="130" r="8"/>`;
  }
  return `<svg class="dg" viewBox="0 0 360 260" role="img" aria-label="A cell in a beaker of solution"><rect class="water" x="40" y="62" width="280" height="168"/><path class="ln" d="M40,24 L40,214 Q40,232 58,232 L302,232 Q320,232 320,214 L320,24"/>${cell}
  <text class="tick" x="180" y="88" text-anchor="middle">Solution: ψ = ${fmt(solPsi)} kPa</text><text class="tick" x="180" y="250" text-anchor="middle">${state?`Result: ${state}`:`Cell: ψ = ${fmt(cellPsi)} kPa`}</text></svg>`;
}
function predictRound(type){
  const cellPsi=-rint(500,900,50),mode=pick(["higher","lower","equal"]),sol=mode==="higher"?0:mode==="lower"?-rint(1100,1500,100):cellPsi;
  const A=["Water enters by osmosis and the cell bursts (lysis)","Water leaves by osmosis and the cell shrinks (crenation)","No net movement of water","The cell becomes turgid"];
  const P=["Water enters by osmosis and the cell becomes turgid","Water leaves by osmosis and the cell plasmolyses","No net movement of water","The cell bursts (lysis)"];
  const opts=type==="animal"?A:P,ans=mode==="higher"?0:mode==="lower"?1:2;
  const endState=type==="animal"?["lysed","crenated",""][ans]:["turgid","plasmolysed",""][ans];
  return {kind:"choice",title:type==="animal"?"Animal cell in solution":"Plant cell in solution",prompt:`What happens to this ${type} cell?`,opts,ans,
    view:Rd=>`<div class="diagram narrow">${beaker(Rd,type,cellPsi,sol,S().checked?endState||"no change":"")}</div>`,
    explain:`Water moves by osmosis from a higher (less negative) to a lower (more negative) water potential. ${type==="animal"?"Animal cells have no cell wall, so they burst in pure water.":"The cell wall stops a plant cell bursting; the protoplast pushes against it and the cell becomes turgid."}`};
}
function potatoGraph(Rd,pt){
  const W=460,H=300,L=60,T=16,pw=370,ph=230,X=x=>L+(-x)/1400*pw,Y=y=>T+ph/2-y/12*(ph/2);
  const pts=[0,-200,-400,-600,-800,-1000,-1200,-1400].map(x=>[x,0.0115*(x-pt)+(Math.random()-.5)*0.6]);
  let s=`<svg class="dg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Graph of percentage change in mass against solute potential">`;
  for(let x=0;x>=-1400;x-=100)s+=`<line class="grid" x1="${X(x)}" y1="${T}" x2="${X(x)}" y2="${T+ph}"/>`;
  for(let y=-12;y<=12;y+=2)s+=`<line class="grid" x1="${L}" y1="${Y(y)}" x2="${L+pw}" y2="${Y(y)}"/>`;
  s+=`<line class="axis" x1="${L}" y1="${T}" x2="${L}" y2="${T+ph}"/><line class="axis" x1="${L}" y1="${Y(0)}" x2="${L+pw}" y2="${Y(0)}"/>`;
  for(let x=0;x>=-1400;x-=200)s+=`<text class="tick" x="${X(x)}" y="${T+ph+16}" text-anchor="middle">${x}</text>`;
  for(let y=-12;y<=12;y+=4)s+=`<text class="tick" x="${L-6}" y="${Y(y)+4}" text-anchor="end">${y>0?"+"+y:y}</text>`;
  s+=`<line class="fit" x1="${X(0)}" y1="${Y(0.0115*(0-pt))}" x2="${X(-1400)}" y2="${Y(0.0115*(-1400-pt))}"/>`;
  s+=pts.map(([x,y])=>`<path class="ln" d="M${X(x)-4},${Y(y)-4}l8,8m0,-8l-8,8"/>`).join("");
  s+=`<text class="atitle" x="${L+pw/2}" y="${H-4}" text-anchor="middle">Solute potential of solution / kPa</text><text class="atitle" transform="translate(14,${T+ph/2}) rotate(-90)" text-anchor="middle">Change in mass / %</text>`;
  return s+"</svg>";
}
function makeOsmosis(){
  const s1=-rint(600,1200,50),p1=rint(100,500,50),c2=-rint(300,700,50),s2=c2-rint(200,500,50);
  const pt=-rint(600,900,50),m0=rint(220,320)/100,ch=rint(-15,15),m1=+(m0*(1+ch/100)).toFixed(2),pc=(m1-m0)/m0*100;
  const a=-rint(300,700,100),b=a-pick([200,300,400]),swap=Math.random()<.5,psiA=swap?b:a,psiB=swap?a:b;
  const inc=-rint(800,1100,50);
  const tr=shuffle([["Oxygen moving into a respiring cell","Diffusion"],["Glucose through a carrier protein, down its gradient","Facilitated diffusion"],["Mineral ions into a root hair, against their gradient","Active transport"],["A white blood cell engulfing a bacterium","Phagocytosis"],["Enzymes released from the cell in vesicles","Exocytosis"],["Water across a partially permeable membrane","Osmosis"]]).slice(0,5);
  return [
   predictRound("animal"),predictRound("plant"),
   {kind:"num",title:"Calculate ψcell",prompt:`A plant cell has a solute potential of ${s1} kPa and a pressure potential of +${p1} kPa. Calculate its water potential.`,ans:s1+p1,tol:0.5,unit:"kPa",show:`${s1+p1} kPa`,explain:`ψcell = ψs + ψp = ${s1} + ${p1} = ${s1+p1} kPa.`},
   {kind:"num",title:"Calculate ψp",prompt:`A plant cell has a water potential of ${c2} kPa and a solute potential of ${s2} kPa. Calculate its pressure potential.`,ans:c2-s2,tol:0.5,unit:"kPa",show:`+${c2-s2} kPa`,explain:`ψp = ψcell − ψs = ${c2} − (${s2}) = +${c2-s2} kPa.`},
   {kind:"choice",title:"Neighbouring cells",prompt:`Cell A has ψ = ${psiA} kPa. Cell B, next to it, has ψ = ${psiB} kPa. Which way does water move?`,opts:["From A to B","From B to A","No net movement"],ans:psiA>psiB?0:1,
    explain:"Water moves down the water potential gradient, from the less negative to the more negative cell."},
   {kind:"num",title:"Percentage change in mass",prompt:`A potato cylinder had a mass of ${m0.toFixed(2)} g before and ${m1.toFixed(2)} g after 24 hours in a sucrose solution. Calculate the percentage change in mass.`,ans:pc,tol:0.6,unit:"%",show:`${pc>0?"+":""}${pc.toFixed(1)}%`,
    explain:`(final − initial) ÷ initial × 100 = (${m1.toFixed(2)} − ${m0.toFixed(2)}) ÷ ${m0.toFixed(2)} × 100 = ${pc.toFixed(1)}%. A loss is negative.`},
   {kind:"num",title:"Water potential from a graph",prompt:"Use the graph to estimate the average water potential of the potato tissue.",ans:pt,tol:60,unit:"kPa",show:`about ${pt} kPa`,
    view:Rd=>`<div class="diagram">${potatoGraph(Rd,pt)}</div>`,explain:"Read where the line crosses 0% change in mass. There, ψ of the solution equals ψ of the tissue, so there is no net water movement."},
   {kind:"num",title:"Incipient plasmolysis",prompt:`In an onion epidermis experiment, 50% of cells are plasmolysed in a solution with a solute potential of ${inc} kPa. What is the average solute potential of the cells?`,ans:inc,tol:0.5,unit:"kPa",show:`${inc} kPa`,
    explain:"At 50% plasmolysis (incipient plasmolysis) the average pressure potential is zero, so ψs of the cells equals ψ of the solution."},
   {kind:"slots",title:"Across the membrane",prompt:"Match each example to how it crosses the membrane.",tiles:["Diffusion","Facilitated diffusion","Active transport","Osmosis","Phagocytosis","Exocytosis"],infinite:true,
    slots:Object.fromEntries(tr.map((t,i)=>["t"+i,[t[1]]])),view:Rd=>matchRows(Rd,tr.map((t,i)=>["t"+i,t[0]])),
    explain:"Active transport uses carrier proteins and ATP. Phagocytosis and pinocytosis are types of endocytosis."}];
}

/* ---------- 4. Cell Surgery ---------- */
const PART={nucleus:"Nucleus",mito:"Mitochondrion",wall:"Cell wall",chl:"Chloroplast",cent:"Centrioles",vac:"Vacuole and tonoplast",golgi:"Golgi apparatus",dna:"Circular DNA",plasmid:"Plasmid",ribo:"Ribosomes",rer:"Rough ER",lyso:"Lysosome",flag:"Flagellum",mem:"Cell surface membrane"};
const cris=(cx,cy,rx)=>{let d=`M${cx-rx+5},${cy}`;for(let x=cx-rx+10,i=0;x<cx+rx-4;x+=6,i++)d+=`L${x},${cy+(i%2?6:-6)}`;return `<path class="ln thin" d="${d}"/>`};
const gr=(cx,cy)=>[-10,0,10].map(o=>`<path class="grana" d="M${cx+o-3},${cy-4}h6M${cx+o-3},${cy-1}h6M${cx+o-3},${cy+2}h6"/>`).join("");
function cellDraw(Rd,type,has){
  const P=(id,inner)=>has.includes(id)?org(Rd,id,inner):"";
  if(type==="prok") return `<svg class="dg" viewBox="0 0 440 220" role="img" aria-label="Cell diagram">
    ${P("wall",`<rect class="green" x="40" y="40" width="320" height="140" rx="70" style="stroke-width:2.5"/>`)}
    ${P("mem",`<rect class="cyto" x="50" y="50" width="300" height="120" rx="60"/>`)}
    ${P("dna",`<path class="ln" style="stroke-width:2" d="M165,105 C180,72 245,78 255,100 C265,125 245,150 215,140 C190,132 180,150 160,135 C148,126 152,112 165,105 Z"/>`)}
    ${P("plasmid",`<circle class="ln" cx="300" cy="95" r="11" style="stroke-width:1.8"/>`)}
    ${P("ribo",[[180,62],[160,160],[260,160],[330,82],[322,138],[245,62],[290,60]].map(([x,y])=>`<circle class="dark" cx="${x}" cy="${y}" r="3"/>`).join(""))}
    ${P("flag",`<path class="ln" style="stroke-width:2" d="M360,112 q12,-16 24,0 t24,0 t24,0"/>`)}
    ${P("nucleus",`<circle class="nucl" cx="112" cy="110" r="30"/><circle class="dark" cx="118" cy="104" r="8"/>`)}
    ${P("mito",`<ellipse class="mitoc" cx="290" cy="135" rx="24" ry="11"/>${cris(290,135,24)}`)}</svg>`;
  if(type==="animal") return `<svg class="dg" viewBox="0 0 400 260" role="img" aria-label="Cell diagram">
    ${P("wall",`<path class="green" d="M46,130 C41,50 125,18 210,23 C308,28 364,72 359,140 C354,222 286,249 200,246 C102,244 51,208 46,130 Z"/>`)}
    ${P("mem",`<path class="cyto" d="M60,130 C55,60 130,32 210,36 C300,40 348,80 344,140 C340,210 280,233 200,231 C110,229 65,200 60,130 Z"/>`)}
    ${P("nucleus",`<circle class="nucl" cx="140" cy="125" r="38"/><circle class="dark" cx="148" cy="118" r="10"/>`)}
    ${P("mito",`<ellipse class="mitoc" cx="270" cy="88" rx="26" ry="12"/>${cris(270,88,26)}<ellipse class="mitoc" cx="290" cy="192" rx="24" ry="11"/>${cris(290,192,24)}`)}
    ${P("rer",[112,124,136].map(y=>`<path class="ln thin" d="M192,${y} q8,-6 16,0 t16,0 t16,0"/>`+[192,208,224,240].map(x=>`<circle class="dark" cx="${x}" cy="${y}" r="1.8"/>`).join("")).join(""))}
    ${P("golgi",[0,1,2,3].map(k=>`<path class="gol" d="M262,${136+7*k} Q285,${127+7*k} 308,${136+7*k}"/>`).join("")+`<circle class="cyto" cx="314" cy="132" r="3.5"/>`)}
    ${P("lyso",`<circle class="cyto" cx="205" cy="70" r="11"/><circle class="dark" cx="202" cy="67" r="1.6"/><circle class="dark" cx="208" cy="72" r="1.6"/><circle class="dark" cx="203" cy="74" r="1.6"/>`)}
    ${P("cent",`<rect class="cyto" x="108" y="192" width="22" height="8"/><rect class="cyto" x="136" y="185" width="8" height="22"/>`)}
    ${P("ribo",[[230,175],[245,205],[100,80],[300,120],[180,200]].map(([x,y])=>`<circle class="dark" cx="${x}" cy="${y}" r="2.4"/>`).join(""))}
    ${P("chl",`<ellipse class="green" cx="200" cy="197" rx="28" ry="12"/>${gr(200,197)}`)}</svg>`;
  return `<svg class="dg" viewBox="0 0 400 280" role="img" aria-label="Cell diagram">
    ${P("wall",`<rect class="green" x="10" y="10" width="380" height="260" rx="14" style="stroke-width:2"/>`)}
    ${P("mem",`<rect class="cyto" x="20" y="20" width="360" height="240" rx="10"/>`)}
    ${P("vac",`<ellipse class="vacf" cx="250" cy="145" rx="100" ry="70" style="stroke-width:2"/>`)}
    ${P("nucleus",`<circle class="nucl" cx="80" cy="80" r="34"/><circle class="dark" cx="87" cy="75" r="9"/>`)}
    ${P("chl",`<ellipse class="green" cx="80" cy="215" rx="30" ry="13"/>${gr(80,215)}<ellipse class="green" cx="330" cy="45" rx="26" ry="11"/>${gr(330,45)}`)}
    ${P("mito",`<ellipse class="mitoc" cx="190" cy="42" rx="22" ry="10"/>${cris(190,42,22)}`)}
    ${P("golgi",[0,1,2].map(k=>`<path class="gol" d="M132,${228+7*k} Q152,${220+7*k} 172,${228+7*k}"/>`).join(""))}
    ${P("cent",`<rect class="cyto" x="200" y="235" width="22" height="8"/><rect class="cyto" x="228" y="228" width="8" height="22"/>`)}</svg>`;
}
const BASE={prok:["wall","mem","dna","plasmid","ribo","flag"],animal:["mem","nucleus","mito","rer","golgi","lyso","cent","ribo"],plant:["wall","mem","vac","nucleus","chl","mito","golgi"]};
const CASES=[
 {type:"prok",name:"a prokaryotic cell (a bacterium)",extra:"nucleus",why:"Prokaryotic cells have no nucleus.",
  q:["Where is the DNA in a prokaryotic cell?",["Naked, circular DNA free in the cytoplasm, sometimes with plasmids","Inside a nucleus with a double membrane","Wrapped around histones in chromosomes","Inside the mitochondria"],"Eukaryotic chromosomes are DNA with histone protein, inside a membrane-bound nucleus."]},
 {type:"prok",name:"a prokaryotic cell (a bacterium)",extra:"mito",why:"Prokaryotic cells have no mitochondria.",
  q:["Which list contains only structures that prokaryotic cells lack?",["Nucleus, mitochondria and endoplasmic reticulum","Cell wall, ribosomes and plasmids","Ribosomes, cell membrane and DNA","Plasmids, flagellum and cell wall"],"Prokaryotes do have small ribosomes, a cell wall and possibly plasmids."]},
 {type:"animal",name:"an animal cell",extra:"wall",why:"Animal cells have no cell wall.",
  q:["Which structure is found in animal cells but not in plant cells?",["Centrioles","Cell wall","Chloroplasts","A large permanent vacuole"],"Animal cells lack chloroplasts and a cell wall and possess centrioles."]},
 {type:"animal",name:"an animal cell",extra:"chl",why:"Animal cells do not have chloroplasts.",
  q:["Which structures are found inside a chloroplast?",["Thylakoids, grana, stroma and starch grains","Cristae and a matrix","A nucleolus and chromatin","A tonoplast and cell sap"],"Chloroplasts also have an envelope, lamellae and lipid droplets."]},
 {type:"plant",name:"a plant cell",extra:"cent",why:"Plant cells do not have centrioles.",
  q:["What are centrioles made of?",["Microtubules","Cellulose","Phospholipids only","Chitin"],"Microtubules are part of the cytoskeleton. Centrioles help form the spindle in animal cells."]},
 {type:"plant",name:"a plant cell",missing:"vac",why:"Plant cells have a large permanent vacuole bounded by a tonoplast.",
  q:["What is the tonoplast?",["The membrane around the vacuole","The cell wall of a plant cell","A type of chloroplast","The outer membrane of the nucleus"],"The vacuole contains cell sap and keeps the cell turgid."]},
 {type:"plant",name:"a palisade mesophyll cell",missing:"chl",why:"Palisade mesophyll cells are packed with chloroplasts.",
  q:["What is the middle lamella between plant cells made of?",["Calcium pectate","Cellulose","Chitin","Glycogen"],"The middle lamella sticks neighbouring cell walls together."]},
 {type:"animal",name:"an animal cell",missing:"mito",why:"Animal cells need mitochondria for aerobic respiration.",
  q:["Which describes the structure of a mitochondrion?",["An envelope of two membranes, cristae and a matrix","A single membrane containing hydrolytic enzymes","Stacks of thylakoids called grana","A stack of flattened membrane sacs"],"The folded inner membrane forms the cristae."]},
 {type:"animal",name:"an animal cell that secretes enzymes",missing:"golgi",why:"Secretory cells need a Golgi apparatus to package proteins.",
  q:["What is the route of a protein that is secreted from the cell?",["Ribosomes on RER, then Golgi apparatus, then vesicle, then exocytosis","Golgi apparatus, then RER, then nucleus, then exocytosis","Lysosome, then ribosome, then vesicle, then endocytosis","Nucleus, then mitochondrion, then Golgi, then cell wall"],"The Golgi apparatus modifies proteins and packages them into vesicles."]},
 {type:"prok",name:"a prokaryotic cell (a bacterium)",missing:"wall",why:"Prokaryotic cells have a cell wall.",
  q:["What are the small, extra loops of DNA found in some bacteria?",["Plasmids","Chromosomes","Nucleoli","Ribosomes"],"Prokaryotes have naked, circular DNA and possibly plasmids."]}];
function makeSurgery(){
  const rounds=[];
  shuffle(CASES).slice(0,4).forEach(c=>{
    const has=c.extra?[...BASE[c.type],c.extra]:BASE[c.type].filter(p=>p!==c.missing);
    if(c.extra) rounds.push({kind:"spot",title:"Cell Surgery",prompt:`This is meant to be ${c.name}. One structure should not be there. Tap it.`,ans:[c.extra],
      view:Rd=>`<div class="diagram narrow">${cellDraw(Rd,c.type,has)}</div>`,explain:`That is ${PART[c.extra].toLowerCase()==="centrioles"?"the centrioles":"the "+PART[c.extra].toLowerCase()}. ${c.why}`});
    else{const others=shuffle(has.filter(p=>p!=="mem"&&p!=="ribo")).slice(0,3);
      rounds.push({kind:"choice",title:"Cell Surgery",prompt:`This is meant to be ${c.name}. Which structure is missing?`,opts:[PART[c.missing],...others.map(p=>PART[p])],ans:0,
      view:Rd=>`<div class="diagram narrow">${cellDraw(Rd,c.type,has)}</div>`,explain:c.why})}
    rounds.push({kind:"choice",title:"Follow-up",prompt:c.q[0],opts:c.q[1],ans:0,explain:c.q[2]});
  });
  return rounds;
}

const GAMES={
 molecules:{title:"Molecule Match-Up",topic:"m",make:makeMolecules,blurb:"Build α- and β-glucose, then match up carbohydrates, lipids and proteins."},
 dna:{title:"DNA Detective",topic:"m",make:makeDNA,blurb:"Pair bases, spot mismatches, replicate DNA and predict Meselson–Stahl bands."},
 surgery:{title:"Cell Surgery",topic:"c",make:makeSurgery,blurb:"Find what is wrong with each cell, then explain it."},
 osmosis:{title:"Osmosis Challenge",topic:"p",make:makeOsmosis,blurb:"Predict what cells do in solutions and calculate water potential."}};

/* ---------- engine ---------- */
function open(id){gid=id;st={rounds:GAMES[id].make(),i:0,got:0,max:0,done:false};begin()}
function begin(){const Rd=R();st.r={placed:{},sel:null,picks:[],seq:[],val:"",checked:false};if(Rd.kind==="choice"&&!Rd.order)Rd.order=Rd.opts.length===2||Rd.fixed?Rd.opts.map((_,i)=>i):shuffle(Rd.opts.map((_,i)=>i));if(Rd.kind==="order"&&!Rd.shown)Rd.shown=shuffle(Rd.items.map((_,i)=>i));render()}
function avail(Rd,v,except){if(Rd.infinite)return true;const total=Rd.tiles.filter(t=>t===v).length,used=Object.entries(S().placed).filter(([k,x])=>x===v&&k!==except).length;return used<total}
function bankHTML(Rd){
  let vals;
  if(Rd.infinite)vals=[...new Set(Rd.tiles)];
  else{const left=Rd.tiles.slice();Object.values(S().placed).forEach(v=>{const i=left.indexOf(v);if(i>=0)left.splice(i,1)});vals=left;
    if(!Rd._order){Rd._order=shuffle(Rd.tiles)}vals=Rd._order.filter((v,i,a)=>{const need=vals.filter(x=>x===v).length,before=a.slice(0,i).filter(x=>x===v).length;return before<need})}
  return `<div class="bank">${vals.map(v=>`<button class="tile ${S().sel===v?"on":""}" draggable="true" data-act="tile" data-k="${esc(v)}" aria-pressed="${S().sel===v}">${esc(label(Rd,v))}</button>`).join("")}</div>`;
}
function scoreRound(){
  const Rd=R(),r=S();let got=0,max=1;
  if(Rd.kind==="slots"){const ids=Object.keys(Rd.slots);max=ids.length;got=ids.filter(id=>Rd.slots[id].includes(r.placed[id])).length}
  else if(Rd.kind==="choice"){got=r.pick===Rd.ans?1:0}
  else if(Rd.kind==="num"){got=Math.abs(r.num-Rd.ans)<=Rd.tol?1:0}
  else if(Rd.kind==="order"){max=Rd.items.length;got=r.seq.filter((v,i)=>v===i).length}
  else if(Rd.kind==="spot"){max=Rd.ans.length;const hit=r.picks.filter(p=>Rd.ans.includes(p)).length,wrong=r.picks.length-hit;got=Math.max(0,hit-wrong)}
  r.checked=true;r.got=got;r.max=max;st.got+=got;st.max+=max;
}
function render(){
  const g=GAMES[gid],t=topicById[g.topic];
  if(st.done){
    const pct=Math.round(st.got/st.max*100),k="gm-"+gid,prev=store.get(k),isBest=pct>prev;if(isBest)store.set(k,pct);
    root.innerHTML=`<div class="topic">${t.code} ${esc(t.name)} · Results</div><div class="result pop" style="border:0;padding:0"><div><div class="big">${st.got}/${st.max}</div><div class="muted">${pct}% ${isBest?"· new best":"· best "+Math.max(prev,pct)+"%"}</div></div><div class="stars" style="font-size:26px">${starsOf(st.got/st.max)}</div></div>
    <div class="row"><button class="primary" data-act="again">Play again</button><button class="ghost" data-act="back">Back to topics</button></div>`;return}
  const Rd=R(),r=S();
  let body="";
  if(Rd.kind==="slots") body=(r.checked?"":bankHTML(Rd))+(r.checked?"":`<div class="row"><button class="primary" data-act="check" ${Object.keys(Rd.slots).every(k=>r.placed[k])?"":"disabled"}>Check</button><span class="muted small">Drag a tile, or tap a tile and then a gap. Tap a filled gap to clear it.</span></div>`);
  if(Rd.kind==="choice") body=`<div class="opts">${Rd.order.map(i=>`<button class="opt ${r.checked?(i===Rd.ans?"right":i===r.pick?"wrong":""):""}" data-act="opt" data-k="${i}" ${r.checked?"disabled":""}>${esc(Rd.opts[i])}</button>`).join("")}</div>`;
  if(Rd.kind==="num") body=`<div class="row"><input id="gans" inputmode="decimal" autocomplete="off" value="${esc(r.val)}" placeholder="Answer" aria-label="Your answer" ${r.checked?"disabled":""}><span class="muted">${Rd.unit}</span>${r.checked?"":`<button class="primary" data-act="num">Check</button>`}</div>`;
  if(Rd.kind==="order") body=`<div class="opts">${Rd.shown.map(i=>{const pos=r.seq.indexOf(i),st2=r.checked?(r.seq[i]===i?"right":"wrong"):"";return `<button class="opt ord ${pos>=0?"on":""} ${r.checked?(pos===i?"right":"wrong"):""}" data-act="ord" data-k="${i}" ${r.checked?"disabled":""}><kbd>${pos>=0?pos+1:"·"}</kbd><span>${esc(Rd.items[i])}</span></button>`}).join("")}</div>`+(r.checked?`<ol class="notes" style="padding-left:20px;list-style:decimal">${Rd.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:`<div class="row"><button class="primary" data-act="check" ${r.seq.length===Rd.items.length?"":"disabled"}>Check order</button><button class="ghost" data-act="clear">Clear</button></div>`);
  if(Rd.kind==="spot"&&Rd.multi&&!r.checked) body=`<div class="row"><button class="primary" data-act="check" ${r.picks.length?"":"disabled"}>Check</button><span class="muted small">Tap again to unselect.</span></div>`;
  const fb=r.checked?`<div class="explain pop ${r.got===r.max?"ok":"bad"}"><b>${r.got===r.max?"Correct":r.got?`${r.got} of ${r.max} correct`:"Not quite"}</b>${Rd.kind==="num"?`<span>Answer: ${esc(Rd.show)}</span>`:""}<span>${esc(Rd.explain)}</span></div>
   <div class="row"><button class="primary" id="gnext" data-act="next">${st.i===st.rounds.length-1?"See score":"Next round"}</button></div>`:"";
  root.innerHTML=`<div class="hud"><span>${esc(g.title)}</span><span>Round <strong>${st.i+1}</strong>/${st.rounds.length}</span><span>Score <strong>${st.got}</strong>/${st.max}</span></div>
  <div class="bar"><i style="width:${(st.i/st.rounds.length*100).toFixed(1)}%"></i></div>
  <div class="qhead">${esc(Rd.title||"")}</div><div class="qtext">${esc(Rd.prompt)}</div>
  ${Rd.view?Rd.view(Rd):""}${body}${fb}`;
  const n=$$("#gnext");if(n)n.focus();
}
function act(a,k){
  if(a==="again")return open(gid);
  if(a==="back")return goBack();
  if(st.done)return;
  const Rd=R(),r=S();
  if(a==="next"){st.i++;if(st.i>=st.rounds.length)st.done=true;else return begin();return render()}
  if(r.checked)return;
  if(a==="tile")r.sel=r.sel===k?null:k;
  else if(a==="slot"){if(r.sel){if(avail(Rd,r.sel,k)){r.placed[k]=r.sel;if(!Rd.infinite||!avail(Rd,r.sel))r.sel=Rd.infinite?r.sel:null}}else if(r.placed[k])delete r.placed[k]}
  else if(a==="check"){scoreRound()}
  else if(a==="clear"){r.seq=[]}
  else if(a==="ord"){const i=+k,p=r.seq.indexOf(i);p>=0?r.seq.splice(p,1):r.seq.push(i)}
  else if(a==="opt"&&Rd.kind==="choice"){r.pick=+k;scoreRound()}
  else if(a==="num"&&Rd.kind==="num"){const v=parseFloat(String(r.val).replace(/[^0-9.\-+]/g,""));if(isNaN(v))return;r.num=v;scoreRound()}
  else if(a==="spot"&&Rd.kind==="spot"){if(Rd.multi){const p=r.picks.indexOf(k);p>=0?r.picks.splice(p,1):r.picks.push(k)}else{r.picks=[k];scoreRound()}}
  else return;
  render();
}
root.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t||t.disabled)return;act(t.dataset.act,t.dataset.k)});
root.addEventListener("keydown",e=>{
  if(e.target.id==="gans"&&e.key==="Enter"){e.preventDefault();act("num");return}
  if((e.key==="Enter"||e.key===" ")&&e.target.matches&&e.target.matches("g[data-act]")){e.preventDefault();act(e.target.dataset.act,e.target.dataset.k)}});
root.addEventListener("input",e=>{if(e.target.id==="gans"&&st)st.r.val=e.target.value});
root.addEventListener("dragstart",e=>{const t=e.target.closest&&e.target.closest(".tile");if(!t)return;e.dataTransfer.setData("text/plain",t.dataset.k);e.dataTransfer.effectAllowed="copy"});
root.addEventListener("dragover",e=>{if(e.target.closest&&e.target.closest('[data-act="slot"]'))e.preventDefault()});
root.addEventListener("drop",e=>{const s=e.target.closest&&e.target.closest('[data-act="slot"]');if(!s)return;e.preventDefault();const v=e.dataTransfer.getData("text/plain");if(!v||!st||S().checked)return;
  if(avail(R(),v,s.dataset.k)){S().placed[s.dataset.k]=v;S().sel=null;render()}});
return {open,GAMES,best:id=>store.get("gm-"+id),count:id=>GAMES[id].make().length};
})();
