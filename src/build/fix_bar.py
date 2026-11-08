B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
o='.bar{height:10px;background:var(--line);border-radius:6px;overflow:hidden} .bar i{'
n='.simbar{height:10px;background:var(--line);border-radius:6px;overflow:hidden} .simbar i{'
def fj(t):return t.replace('class="bar"','class="simbar"')
s=open(B+'quiztoplasm.html',encoding='utf-8').read();assert s.count(o)==1;s=s.replace(o,n)
a=s.index('const Sims=(()=>{');b=s.index('function goBack(){');seg=s[a:b];print('bar uses',seg.count('class="bar"'))
s=s[:a]+fj(seg)+s[b:];open(B+'quiztoplasm.html','w',encoding='utf-8').write(s)
j=open(B+'build/sims.js',encoding='utf-8').read();open(B+'build/sims.js','w',encoding='utf-8').write(fj(j))
c=open(B+'build/sims.css',encoding='utf-8').read();assert o in c;open(B+'build/sims.css','w',encoding='utf-8').write(c.replace(o,n))
print('ok')
