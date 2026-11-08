import shutil
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/cq/'
for f in ['app.js','notes.js','data.js','shell.html','shapes.js','build.py']: shutil.copy(B+f,B+f+'.p3bak')
def patch(fn,pairs):
    s=open(B+fn,encoding='utf-8').read()
    for a,b in pairs:
        assert s.count(a)==1,(fn,s.count(a),a[:90]); s=s.replace(a,b)
    open(B+fn,'w',encoding='utf-8').write(s)

patch('shapes.js',[('  if(n===2)return [[1,0,0],[-1,0,0]];','  if(n===1)return [[1,0,0]];\n  if(n===2)return [[1,0,0],[-1,0,0]];')])

patch('app.js',[
 ('<small>COLOUR LAB · ${q.o[0]}</small>','<small>${G.quiz?"QUESTION":"COLOUR LAB"} · ${q.o[0]}</small>'),
 ('const base=acts.length;','acts+=`<a class="act" href="#quiz-${t.id}"><span>Topic Quiz<small>${qbFor(t.id).length} CCEA-style questions</small></span><span class="sc">${bestTxt("quiz-"+t.id)||"Play"}</span></a>`;const base=acts.length;'),
 ('    ps.forEach(p=>acts+=`<a class="act" href="#prac-${p.id}"><span>${esc(p.title)}<small>Practical Builder · 6 marks</small></span>',
  '    if(t.code==="1.6")[["shifter","Shape Shifter","Build molecules in 3D"],["escape","Electron Pair Escape","Work out shapes room by room"],["blitz","Bond Angle Blitz","Timed bond angles"],["dipole","Dipole Detective","Polar or non-polar, and why"]].forEach(([h,n,s])=>acts+=`<a class="act" href="#${h}"><span>${n}<small>${s}</small></span><span class="sc">${bestTxt(h)||"Play"}</span></a>`);\n    ps.forEach(p=>acts+=`<a class="act" href="#prac-${p.id}"><span>${esc(p.title)}<small>${p.msm?"Mark Scheme Mechanic":"Practical Builder"} · 6 marks</small></span>'),
 ('<h3>Mixed definitions</h3>','<h3>Mixed practice</h3><a class="act" href="#quiz-${w.id}"><span>Section A Bank<small>10 random multiple-choice questions</small></span><span class="sc">${bestTxt("quiz-"+w.id)||"Play"}</span></a>'),
 ('${pr.length} Practical Builder questions','${pr.filter(p=>!p.msm).length} Practical Builder questions'),
 ('  G={kind:"prac",p,key:"prac-"+id,stage:0,scores:[],backHash:w.hash,','  G={kind:"prac",p,key:"prac-"+id,stage:0,scores:[],backHash:w.hash,order:[p.kit?0:-1,p.steps?1:-1,2,3].filter(x=>x>=0),si:0,'),
 ('     kit:{order:shuffle(p.kit.map((_,i)=>i)),on:new Set(),checked:false},','     kit:{order:shuffle((p.kit||[]).map((_,i)=>i)),on:new Set(),checked:false},'),
 ('     meth:{items:shuffle([...p.steps.map((s,i)=>({s,i})),...p.decoys.map(([s,why],j)=>({s,i:-1-j,why}))]),seq:[],checked:false},','     meth:{items:shuffle([...(p.steps||[]).map((s,i)=>({s,i})),...(p.decoys||[]).map(([s,why],j)=>({s,i:-1-j,why}))]),seq:[],checked:false},'),
 ('  frame(t.code+" "+t.name+" · Practical Builder",p.title,','  G.stage=G.order[0];\n  frame(t.code+" "+t.name+(p.msm?" · Mark Scheme Mechanic":" · Practical Builder"),p.title,'),
 ('const head=`<div class="stages">${STAGES.map((s,i)=>`<span class="stg ${i===st?"on":i<st?"done":""}">${s}</span>`).join("")}</div><div class="qhead">6-MARK PRACTICAL QUESTION</div>',
  'const head=`<div class="stages">${G.order.map((s,i)=>`<span class="stg ${s===st?"on":(i<G.si||st===4)?"done":""}">${i+1} ${STAGES[s].slice(2)}</span>`).join("")}</div><div class="qhead">${P.msm?"6-MARK EXPLANATION QUESTION":"6-MARK PRACTICAL QUESTION"}</div>'),
 ('<b>Model answer:</b> ${P.steps.map(esc).join(". ")}.</p>','<b>Model answer:</b> ${P.model?esc(P.model):P.steps.map(esc).join(". ")+"."}</p>'),
 ('${G.scores.map((x,i)=>`${STAGES[i]}: ${x[0]}/${x[1]}`).join("<br>")}','${G.scores.map((x,i)=>x?`${STAGES[i].slice(2)}: ${x[0]}/${x[1]}`:"").filter(Boolean).join("<br>")}'),
 ('const total=G.scores.reduce((s,x)=>s+x[0],0),max=G.scores.reduce((s,x)=>s+x[1],0);','const total=G.scores.reduce((s,x)=>s+(x?x[0]:0),0),max=G.scores.reduce((s,x)=>s+(x?x[1]:0),0);'),
 ('  if(a==="pnext"){G.stage++;return pracRender()}','  if(a==="pnext"){G.si++;G.stage=G.order[G.si];return pracRender()}'),
 ('  if(G.kind==="ionic")return ionicAct(a,k);','  if(G.kind==="ionic")return ionicAct(a,k);\n  if(G.kind==="shifter")return shifterAct(a,k);\n  if(G.kind==="escape")return escapeAct(a,k);\n  if(G.kind==="blitz")return blitzAct(a,k);\n  if(G.kind==="dipole")return dipoleAct(a,k);'),
 ('  else if(h==="ionic"){show(false);startIonic()}','  else if(h==="ionic"){show(false);startIonic()}\n  else if(["shifter","escape","blitz","dipole"].includes(h)){show(false);({shifter:startShifter,escape:startEscape,blitz:startBlitz,dipole:startDipole})[h]()}\n  else if((m=h.match(/^quiz-(as1|as2|\\d+-\\d+)$/))&&(worldById(m[1])||topicById(m[1]))&&qbFor(m[1]).length){show(false);startQuiz(m[1])}'),
])

