
/* ================= AS1 LABS (shared helpers) ================= */
const nextRow=(act,l="Next")=>`<div class="row"><button class="primary" data-act="${act}">${l}</button></div>`;
const fbx=f=>f?`<div class="explain ${f.ok?"ok":"bad"}"><span>${f.t}</span></div>`:"";
const hudx=l=>`<div class="s-hud"><span>${l}</span><span>Score <b>${S.got}</b>/${S.max}</span></div>`;
const pbox=(h,t)=>`<div class="qbox2"><b>${h}</b><span>${t}</span></div>`;
const qBlock=(Q,act)=>mcq(Q[0],[Q[1],...Q[2]],Q[1],Q[3],act,S.st)+(S.st.done?nextRow("next"):"");
const qPick=(Q,k)=>{if(S.st.done)return;S.st.pick=+k;S.st.done=true;S.max++;if(S.st.o[S.st.pick]===Q[1])S.got++};
/* tap-the-target task: first tap scores, wrong taps explain and allow a retry */
function tapTry(key,want,names,why){if(S.ok1)return;const first=!S.tried;S.tried=true;if(first)S.max++;
  if(key===want){if(first)S.got++;S.ok1=true;S.fb={ok:true,t:why||`Yes, that’s the ${names[key]}.`}}
  else S.fb={ok:false,t:`That’s the ${names[key]||key}. Try again.`}}
const stepReset=()=>{S.i++;S.st={};S.tried=false;S.ok1=false;S.fb=null};

/* ---------- MOLECULAR ARCHITECT ---------- */
const MA_M={ag:"α-glucose",bg:"β-glucose",fr:"fructose",gl:"glycerol",fa:"fatty acid",aa:"amino acid"};
const MA_B=["α-1,4 glycosidic bond","β-1,4 glycosidic bond","1,2 glycosidic bond","ester bond","peptide bond","hydrogen bond"];
const MA_T=[
 {t:"Build <b>maltose</b>.",rx:"c",m:["ag","ag"],b:0,w:1,why:"Two α-glucose join in a condensation reaction. An α-1,4 glycosidic bond forms and one water molecule is released."},
 {t:"Build <b>sucrose</b>.",rx:"c",m:["ag","fr"],b:2,w:1,why:"α-glucose + fructose → sucrose + water. The glycosidic bond forms between carbon 1 of glucose and carbon 2 of fructose."},
 {t:"Build a short section of <b>starch</b> (3 monomers).",rx:"c",m:["ag","ag","ag"],b:0,w:2,why:"Starch and glycogen are storage polymers of α-glucose joined by α-1,4 glycosidic bonds. Two bonds form, so two water molecules are released."},
 {t:"Build a short section of <b>cellulose</b> (3 monomers).",rx:"c",m:["bg","bg","bg"],b:1,w:2,why:"Cellulose is a structural polymer of β-glucose with β-1,4 glycosidic bonds. Every other β-glucose is inverted, giving straight chains that hydrogen bond together into microfibrils."},
 {t:"Build a <b>triglyceride</b>.",rx:"c",m:["gl","fa","fa","fa"],b:3,w:3,why:"Glycerol + 3 fatty acids → triglyceride + 3 water. Three ester bonds form, one for each fatty acid."},
 {t:"Build a <b>dipeptide</b>.",rx:"c",m:["aa","aa"],b:4,w:1,why:"The carboxyl group of one amino acid and the amine group of the next condense to form a peptide bond, releasing one water molecule."},
 {t:"<b>Hydrolyse</b> maltose. Choose the products, the reaction, the bond broken and the water used.",rx:"h",m:["ag","ag"],b:0,w:1,why:"Hydrolysis uses one water molecule to break the α-1,4 glycosidic bond, releasing two α-glucose."},
 {t:"<b>Hydrolyse</b> a triglyceride. Choose the products, the reaction, the bonds broken and the water used.",rx:"h",m:["gl","fa","fa","fa"],b:3,w:3,why:"Three water molecules break the three ester bonds, releasing glycerol and three fatty acids."}];
const MA_Q=[["Which bonds hold the tertiary structure of a protein?","Hydrogen, ionic and disulfide bonds, and hydrophobic interactions",["Peptide bonds only","Glycosidic bonds","Ester bonds and hydrogen bonds only"],"Tertiary structure is the folding of the polypeptide, held by H-bonds, ionic bonds, disulfide bonds and hydrophobic interactions."],
 ["The α-helix and β-pleated sheet are held in shape by…","Hydrogen bonds",["Disulfide bonds","Peptide bonds","Ionic bonds"],"Secondary structure is held by hydrogen bonds."],
 ["What makes a fatty acid unsaturated?","At least one C=C double bond in the hydrocarbon chain",["No double bonds in the chain","Being joined to glycerol","Having a phosphate group"],"Unsaturated fatty acids have C=C double bonds, which put kinks in the chain."],
 ["Why do phospholipids form a bilayer in water?","The hydrophilic phosphate heads face the water and the hydrophobic fatty acid tails face inwards",["The tails are attracted to water","The heads are hydrophobic","They are joined by peptide bonds"],"In a phospholipid one fatty acid is replaced by a phosphate group, giving a hydrophilic head and hydrophobic tails."]];
function maPiece(k,x,y,o={}){
  if(k==="ag"||k==="bg"){const f=o.flip?-1:1,dir=(k==="bg"?-1:1)*f;
    let h=`<g transform="translate(${x},${y})"><polygon points="-22,${-12*f} 0,${-24*f} 22,${-12*f} 22,${12*f} 0,${24*f} -22,${12*f}" class="ma-ring"/><text x="11" y="${-9*f+4}" class="ma-o" text-anchor="middle">O</text><text y="5" text-anchor="middle" class="ma-lab">${k==="ag"?"α":"β"}</text><text x="17" y="${f>0?9:-3}" class="ma-n" text-anchor="end">1</text><text x="-17" y="${f>0?9:-3}" class="ma-n">4</text>`;
    if(!o.jr)h+=`<line x1="22" y1="${12*f}" x2="30" y2="${12*f+14*dir}" class="ma-st"/><text x="26" y="${12*f+14*dir+(dir>0?12:-4)}" class="ma-oh">OH</text>`;
    if(!o.jl)h+=`<line x1="-22" y1="${12*f}" x2="-32" y2="${12*f}" class="ma-st"/><text x="-34" y="${12*f+4}" class="ma-oh" text-anchor="end">HO</text>`;
    return h+`</g>`}
  if(k==="fr")return `<g transform="translate(${x},${y})"><polygon points="-20,-6 0,-22 20,-6 13,16 -13,16" class="ma-ring fr"/><text x="0" y="-7" class="ma-o" text-anchor="middle">O</text><text y="10" text-anchor="middle" class="ma-lab">fru</text><text x="-12" y="-4" class="ma-n">2</text>${o.jl?"":`<line x1="-20" y1="-6" x2="-32" y2="-6" class="ma-st"/><text x="-34" y="-2" class="ma-oh" text-anchor="end">HO</text>`}</g>`;
  if(k==="gl")return `<g transform="translate(${x},${y})"><rect x="-12" y="-44" width="24" height="88" rx="6" class="ma-gly"/>${[-30,0,30].map(d=>`<text x="0" y="${d+5}" text-anchor="middle" class="ma-lab">C</text>${o.jr?"":`<line x1="12" y1="${d}" x2="22" y2="${d}" class="ma-st"/><text x="24" y="${d+4}" class="ma-oh">OH</text>`}`).join("")}<text y="60" text-anchor="middle" class="ma-n">glycerol</text></g>`;
  if(k==="fa"){let p=`M${x+24},${y}`;for(let i=1;i<=8;i++)p+=` L${x+24+i*10},${y+(i%2?-6:0)}`;return `<g>${o.jl?"":`<text x="${x-2}" y="${y+4}" class="ma-oh" text-anchor="end">HO</text>`}<text x="${x+10}" y="${y+5}" class="ma-lab" text-anchor="middle">C</text><path d="M${x+8},${y-7} v-4 M${x+12},${y-7} v-4" class="ma-st"/><text x="${x+10}" y="${y-13}" class="ma-oh" text-anchor="middle">O</text><path d="${p}" class="ma-tail"/></g>`}
  if(k==="aa")return `<g transform="translate(${x},${y})"><circle r="13" class="ma-aa"/><text y="5" text-anchor="middle" class="ma-lab">C</text><line x1="0" y1="-13" x2="0" y2="-24" class="ma-st"/><text y="-28" text-anchor="middle" class="ma-oh">R</text><text x="0" y="29" text-anchor="middle" class="ma-oh">H</text>${o.jl?"":`<text x="-17" y="5" text-anchor="end" class="ma-oh">H₂N</text>`}${o.jr?"":`<text x="17" y="5" class="ma-oh">COOH</text>`}</g>`;
  return ""}
function maLoose(list){let h="",x=20;const fas=list.filter(k=>k==="fa");
  list.filter(k=>k!=="fa").forEach(k=>{const w=k==="aa"?150:k==="gl"?90:116;h+=maPiece(k,x+(k==="aa"?56:k==="gl"?30:58),100);x+=w});
  fas.forEach((k,i)=>{h+=maPiece("fa",x+40,52+i*40)});return h}
function maJoined(list){
  if(list[0]==="gl"){let h=maPiece("gl",80,100,{jr:true});[-30,0,30].forEach(d=>{h+=`<line x1="92" y1="${100+d}" x2="114" y2="${100+d}" class="ma-bondl"/><text x="103" y="${100+d-4}" text-anchor="middle" class="ma-bond">O</text>`+maPiece("fa",124,100+d,{jl:true})});return h}
  if(list[0]==="aa")return maPiece("aa",120,100,{jr:true})+`<text x="186" y="105" text-anchor="middle" class="ma-bond">–CO–NH–</text>`+maPiece("aa",252,100,{jl:true});
  let h="";const x0=90,dx=92,fl=i=>list[i]==="bg"&&i%2===1;
  list.forEach((k,i)=>{h+=maPiece(k,x0+i*dx,100,{flip:fl(i),jl:i>0,jr:i<list.length-1})});
  for(let i=0;i<list.length-1;i++){const f1=fl(i)?-1:1,k2=list[i+1],f2=fl(i+1)?-1:1,ax=x0+i*dx+22,ay=100+12*f1,bx=x0+(i+1)*dx+(k2==="fr"?-20:-22),by=k2==="fr"?94:100+12*f2,mx=(ax+bx)/2,my=(ay+by)/2+(f1===f2?12:0);
    h+=`<path d="M${ax},${ay} L${mx},${my} L${bx},${by}" class="ma-bondl"/><text x="${mx}" y="${my+(f1===f2?16:5)}" text-anchor="middle" class="ma-bond">O</text>`}
  return h}
