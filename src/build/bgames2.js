/* ---------- Blood Film ID ---------- */
function filmSVG(Rd){
  const seed=Rd.seed;let s=seed;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280};
  const W=[["poly",120,110],["lymph",320,90],["mono",230,215],["plat",380,225]];
  if(Rd.flip)W.forEach(w=>{w[1]=460-w[1]});
  const free=(x,y)=>W.every(([,wx,wy])=>Math.hypot(wx-x,wy-y)>44);
  let rbc="";for(let i=0;i<70;i++){const x=15+rnd()*430,y=15+rnd()*270;if(!free(x,y))continue;const r=15+rnd()*3;
    rbc+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" class="rbc"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r*0.42).toFixed(1)}" class="rbcc"/>`}
  const pos=id=>W.find(w=>w[0]===id);
  const [,px,py]=pos("poly"),[,lx,ly]=pos("lymph"),[,mx,my]=pos("mono"),[,qx,qy]=pos("plat");
  let gran="";for(let i=0;i<26;i++){const a=rnd()*6.28,r=6+rnd()*15;gran+=`<circle cx="${(px+Math.cos(a)*r).toFixed(1)}" cy="${(py+Math.sin(a)*r).toFixed(1)}" r="1.1" class="gran"/>`}
  return `<svg viewBox="0 0 460 300" class="film" role="img" aria-label="Stained blood film">
  <rect width="460" height="300" rx="10" class="filmbg"/>${org(Rd,"rbc",`<g>${rbc}</g>`)}
  ${org(Rd,"poly",`<circle cx="${px}" cy="${py}" r="25" class="wbc"/>${gran}<ellipse cx="${px-9}" cy="${py-4}" rx="7" ry="9" class="nuc"/><ellipse cx="${px+3}" cy="${py+6}" rx="7" ry="8" class="nuc"/><ellipse cx="${px+11}" cy="${py-6}" rx="6" ry="8" class="nuc"/><path d="M${px-4},${py+1} L${px},${py+3} M${px+7},${py+2} L${px+9},${py-1}" class="nucl"/>`)}
  ${org(Rd,"lymph",`<circle cx="${lx}" cy="${ly}" r="19" class="wbc lym"/><circle cx="${lx+1}" cy="${ly}" r="15.5" class="nuc"/>`)}
  ${org(Rd,"mono",`<circle cx="${mx}" cy="${my}" r="31" class="wbc mon"/><path d="M${mx-16},${my-10} C${mx-6},${my-22} ${mx+18},${my-18} ${mx+16},${my-2} C${mx+14},${my+8} ${mx+2},${my+4} ${mx-2},${my+12} C${mx-8},${my+20} ${mx-24},${my+6} ${mx-16},${my-10} Z" class="nuc"/>`)}
  ${org(Rd,"plat",`<circle cx="${qx}" cy="${qy}" r="16" class="hitc"/><path d="M${qx-6},${qy-4} l4,-3 l3,2 l-1,4 l-5,1 z M${qx+4},${qy+3} l3,-2 l3,2 l-2,3 l-3,0 z M${qx-2},${qy+8} l3,-1 l2,2 l-3,2 z M${qx+6},${qy-8} l2,-2 l3,1 l-1,3 z" class="plt"/>`)}
  </svg>`}
function makeBloodFilm(){
  const R=[];const film=(prompt,ans,explain,multi)=>R.push({kind:"spot",title:"Blood Film ID",prompt,ans,multi,seed:Math.floor(Math.random()*9000)+7,flip:Math.random()<.5,view:Rd=>`<div class="diagram narrow">${filmSVG(Rd)}</div>`,explain});
  film("This is a stained blood film. Tap the polymorph (neutrophil).",["poly"],"Polymorphs have a lobed nucleus (2–5 lobes) and granular cytoplasm. They are phagocytes.");
  film("Tap the lymphocyte.",["lymph"],"Lymphocytes have a large, round nucleus that fills most of the cell, with a thin rim of cytoplasm.");
  film("Tap the monocyte.",["mono"],"Monocytes are the largest white blood cells, with a kidney-shaped (bean-shaped) nucleus. They become macrophages in the tissues.");
  film("Tap the platelets.",["plat"],"Platelets are small cell fragments with no nucleus. They are involved in blood clotting.");
  film("Tap every white blood cell, then press Check.",["poly","lymph","mono"],"Polymorph, lymphocyte and monocyte. Red blood cells and platelets have no nucleus.",true);
  const ch=(prompt,opts,explain)=>R.push({kind:"choice",title:"Blood Film ID",prompt,opts,ans:0,explain});
  ch("Which feature identifies a polymorph?",["A lobed nucleus and granular cytoplasm","A large round nucleus filling the cell","A kidney-shaped nucleus","No nucleus"],"‘Polymorph’ refers to the many shapes of the lobed nucleus.");
  ch("Which white blood cells produce antibodies?",["B-lymphocytes (B-cells)","T-lymphocytes (T-cells)","Polymorphs","Monocytes"],"B-cells produce antibodies; T-cells are involved in cell-mediated immunity.");
  ch("What do polymorphs and monocytes have in common?",["Both are phagocytes that engulf pathogens","Both produce antibodies","Both lack a nucleus","Both are cell fragments"],"Monocytes leave the blood and become macrophages.");
  ch("Which is an adaptation of a red blood cell for oxygen transport?",["No nucleus, leaving more room for haemoglobin","A lobed nucleus","Many mitochondria to release energy","A thick cell wall"],"Red blood cells are also biconcave discs, giving a large surface area to volume ratio, and small and flexible to squeeze through capillaries.");
  ch("What converts fibrinogen into insoluble fibrin during clotting?",["Thrombin","Thromboplastin","Prothrombin","Vitamin K"],"Platelets release thromboplastin, which (with calcium ions and clotting factors) converts prothrombin to thrombin. Thrombin converts fibrinogen to fibrin.");
  return R;
}

/* ---------- Blood Through the Heart ---------- */
const HROUTE=[["vc","Vena cava","deoxygenated blood returns from the body"],["ra","Right atrium","blood collects in the right atrium"],["tri","Tricuspid valve","the atrioventricular valve on the right"],["rv","Right ventricle","the right ventricle contracts"],["psl","Semilunar valve (pulmonary)","stops blood flowing back into the ventricle"],["pa","Pulmonary artery","carries deoxygenated blood to the lungs"],["lungs","Lungs","oxygen loads onto haemoglobin; CO₂ is released"],["pv","Pulmonary vein","carries oxygenated blood back to the heart"],["la","Left atrium","oxygenated blood collects in the left atrium"],["bi","Bicuspid valve","the atrioventricular valve on the left"],["lv","Left ventricle","the thick muscular wall pumps blood round the body"],["asl","Semilunar valve (aortic)","stops backflow from the aorta"],["ao","Aorta","oxygenated blood leaves for the body"]];
function heartSVG(Rd,cur,labels){
  const oxy=["pv","la","bi","lv","asl","ao","lungs"].includes(cur);
  const P={vc:[52,180],ra:[140,150],tri:[140,203],rv:[150,265],psl:[203,152],pa:[202,92],lungs:[230,30],pv:[408,118],la:[320,150],bi:[320,203],lv:[320,270],asl:[257,150],ao:[262,80]};
  const L=(id,t,x,y)=>labels?`<text x="${x}" y="${y}" class="hlbl">${t}</text>`:"";
  const [cx,cy]=P[cur];
  return `<svg viewBox="0 0 460 360" class="heart" role="img" aria-label="Diagram of the heart">
  ${org(Rd,"lungs",`<rect x="110" y="10" width="240" height="40" rx="18" class="lung"/>`)}${L("lungs","Lungs",205,35)}
  ${org(Rd,"vc",`<rect x="38" y="60" width="28" height="250" rx="10" class="vdeox"/>`)}${L("vc","Vena cava",8,330)}
  ${org(Rd,"pa",`<path d="M190,140 L190,70 Q190,52 172,50 L150,50 L150,62 L170,62 Q178,62 178,72 L178,140 Z" class="vdeox"/><rect x="190" y="50" width="22" height="90" class="vdeox"/>`)}${L("pa","Pulmonary artery",130,108)}
  ${org(Rd,"ao",`<path d="M248,140 L248,70 Q248,40 290,40 L360,40 L360,58 L292,58 Q270,58 270,76 L270,140 Z" class="voxy"/>`)}${L("ao","Aorta",296,74)}
  ${org(Rd,"pv",`<rect x="394" y="50" width="28" height="120" rx="10" class="voxy"/>`)}${L("pv","Pulmonary vein",380,190)}
  ${org(Rd,"ra",`<rect x="76" y="110" width="128" height="86" rx="20" class="cdeox"/>`)}${L("ra","Right atrium",92,140)}
  ${org(Rd,"rv",`<path d="M76,212 L218,212 L218,300 Q190,345 150,345 Q90,330 76,270 Z" class="cdeox"/>`)}${L("rv","Right ventricle",88,300)}
  ${org(Rd,"la",`<rect x="246" y="110" width="146" height="86" rx="20" class="coxy"/>`)}${L("la","Left atrium",280,140)}
  ${org(Rd,"lv",`<path d="M236,212 L392,212 L392,280 Q380,345 300,350 Q250,348 236,300 Z" class="coxy lvw"/>`)}${L("lv","Left ventricle",262,300)}
  <rect x="222" y="110" width="10" height="235" class="septum"/>
  ${org(Rd,"tri",`<rect x="98" y="198" width="84" height="12" rx="4" class="valve"/>`)}${L("tri","Tricuspid",104,228)}
  ${org(Rd,"bi",`<rect x="278" y="198" width="84" height="12" rx="4" class="valve"/>`)}${L("bi","Bicuspid",290,228)}
  ${org(Rd,"psl",`<rect x="186" y="134" width="30" height="10" rx="3" class="valve"/>`)}
  ${org(Rd,"asl",`<rect x="244" y="134" width="30" height="10" rx="3" class="valve"/>`)}
  <circle cx="${cx}" cy="${cy}" r="11" class="rbcm ${oxy?"o":"d"}"/><circle cx="${cx}" cy="${cy}" r="4.5" class="rbcmc"/>
  </svg>`}
function pressureSVG(){
  const Y=p=>300-p*16;const pts=a=>a.map(([x,p])=>`${x},${Y(p).toFixed(1)}`).join(" ");
  const ao=[[40,10.5],[150,10],[180,13],[210,15.8],[250,14.5],[270,13],[278,12.4],[290,13],[340,12],[440,10.5]];
  const ve=[[40,0.6],[100,0.9],[112,1.2],[125,1.4],[140,6],[150,10],[180,14],[210,16.4],[250,14.5],[270,13],[285,6],[300,1.1],[330,0.4],[440,0.6]];
  const at=[[40,0.4],[80,0.7],[95,1.8],[110,1.3],[125,1.4],[200,0.8],[300,1.1],[340,0.5],[440,0.4]];
  const mk=(x,p,t)=>`<line x1="${x}" x2="${x}" y1="20" y2="300" class="gdash"/><circle cx="${x}" cy="${Y(p)}" r="4" class="gpt"/><text x="${x}" y="16" class="glet" text-anchor="middle">${t}</text>`;
  return `<svg viewBox="0 0 470 330" class="pgraph" role="img" aria-label="Pressure changes in the left side of the heart during one cardiac cycle">
  <line x1="40" y1="300" x2="450" y2="300" class="gax"/><line x1="40" y1="20" x2="40" y2="300" class="gax"/>
  ${[0,4,8,12,16].map(p=>`<text x="34" y="${Y(p)+4}" class="gnum" text-anchor="end">${p}</text>`).join("")}<text x="12" y="160" class="gnum" transform="rotate(-90 12 160)" text-anchor="middle">Pressure / kPa</text><text x="245" y="324" class="gnum" text-anchor="middle">Time</text>
  ${mk(125,1.4,"A")}${mk(150,10,"B")}${mk(270,13,"C")}${mk(300,1.1,"D")}
  <polyline points="${pts(ao)}" class="gl ao"/><polyline points="${pts(ve)}" class="gl ve"/><polyline points="${pts(at)}" class="gl at"/>
  <text x="440" y="${Y(10.5)-6}" class="gkey ao" text-anchor="end">aorta</text><text x="215" y="${Y(16.4)-6}" class="gkey ve" text-anchor="middle">left ventricle</text><text x="440" y="${Y(0.4)-6}" class="gkey at" text-anchor="end">left atrium</text></svg>`}
function makeHeart(){
  const R=[];
  for(let i=0;i<HROUTE.length-1;i++){const [cur,cn]=HROUTE[i],[nx,nn,why]=HROUTE[i+1],labels=i<6;
    R.push({kind:"spot",title:labels?"Blood Through the Heart":"Blood Through the Heart · no labels",prompt:`The red blood cell is in the ${cn.toLowerCase()}. Tap where it goes next.`,ans:[nx],view:Rd=>`<div class="diagram narrow">${heartSVG(Rd,cur,labels)}</div>`,explain:`Next: the ${nn.toLowerCase()}, where ${why}.`})}
  R.push({kind:"order",title:"Wave of excitation",prompt:"Put the wave of excitation in the correct order.",items:["The SA node (pacemaker) sends out a wave of excitation","The atria contract (atrial systole)","The AV node delays the wave","The wave passes down the bundle of His","The Purkinje fibres carry it through the ventricle walls","The ventricles contract from the apex upwards"],explain:"The heart is myogenic: the beat starts in the heart muscle itself. The delay at the AV node lets the atria empty first."});
  const g=(prompt,opts,explain)=>R.push({kind:"choice",title:"Cardiac cycle graph",prompt,opts,ans:0,view:()=>`<div class="diagram narrow">${pressureSVG()}</div>`,explain});
  g("At point A, which valve closes, and why?",["The bicuspid (AV) valve closes because ventricular pressure is now higher than atrial pressure","The aortic semilunar valve closes because aortic pressure is higher than ventricular pressure","The bicuspid valve opens because atrial pressure is higher","The aortic semilunar valve opens because ventricular pressure is higher than aortic pressure"],"Valves open and close because of pressure differences.");
  g("What happens at point B?",["The aortic semilunar valve opens: ventricular pressure exceeds aortic pressure","The bicuspid valve closes","The atria contract","The ventricle starts to relax"],"Blood is now ejected into the aorta.");
  g("What happens at point C?",["The aortic semilunar valve closes: aortic pressure exceeds ventricular pressure","The bicuspid valve opens","The ventricle starts to contract","The SA node fires"],"Closing the semilunar valve prevents backflow into the ventricle (the small dip after C).");
  g("What happens at point D?",["The bicuspid valve opens: atrial pressure exceeds ventricular pressure","The aortic valve opens","Blood leaves the left ventricle","The aortic valve closes"],"The ventricle fills during diastole.");
  g("Between B and C, what is the left ventricle doing?",["Contracting and ejecting blood into the aorta (ventricular systole)","Relaxing and filling (diastole)","Contracting with all valves closed","Receiving blood from the lungs"],"Between A and B both valves are closed while pressure builds.");
  R.push({kind:"choice",title:"Valve damage challenge",prompt:"The bicuspid valve is damaged and leaks. Where does some blood go during ventricular systole?",opts:["Back into the left atrium","Back into the right ventricle","Into the pulmonary vein only","Into the vena cava"],ans:0,explain:"A leaking AV valve lets blood flow back into the atrium, so less blood is pumped into the aorta."});
  R.push({kind:"choice",title:"Valve damage challenge",prompt:"Why is the wall of the left ventricle thicker than the right?",opts:["It must generate a higher pressure to pump blood round the whole body","It pumps a larger volume of blood","It receives deoxygenated blood","It contains the SA node"],ans:0,explain:"Both ventricles pump the same volume; the right only pumps to the nearby lungs, at lower pressure."});
  return R;
}

/* ---------- DNA Evidence Lab (Meselson–Stahl) ---------- */
function tubesSVG(gens){
  const Y={H:205,M:175,L:145};const lab={H:"heavy ¹⁵N/¹⁵N",M:"hybrid ¹⁵N/¹⁴N",L:"light ¹⁴N/¹⁴N"};
  const tube=(x,g,bands)=>`<g><path d="M${x-20},40 L${x+20},40 L${x+20},215 Q${x},245 ${x-20},215 Z" class="tube"/>${bands?bands.map(([b,w])=>`<rect x="${x-17}" y="${Y[b]-3}" width="34" height="${w>0.6?7:4}" rx="2" class="band ${b}"/>`).join(""):`<text x="${x}" y="130" class="tq" text-anchor="middle">?</text>`}<text x="${x}" y="268" class="tlab" text-anchor="middle">Gen ${g}</text></g>`;
  const B={0:[["H",1]],1:[["M",1]],2:[["M",.5],["L",.5]],3:[["M",.3],["L",.7]]};
  return `<svg viewBox="0 0 470 280" class="tubes" role="img" aria-label="Centrifuge tubes showing DNA bands">
  ${["H","M","L"].map(k=>`<line x1="110" x2="460" y1="${Y[k]}" y2="${Y[k]}" class="tguide"/><text x="104" y="${Y[k]+4}" class="tkey" text-anchor="end">${lab[k]}</text>`).join("")}
  ${[0,1,2,3].map(g=>tube(170+g*85,g,gens.includes(g)?B[g]:null)).join("")}</svg>`}
function makeDNALab(){
  const R=[],v=s=>()=>`<div class="diagram narrow">${tubesSVG(s)}</div>`;
  const ch=(prompt,opts,explain,show)=>R.push({kind:"choice",title:"DNA Evidence Lab",prompt,opts,ans:0,explain,view:v(show)});
  ch("Bacteria are grown for many generations in ¹⁵N (heavy nitrogen). After centrifugation, where is the DNA band?",["Low in the tube (heavy)","High in the tube (light)","In the middle (hybrid)","There are two bands"],"¹⁵N makes the DNA denser, so it settles lower in the density gradient.",[]);
  ch("The bacteria are moved to ¹⁴N and divide ONCE. Predict the result.",["One band, in the middle (hybrid)","One heavy band and one light band","One light band","One heavy band"],"Each new molecule has one old ¹⁵N strand and one new ¹⁴N strand.",[0]);
  ch("Which model of replication does the generation 1 result rule out?",["Conservative","Semi-conservative","Dispersive","None of them"],"Conservative replication would give one heavy and one light band.",[0,1]);
  ch("The bacteria divide AGAIN in ¹⁴N. Predict the result.",["Two bands of equal size: hybrid and light","One hybrid band","One light band","Hybrid and heavy bands"],"Each hybrid molecule makes one hybrid and one light molecule.",[0,1]);
  ch("Which model does the generation 2 result rule out?",["Dispersive","Semi-conservative","Conservative only","Neither model"],"Dispersive replication would give a single band between hybrid and light. Only semi-conservative fits both results.",[0,1,2]);
  R.push({kind:"num",title:"Generation calculator",prompt:"After generation 3 in ¹⁴N, what percentage of DNA molecules are hybrid?",ans:25,tol:0.01,unit:"%",show:"25%",explain:"Hybrid halves each generation: 100% → 50% → 25%.",view:v([0,1,2,3])});
  R.push({kind:"num",title:"Generation calculator",prompt:"After generation 4, what percentage of DNA molecules are light?",ans:87.5,tol:0.01,unit:"%",show:"87.5%",explain:"Hybrid is 12.5%, so light is 100 − 12.5 = 87.5%.",view:v([0,1,2,3])});
  ch("What is the role of DNA helicase in replication?",["It opens the helix by breaking hydrogen bonds between bases","It joins nucleotides into a new strand","It adds the ¹⁵N label","It cuts the DNA into fragments"],"DNA polymerase then joins complementary nucleotides alongside each original strand.",[0,1,2,3]);
  return R;
}