patch('notes.js',[
 ('   <div class="ffgrid"><section class="panel tipbox">','   ${n.mn?`<section class="panel mnbox"><div class="mnrow">${n.mnfig||""}<div><h3>Memory trick</h3><p class="mn">${n.mn}</p></div></div></section>`:""}\n   <div class="ffgrid"><section class="panel tipbox">'),
 ('  PRACS.filter(p=>p.topic===t.code).forEach(p=>games.push([`#prac-${p.id}`,p.title]));','  games.unshift([`#quiz-${id}`,"Topic Quiz"]);if(t.code==="1.6")games.push(["#shifter","Shape Shifter"],["#escape","Electron Pair Escape"],["#blitz","Bond Angle Blitz"],["#dipole","Dipole Detective"]);\n  PRACS.filter(p=>p.topic===t.code).forEach(p=>games.push([`#prac-${p.id}`,p.title]));'),
 ('"2-11":{pts:[','"2-11":{mn:"<b>HAM SALad</b>: <b>H</b>ydroxides <b>A</b>re <b>M</b>ore <b>S</b>oluble, <b>S</b>ulfates <b>A</b>re <b>L</b>ess, going DOWN Group II.<br>So Mg(OH)₂ is the least soluble hydroxide and BaSO₄ is the least soluble sulfate. That is why barium chloride solution is used to test for sulfate ions.",mnfig:`<svg class=\'bowl\' viewBox=\'0 0 120 90\' aria-hidden=\'true\'><path d=\'M10,40 Q60,110 110,40 Z\' style=\'fill:#2dc653;stroke:#0b2545;stroke-width:2\'/><circle cx=\'40\' cy=\'36\' r=\'9\' style=\'fill:#e04848\'/><circle cx=\'62\' cy=\'32\' r=\'8\' style=\'fill:#ffd60a\'/><path d=\'M76,38 q10,-16 20,0\' style=\'fill:#8fdc52;stroke:#0b2545\'/><path d=\'M24,40 q10,-14 22,-2\' style=\'fill:#bfe3a0;stroke:#0b2545\'/><text x=\'60\' y=\'64\' text-anchor=\'middle\' style=\'font:700 13px var(--body);fill:#fff\'>HAM SALad</text></svg>`,pts:['),
])

