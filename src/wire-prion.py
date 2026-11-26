import shutil,re
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/chars/'
F='/home/user/thesciencerealms.github.io/quiztoplasm/index.html'
shutil.copy(F,D+'quiztoplasm-before-prion.html')
s=open(F,encoding='utf-8').read();assert 'prStart' not in s
assert not re.search(r'\.pr-[a-z]',s),'class clash'
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:60],s.count(a));s=s.replace(a,b)
rep('const SIMS={',open(D+'prion.js',encoding='utf-8').read()+'\nconst SIMS={')
rep(' molarch:{title:"Molecular Architect",',' prion:{title:"Prion Files",topic:"m",blurb:"Notes, flashcards and a quick quiz on disease-causing prions.",start:prStart,act:prAct},\n molarch:{title:"Molecular Architect",')
# teacher tools: time estimate
rep('const minutes={food:10,','const minutes={prion:8,food:10,')
# link from the Molecules slide notes
rep('  ${ESSAYS[id]?essayHTML(id):""}','''  ${id==="m"?`<section class="panel pr-link"><div><div class="kicker">Also in 1.1.5 Proteins</div><h3>Prions</h3><p>Disease-causing proteins with a change in secondary structure, rich in β-pleated sheets. Linked to scrapie, BSE and CJD.</p></div><a class="primary" href="#sim-prion" style="text-decoration:none">Open Prion Files: notes, flashcards and quiz →</a></section>`:""}
  ${ESSAYS[id]?essayHTML(id):""}''')
css='''
.pr-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.pr-note{display:grid;gap:6px;align-content:start;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:12px 14px;line-height:1.45}.pr-note b{font-size:16px}.pr-note.tip{border-color:var(--gold);background:rgba(201,150,12,.1)}
.pr-fold{background:#fff;border-radius:12px;padding:8px}.pr-fold svg{width:100%;height:auto;display:block}.pr-lab{font:700 13px var(--body);fill:#1c291e}.pr-sm{font:600 11px var(--body);fill:#475569}
.pr-prog{height:8px;border-radius:6px;background:var(--line);overflow:hidden}.pr-prog i{display:block;height:100%;background:var(--gold);transition:width .3s}
.pr-card{display:block;width:min(560px,100%);height:250px;margin:4px auto 0;padding:0;border:0;background:none;perspective:1000px;cursor:pointer;font:inherit;color:inherit}
.pr-in{position:relative;display:block;width:100%;height:100%;transition:transform .45s;transform-style:preserve-3d}.pr-card.flip .pr-in{transform:rotateY(180deg)}
.pr-face{position:absolute;inset:0;display:grid;place-content:center;gap:10px;text-align:center;padding:22px;border-radius:18px;backface-visibility:hidden;-webkit-backface-visibility:hidden;font-size:21px;font-weight:700;line-height:1.35;box-shadow:0 12px 28px -12px rgba(0,0,0,.45)}
.pr-face small{font:700 12px var(--mono,monospace);letter-spacing:.14em;text-transform:uppercase;opacity:.75}.pr-face em{font-style:normal;font-size:13px;font-weight:600;opacity:.7}
.pr-front{background:var(--surface);border:2px solid var(--line);color:var(--fg)}.pr-back{background:#1f5420;color:#fff;transform:rotateY(180deg);border:2px solid #2e7d32}
.pr-rate{justify-content:center}
.pr-link{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}.pr-link p{margin:4px 0 0;color:var(--muted)}.pr-link h3{margin:2px 0 0}
@media (prefers-reduced-motion:reduce){.pr-in{transition:none}}
'''
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('ok')