function maStart(){S={i:0,phase:"build",pick:[],bond:null,rx:null,w:0,got:0,max:0,tried:false,ok1:false,fb:null,q:0,st:{}};maRender()}
function maRender(){
  if(S.phase==="q"){const Q=MA_Q[S.q];root.innerHTML=hudx("Protein and lipid check")+(Q?qBlock(Q,"maq"):results(S.got,S.max,`<p class="muted">Every condensation releases one water per bond. Every hydrolysis uses one water per bond.</p>`));return}
  const T=MA_T[S.i],hyd=T.rx==="h";
  let art;if(S.ok1)art=hyd?maLoose(T.m)+`<text x="500" y="24" text-anchor="end" class="ma-win">+ ${T.w} H₂O used</text>`:maJoined(T.m)+Array.from({length:T.w},(_,i)=>`<text x="${380+i*44}" y="40" class="ma-w" style="animation-delay:${i*.25}s">H₂O</text>`).join("");
  else art=hyd?maJoined(T.m)+`<text x="500" y="24" text-anchor="end" class="ma-n">${T.m[0]==="gl"?"triglyceride":"maltose"}</text>`:(S.pick.length?maLoose(S.pick):`<text x="260" y="105" text-anchor="middle" class="ma-n">Add monomers from the tray</text>`);
  const tray=hyd&&!S.ok1?`<p class="small">Products: ${S.pick.length?S.pick.map(k=>MA_M[k]).join(" + "):"none chosen yet"}</p>`:"";
  root.innerHTML=hudx(`Molecular Architect · ${S.i+1}/${MA_T.length}`)+pbox(hyd?"Break it down":"Build it",T.t)+
  `<div class="figbox"><svg viewBox="0 0 520 200" class="ma-bench" role="img" aria-label="Molecule workbench">${art}</svg></div>${tray}
  <div class="s-panel"><div class="s-lbl">${hyd?"Products":"Monomer tray"}</div><div class="reagents">${Object.entries(MA_M).map(([k,t])=>`<button class="reag" data-act="mapick" data-k="${k}" ${S.ok1?"disabled":""}>+ ${t}</button>`).join("")}<button class="reag" data-act="macl" ${S.ok1?"disabled":""}>Clear</button></div>
  <div class="s-lbl">Reaction</div><div class="reagents">${[["c","Condensation"],["h","Hydrolysis"]].map(([k,t])=>`<button class="mbtn ${S.rx===k?"on":""}" data-act="marx" data-k="${k}" ${S.ok1?"disabled":""}>${t}</button>`).join("")}</div>
  <div class="s-lbl">Bond ${hyd?"broken":"formed"}</div><div class="reagents">${MA_B.map((b,i)=>`<button class="mbtn ${S.bond===i?"on":""}" data-act="mabond" data-k="${i}" ${S.ok1?"disabled":""}>${b}</button>`).join("")}</div>
  <div class="s-lbl">Water molecules ${hyd?"used":"released"}</div><div class="row"><button class="mbtn" data-act="maw" data-k="-1" ${S.ok1?"disabled":""}>−</button><b class="s-big">${S.w}</b><button class="mbtn" data-act="maw" data-k="1" ${S.ok1?"disabled":""}>+</button></div></div>
  ${S.ok1?"":`<div class="row"><button class="primary" data-act="marun">${hyd?"Hydrolyse":"React"}</button></div>`}${fbx(S.fb)}${S.ok1?nextRow("manext"):""}`}
function maAct(a,k){const T=MA_T[S.i];
  if(S.phase==="q"){if(a==="maq")qPick(MA_Q[S.q],k);if(a==="next"){S.q++;S.st={}}return maRender()}
  if(!S.ok1){if(a==="mapick"){if(S.pick.length<4)S.pick.push(k);S.fb=null}
    if(a==="macl"){S.pick=[];S.fb=null}
    if(a==="marx")S.rx=k;if(a==="mabond")S.bond=+k;if(a==="maw")S.w=Math.max(0,Math.min(6,S.w+(+k)));
    if(a==="marun"){const e=[];if([...S.pick].sort().join()!==[...T.m].sort().join())e.push(T.rx==="c"?"Check the monomers: which units make this molecule, and how many?":"Check the products released.");
      if(S.rx!==T.rx)e.push(T.rx==="c"?"Joining monomers and releasing water is condensation.":"Breaking a bond by adding water is hydrolysis.");
      if(S.bond!==T.b)e.push("Check the bond type.");if(S.w!==T.w)e.push(`Check the water: one molecule per bond ${T.rx==="c"?"formed":"broken"}.`);
      const first=!S.tried;S.tried=true;if(first)S.max++;if(!e.length){if(first)S.got++;S.ok1=true;S.fb={ok:true,t:T.why}}else S.fb={ok:false,t:e.join(" ")}}}
  if(a==="manext"){if(S.i+1>=MA_T.length){S.phase="q";S.st={}}else{stepReset();Object.assign(S,{pick:[],bond:null,rx:null,w:0})}}
  maRender()}

/* ---------- VESICLE VOYAGE ---------- */
const VV_N={nuc:"nucleus",rer:"rough endoplasmic reticulum (with ribosomes)",tv:"transport vesicle",gol:"Golgi apparatus",sv:"secretory vesicle",mem:"cell surface membrane",mit:"mitochondrion",lys:"lysosome",ser:"smooth endoplasmic reticulum"};
const VV_SEQ=[["nuc","The gene is transcribed into mRNA in the nucleus. The mRNA leaves through a nuclear pore."],["rer","mRNA attaches to ribosomes on the rough ER. The polypeptide is made and passes into the RER, where it folds."],["tv","The protein is pinched off the RER in a transport vesicle."],["gol","The vesicle fuses with the Golgi apparatus. The protein is modified (e.g. carbohydrate added to make a glycoprotein) and packaged."],["sv","A secretory vesicle buds off the Golgi apparatus and moves to the cell surface."],["mem","The vesicle fuses with the cell surface membrane and releases the protein: exocytosis."]];
const VV_POS={start:[118,150],nuc:[118,150],rer:[196,128],tv:[250,112],gol:[302,150],sv:[362,112],mem:[452,128]};
const VV_ORD=["The cell surface membrane extends around the bacterium","The bacterium is enclosed in a vesicle (phagocytosis)","Lysosomes fuse with the vesicle","Hydrolytic enzymes digest the bacterium"];
const VV_Q=[["What is the function of the Golgi apparatus?","Modifies proteins (e.g. adds carbohydrate) and packages them into vesicles",["Synthesises proteins","Makes lipids and steroids","Releases energy in respiration"],"The Golgi modifies, sorts and packages proteins. It also makes lysosomes."],
 ["Why do secretory cells, such as pancreas cells, have many mitochondria?","To release ATP for protein synthesis and for moving vesicles",["To store the enzymes","To make the mRNA","To package the proteins"],"Protein synthesis and vesicle transport need ATP from aerobic respiration."],
 ["Lysosomes are made by the…","Golgi apparatus",["Nucleus","Smooth ER","Mitochondria"],"Lysosomes are vesicles of hydrolytic enzymes that bud off the Golgi apparatus."],
 ["What is pinocytosis?","Endocytosis of liquid into small vesicles",["Release of liquid by exocytosis","Engulfing whole cells","Diffusion of water through the membrane"],"Phagocytosis engulfs solids; pinocytosis takes in liquid."]];
function vvCell(){return `<ellipse cx="230" cy="150" rx="218" ry="136" class="vv-cyto"/>
 <g data-act="vv" data-k="mem"><ellipse cx="230" cy="150" rx="218" ry="136" class="vv-mem"/><ellipse cx="230" cy="150" rx="218" ry="136" class="vv-hitring"/></g>
 <g data-act="vv" data-k="nuc"><circle cx="118" cy="150" r="52" class="vv-nuc"/><circle cx="108" cy="142" r="15" class="vv-ncl"/>${[30,100,170,250,320].map(d=>`<circle cx="${118+52*Math.cos(d*Math.PI/180)}" cy="${150+52*Math.sin(d*Math.PI/180)}" r="3.5" class="vv-pore"/>`).join("")}</g>
 <g data-act="vv" data-k="rer">${[0,1,2].map(i=>`<path d="M${180+i*14},${82+i*8} q8,14 0,28 q-8,14 0,28 q8,14 0,28 q-8,14 0,28" class="vv-er"/>`).join("")}${Array.from({length:16},(_,i)=>`<circle cx="${(i%2?190:176)+Math.floor(i/6)*14}" cy="${90+(i%6)*20}" r="2.6" class="vv-rib"/>`).join("")}<rect x="168" y="78" width="54" height="140" class="thit"/></g>
 <g data-act="vv" data-k="tv"><circle cx="250" cy="112" r="9" class="vv-ves"/><circle cx="250" cy="112" r="16" class="thit"/></g>
 <g data-act="vv" data-k="gol">${[0,1,2,3].map(i=>`<path d="M${280+i*9},${112+i*2} q14,38 0,76" class="vv-gol"/>`).join("")}<rect x="272" y="104" width="56" height="94" class="thit"/></g>
 <g data-act="vv" data-k="sv"><circle cx="362" cy="112" r="10" class="vv-ves"/><circle cx="362" cy="112" r="17" class="thit"/></g>
 <g data-act="vv" data-k="mit"><ellipse cx="330" cy="236" rx="30" ry="13" class="vv-mit"/><path d="M306,236 l6,-7 l6,14 l6,-14 l6,14 l6,-14 l6,14 l6,-7" class="vv-cri"/></g>
 <g data-act="vv" data-k="lys"><circle cx="392" cy="190" r="11" class="vv-lys"/><circle cx="388" cy="187" r="1.6" class="vv-dot"/><circle cx="395" cy="193" r="1.6" class="vv-dot"/><circle cx="392" cy="190" r="17" class="thit"/></g>
 <g data-act="vv" data-k="ser"><path d="M170,250 q20,-12 40,0 t40,0 M174,262 q20,-12 40,0 t40,0" class="vv-ser"/><rect x="166" y="236" width="92" height="34" class="thit"/></g>`}
