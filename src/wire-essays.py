import shutil,re
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/chars/'
F='/home/user/thesciencerealms.github.io/quiztoplasm/index.html'
shutil.copy(F,D+'quiztoplasm-before-essays.html')
s=open(F,encoding='utf-8').read();assert 'const ESSAYS=' not in s
assert not re.search(r'\.es-[a-z]',s),'class clash'
data=open(D+'essays.js',encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:60],s.count(a));s=s.replace(a,b)
rep('const BN=(()=>{',data+'\nconst BN=(()=>{')
rep('''  <section class="panel"><h3>Practise this topic</h3>''','''  ${ESSAYS[id]?essayHTML(id):""}
  <section class="panel"><h3>Practise this topic</h3>''')
rep('function render(id){\n  const t=topicById[id],w=worldById(t.w),n=NOTES[id];','''function essayHTML(id){const E=ESSAYS[id];
  return `<section class="panel es-box"><div class="es-head"><div><div class="kicker">Section B practice</div><h3>15/15 essay plans</h3></div><span class="es-badge">15 marks · ~20 min</span></div>
  <p class="es-lead">Section B is one 15-mark essay in continuous prose. To reach the top band (11–15 marks) you need <b>at least 11 correct points</b>, the right specialist terms, and good spelling, punctuation and grammar. Learn these points, then write them as full sentences in a logical order.</p>
  ${E.map((e,i)=>`<details class="es-q" ${i===0?"open":""}><summary><span>${escH(e.q)}</span>${e.past?`<em class="es-past">Past-paper style</em>`:""}</summary>
   <ol class="es-pts">${e.p.map(x=>`<li>${escH(x)}</li>`).join("")}</ol><p class="es-count">${e.p.length} points · you need 11+ for the top band</p></details>`).join("")}</section>`}
function render(id){
  const t=topicById[id],w=worldById(t.w),n=NOTES[id];''')
css='''
.es-box{display:grid;gap:12px}.es-head{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap}.es-head h3{margin:2px 0 0}
.es-badge{font:700 13px var(--mono,monospace);background:var(--gold-soft,#f7e8b5);color:#5a4300;border-radius:999px;padding:5px 12px}
.es-lead{margin:0;color:var(--muted);line-height:1.5}
.es-q{border:1px solid var(--line);border-radius:12px;padding:10px 14px;background:var(--surface)}
.es-q summary{cursor:pointer;font-weight:700;display:flex;gap:10px;justify-content:space-between;align-items:flex-start;line-height:1.4}
.es-past{font-style:normal;font:700 11px var(--mono,monospace);white-space:nowrap;background:var(--goodbg);color:var(--good);border-radius:999px;padding:3px 9px}
.es-pts{margin:10px 0 0;padding-left:24px;display:grid;gap:5px;line-height:1.45}.es-pts li::marker{font-weight:700;color:var(--gold)}
.es-count{margin:8px 0 0;font-size:13px;color:var(--muted);font-weight:700}
'''
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('ok')