patch('data.js',[
 ('/* Practical Builder: 6-mark practical questions (AS only) */\nconst PRACS=[','''/* Practical Builder: 6-mark practical questions (AS only) */
const PRACS=[
 {id:"msm-ch4",msm:true,topic:"1.6",title:"Methane vs water",q:"Compare the shapes and bond angles of a methane molecule and a water molecule, and explain the difference.",
  gaps:{text:"Methane has four {a} pairs and no lone pairs, so it is {b} with a bond angle of {c}. Water has two bonding pairs and two {d} pairs. Lone pairs repel {e} than bonding pairs, so water is {f} with a bond angle of 104.5°.",ans:{a:"bonding",b:"tetrahedral",c:"109.5°",d:"lone",e:"more",f:"bent"},extra:["less","pyramidal","107°","trigonal planar"]},
  points:[["Methane is tetrahedral",["tetrahedral"]],["Methane bond angle 109.5°",["109"]],["Methane has four bonding pairs (no lone pairs)",["four bonding","4 bonding"]],["Bonding pairs repel equally",["repel equally","equal repulsion","equally"]],["Water is bent",["bent","v-shape","v shape"]],["Water bond angle 104.5°",["104"]],["Water has two bonding pairs and two lone pairs",["two lone","2 lone"]],["Lone pairs repel more than bonding pairs",["repel more","more repulsion"]]],
  bands:[7,5,2],model:"Methane is tetrahedral with a bond angle of 109.5°. It has four bonding pairs and no lone pairs, so the bonding pairs repel equally and are as far apart as possible. Water is bent with a bond angle of 104.5°. It has two bonding pairs and two lone pairs. Lone pairs repel more than bonding pairs, so the bond angle is reduced."},
 {id:"msm-nh3",msm:true,topic:"1.6",title:"Ammonia vs boron trifluoride",q:"Explain the shapes and bond angles of ammonia, NH₃, and boron trifluoride, BF₃.",
  gaps:{text:"Ammonia has three bonding pairs and one {a} pair, so its shape is {b} and the bond angle is {c}. Boron trifluoride has three bonding pairs and {d} lone pairs, so it is {e} with a bond angle of {f}.",ans:{a:"lone",b:"pyramidal",c:"107°",d:"no",e:"trigonal planar",f:"120°"},extra:["tetrahedral","109.5°","two","104.5°"]},
  points:[["NH₃ is pyramidal",["pyramid"]],["NH₃ bond angle 107°",["107"]],["NH₃ has three bonding pairs and one lone pair",["one lone","1 lone","a lone pair"]],["The lone pair repels more than the bonding pairs",["repel more","more repulsion"]],["BF₃ is trigonal planar",["trigonal planar"]],["BF₃ bond angle 120°",["120"]],["BF₃ has three bonding pairs and no lone pairs",["no lone","0 lone"]],["Bonding pairs repel equally / as far apart as possible",["as far apart","repel equally"]]],
  bands:[7,5,2],model:"NH₃ has three bonding pairs and one lone pair around nitrogen. The lone pair repels more than the bonding pairs, so the shape is pyramidal with a bond angle of 107°. BF₃ has three bonding pairs and no lone pairs around boron. The bonding pairs repel equally and get as far apart as possible, so the shape is trigonal planar with a bond angle of 120°."},
 {id:"msm-pol",msm:true,topic:"1.6",title:"Polar or non-polar?",q:"Explain why tetrachloromethane, CCl₄, is non-polar but trichloromethane, CHCl₃, is polar.",
  gaps:{text:"Chlorine is more {a} than carbon, so each C–Cl bond is {b}. CCl₄ is tetrahedral and {c}, so the bond dipoles {d} and the molecule is non-polar. In CHCl₃ one chlorine is replaced by hydrogen, so the dipoles do not cancel and there is an {e} dipole.",ans:{a:"electronegative",b:"polar",c:"symmetrical",d:"cancel",e:"overall"},extra:["electropositive","non-polar","unsymmetrical","add"]},
  points:[["Cl is more electronegative than C",["electronegativ"]],["The C–Cl bonds are polar (Cδ+, Clδ−)",["polar bond","bonds are polar","δ","delta"]],["Both molecules are tetrahedral",["tetrahedral"]],["CCl₄ is symmetrical",["symmetr"]],["In CCl₄ the bond dipoles cancel, so it is non-polar",["cancel"]],["CHCl₃ is not symmetrical (C–H is different from C–Cl)",["not symmetr","asymmetr","unsymmetr"]],["In CHCl₃ the dipoles do not cancel, so it is polar",["do not cancel","don't cancel","don’t cancel","not cancel"]]],
  bands:[6,4,2],model:"Chlorine is more electronegative than carbon, so each C–Cl bond is polar (Cδ+, Clδ−). Both molecules are tetrahedral. CCl₄ is symmetrical, so the four bond dipoles cancel and the molecule is non-polar. In CHCl₃, one Cl is replaced by H, so the molecule is not symmetrical, the dipoles do not cancel and the molecule is polar."},'''),
])

