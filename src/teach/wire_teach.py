import shutil
F='/home/user/thesciencerealms.github.io/quiztoplasm/index.html'
B='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/teach2/'
shutil.copy(F,B+'quiztoplasm-before-teach.html')
s=open(F,encoding='utf-8').read()
assert 'const Teach=' not in s
js=open(B+'teach.js',encoding='utf-8').read()
js=js.replace('const minutes={};','const minutes={food:10,chroma:10,enzyme:8,fick:6,oxygen:8,molarch:12,cell3d:8,vesicle:8,membrane:12,meiosis:12,cancer:10,leaf:9,resp:9,root:7,transp:10,phloem:8,clot:6,field:10,niche:8,simpson:10,eutro:5,bod:7,consv:7};')
css=open(B+'teach.css',encoding='utf-8').read()
def rep(old,new,count=1):
    global s
    assert s.count(old)==count,(old[:60],s.count(old));s=s.replace(old,new)
# 1. module before goBack
rep('function goBack(){',js+'\nfunction goBack(){')
# 2. css
s=s.replace('</style>',css+'</style>',1)
# 3. page container after simwrap
rep('''      <section class="panel" id="sim"></section>
    </div>
  </div>''','''      <section class="panel" id="sim"></section>
    </div>
  </div>
  <div id="teachwrap" hidden>
    <div style="display:grid;gap:18px">
      <div class="gamebar"><h2 id="teach-title">For teachers</h2><a class="home-link" id="teach-back" href="#">← <b>Home</b></a></div>
      <section class="panel" id="teach"></section>
    </div>
  </div>''')
# 4. home card under the world cards
rep('      <section class="about" aria-labelledby="about-h">','''      <section class="tqhome" aria-labelledby="tqhome-h">
        <div class="tqhome-ic" aria-hidden="true">🍎</div>
        <div><div class="kicker">For teachers</div><h2 id="tqhome-h">Set Quiztoplasm work through Google Classroom</h2>
          <p>Pick labs, share one link with your class, then see everyone’s results in one grid. No accounts, and no student data leaves your school’s systems.</p></div>
        <div class="tqhome-b"><a class="play" href="#teachers">Open teacher tools →</a><a class="tq-btn g sm" href="#students" style="justify-content:center">🎓 For students</a></div>
      </section>

      <section class="about" aria-labelledby="about-h">''')
# 5. routing
rep('["hub","worldwrap","runwrap","labwrap","gamewrap","noteswrap","simwrap"]','["hub","worldwrap","runwrap","labwrap","gamewrap","noteswrap","simwrap","teachwrap"]')
rep('  else{show("hub");renderHub()}','''  else if(["teachers","students","teach-new","results"].includes(h)||/^(results|set)=/.test(h)){show("teachwrap");Teach.route(h)}
  else{show("hub");renderHub()}''')
# 6. labs report their score to the assignment
old='function results(got,max,extra=""){const pct=max?Math.round(got/max*100):0,k="sim-"+sid,prev=store.get(k),isBest=pct>prev;if(isBest)store.set(k,pct);'
rep(old,old+'const tban=typeof Teach!=="undefined"?Teach.record(sid,pct):"";')
old2='<div class="row"><button class="primary" data-act="again">Play again</button></div>`}'
i=s.index(old.split('const pct')[0]);j=s.index(old2,i)
s=s[:j]+'<div class="row"><button class="primary" data-act="again">Play again</button></div>${tban}`}'+s[j+len(old2):]
# 7. analytics: don't record assignment payloads as separate pages
rep('var p=location.pathname+h;','var p=location.pathname+(/^#(set|results)=/.test(h)?h.split("=")[0]:h);')
open(F,'w',encoding='utf-8').write(s);print('wired',len(s))