function vvPhago(n){const bx=n>=1?150:110;let h=`<path d="M210,40 Q330,20 360,110 Q380,200 290,230 Q200,250 190,180" class="vv-cyto" style="stroke:#a3a3a3;stroke-width:2"/>`;
  h+=n===0?`<path d="M190,180 Q180,110 210,40" class="vv-mem" style="fill:none"/>`:`<path d="M190,180 Q90,${n>=2?200:170} 120,110 Q100,${n>=2?20:60} 210,40" class="vv-mem" style="fill:none"/>`;
  if(n>=2)h+=`<circle cx="${bx}" cy="110" r="28" class="vv-ves" style="fill:rgba(147,197,253,.25)"/>`;
  h+=n>=4?[0,1,2,3].map(i=>`<circle cx="${bx-10+i*7}" cy="${104+(i%2)*10}" r="3" class="vv-frag"/>`).join(""):`<rect x="${bx-16}" y="102" width="32" height="16" rx="8" class="vv-bact"/>`;
  if(n>=3)h+=`<circle cx="${bx+24}" cy="88" r="8" class="vv-lys"/><circle cx="${bx+26}" cy="132" r="8" class="vv-lys"/>`;
  else h+=`<circle cx="300" cy="90" r="9" class="vv-lys"/><circle cx="310" cy="170" r="9" class="vv-lys"/>`;
  return h+`<text x="300" y="60" class="ma-n">phagocyte</text>`}
function vvStart(){S={i:0,phase:"path",pos:"start",prev:"start",ord:[],oerr:0,oopt:shuffle(VV_ORD),got:0,max:0,tried:false,ok1:false,fb:null,q:0,st:{}};vvRender()}
function vvRender(){let h;
  if(S.phase==="path"){const step=VV_SEQ[S.i],[px,py]=VV_POS[S.prev];
    h=hudx(`Vesicle Voyage · secretion ${Math.min(S.i+1,6)}/6`)+pbox("Follow the protein",S.i===0?"A pancreas cell is making a digestive enzyme for secretion. Tap where the process <b>starts</b>.":"Tap where the protein goes <b>next</b>.")+
    `<div class="figbox"><svg viewBox="0 0 460 300" class="vv-svg" role="img" aria-label="Animal cell secreting a protein">${vvCell()}<circle id="vvdot" r="7" class="vv-prot" style="transform:translate(${px}px,${py}px)"/></svg></div>${fbx(S.fb)}${S.ok1?nextRow("next",S.i===5?"Next: phagocytosis":"Next"):""}`;
    root.innerHTML=h;const [nx,ny]=VV_POS[S.pos];requestAnimationFrame(()=>requestAnimationFrame(()=>{const d=root.querySelector("#vvdot");if(d)d.style.transform=`translate(${nx}px,${ny}px)`}));return}
  if(S.phase==="ord"){const n=S.ord.length;
    h=hudx("Vesicle Voyage · endocytosis")+pbox("Phagocytosis","A phagocyte meets a bacterium. Tap the steps in the right order.")+`<div class="figbox"><svg viewBox="0 0 460 260" class="vv-svg">${vvPhago(n)}</svg></div>
    <ol class="s-ord">${S.ord.map(x=>`<li>${x}</li>`).join("")}</ol>${n<4?`<div class="opts">${S.oopt.filter(x=>!S.ord.includes(x)).map(x=>`<button class="opt" data-act="vvo" data-k="${VV_ORD.indexOf(x)}">${x}</button>`).join("")}</div>`:fbx({ok:S.oerr===0,t:S.oerr?`Done, with ${S.oerr} wrong tap${S.oerr>1?"s":""}. Exocytosis is the reverse: vesicles fuse with the membrane to release their contents.`:"Perfect order. Exocytosis is the reverse: vesicles fuse with the membrane to release their contents."})+nextRow("next")}${S.fb&&n<4?fbx(S.fb):""}`;root.innerHTML=h;return}
  const Q=VV_Q[S.q];root.innerHTML=hudx("Vesicle Voyage · check")+(Q?qBlock(Q,"vvq"):results(S.got,S.max))}
function vvAct(a,k){
  if(S.phase==="path"){if(a==="vv"&&!S.ok1){const [want,why]=VV_SEQ[S.i];S.prev=S.pos;tapTry(k,want,VV_N,why);if(S.ok1)S.pos=k;else S.prev=S.pos}
    if(a==="next"){if(S.i>=5){S.phase="ord";S.fb=null}else{stepReset();S.prev=S.pos}}}
  else if(S.phase==="ord"){if(a==="vvo"){const want=S.ord.length;if(+k===want){S.ord.push(VV_ORD[want]);S.fb=null;if(S.ord.length===4){S.max++;if(!S.oerr)S.got++}}else{S.oerr++;S.fb={ok:false,t:"Not yet. Think about what has to happen first."}}}
    if(a==="next"&&S.ord.length===4){S.phase="q";S.st={}}}
  else{if(a==="vvq")qPick(VV_Q[S.q],k);if(a==="next"){S.q++;S.st={}}}
  vvRender()}

/* ---------- MEMBRANE CROSSING ---------- */
const MC_N={phos:"phospholipid",intr:"intrinsic (carrier) protein",chan:"channel protein",extr:"extrinsic protein",glyp:"glycoprotein",glyl:"glycolipid",chol:"cholesterol"};
const MC_ID=[["phos","Tap a <b>phospholipid</b>."],["intr","Tap an <b>intrinsic protein</b> (a carrier)."],["chan","Tap a <b>channel protein</b>."],["extr","Tap an <b>extrinsic protein</b>."],["glyp","Tap a <b>glycoprotein</b>."],["glyl","Tap a <b>glycolipid</b>."],["chol","Tap <b>cholesterol</b>."]];
const MC_FN=[["glyp","Tap the component that acts as a <b>receptor or antigen</b> (recognition).","Glycoproteins act as receptors, antigens and recognition features. Together the carbohydrate chains form the glycocalyx."],["chol","Tap the component that gives the membrane <b>stability</b>.","Cholesterol sits between the phospholipids and regulates fluidity, giving stability (in animal cells)."],["chan","Tap the <b>hydrophilic channel</b> that lets ions through.","Channel proteins have a water-filled pore for charged ions."]];
const MC_R={bil:"Through the phospholipid bilayer",chn:"Through a channel protein",car:"Carrier protein, no ATP",act:"Carrier protein + ATP",endo:"Endocytosis",exo:"Exocytosis"};
const MC_ITEMS=[["O₂ into a respiring cell","bil","Small, non-polar O₂ diffuses straight through the phospholipid bilayer, down its concentration gradient.",1],["A steroid hormone into a target cell","bil","Fat-soluble (lipid-soluble) substances dissolve through the bilayer.",1],["Water into a cell in a dilute solution","bil","Water molecules are small enough to pass through the bilayer (osmosis).",1],["Na⁺ ions, down their concentration gradient","chn","Ions are charged, so they can’t cross the hydrophobic core. They use hydrophilic channel proteins (facilitated diffusion).",1],["Glucose into a red blood cell, down its gradient","car","Glucose is large and polar. A carrier protein changes shape to move it across (facilitated diffusion, no ATP).",1],["Nitrate ions into a root hair cell, against their gradient","act","Moving against a concentration gradient needs carrier proteins and ATP: active transport.",1],["A bacterium engulfed by a phagocyte","endo","Phagocytosis is a type of endocytosis: the membrane surrounds the bacterium and forms a vesicle.",1],["Insulin released from a pancreas cell","exo","Large proteins leave in vesicles that fuse with the cell surface membrane: exocytosis.",-1]];
function mcMem(route,dir){const heads=y=>Array.from({length:33},(_,i)=>i*14+7).filter(x=>!(x>70&&x<112)&&!(x>150&&x<194)&&!(x>300&&x<342)).map(x=>`<circle cx="${x}" cy="${y}" r="6" class="mc-head"/>`).join("");
  const tails=Array.from({length:33},(_,i)=>i*14+7).filter(x=>!(x>70&&x<112)&&!(x>150&&x<194)&&!(x>300&&x<342)).map(x=>`<path d="M${x-2},112 v24 M${x+2},112 v24 M${x-2},164 v-24 M${x+2},164 v-24" class="mc-tail"/>`).join("");
  let h=`<text x="8" y="22" class="ma-n">OUTSIDE</text><text x="8" y="252" class="ma-n">INSIDE (cytoplasm)</text>
  <g data-act="mct" data-k="phos">${heads(106)}${heads(170)}${tails}</g>
  <g data-act="mct" data-k="intr"><rect x="72" y="88" width="38" height="100" rx="16" class="mc-prot"/><text x="91" y="142" text-anchor="middle" class="ma-n">C</text></g>
  <g data-act="mct" data-k="chan"><rect x="152" y="90" width="15" height="96" rx="6" class="mc-chan"/><rect x="178" y="90" width="15" height="96" rx="6" class="mc-chan"/><rect x="150" y="88" width="46" height="100" class="thit"/></g>
  <g data-act="mct" data-k="chol"><rect x="236" y="120" width="10" height="18" rx="3" class="mc-chol"/><rect x="236" y="142" width="10" height="16" rx="3" class="mc-chol"/><rect x="228" y="114" width="26" height="50" class="thit"/></g>
  <g data-act="mct" data-k="extr"><ellipse cx="268" cy="88" rx="20" ry="13" class="mc-prot ext"/></g>
  <g data-act="mct" data-k="glyp"><rect x="302" y="92" width="38" height="92" rx="16" class="mc-prot"/><path d="M321,92 v-22 m0,8 l-12,-14 m12,6 l12,-16 m-12,-2 v-12" class="mc-carb"/>${[[321,48],[309,64],[333,54],[321,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" class="mc-sug"/>`).join("")}<rect x="296" y="40" width="50" height="146" class="thit"/></g>
  <g data-act="mct" data-k="glyl"><circle cx="413" cy="106" r="7" class="mc-head mc-gl"/><path d="M413,99 v-20 m0,6 l-10,-12 m10,6 l10,-12" class="mc-carb"/>${[[413,72],[403,68],[423,66]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" class="mc-sug"/>`).join("")}<rect x="398" y="58" width="30" height="58" class="thit"/></g>`;
  if(route){const X={bil:40,chn:172,car:91,act:91}[route],P=route==="endo"||route==="exo";
    const y1=dir>0?20:240,y2=dir>0?240:20,path=P?`M230,${y1} L230,${y2}`:`M${X},${y1} L${X},${y2}`;
    h+=(P?`<circle r="18" class="mc-vesicle"><animateMotion dur="1.4s" fill="freeze" path="${path}"/></circle>`:"")+`<circle r="6" class="mc-part"><animateMotion dur="1.4s" fill="freeze" path="${path}"/></circle>`+(route==="act"?`<text x="118" y="200" class="mc-atp">ATP → ADP + Pi</text>`:"")}
  return h}
function mcStart(){const r=()=>{const s=-(6+Math.floor(Math.random()*9))*100,p=(1+Math.floor(Math.random()*5))*100;return [s,p]};
  const A=r(),B=r();const seq=[...shuffle(MC_ID).map(x=>({ty:"id",k:x[0],t:x[1]})),...MC_FN.map(x=>({ty:"id",k:x[0],t:x[1],why:x[2]})),...shuffle(MC_ITEMS).map(x=>({ty:"tr",it:x})),{ty:"wp",s:r()},{ty:"wp",s:r()},{ty:"q",Q:mcDirQ(A,B)},{ty:"q",Q:["At incipient plasmolysis, the pressure potential (ψp) is…","Zero, so ψcell = ψs",["Equal to ψs","Maximum","Always positive and large"],"At incipient plasmolysis the membrane just starts to pull away from the wall, so ψp = 0 and ψcell = ψs."]}];
  S={i:0,seq,got:0,max:0,tried:false,ok1:false,fb:null,st:{},route:null};mcRender()}
function mcDirQ(A,B){const a=A[0]+A[1],b=B[0]+B[1],ans=a===b?"No net movement of water":a>b?"From cell A to cell B":"From cell B to cell A";
  return [`Cell A: ψs = ${A[0]} kPa, ψp = +${A[1]} kPa. Cell B: ψs = ${B[0]} kPa, ψp = +${B[1]} kPa. Which way does water move?`,ans,["From cell A to cell B","From cell B to cell A","No net movement of water"].filter(x=>x!==ans),`ψA = ${a} kPa and ψB = ${b} kPa. Water moves from a higher (less negative) to a lower (more negative) water potential.`]}
function mcRender(){const T=S.seq[S.i];if(!T){root.innerHTML=hudx("Membrane Crossing")+results(S.got,S.max);return}
  const n=S.i+1,of=S.seq.length;let h=hudx(`Membrane Crossing · ${n}/${of}`);
  if(T.ty==="id")h+=pbox("Fluid mosaic model",T.t)+`<div class="figbox"><svg viewBox="0 0 460 262" class="mc-svg" role="img" aria-label="Fluid mosaic membrane">${mcMem()}</svg></div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"");
  else if(T.ty==="tr"){const [name,,, dir]=T.it;h+=pbox("Send it across",`<b>${name}</b>. Choose the route.`)+`<div class="figbox"><svg viewBox="0 0 460 262" class="mc-svg">${mcMem(S.ok1?T.it[1]:null,dir)}</svg></div><div class="reagents">${Object.entries(MC_R).map(([k,t])=>`<button class="reag" data-act="mcr" data-k="${k}" ${S.ok1?"disabled":""}>${t}</button>`).join("")}</div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"")}
  else if(T.ty==="wp"){const [s,p]=T.s;h+=pbox("Water potential",`A plant cell has ψs = <b>${s} kPa</b> and ψp = <b>+${p} kPa</b>. Calculate ψcell (kPa).`)+`<div class="row"><input id="mcin" class="numin" inputmode="decimal" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}><span>kPa</span>${S.ok1?"":`<button class="primary" data-act="mcw">Check</button>`}</div><p class="small">ψcell = ψs + ψp</p>`+fbx(S.fb)+(S.ok1?nextRow("next"):"")}
  else h+=qBlock(T.Q,"mcq");
  root.innerHTML=h}
