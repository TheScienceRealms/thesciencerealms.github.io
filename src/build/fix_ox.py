B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
o='<text x="165" y="190" class="mbt" text-anchor="middle">pO₂ / kPa</text>'
for f in [B+'quiztoplasm.html',B+'build/sims.js']:
    s=open(f,encoding='utf-8').read();assert s.count(o)==1
    i=s.index(o);j=s.rindex('<svg viewBox="0 0 300 190"',0,i);assert i-j<4000
    s=s[:j]+'<svg viewBox="0 0 300 200"'+s[j+len('<svg viewBox="0 0 300 190"'):]
    s=s.replace(o,o.replace('y="190"','y="194"'))
    open(f,'w',encoding='utf-8').write(s)
print('ok')
