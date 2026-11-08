import shutil
base='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
p=base+'quiztoplasm.html'
shutil.copy(p,base+'build/quiztoplasm-v5.bak')
s=open(p,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80]); s=s.replace(a,b)
bn=open(base+'build/bnotes.js',encoding='utf-8').read()
rep('/* ================= Worlds, hub and routing ================= */',bn+'\n/* ================= Worlds, hub and routing ================= */')
rep('<div class="acts"><a class="act" href="#run-${t.id}">','<div class="acts"><a class="act ff-act" href="#notes-${t.id}"><span>Factfile<small>Key points and exam tips</small></span><span class="sc">Read</span></a><a class="act" href="#run-${t.id}">')
rep('const show=id=>["hub","worldwrap","runwrap","labwrap","gamewrap"]','const show=id=>["hub","worldwrap","runwrap","labwrap","gamewrap","noteswrap"]')
rep('  else if(h.startsWith("game-")&&Games.GAMES[h.slice(5)]){','  else if(h.startsWith("notes-")&&topicById[h.slice(6)]){lastWorld=topicById[h.slice(6)].w;show("noteswrap");BN.render(h.slice(6))}\n  else if(h.startsWith("game-")&&Games.GAMES[h.slice(5)]){')
rep('  <div id="gamewrap" hidden>','  <div id="noteswrap" hidden></div>\n  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><marker id="arw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--green)"/></marker></defs></svg>\n\n  <div id="gamewrap" hidden>')
css='''/* factfiles */
.act.ff-act{border-color:var(--gold);background:var(--gold-soft)}
.ff{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:20px;align-items:start}
@media (max-width:700px){.ff{grid-template-columns:1fr}}
.figbox{background:var(--paper);border-radius:12px;border:1px solid var(--line);padding:10px;display:flex;gap:4px;justify-content:center}
.figbox svg{max-width:100%;height:auto}
svg.fig{width:100%;height:auto;display:block}
.fig .fs{fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linejoin:round}
.fig .fdash{stroke:var(--ink-soft);stroke-width:1;stroke-dasharray:4 3;fill:none}
.fig .farrow{stroke:var(--green-deep);stroke-width:2;marker-end:url(#arw)}
.fig .fdot{fill:var(--ink)}
.fig text{fill:var(--ink);font-family:var(--body)}
.fig .fb{font-weight:700;font-size:13px} .fig .fbig{font-weight:700;font-size:18px} .fig .fs2{font-size:12px} .fig .fs3{font-size:10.5px}
.kp{margin:6px 0 0;padding-left:20px;display:grid;gap:6px}
.ffgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}
.panel{align-content:start}
.tipbox{border-left:6px solid var(--gold)} .warnbox{border-left:6px solid var(--bad)}
'''
rep('.labnote{',css+'.labnote{')
open(p,'w',encoding='utf-8').write(s);print('ok')