function mcAct(a,k){const T=S.seq[S.i];if(!T)return;
  if(a==="next"){stepReset();return mcRender()}
  if(T.ty==="id"&&a==="mct")tapTry(k,T.k,MC_N,T.why);
  if(T.ty==="tr"&&a==="mcr"&&!S.ok1){const first=!S.tried;S.tried=true;if(first)S.max++;if(k===T.it[1]){if(first)S.got++;S.ok1=true;S.fb={ok:true,t:T.it[2]}}else S.fb={ok:false,t:{bil:"Only small or lipid-soluble molecules pass straight through the bilayer.",chn:"Channels carry ions down their gradient. Is that what’s happening here?",car:"Carriers without ATP only work down a concentration gradient.",act:"Active transport is only needed against a concentration gradient.",endo:"Endocytosis brings large particles or liquid IN using vesicles.",exo:"Exocytosis releases substances OUT of the cell in vesicles."}[k]+" Try again."}}
  if(T.ty==="wp"&&a==="mcw"&&!S.ok1){const v=numv(root.querySelector("#mcin").value);if(isNaN(v))return;S.lastv=v;const ans=T.s[0]+T.s[1],first=!S.tried;S.tried=true;if(first)S.max++;
    if(v===ans){if(first)S.got++;S.ok1=true;S.fb={ok:true,t:`${T.s[0]} + ${T.s[1]} = ${ans} kPa. Keep the minus sign.`}}else S.fb={ok:false,t:v===-ans||v===Math.abs(ans)?"Check the sign: ψs is negative and ψp is positive.":"Add them: ψcell = ψs + ψp."}}
  if(T.ty==="q"){if(a==="mcq")qPick(T.Q,k)}
  mcRender()}

/* ---------- MEIOSIS MISSION ---------- */
const MM_M="#e11d48",MM_P="#2563eb";
const MM_ID=[["mit-meta","Metaphase of mitosis","Single chromosomes line up individually on the equator, not in pairs."],["meta1","Metaphase I of meiosis","Homologous pairs (bivalents) line up on the equator."],["ana1","Anaphase I of meiosis","Whole chromosomes (still two chromatids) move to the poles. Homologues separate."],["ana2","Anaphase II of meiosis","Two cells, and sister chromatids separate. Only n chromatids go to each pole."],["mit-ana","Anaphase of mitosis","One cell, and sister chromatids separate. A full diploid set (2n) goes to each pole."],["pro1","Prophase I of meiosis","Homologous chromosomes pair up and chiasmata form."]];
function mmTid(x,y,L,c,o=""){const s=c.s??1;return `<g ${o}><rect x="${x}" y="${y}" width="9" height="${L}" rx="4.5" fill="${c.t}"/>${s<1?`<rect x="${x}" y="${y+L*s}" width="9" height="${L*(1-s)}" rx="${L*(1-s)<10?4:2}" fill="${c.b}"/>`:""}<rect x="${x}" y="${y}" width="9" height="${L}" rx="4.5" class="mm-out"/></g>`}
function mmChr(ch,x,y,o={}){const L=ch.len;let h=`<g class="mm-chr${o.sel?" sel":""}" ${o.act?`data-act="${o.act}" data-k="${ch.id}"`:""}>${o.sel?`<rect x="${x-6}" y="${y-6}" width="31" height="${L+12}" rx="8" class="mm-selbox"/>`:""}`;
  ch.c.forEach((c,i)=>h+=mmTid(x+i*10,y,L,c));h+=`<circle cx="${x+9.5}" cy="${y+L*0.35}" r="4" class="mm-cen"/>`;if(o.act)h+=`<rect x="${x-8}" y="${y-8}" width="35" height="${L+16}" class="thit"/>`;return h+`</g>`}
const mmCell=(cx=230,cy=150,rx=200,ry=135)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="mm-cell"/>`;
function mmGet(id){return S.chr.find(c=>c.id===id)}
function mmSides(){const A=S.flip.A,B=S.flip.B;return {top:[mmGet(A?"Ap":"Am"),mmGet(B?"Bp":"Bm")],bot:[mmGet(A?"Am":"Ap"),mmGet(B?"Bm":"Bp")]}}
function mmGametes(){const {top,bot}=mmSides();return [[top[0].c[0],top[1].c[0]],[top[0].c[1],top[1].c[1]],[bot[0].c[0],bot[1].c[0]],[bot[0].c[1],bot[1].c[1]]]}
function mmSchem(ty){const R=(c)=>({t:c,b:c,s:1}),chr=(len,col)=>({len,c:[R(col),R(col)]});const A1=chr(80,MM_M),A2=chr(80,MM_P),B1=chr(46,MM_M),B2=chr(46,MM_P);
  let h="";const sp=(x,y,x2,y2)=>`<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" class="mm-sp"/>`;
  if(ty==="mit-meta"){h=mmCell();[[A1,140],[A2,190],[B1,250],[B2,300]].forEach(([c,x])=>{const y=150-c.len*0.35;h+=sp(230,22,x+9,150)+sp(230,278,x+9,150)+mmChr(c,x,y)})}
  if(ty==="meta1"){h=mmCell();[[A1,170,true],[A2,170,false],[B1,270,true],[B2,270,false]].forEach(([c,x,up])=>{const y=up?146-c.len:154;h+=sp(230,up?22:278,x+9,up?y+c.len*0.35:y+c.len*0.35)+mmChr(c,x,y)})}
  if(ty==="pro1"){h=mmCell();h+=mmChr(A1,150,60)+mmChr(A2,172,60)+`<path d="M165,${60+80*0.7} l14,0" class="mm-chi"/>`+mmChr(B1,280,120)+mmChr(B2,302,120)}
  if(ty==="ana1"){h=mmCell();[[A1,180,30],[B1,250,40],[A2,180,190],[B2,250,214]].forEach(([c,x,y])=>{h+=sp(230,y<100?16:284,x+9,y+c.len*0.35)+mmChr(c,x,y)})}
  if(ty==="mit-ana"||ty==="ana2"){const two=ty==="ana2";const cells=two?[[120,150,105,130],[340,150,105,130]]:[[230,150,200,135]];
    cells.forEach(([cx,cy,rx,ry],ci)=>{h+=mmCell(cx,cy,rx,ry);const set=two?(ci?[A2,B1]:[A1,B2]):[A1,A2,B1,B2];set.forEach((c,j)=>{const x=cx-(set.length*13)/2+j*26,L=c.len;h+=mmTid(x,cy-ry+22,L*0.7,c.c[0].t?{t:c.c[0].t,s:1}:c.c[0])+mmTid(x,cy+ry-22-L*0.7,L*0.7,{t:c.c[0].t,s:1})})})}
  return `<svg viewBox="0 0 460 300" class="mm-svg">${h}</svg>`}
function mmStart(){const mk=(id,pair,len,col)=>({id,pair,len,col,c:[{t:col,b:col,s:1},{t:col,b:col,s:1}]});
  S={i:0,chr:[mk("Am","A",96,MM_M),mk("Ap","A",96,MM_P),mk("Bm","B",56,MM_M),mk("Bp","B",56,MM_P)],sel:null,paired:[],chi:null,flip:{A:Math.random()<.5,B:Math.random()<.5},got:0,max:0,st:{},fb:null,tried:false,ok1:false,ids:shuffle(MM_ID).slice(0,4),seen:{}};
  S.seen[+S.flip.A+""+(+S.flip.B)]=1;mmRender()}
