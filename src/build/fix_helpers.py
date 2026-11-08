B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
head='const root=$$("#sim");let S=null,anim=null,sid=null;'
good=head+'const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};const esc=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;"}[c]));\n'
for f in [B+'quiztoplasm.html',B+'build/sims.js']:
    s=open(f,encoding='utf-8').read()
    a=s.index(head);b=s.index('\n',a)
    # the head line in sims.js originally ended right after head; find the original first statement after head on the same line
    line=s[a:b]
    rest=line[line.index('const best='):] if 'const best=' in line else ''
    s=s[:a]+good+(rest if rest else '')+s[b:]
    open(f,'w',encoding='utf-8').write(s)
print('ok')
