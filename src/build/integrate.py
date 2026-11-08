import shutil
p='quiztoplasm.html'
shutil.copy(p,'build/quiztoplasm-v3.bak')
s=open(p,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:90]); s=s.replace(a,b)
games=open('build/games.js',encoding='utf-8').read()
rep('/* ================= Worlds, hub and routing ================= */',games+'\n/* ================= Worlds, hub and routing ================= */\nconst TOPIC_GAMES={m:["molecules","dna"],c:["surgery"],p:["osmosis"]};TOPICS.forEach(t=>t.games=TOPIC_GAMES[t.id]||[]);')
rep('function topicPlayed(t){return Run.best(t.id)>0||t.lab.some(id=>Lab.best(id)>0)}','function topicPlayed(t){return Run.best(t.id)>0||t.lab.some(id=>Lab.best(id)>0)||t.games.some(id=>Games.best(id)>0)}')
rep('''<span class="sc">${b?starsOf(b/100):"Play"}</span></a>`}).join("")}</div></article>`;''',
'''<span class="sc">${b?starsOf(b/100):"Play"}</span></a>`}).join("")}
  ${t.games.map(id=>{const gm=Games.GAMES[id],b=Games.best(id);return `<a class="act" href="#game-${id}"><span>${escH(gm.title)}<small>Game · 8 rounds</small></span><span class="sc">${b?starsOf(b/100):"Play"}</span></a>`}).join("")}</div></article>`;''')
rep('const show=id=>["hub","worldwrap","runwrap","labwrap"]','const show=id=>["hub","worldwrap","runwrap","labwrap","gamewrap"]')
rep('  else{show("hub");renderHub()}','''  else if(h.startsWith("game-")&&Games.GAMES[h.slice(5)]){
    const id=h.slice(5);lastWorld=topicById[Games.GAMES[id].topic].w;setBack("game-back",lastWorld);$$("#game-title").textContent=Games.GAMES[id].title;show("gamewrap");Games.open(id)}
  else{show("hub");renderHub()}''')
rep('  <div id="labwrap" hidden>','''  <div id="gamewrap" hidden>
    <div style="display:grid;gap:18px">
      <div class="gamebar"><h2 id="game-title">Game</h2><a class="home-link" id="game-back" href="#">← <b>World</b></a></div>
      <section class="panel" id="game"></section>
    </div>
  </div>

  <div id="labwrap" hidden>''')
rep('--oxy:#ffffff;','--oxy:#ffffff; --water:#e4eefa; --bA:#cdeccb; --bT:#f6e3a8; --bG:#f6c9d6; --bC:#c9dcf5;')
rep('@media (prefers-reduced-motion:reduce){.run-in,.pop{animation:none}}',open('build/games.css',encoding='utf-8').read()+'\n@media (prefers-reduced-motion:reduce){.run-in,.pop{animation:none}}')
open(p,'w',encoding='utf-8').write(s); print('ok')