const MM_STEPS=["inter","pair","cross","meta1","ana1","telo1","ana2","gam","id","id","id","id"];
function mmRender(){const st=MM_STEPS[S.i];let h=hudx(`Meiosis Mission · ${S.i+1}/${MM_STEPS.length}`),art="",body="";
  const pos={Am:[110,62],Bp:[300,56],Ap:[330,140],Bm:[170,182]};
  if(st==="inter"){art=mmCell()+S.chr.map(c=>mmChr(c,...pos[c.id])).join("");body=pbox("Interphase done","This cell (2n = 4) has finished interphase and is entering meiosis. Red chromosomes came from the mother, blue from the father.")+qBlock(["What happened during the S phase?","DNA replicated, so each chromosome is now two sister chromatids joined at a centromere",["The chromosomes paired up","The cell divided into two","Crossing over took place"],"DNA replication in S phase means each chromosome enters meiosis as two identical sister chromatids."],"mmq")}
  if(st==="pair"){const P={A:[[170,50],[192,50]],B:[[290,80],[312,80]]};
    art=mmCell()+S.chr.map(c=>{const pr=S.paired.includes(c.pair);const [x,y]=pr?P[c.pair][c.col===MM_M?0:1]:pos[c.id];return mmChr(c,x,y,{act:pr?null:"mmc",sel:S.sel===c.id})}).join("");
    body=pbox("Prophase I","Pair up the <b>homologous chromosomes</b>: tap one chromosome, then its partner.")+fbx(S.fb)+(S.paired.length===2?nextRow("next"):"")}
  if(st==="cross"){art=mmCell()+mmChr(mmGet("Am"),200,40)+mmChr(mmGet("Ap"),222,40)+mmChr(mmGet("Bm"),320,90)+mmChr(mmGet("Bp"),342,90);
    if(S.chi==null)art+=[.55,.7,.85].map(f=>`<g data-act="mmx" data-k="${f}"><rect x="190" y="${40+96*f-7}" width="50" height="14" rx="7" class="mm-zone"/></g>`).join("");else art+=`<path d="M206,${40+96*S.chi-7} l14,14 M220,${40+96*S.chi-7} l-14,14" class="mm-chi"/>`;
    body=pbox("Crossing over",S.chi==null?"Tap one of the glowing points on the long bivalent to form a <b>chiasma</b>.":"A chiasma formed: the non-sister chromatids broke and rejoined, swapping alleles.")+(S.chi!=null?qBlock(["Which chromatids exchange sections in crossing over?","Non-sister chromatids of a homologous pair",["Sister chromatids of one chromosome","Chromatids of non-homologous chromosomes","Any two chromatids in the cell"],"Crossing over between non-sister chromatids at chiasmata recombines alleles: a source of genetic variation."],"mmq"):"")}
  if(st==="meta1"){const {top,bot}=mmSides();art=mmCell()+`<line x1="40" y1="150" x2="420" y2="150" class="mm-eq"/>`+[[top[0],bot[0],170],[top[1],bot[1],290]].map(([t,b,x])=>mmChr(t,x,146-t.len)+mmChr(b,x,154)).join("")+`<text x="34" y="146" class="ma-n">equator</text>`;
    body=pbox("Metaphase I","Each bivalent lines up on the equator in a random orientation. Flip the pairs to see the different arrangements.")+`<div class="row"><button class="mbtn" data-act="mmf" data-k="A">Flip long pair</button><button class="mbtn" data-act="mmf" data-k="B">Flip short pair</button><span class="small">Arrangements found: <b>${Object.keys(S.seen).length}</b>/4 (2² with n = 2)</span></div>`+qBlock(["Humans have n = 23. How many chromosome combinations can independent assortment give?","2²³ (about 8.4 million)",["23","46","23² (529)"],"Each of the 23 pairs lines up independently, giving 2²³ combinations, before crossing over is even counted."],"mmq")}
  if(st==="ana1"){const {top,bot}=mmSides();art=mmCell()+[[top[0],170,24],[top[1],290,40],[bot[0],170,180],[bot[1],290,204]].map(([c,x,y])=>`<line x1="230" y1="${y<100?14:286}" x2="${x+9}" y2="${y+c.len*.35}" class="mm-sp"/>`+mmChr(c,x,y)).join("");
    body=pbox("Anaphase I","The spindle fibres shorten.")+qBlock(["What moves to opposite poles in anaphase I?","Homologous chromosomes, each still made of two chromatids",["Sister chromatids","Single chromatids","Both homologues to the same pole"],"Homologous chromosomes separate in anaphase I. Sister chromatids only separate in anaphase II."],"mmq")}
  if(st==="telo1"){const {top,bot}=mmSides();art=mmCell(120,150,105,128)+mmCell(340,150,105,128)+mmChr(top[0],90,90)+mmChr(top[1],140,110)+mmChr(bot[0],310,90)+mmChr(bot[1],360,110);
    body=pbox("Telophase I","Two new cells form.")+`<div class="row"><span>How many chromosomes are in each new cell?</span><input id="mmin" class="numin sm2" inputmode="numeric" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"")}
  if(st==="ana2"){const {top,bot}=mmSides();const half=(cx,set)=>set.map((c,j)=>{const x=cx-30+j*40,L=c.len*.8;return mmTid(x,28,L,c.c[0])+mmTid(x,272-L,L,c.c[1])+`<line x1="${cx}" y1="22" x2="${x+4}" y2="${28+L}" class="mm-sp"/><line x1="${cx}" y1="278" x2="${x+4}" y2="${272-L}" class="mm-sp"/>`}).join("");
    art=mmCell(120,150,105,135)+mmCell(340,150,105,135)+half(120,top)+half(340,bot);body=pbox("Meiosis II","Both cells divide again.")+qBlock(["What separates in anaphase II?","Sister chromatids",["Homologous chromosomes","Bivalents","Nothing: the cell just divides"],"Anaphase II is like mitosis: centromeres divide and sister chromatids move to opposite poles."],"mmq")}
  if(st==="gam"){art=mmGametes().map((g,i)=>{const cx=62+i*112;return mmCell(cx,150,50,62)+g.map((c,j)=>mmTid(cx-14+j*20,110,j?46:80,c)).join("")+`<text x="${cx}" y="236" text-anchor="middle" class="ma-n">gamete ${i+1}</text>`}).join("");
    body=pbox("Four haploid gametes","Compare the colours on each chromatid.")+`<div class="row"><span>How many genetically different gametes are there?</span><input id="mmin" class="numin sm2" inputmode="numeric" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next","Next: name the stage"):"")}
  if(st==="id"){const j=S.i-8,[ty,ans,why]=S.ids[j];art=null;body=pbox(`Name the stage · ${j+1}/4`,"Count the chromosomes and look for pairs.")+`<div class="figbox">${mmSchem(ty)}</div>`+qBlock(["Which stage is this?",ans,shuffle(MM_ID.filter(x=>x[1]!==ans).map(x=>x[1])).slice(0,3),why],"mmq")}
  if(!st){root.innerHTML=hudx("Meiosis Mission")+results(S.got,S.max,`<p class="muted">Two sources of variation: crossing over at chiasmata (prophase I) and independent assortment (metaphase I).</p>`);return}
  root.innerHTML=h+(art!==null?`<div class="figbox"><svg viewBox="0 0 460 300" class="mm-svg" role="img" aria-label="Cell in meiosis">${art}</svg></div>`:"")+body}
function mmAct(a,k){const st=MM_STEPS[S.i];
  if(a==="next"){stepReset();return mmRender()}
  if(a==="mmq"&&!S.st.done){const Qs={inter:"DNA replicated, so each chromosome is now two sister chromatids joined at a centromere",cross:"Non-sister chromatids of a homologous pair",meta1:"2²³ (about 8.4 million)",ana1:"Homologous chromosomes, each still made of two chromatids",ana2:"Sister chromatids"};
    const ans=st==="id"?S.ids[S.i-8][1]:Qs[st];S.st.pick=+k;S.st.done=true;S.max++;if(S.st.o[S.st.pick]===ans)S.got++}
  if(st==="pair"&&a==="mmc"){if(!S.sel)S.sel=k;else if(S.sel===k)S.sel=null;else{const p=mmGet(S.sel).pair,q=mmGet(k).pair;S.max++;
      if(p===q){S.got++;S.paired.push(p);S.fb={ok:true,t:"Homologous pair formed (a bivalent): same length, same centromere position, same genes, one from each parent."}}else S.fb={ok:false,t:"Not homologous. Homologous chromosomes are the same length with the same genes in the same places."};S.sel=null}}
  if(st==="cross"&&a==="mmx"&&S.chi==null){const f=+k;S.chi=f;mmGet("Am").c[1]={t:MM_M,b:MM_P,s:f};mmGet("Ap").c[0]={t:MM_P,b:MM_M,s:f}}
  if(st==="meta1"&&a==="mmf"){S.flip[k]=!S.flip[k];S.seen[+S.flip.A+""+(+S.flip.B)]=1}
  if((st==="telo1"||st==="gam")&&a==="mmn"&&!S.ok1){const v=numv(root.querySelector("#mmin").value);if(isNaN(v))return;S.lastv=v;const first=!S.tried;S.tried=true;if(first)S.max++;
    const ans=st==="telo1"?2:new Set(mmGametes().map(g=>JSON.stringify(g))).size;
    if(v===ans){if(first)S.got++;S.ok1=true;S.fb={ok:true,t:st==="telo1"?"2: meiosis I is the reduction division. Each cell is haploid (n = 2), but each chromosome still has two chromatids.":"All 4 are different. Without crossing over there would only be 2 types; the chiasma made recombinant chromatids."}}
    else S.fb={ok:false,t:st==="telo1"?"Count the chromosomes (not chromatids) in one cell.":"Look closely at the colour bands on each chromatid."}}
  mmRender()}

/* ---------- CANCER CELL CRISIS ---------- */
const CC_PH={G1:[0,140],S:[140,240],G2:[240,300],M:[300,360]};
const CC_N={G1:"G1",S:"S phase",G2:"G2",M:"M phase (mitosis and cytokinesis)",G0:"G0"};
const CC_EV=[["S","DNA replicates.","S phase: DNA replication, so each chromosome becomes two sister chromatids."],["G1","The cell grows, makes organelles and proteins, and checks conditions are right before copying its DNA.","G1: growth and a check (G1 checkpoint) before committing to S phase."],["G2","The cell checks the DNA was copied correctly and prepares for division.","G2: more growth and a check (G2 checkpoint) that DNA replication is complete and error-free."],["M","Nuclear division, then cytokinesis.","M phase: mitosis (prophase, metaphase, anaphase, telophase) and then cytokinesis."],["G0","The cell leaves the cycle and rests, possibly for years (e.g. in unfavourable conditions).","G0: a resting state. Cells can stay here for days, weeks or years."],["M","The chromosomes condense and the spindle forms.","Spindle formation happens in prophase of mitosis, in M phase."]];
function ccArc(a1,a2,r1,r2){const p=(a,r)=>[150+r*Math.sin(a*Math.PI/180),150-r*Math.cos(a*Math.PI/180)],[x1,y1]=p(a1,r2),[x2,y2]=p(a2,r2),[x3,y3]=p(a2,r1),[x4,y4]=p(a1,r1),L=a2-a1>180?1:0;return `M${x1},${y1} A${r2},${r2} 0 ${L} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${L} 0 ${x4},${y4} Z`}
function ccWheel(hl){return `<svg viewBox="0 0 320 300" class="cc-svg" role="img" aria-label="Cell cycle">${Object.entries(CC_PH).map(([k,[a,b]])=>{const m=(a+b)/2;return `<g data-act="ccw" data-k="${k}"><path d="${ccArc(a,b-1.5,58,118)}" class="cc-ph ${k}${hl===k?" hl":""}"/><text x="${150+88*Math.sin(m*Math.PI/180)}" y="${155-88*Math.cos(m*Math.PI/180)}" text-anchor="middle" class="cc-lab">${k}</text></g>`}).join("")}
  <path d="M244,72 Q262,52 272,48" class="cc-arr"/><g data-act="ccw" data-k="G0"><circle cx="286" cy="40" r="24" class="cc-ph G0${hl==="G0"?" hl":""}"/><text x="286" y="45" text-anchor="middle" class="cc-lab">G0</text></g>
  ${[[138,"G1 checkpoint"],[298,"G2 checkpoint"]].map(([a,t])=>`<circle cx="${150+124*Math.sin(a*Math.PI/180)}" cy="${150-124*Math.cos(a*Math.PI/180)}" r="6" class="cc-chk"/>`).join("")}
  <text x="150" y="146" text-anchor="middle" class="ma-n">interphase</text><text x="150" y="160" text-anchor="middle" class="ma-n">= G1 + S + G2</text></svg>`}
function ccStart(){const seq=[...shuffle(CC_EV).slice(0,5).map(e=>({ty:"w",k:e[0],t:e[1],why:e[2]})),{ty:"mut"},{ty:"q",Q:["Why do the mutated cells form a tumour?","The cell cycle control points are lost, so the cells divide repeatedly without checks",["The cells divide more slowly","The cells enter G0 and stop dividing","The cells are killed by the immune system"],"Loss of control points (checkpoints) means damaged cells keep dividing uncontrollably, forming a mass of cells: a tumour."]},{ty:"drug"},
  {ty:"w",k:"M",t:"Vincristine is a <b>mitotic poison</b>. Tap the phase it blocks.",why:"Vincristine inhibits microtubule formation, so no spindle forms and cells can’t complete mitosis."},
  {ty:"w",k:"S",t:"5′-fluorouracil is an <b>antimetabolite</b>. Tap the phase it blocks.",why:"5′-fluorouracil is an S-phase inhibitor: it prevents DNA synthesis, so the DNA can’t be replicated."},
  {ty:"q",Q:["Why do anticancer drugs often cause hair loss and damage the gut lining?","They also affect normal cells that divide rapidly",["They only target hair cells","They stop all respiration","They cause new tumours"],"The drugs act on any rapidly dividing cells, including hair follicles and gut lining cells."]}];
  const G=[];for(let r=0;r<20;r++)for(let c=0;c<32;c++)G.push(r>=14?1:0);
  S={i:0,seq,G,mut:false,drug:null,count:0,peak:0,got:0,max:0,tried:false,ok1:false,fb:null,st:{},tick:0};ccRender();ccAnim()}
function ccAnim(){cancelAnimationFrame(anim);const step=()=>{if(sid!=="cancer")return;const cv=root.querySelector("#ccv");S.tick++;
  if(S.tick%12===0&&(S.mut||S.drug)){const G=S.G,nb=i=>{const r=i/32|0,c=i%32,o=[];if(r>0)o.push(i-32);if(r<19)o.push(i+32);if(c>0)o.push(i-1);if(c<31)o.push(i+1);return o};
    for(let i=0;i<G.length;i++)if(G[i]===2){if(S.drug==="vin"){if(Math.random()<.35)G[i]=3}else if(S.drug==="fu"){if(Math.random()<.25)G[i]=3}else if(Math.random()<.45){const o=nb(i).filter(j=>G[j]!==2);if(o.length)G[o[Math.random()*o.length|0]]=4}}
    for(let i=0;i<G.length;i++){if(G[i]===4)G[i]=2;else if(G[i]===3&&Math.random()<.3)G[i]=r14(i)?1:0}
    S.count=G.filter(x=>x===2).length;S.peak=Math.max(S.peak,S.count);const n=root.querySelector("#ccn");if(n)n.textContent=S.count;
    const T=S.seq[S.i];if(T&&T.ty==="mut"&&!S.ok1&&S.count>=70){S.ok1=true;ccRender()}if(T&&T.ty==="drug"&&S.drug&&!S.shrunk&&S.count<S.peak*0.4){S.shrunk=true}}
  if(cv){const c=cv.getContext("2d");c.clearRect(0,0,320,200);S.G.forEach((v,i)=>{if(!v)return;const r=i/32|0,cc=i%32;c.fillStyle=v===1?"#86efac":v===2?"#a855f7":"#475569";c.beginPath();c.arc(cc*10+5,r*10+5,4.3,0,6.283);c.fill()})}
  anim=requestAnimationFrame(step)};step()}
const r14=i=>(i/32|0)>=14;
function ccRender(){const T=S.seq[S.i];if(!T){root.innerHTML=hudx("Cancer Cell Crisis")+results(S.got,S.max);return}
  let h=hudx(`Cancer Cell Crisis · ${S.i+1}/${S.seq.length}`),wheel=T.ty==="w",side;
  const tissue=`<div><canvas id="ccv" width="320" height="200" class="simcv" aria-label="Tissue: green normal cells, purple mutated cells"></canvas><p class="small">Mutated cells: <b id="ccn">${S.count}</b>. Green = normal, purple = mutated, grey = dying.</p></div>`;
  if(wheel)side=pbox("Where in the cycle?",T.t)+fbx(S.fb)+(S.ok1?nextRow("next"):"");
  if(T.ty==="mut")side=pbox("Lose a control point",S.mut?"Watch what happens when the G1 checkpoint stops working…":"A mutation stops the G1 checkpoint working in one cell. Introduce it and watch.")+(S.mut?"":`<div class="row"><button class="primary" data-act="ccmut">Introduce the mutation</button></div>`)+(S.ok1?fbx({ok:true,t:"The mutated cells divide over and over without checks and pile up into a tumour."})+nextRow("next"):"");
  if(T.ty==="q")side=qBlock(T.Q,"ccq");
  if(T.ty==="drug")side=pbox("Treatment","Choose a drug that stops the <b>spindle</b> forming.")+`<div class="reagents"><button class="reag" data-act="ccd" data-k="vin" ${S.ok1?"disabled":""}>Vincristine</button><button class="reag" data-act="ccd" data-k="fu" ${S.ok1?"disabled":""}>5′-fluorouracil</button></div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"");
  root.innerHTML=h+`<div class="figrow">${wheel?`<div class="figbox">${ccWheel(S.ok1?T.k:null)}</div>`:tissue}<div style="display:grid;gap:10px;align-content:start">${side}</div></div>`}
function ccAct(a,k){const T=S.seq[S.i];if(!T)return;
  if(a==="next"){const was=T.ty;stepReset();if(was==="mut"||was==="drug"||S.seq[S.i]&&S.seq[S.i].ty==="drug"){}ccRender();return}
  if(T.ty==="w"&&a==="ccw")tapTry(k,T.k,CC_N,T.why);
  if(T.ty==="mut"&&a==="ccmut"&&!S.mut){S.mut=true;S.G[14*32+15]=2;S.count=1}
  if(T.ty==="q"&&a==="ccq")qPick(T.Q,k);
  if(T.ty==="drug"&&a==="ccd"&&!S.ok1){const first=!S.tried;S.tried=true;if(first)S.max++;
    if(k==="vin"){if(first)S.got++;S.ok1=true;S.drug="vin";S.fb={ok:true,t:"Vincristine stops microtubules forming, so no spindle forms. The dividing tumour cells die. Watch the tumour shrink."}}
    else S.fb={ok:false,t:"5′-fluorouracil is an antimetabolite. It blocks DNA synthesis in S phase, not the spindle. Try again."}}
  ccRender()}

/* ---------- LEAF ANATOMY EXPLORER ---------- */
const LF_N={cuticle:"waxy cuticle",uepi:"upper epidermis",pal:"palisade mesophyll",spon:"spongy mesophyll",air:"air space",xyl:"xylem",phl:"phloem",lepi:"lower epidermis",guard:"guard cell",stoma:"stoma"};
const LF_FN=[["pal","Tap the tissue with <b>tightly packed cells and the most chloroplasts</b>, for maximum light absorption.","Palisade mesophyll: packed, elongated cells, with chloroplasts near the top for maximum light absorption."],["spon","Tap the tissue with <b>loosely arranged cells</b> that let gases diffuse.","Spongy mesophyll: loose cells with air spaces, for diffusion of CO₂ and O₂."],["xyl","Tap the tissue that brings <b>water and inorganic ions</b> into the leaf.","Xylem vessels in the vein supply water and inorganic ions."],["phl","Tap the tissue that carries <b>sugars away</b> from the leaf.","Phloem sieve tubes translocate sugars made in photosynthesis away from the leaf."],["cuticle","Tap the <b>waxy layer that reduces water loss</b>.","The waxy cuticle is waterproof and reduces evaporation."],["guard","Tap the cells that <b>open and close the stoma</b>.","Guard cells change shape to open the stoma by day and close it at night."]];
const LF_ORD=["Waxy cuticle","Upper epidermis","Palisade mesophyll","Spongy mesophyll","Lower epidermis"];
const LF_SP=(()=>{const o=[];for(let r=0;r<4;r++)for(let c=0;c<15;c++){const x=16+c*31+(r%2)*15+((c*7+r*3)%5-2)*2,y=136+r*22+((c*5+r)%3-1)*3;if(x>182&&x<278&&y<214)continue;if(x>318&&x<384&&r===3)continue;if(x>448)continue;o.push([x,y,11+((c+r)%3),8+((c*3+r)%3)])}return o})();
function lfLeaf(){const open=!S.night,g=open?8:1;let h=`<g data-act="lft" data-k="air"><rect x="0" y="122" width="460" height="102" class="lf-air"/></g>
  <g data-act="lft" data-k="cuticle"><rect x="0" y="12" width="460" height="7" class="lf-cut"/><rect x="0" y="241" width="460" height="7" class="lf-cut"/><rect x="0" y="6" width="460" height="16" class="thit"/><rect x="0" y="238" width="460" height="14" class="thit"/></g>
  <g data-act="lft" data-k="uepi">${Array.from({length:12},(_,i)=>`<rect x="${i*40}" y="19" width="40" height="22" class="lf-epi"/>`).join("")}</g>
  <g data-act="lft" data-k="pal">${Array.from({length:16},(_,i)=>`<rect x="${3+i*29}" y="44" width="25" height="74" rx="9" class="lf-pal"/>${[0,1,2,3,4].map(j=>`<ellipse cx="${10+i*29+(j%2)*11}" cy="${54+j*11}" rx="4" ry="3" class="lf-chl"/>`).join("")}`).join("")}</g>
  <g data-act="lft" data-k="spon">${LF_SP.map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" class="lf-sp"/><ellipse cx="${x-3}" cy="${y-2}" rx="3" ry="2" class="lf-chl"/>`).join("")}</g>
  <ellipse cx="230" cy="172" rx="46" ry="40" class="lf-bs"/>
  <g data-act="lft" data-k="xyl">${[[208,160],[226,152],[244,158],[218,176],[238,174]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" class="lf-xyl"/>`).join("")}<rect x="196" y="142" width="62" height="44" class="thit"/></g>
  <g data-act="lft" data-k="phl">${[[214,196],[226,200],[238,196],[220,206],[232,207]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" class="lf-phl"/>`).join("")}<rect x="204" y="188" width="44" height="24" class="thit"/></g>
  <g data-act="lft" data-k="lepi">${Array.from({length:12},(_,i)=>i*40).filter(x=>x<316||x>370).map(x=>`<rect x="${x}" y="222" width="40" height="19" class="lf-epi"/>`).join("")}<rect x="320" y="222" width="10" height="19" class="lf-epi"/><rect x="378" y="222" width="22" height="19" class="lf-epi"/></g>
  <g data-act="lft" data-k="guard"><ellipse cx="${342-g/2}" cy="231" rx="12" ry="9" class="lf-gc"/><ellipse cx="${366+g/2}" cy="231" rx="12" ry="9" class="lf-gc"/><circle cx="${338-g/2}" cy="231" r="2" class="lf-chl"/><circle cx="${370+g/2}" cy="231" r="2" class="lf-chl"/></g>
  <g data-act="lft" data-k="stoma"><rect x="${354-g/2}" y="222" width="${g}" height="19" class="lf-pore"/><rect x="346" y="216" width="16" height="30" class="thit"/></g>`;
  if(open&&S.dn)h+=`<g class="lf-gas"><text x="300" y="290" class="lf-co2">CO₂ in</text><path d="M354,292 v-40" class="lf-arr in"/><text x="384" y="280" class="lf-h2o">H₂O out</text><path d="M362,236 v42" class="lf-arr out"/></g>`;
  if(S.dn)h+=`<text x="440" y="300" text-anchor="end" style="font-size:20px">${S.night?"🌙":"☀️"}</text>`;
  return `<svg viewBox="0 0 460 ${S.dn?306:256}" class="lf-svg" role="img" aria-label="Transverse section of a mesophytic leaf">${h}</svg>`}
function lfStart(){const seq=[...shuffle(Object.keys(LF_N)).map(k=>({ty:"t",k,t:`Tap the <b>${LF_N[k]}</b>.`})),...shuffle(LF_FN).slice(0,4).map(x=>({ty:"t",k:x[0],t:x[1],why:x[2]})),{ty:"dn",Q:["Why do stomata close at night?","There is no light for photosynthesis, so closing them reduces transpirational water loss",["To stop oxygen escaping","To keep the leaf warm","To let more CO₂ in"],"With no light there is no photosynthesis, so CO₂ isn’t needed. Closing the stomata cuts water loss."]},{ty:"q",Q:["Why are most stomata in the lower epidermis?","It is shaded and cooler, so less water is lost by transpiration",["There is more light there","Xylem is closer to it","The cuticle is thicker there"],"Stomata in the shaded lower surface lose less water to evaporation."]},{ty:"ord"}];
  S={i:0,seq,night:false,dn:false,ord:[],oerr:0,oopt:shuffle(LF_ORD),got:0,max:0,tried:false,ok1:false,fb:null,st:{}};lfRender()}
function lfRender(){const T=S.seq[S.i];if(!T){root.innerHTML=hudx("Leaf Anatomy Explorer")+results(S.got,S.max,`<p class="muted">The leaf is an organ adapted to maximise photosynthesis while minimising water loss.</p>`);return}
  S.dn=T.ty==="dn";let h=hudx(`Leaf Anatomy Explorer · ${S.i+1}/${S.seq.length}`);
  if(T.ty==="t")h+=pbox(S.i<10?"Identify":"Function",T.t)+`<div class="figbox">${lfLeaf()}</div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"");
  if(T.ty==="dn")h+=pbox("Day and night","Switch between day and night and watch the guard cells.")+`<div class="figbox">${lfLeaf()}</div><div class="row"><button class="mbtn ${S.night?"":"on"}" data-act="lfd" data-k="0">☀️ Day</button><button class="mbtn ${S.night?"on":""}" data-act="lfd" data-k="1">🌙 Night</button></div>`+qBlock(T.Q,"lfq");
  if(T.ty==="q")h+=`<div class="figbox">${lfLeaf()}</div>`+qBlock(T.Q,"lfq");
  if(T.ty==="ord"){const n=S.ord.length;h+=pbox("Block diagram","Exam drawings of leaf tissues are <b>block diagrams</b>: layers only, no individual cells. Build one: tap the layers from <b>top to bottom</b>.")+
    `<div class="figbox"><svg viewBox="0 0 460 ${30+5*36}" class="lf-svg">${S.ord.map((x,i)=>`<rect x="60" y="${10+i*36}" width="340" height="${x==="Waxy cuticle"?10:30}" class="lf-blk b${LF_ORD.indexOf(x)}"/><text x="410" y="${30+i*36}" class="ma-n">${x}</text>`).join("")}</svg></div>`+
    (n<5?`<div class="reagents">${S.oopt.filter(x=>!S.ord.includes(x)).map(x=>`<button class="reag" data-act="lfo" data-k="${LF_ORD.indexOf(x)}">${x}</button>`).join("")}</div>${fbx(S.fb)}`:fbx({ok:!S.oerr,t:(S.oerr?`Done, with ${S.oerr} wrong tap${S.oerr>1?"s":""}. `:"Perfect. ")+"Remember: the vascular bundle (xylem above phloem) sits in the spongy mesophyll, and label lines must not cross."})+nextRow("next"))}
  root.innerHTML=h}
function lfAct(a,k){const T=S.seq[S.i];if(!T)return;
  if(a==="next"){stepReset();S.night=false;return lfRender()}
  if(T.ty==="t"&&a==="lft")tapTry(k,T.k,LF_N,T.why);
  if(a==="lfd")S.night=k==="1";
  if(a==="lfq")qPick(T.Q,k);
  if(T.ty==="ord"&&a==="lfo"){const want=S.ord.length;if(+k===want){S.ord.push(LF_ORD[want]);S.fb=null;if(S.ord.length===5){S.max++;if(!S.oerr)S.got++}}else{S.oerr++;S.fb={ok:false,t:"Not that one yet. Work down from the top surface."}}}
  lfRender()}

/* ---------- 3D CELL EXPLORER ---------- */
const C3_INFO={nuc:["Nucleus","Contains chromosomes (DNA + histones). Surrounded by a double-membrane nuclear envelope with pores. The nucleolus makes ribosomes."],mit:["Mitochondrion","Site of aerobic respiration, making ATP. Has an envelope (double membrane), cristae and a matrix."],rer:["Rough ER","Membrane system with ribosomes attached. Makes and transports proteins."],ser:["Smooth ER","Membrane system without ribosomes. Makes lipids and steroids."],gol:["Golgi apparatus","Modifies and packages proteins into vesicles. Makes lysosomes."],lys:["Lysosome","Vesicle containing hydrolytic enzymes. Digests worn-out organelles and engulfed material."],ves:["Vesicle","Membrane-bound sac that transports substances."],rib:["Ribosomes","Site of protein synthesis. 80S in eukaryotes."],cen:["Centrioles","Made of microtubules. Form the spindle in animal cells."],mem:["Cell surface membrane","Fluid mosaic model. Controls what enters and leaves."],chl:["Chloroplast","Site of photosynthesis. Envelope, thylakoids stacked into grana, stroma, starch grains and lipid droplets."],vac:["Vacuole","Large permanent vacuole filled with cell sap and surrounded by the tonoplast. Keeps the cell turgid."],wall:["Cellulose cell wall","Freely permeable and strong. Stops the cell bursting."],plas:["Plasmodesmata","Strands of cytoplasm linking neighbouring plant cells through the cell wall."],dna:["Circular DNA","Naked (no histones) and free in the cytoplasm. Prokaryotes have no nucleus."],pla:["Plasmid","Small extra loop of DNA, often carrying genes such as antibiotic resistance."],r70:["Small ribosomes","70S ribosomes, smaller than the 80S ribosomes in eukaryotic cytoplasm."],pwall:["Cell wall","Prokaryotic cell wall (made of peptidoglycan, not cellulose)."]};
const C3_SET={animal:[["nuc",0,0,0],["mit",.6,.3,.25],["mit",-.5,-.45,.35],["mit",.2,-.62,-.4],["rer",-.42,.3,.3],["ser",.48,-.3,.45],["gol",.5,.45,-.25],["lys",-.62,.12,-.4],["lys",.15,.66,.35],["ves",.72,.05,.1],["rib",-.1,-.45,.62],["rib",.35,.12,-.66],["cen",-.28,-.66,-.2]],
  plant:[["vac",.12,.1,0],["nuc",-.6,-.45,.25],["chl",.62,-.5,.3],["chl",-.55,.45,.3],["chl",.55,.55,-.3],["chl",-.3,-.6,-.45],["mit",.65,.15,.45],["gol",-.68,.05,-.2],["rer",-.4,-.15,.55],["rib",.25,-.68,.2]],
  prok:[["dna",0,0,0],["pla",.55,.25,.2],["pla",-.5,-.3,-.3],["r70",-.35,.3,.4],["r70",.35,-.35,-.3],["r70",.1,.45,-.5]]};
const C3_TASKS=()=>[...shuffle(["nuc","mit","rer","gol","lys","cen","ser"]).slice(0,4).map(k=>({m:"animal",k,t:`Find the <b>${C3_INFO[k][0].toLowerCase()}</b>.`})),
  ...shuffle([["mit","the site of <b>aerobic respiration</b>"],["gol","the organelle that <b>modifies and packages proteins</b>"],["lys","the vesicle full of <b>hydrolytic enzymes</b>"],["ser","the membrane system that <b>makes lipids and steroids</b>"],["rib","the site of <b>protein synthesis</b>"],["cen","the structures that <b>form the spindle</b>"]]).slice(0,3).map(([k,t])=>({m:"animal",k,t:`Find ${t}.`})),
  ...shuffle([["chl","Find a <b>chloroplast</b>."],["vac","Find the <b>large permanent vacuole</b>."],["wall","Find the <b>cellulose cell wall</b>."],["plas","Find the <b>plasmodesmata</b>: links between neighbouring cells."]]).slice(0,3).map(([k,t])=>({m:"plant",k,t})),
  {m:"prok",k:"dna",t:"Find the <b>circular DNA</b>."},{m:"prok",k:"pla",t:"Find a <b>plasmid</b>."},
  {m:"prok",q:["Which of these is found in a prokaryotic cell?","Small (70S) ribosomes and naked circular DNA",["Mitochondria","A nucleus with a nuclear envelope","Rough ER"],"Prokaryotes have no nucleus, mitochondria or ER. They have naked circular DNA, small ribosomes, possibly plasmids, and a cell wall."]}];
function c3Sprite(k){switch(k){
  case"nuc":return `<circle r="46" class="c3-nuc"/><circle cx="-10" cy="-8" r="14" class="c3-ncl"/>${[0,60,120,180,240,300].map(d=>`<circle cx="${46*Math.cos(d*Math.PI/180)}" cy="${46*Math.sin(d*Math.PI/180)}" r="3" class="c3-pore"/>`).join("")}`;
  case"mit":return `<ellipse rx="28" ry="13" class="c3-mit"/><path d="M-22,0 l5,-8 l5,16 l5,-16 l5,16 l5,-16 l5,16 l5,-16 l4,8" class="c3-cri"/>`;
  case"rer":return [0,1,2].map(i=>`<path d="M-30,${-14+i*12} q10,-8 20,0 t20,0 t20,0" class="c3-er"/>`).join("")+Array.from({length:12},(_,i)=>`<circle cx="${-28+(i%6)*11}" cy="${-19+Math.floor(i/6)*24}" r="2.3" class="c3-rib"/>`).join("")+`<rect x="-34" y="-24" width="68" height="44" class="thit"/>`;
  case"ser":return [0,1].map(i=>`<path d="M-28,${-6+i*14} q14,-12 28,0 t28,0" class="c3-ser"/>`).join("")+`<rect x="-32" y="-18" width="64" height="36" class="thit"/>`;
  case"gol":return [0,1,2,3].map(i=>`<path d="M${-26+i*2},${-16+i*9} q26,-10 ${52-i*4},0" class="c3-gol"/>`).join("")+`<circle cx="30" cy="-10" r="4" class="c3-ves"/><circle cx="32" cy="14" r="4" class="c3-ves"/><rect x="-30" y="-24" width="66" height="46" class="thit"/>`;
  case"lys":return `<circle r="12" class="c3-lys"/><circle cx="-4" cy="-3" r="2" class="c3-dot"/><circle cx="4" cy="4" r="2" class="c3-dot"/><circle r="18" class="thit"/>`;
  case"ves":return `<circle r="8" class="c3-ves"/><circle r="15" class="thit"/>`;
  case"rib":case"r70":return Array.from({length:7},(_,i)=>`<circle cx="${Math.cos(i*.9)*(5+i*1.5)}" cy="${Math.sin(i*.9)*(5+i*1.5)}" r="${k==="rib"?2.8:2}" class="c3-rib"/>`).join("")+`<circle r="18" class="thit"/>`;
  case"cen":return `<rect x="-4" y="-14" width="8" height="24" rx="2" class="c3-cen"/><rect x="0" y="-2" width="24" height="8" rx="2" class="c3-cen"/><circle cx="6" r="20" class="thit"/>`;
  case"chl":return `<ellipse rx="32" ry="15" class="c3-chl"/>${[-16,-4,8,20].map(x=>`<path d="M${x-5},-4 h10 M${x-5},0 h10 M${x-5},4 h10" class="c3-gra"/>`).join("")}`;
  case"vac":return `<ellipse rx="92" ry="66" class="c3-vac"/>`;
  case"dna":return `<path d="M-40,0 C-40,-30 -10,-34 0,-20 C10,-6 40,-34 44,-6 C48,20 20,30 0,18 C-20,6 -40,30 -40,0 Z" class="c3-dna"/><circle r="40" class="thit"/>`;
  case"pla":return `<circle r="9" class="c3-dna"/><circle r="16" class="thit"/>`}return ""}
function c3Outline(m){if(m==="animal")return `<g data-act="c3" data-k="mem"><ellipse cx="230" cy="170" rx="200" ry="150" class="c3-memb"/><ellipse cx="230" cy="170" rx="200" ry="150" class="vv-hitring"/></g>`;
  if(m==="plant")return `<g data-act="c3" data-k="wall"><rect x="22" y="14" width="416" height="312" rx="22" class="c3-wall"/><rect x="22" y="14" width="416" height="312" rx="22" class="c3-wallhit"/></g><rect x="34" y="26" width="392" height="288" rx="16" class="c3-memb"/><g data-act="c3" data-k="plas">${[[22,110],[22,230],[438,90],[438,250],[170,14],[300,326]].map(([x,y])=>x===22||x===438?`<rect x="${x-9}" y="${y-5}" width="18" height="10" rx="3" class="c3-plas"/>`:`<rect x="${x-5}" y="${y-9}" width="10" height="18" rx="3" class="c3-plas"/>`).join("")}${[[22,110],[22,230],[438,90],[438,250],[170,14],[300,326]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" class="thit"/>`).join("")}</g>`;
  return `<path d="M410,170 q30,-30 44,0 t30,6" class="c3-flag"/><g data-act="c3" data-k="pwall"><rect x="40" y="90" width="370" height="160" rx="80" class="c3-wall"/><rect x="40" y="90" width="370" height="160" rx="80" class="c3-wallhit"/></g><rect x="50" y="100" width="350" height="140" rx="70" class="c3-memb"/>`}
function c3Place(){const L=root.querySelector("#c3l");if(!L)return;const cy=Math.cos(S.yaw),sy=Math.sin(S.yaw),cp=Math.cos(S.pitch),sp=Math.sin(S.pitch);const m=S.mode,RX=m==="prok"?150:m==="plant"?150:150,RY=m==="prok"?55:110;
  const items=[...L.children].map(el=>{const [x,y,z]=el.dataset.p.split(",").map(Number);const x1=x*cy+z*sy,z1=-x*sy+z*cy,y1=y*cp-z1*sp,z2=y*sp+z1*cp;const s=1+z2*0.22;el.setAttribute("transform",`translate(${230+x1*RX} ${170+y1*RY}) scale(${s.toFixed(3)})`);el.style.opacity=(0.55+0.45*(z2+1)/2).toFixed(2);return [z2,el]});
  items.sort((a,b)=>a[0]-b[0]).forEach(([,el])=>L.appendChild(el))}
function c3Start(){S={i:0,tasks:C3_TASKS(),yaw:0.3,pitch:0.2,info:null,got:0,max:0,tried:false,ok1:false,fb:null,st:{}};S.mode=S.tasks[0].m;c3Render()}
function c3Render(){const T=S.tasks[S.i];if(!T){root.innerHTML=hudx("3D Cell Explorer")+results(S.got,S.max);return}
  const m=T.m;if(m!==S.mode){S.mode=m;S.yaw=0.3;S.pitch=0.2}
  const lab={animal:"Animal cell",plant:"Plant cell",prok:"Prokaryotic cell"}[m];
  const inf=S.info&&C3_INFO[S.info]?`<div class="c3-info"><b>${C3_INFO[S.info][0]}</b><span>${C3_INFO[S.info][1]}</span></div>`:`<div class="c3-info muted">Drag the cell to rotate it. Tap any structure to learn about it.</div>`;
  root.innerHTML=hudx(`3D Cell Explorer · ${S.i+1}/${S.tasks.length}`)+`<div class="figbox c3-box"><svg viewBox="0 0 460 340" class="c3-svg" id="c3svg" role="img" aria-label="${lab}, rotatable">${c3Outline(m)}<g id="c3l">${C3_SET[m].map(([k,x,y,z])=>`<g data-act="c3" data-k="${k}" data-p="${x},${y},${z}" class="c3-o">${c3Sprite(k)}</g>`).join("")}</g><text x="230" y="336" text-anchor="middle" class="ma-n">${lab}</text></svg></div>
  <div class="row"><button class="mbtn" data-act="c3r" data-k="-1">⟲ Rotate</button><button class="mbtn" data-act="c3r" data-k="1">Rotate ⟳</button><button class="mbtn" data-act="c3r" data-k="t">Tilt</button></div>${inf}`+
  (T.q?qBlock(T.q,"c3q"):pbox(lab,T.t)+fbx(S.fb)+(S.ok1?nextRow("next"):""));
  c3Place();const sv=root.querySelector("#c3svg");let drag=null;
  sv.addEventListener("pointerdown",e=>{if(e.target.closest("[data-act]"))return;drag=[e.clientX,e.clientY];sv.setPointerCapture(e.pointerId)});
  sv.addEventListener("pointermove",e=>{if(!drag)return;S.yaw+=(e.clientX-drag[0])*0.01;S.pitch=Math.max(-1.2,Math.min(1.2,S.pitch+(e.clientY-drag[1])*0.01));drag=[e.clientX,e.clientY];c3Place()});
  sv.addEventListener("pointerup",()=>{drag=null})}
function c3Act(a,k){const T=S.tasks[S.i];if(!T)return;
  if(a==="c3r"){if(k==="t")S.pitch=S.pitch>0.6?-0.4:S.pitch+0.5;else S.yaw+=(+k)*0.6;return c3Place()}
  if(a==="next"){stepReset();S.info=null;return c3Render()}
  if(a==="c3"){S.info=k;if(!T.q)tapTry(k,T.k,Object.fromEntries(Object.entries(C3_INFO).map(([x,v])=>[x,v[0].toLowerCase()])),`Yes: ${C3_INFO[T.k][0]}. ${C3_INFO[T.k][1]}`)}
  if(a==="c3q"&&T.q)qPick(T.q,k);
  const y=S.yaw,p=S.pitch;c3Render();S.yaw=y;S.pitch=p;c3Place()}
