import shutil,re
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
shutil.copy(B+'quiztoplasm.html',B+'build/quiztoplasm-v20.bak')
css_old=['.rack,.bench{','.paper{fill:#fffdf5']
css_new=['.rack,.simbench{','.chpaper{fill:#fffdf5']
def fix_js(t):
    t=t.replace('class="bench rack"','class="simbench rack"')
    t=t.replace('class="paper"','class="chpaper"')
    return t
s=open(B+'quiztoplasm.html',encoding='utf-8').read()
for a,b in zip(css_old,css_new):
    assert s.count(a)==1,a;s=s.replace(a,b)
a=s.index('const Sims=(()=>{');b=s.index('function goBack(){')
seg=s[a:b];print('bench',seg.count('class="bench rack"'),'paper',seg.count('class="paper"'))
s=s[:a]+fix_js(seg)+s[b:]
open(B+'quiztoplasm.html','w',encoding='utf-8').write(s)
j=open(B+'build/sims.js',encoding='utf-8').read();open(B+'build/sims.js','w',encoding='utf-8').write(fix_js(j))
c=open(B+'build/sims.css',encoding='utf-8').read()
for x,y in zip(css_old,css_new):c=c.replace(x,y)
open(B+'build/sims.css','w',encoding='utf-8').write(c)
# check ileum (in Games) didn't use these classes with sims css meaning
il=open(B+'build/ileum.js',encoding='utf-8').read();print('ileum uses bench/paper:','bench' in il,'"paper' in il)
# list every sims.css class that also exists elsewhere in the original page CSS
old=open(B+'build/old19.html',encoding='utf-8').read()
oldcss=old[old.index('<style'):old.index('</style>')]
cls=set(re.findall(r'\.([a-zA-Z][\w-]*)',c))
print('still shared with page css:',sorted(k for k in cls if re.search(r'\.'+re.escape(k)+r'(?![\w-])',oldcss)))
