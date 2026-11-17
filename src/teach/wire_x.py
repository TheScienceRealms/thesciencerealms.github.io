import json,re,shutil,sys
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
R='/home/user/thesciencerealms.github.io/'
cat=json.load(open(D+'teach3/catalog2.json'))
MIN={'quiz':6,'dash':5,'fill':6,'colour':8,'flame':8,'ionic':10,'prac':10,'mech':8,'sort':6,'facts':5,'build':8,'scen':8,'sd':10,'cmdq':5,'relate':5}
def catalog(realm,umap):
    out=[];seen=set()
    for w in cat[realm]:
        u=umap[w['world']]
        for r in w['rows']:
            h=r['h']
            if h in seen or h.startswith(('notes-','essay-')) or h.endswith('-random'):continue
            seen.add(h)
            m=re.match(r'^(\d\.\d+)',r['lab']);code=m.group(1) if m else ''
            m2=re.match(r'^(?:dash|fill|colour|quiz)-(\d+)-(\d+)',h)
            if m2:code=m2.group(1)+'.'+m2.group(2)
            topic=r['head'] or 'Mixed practice'
            if not code:code={'Mixed practice':'Mixed','Practicals':'Practicals','Exam technique':'Exam skills'}.get(topic,'')
            t=r['title'];lab=r['lab']
            if h.startswith('dash-'):t='Definition Dash: '+topic
            elif h.startswith('fill-'):t='Definition Builder: '+topic
            elif t=='Topic Quiz':t='Topic quiz: '+topic
            elif t=='Colour Lab':t='Colour Lab: '+topic
            elif t=='Debate Arena':t='Debate Arena: '+lab[:60]
            elif t.startswith('Answer Builder'):d=r['desc'];t=t+': '+(d[:55]+'…' if len(d)>56 else d)
            if topic=='Mixed practice' and h.startswith(('dash-','fill-')):t=t.replace('Mixed practice','all '+('AS1' if u in('as1','u1') else 'AS2' if u=='as2' else 'Unit 2')+' terms')
            kind=re.match(r'^([a-z]+)',h).group(1)
            out.append([h,t,u,code,topic,MIN.get(kind,10)])
    return out
