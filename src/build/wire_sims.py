B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
f=B+'quiztoplasm.html';s=open(f,encoding='utf-8').read()
o='\nconst GAMES={\n';assert s.count(o)==1;s=s.replace(o,'\n'+open(B+'build/ileum.js',encoding='utf-8').read()+o)
o=' bloodfilm:{title:"Blood Film ID",topic:"h",make:makeBloodFilm,blurb:"Identify polymorphs, lymphocytes, monocytes and platelets on a stained film."}};'
assert o in s;s=s.replace(o,o[:-2]+',\n ileum:{title:"Inside the Ileum",topic:"t",make:makeIleum,blurb:"Zoom from the ileum wall into a villus and trace absorption."}};')
o='h:["heart","bloodfilm"]};';assert o in s;s=s.replace(o,'h:["heart","bloodfilm"],t:["ileum"]};')
o='''      <section class="panel" id="game"></section>
    </div>
  </div>'''
assert o in s
s=s.replace(o,o+'''
  <div id="simwrap" hidden>
    <div style="display:grid;gap:18px">
      <div class="gamebar"><h2 id="sim-title">Lab</h2><a class="home-link" id="sim-back" href="#">← <b>World</b></a></div>
      <section class="panel" id="sim"></section>
    </div>
  </div>''',1)
o='function goBack(){';assert s.count(o)==1;s=s.replace(o,open(B+'build/sims.js',encoding='utf-8').read()+'\n'+o)
o='const show=id=>["hub","worldwrap","runwrap","labwrap","gamewrap","noteswrap"].forEach(x=>{$$("#"+x).hidden=x!==id});'
assert o in s;s=s.replace(o,o.replace('"noteswrap"]','"noteswrap","simwrap"]')+'Sims.stop();')
o='  else if(h.startsWith("game-")&&Games.GAMES[h.slice(5)]){'
assert o in s;s=s.replace(o,'''  else if(h.startsWith("sim-")&&Sims.SIMS[h.slice(4)]){const id=h.slice(4);lastWorld=topicById[Sims.SIMS[id].topic].w;setBack("sim-back",lastWorld);$$("#sim-title").textContent=Sims.SIMS[id].title;show("simwrap");Sims.open(id)}
'''+o)
o='  ${t.games.map(id=>{const gm=Games.GAMES[id],b=Games.best(id);'
assert o in s
s=s.replace(o,'  ${Object.entries(Sims.SIMS).filter(([,x])=>x.topic===t.id).map(([id,x])=>{const b=Sims.best(id);return `<a class="act" href="#sim-${id}"><span>${escH(x.title)}<small>Lab · hands-on</small></span><span class="sc">${b?starsOf(b/100):"Play"}</span></a>`}).join("")}\n'+o)
css=open(B+'build/sims.css',encoding='utf-8').read()
s=s.replace('</style>',css+'</style>',1)
open(f,'w',encoding='utf-8').write(s);print('ok')
