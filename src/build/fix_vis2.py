B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
R=[
 # root journey: stagger labels so they don't collide
 ('${["soil","root hair cell","cortex","","","endodermis","pericycle","xylem"].map((t,i)=>t?`<text x="${[20,75,200,0,0,313,356,410][i]}" y="214" text-anchor="middle" class="ma-n">${t}</text>`:"").join("")}',
  '${[["soil",20,214],["root hair cell",80,232],["cortex",200,214],["endodermis",313,232],["pericycle",356,214],["xylem",410,232]].map(([t,x,y])=>`<text x="${x}" y="${y}" text-anchor="middle" class="ma-n">${t}</text>`).join("")}'),
 ('<svg viewBox="0 0 460 222" class="s-svg" role="img" aria-label="Root section from root hair to xylem">','<svg viewBox="0 0 460 240" class="s-svg" role="img" aria-label="Root section from root hair to xylem">'),
 # potometer: conditions text clear of the sun
 ('<text x="-150" y="-10" class="ma-n">${t.temp} °C · humidity ${t.hum}%</text><text x="-150" y="6" class="ma-n">Vaseline: ${t.vas}</text>','<text x="-210" y="-10" class="ma-n">${t.temp} °C · humidity ${t.hum}%</text><text x="-210" y="6" class="ma-n">Vaseline: ${t.vas}</text>'),
 # phloem: labels inside the frame
 ('<text x="166" y="24" class="ma-n">growing shoot tip (sink)</text>','<text x="166" y="22" class="ma-n">shoot tip</text><text x="166" y="35" class="ma-n">(sink)</text>'),
 ('<text x="206" y="166" class="ma-n">mature leaves (source)</text>','<text x="196" y="170" class="ma-n">mature leaves</text><text x="196" y="183" class="ma-n">(source)</text>'),
 ('<text x="176" y="90" class="ma-n">tap to set</text>','<text x="176" y="90" class="ma-n">tap arrows</text>'),
 # niche: legend out of the graph area
 ('<text x="200" y="30" class="nw-k a">— P. aurelia</text><text x="200" y="44" class="nw-k c">— P. caudatum</text>${sep?`<text x="200" y="58" class="ma-n">- - - grown separately</text>`:""}</svg>`}',
  '</svg><p class="small"><b class="nw-k a">— P. aurelia</b> · <b class="nw-k c">— P. caudatum</b>${sep?" · faint lines = grown separately":""}</p>`}'),
 # eutro: O2 gauge label readable
 ('<g transform="translate(420,20)"><rect width="30" height="80" rx="6" class="eu-g"/>','<g transform="translate(420,6)"><rect width="30" height="80" rx="6" class="eu-g"/>'),
 ('<text x="15" y="96" text-anchor="middle" class="ma-n">O₂ ${o2}%</text></g></svg>`}','<text x="-6" y="44" text-anchor="end" class="ma-n">O₂ ${o2}%</text></g></svg>`}'),
 # bod: readable tank label
 ('<text x="168" y="25" text-anchor="middle" class="ma-n">slurry</text>','<text x="168" y="25" text-anchor="middle" class="pi-tl">slurry</text>'),
]
CSS='.pe-plant{max-width:440px;margin:0 auto} .pi-tl{font:700 11px var(--mono);fill:#fff} p .nw-k.a{color:#60a5fa} p .nw-k.c{color:#f87171}'
for f in ['quiztoplasm.html','build/sims.js','build/sims_as2.js']:
    s=open(B+f,encoding='utf-8').read()
    for o,n in R:
        assert s.count(o)==1,(f,o[:60]);s=s.replace(o,n)
    if f=='quiztoplasm.html':s=s.replace('</style>',CSS+'</style>',1)
    open(B+f,'w',encoding='utf-8').write(s)
c=open(B+'build/sims_as2.css',encoding='utf-8').read();open(B+'build/sims_as2.css','w',encoding='utf-8').write(c+CSS+'\n')
print('ok')