css='''/* shapes, polarity, mnemonic */
.shapebox{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:18px;align-items:start}
@media (max-width:640px){.shapebox{grid-template-columns:1fr}}
.mol3d{background:radial-gradient(circle at 50% 40%,#16365f,#0b2545);border-radius:14px;position:relative;touch-action:none;max-width:320px;width:100%;margin:0 auto}
.mol3d svg{display:block;width:100%;height:auto;cursor:grab}
.mol3d .hint{position:absolute;bottom:6px;left:0;right:0;text-align:center;font:500 11px var(--mono);color:#9cc9e3}
.m3d .bnd{stroke:#cfe6f2;stroke-linecap:round}
.m3d .atm{stroke:#0b2545;stroke-width:1.5}
.m3d .atl{font-family:var(--body);font-weight:700;text-anchor:middle;fill:#0b2545;pointer-events:none}
.m3d .lpe{fill:rgba(255,214,10,.35);stroke:#ffd60a;stroke-width:1.5}
.m3d .lpd{fill:#ffd60a}
.m3d .dlt{font:700 14px var(--body);text-anchor:middle}
.m3d .dp{fill:#ff8fa8} .m3d .dm{fill:#7fe0ff}
.steppers{display:grid;gap:8px}
.stp{display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:8px 12px}
.stp span{flex:1;font-weight:700}
.stp b{font:700 20px var(--mono);min-width:24px;text-align:center}
.sbtn{width:38px;height:38px;border-radius:8px;border:1.5px solid var(--navy);background:#fff;font:700 20px var(--body);color:var(--navy)}
.opts.two{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.doors{display:flex;gap:8px;flex-wrap:wrap}
.door{width:44px;height:52px;border-radius:8px 8px 2px 2px;border:2px solid var(--line);background:#fff;display:grid;place-items:center;font-size:20px}
.door.cur{border-color:var(--yellowd)} .door.open{border-color:var(--good);background:var(--goodbg)}
.bins{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.bin{background:#fff;border:2px dashed var(--line);border-radius:12px;padding:12px;text-align:left;display:grid;gap:8px;min-height:110px;align-content:start}
.bin.ready{border-color:var(--yellowd)}
.bin>span{display:flex;flex-wrap:wrap;gap:6px}
.chipm{border:1.5px solid var(--navy);border-radius:99px;padding:2px 10px;font-weight:700}
.chipm.right{border-color:var(--good);background:var(--goodbg)} .chipm.wrong{border-color:var(--bad);background:var(--badbg)}
.mnbox{border-left:6px solid var(--green)}
.mnrow{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.bowl{width:120px;flex:none}
.mn{font-size:17px}
'''
patch('shell.html',[('/* factfiles, ionic, equations */',css+'/* factfiles, ionic, equations */')])
patch('build.py',[("open(base+'cq/ionic.js',encoding='utf-8').read()+'\\n'","open(base+'cq/ionic.js',encoding='utf-8').read()+'\\n'+open(base+'cq/shapes.js',encoding='utf-8').read()+'\\n'+open(base+'cq/polar.js',encoding='utf-8').read()+'\\n'+open(base+'cq/bank.js',encoding='utf-8').read()+'\\n'")])
print('patched')