CFG={
 'chemquest':dict(tag='C',name='ChemQuest',board='CCEA',thing='quizzes, labs and practicals',egTitle='e.g. Bonding and structure',units=[['as1','AS1'],['as2','AS2']],cat=catalog('chemquest',{'elemental-frontier':'as1','molecular-realm':'as2'}),
   vars='--tq-surf:#ffffff;--tq-fg:#0b2545;--tq-mut:#4a6178;--tq-line:#c7dde8;--tq-acc:#0a4d86;--tq-btn:#ffd60a;--tq-btnfg:#0b2545;--tq-good:#127a3e;--tq-goodbg:#dff5e6;--tq-bad:#b3261e;--tq-inbg:#f3f9fc;--tq-sel:rgba(0,119,182,.08)',
   card='Pick quizzes, labs and practicals, share one link with your class, then see everyone’s results in one grid. No accounts, and no student data leaves your school’s systems.',
   route_old='  else if(realmRoute(h,show)){}'),
 'psycheverse':dict(tag='P',name='Psycheverse',board='WJEC',thing='quizzes, case files and answer builders',egTitle='e.g. The biological approach',units=[['u1','Unit 1'],['u2','Unit 2']],cat=catalog('psycheverse',{'theoretical-frontier':'u1','research-frontier':'u2'}),
   vars='--tq-surf:#ffffff;--tq-fg:#1d0b3d;--tq-mut:#5b4a7d;--tq-line:#d6cbef;--tq-acc:#6d3fd1;--tq-btn:#ffd166;--tq-btnfg:#1d0b3d;--tq-good:#127a3e;--tq-goodbg:#e3f6ea;--tq-bad:#b3261e;--tq-inbg:#f7f4ff;--tq-sel:rgba(109,63,209,.08)',
   card='Pick quizzes, case files and answer builders, share one link with your class, then see everyone’s results in one grid. No accounts, and no student data leaves your school’s systems.',
   route_old='  else ok=false;'),
}
css=open(D+'teach2/teach.css',encoding='utf-8').read()
css=css.replace('background:var(--gold)','background:var(--tq-btn)').replace('var(--gold)','var(--tq-acc)').replace('#1f1424','var(--tq-btnfg)')
for a,b in [('--surface','--tq-surf'),('--fg','--tq-fg'),('--muted','--tq-mut'),('--line','--tq-line'),('--goodbg','--tq-goodbg'),('--good)','--tq-good)'),('--bad','--tq-bad')]:css=css.replace('var('+a if a.endswith(')')==False else 'var('+a,'var('+b)
css=css.replace('rgba(226,189,90,.12)','var(--tq-sel)').replace('rgba(0,0,0,.18)','var(--tq-inbg)')
css=css.replace('.tq-pg{display:grid;gap:18px}','.tq-pg{display:grid;gap:18px;color:var(--tq-fg)}.tq-pg h3{font-family:var(--body)}.tq-pg a:not(.tq-btn){color:var(--tq-acc)}')
mod=open(D+'teach3/teachx.js',encoding='utf-8').read()
which=sys.argv[1:] or list(CFG)
for realm in which:
    c=CFG[realm];F=R+realm+'/index.html';shutil.copy(F,D+f'teach3/{realm}-before.html')
    s=open(F,encoding='utf-8').read();assert 'const Teach=' not in s and 'TQ_CFG' not in s
    def rep(o,n):
        global s
        assert s.count(o)==1,(realm,o[:70],s.count(o));s=s.replace(o,n)
    cfg={k:c[k] for k in ['tag','name','board','thing','egTitle','units','cat']}
    rep('function route(){','const TQ_CFG='+json.dumps(cfg,ensure_ascii=False)+';\n'+mod+'\nfunction route(){')
    s=s.replace('</style>',css+f'.tq-pg,.tqhome,.tq-ban{{{c["vars"]}}}\n.tqhome{{margin-top:6px;border:2px dashed var(--tq-line);border-radius:20px;padding:22px 24px;display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center;background:var(--tq-surf);color:var(--tq-fg)}}.tqhome .tqhome-ic{{background:var(--tq-acc)}}.tqhome .kk2{{font:700 12px var(--mono);letter-spacing:.14em;color:var(--tq-acc);text-transform:uppercase}}\n@media (max-width:760px){{.tqhome{{grid-template-columns:1fr;padding:18px}}.tqhome .tqhome-ic{{display:none}}.tqhome .tq-btn{{white-space:normal}}}}</style>',1)
    rep('      <section class="about" aria-labelledby="about-h">',f'''      <section class="tqhome" aria-labelledby="tqhome-h">
        <div class="tqhome-ic" aria-hidden="true">🍎</div>
        <div><div class="kk2">For teachers</div><h2 id="tqhome-h">Set {c["name"]} work through Google Classroom</h2><p>{c["card"]}</p></div>
        <div class="tqhome-b"><a class="tq-btn" href="#teachers" style="justify-content:center">Open teacher tools →</a><a class="tq-btn g sm" href="#students" style="justify-content:center">🎓 For students</a></div>
      </section>

      <section class="about" aria-labelledby="about-h">''')
    rep(c['route_old'],'  else if(Teach.handles(h)){show(false);Teach.route(h)}\n'+c['route_old'])
    # score hook in results()
    i=s.index('function results(key,got,max,extra=""){');j=s.index('`;',i)
    body=s[i:j]
    nl=body.index('\n');s=s[:i]+body[:nl]+'\n  const tban=typeof Teach!=="undefined"?Teach.record(location.hash.slice(1),Math.round(max?got/max*100:0)):"";'+body[nl:]+'${tban}'+s[j:]
    rep('var p=location.pathname+h;','var p=location.pathname+(/^#(set|results)=/.test(h)?h.split("=")[0]:h);')
    open(F,'w',encoding='utf-8').write(s);print(realm,'wired',len(c['cat']),'activities')
json.dump({k:CFG[k]['cat'] for k in CFG},open(D+'teach3/catalog_final.json','w'),ensure_ascii=False,indent=0)
