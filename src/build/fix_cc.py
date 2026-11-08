B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
o1='const step=()=>{const cv=root.querySelector("#ccv");if(!cv||sid!=="cancer")return;S.tick++;'
n1='const step=()=>{if(sid!=="cancer")return;const cv=root.querySelector("#ccv");S.tick++;'
o2='const c=cv.getContext("2d");c.clearRect(0,0,320,200);S.G.forEach('
n2='if(cv){const c=cv.getContext("2d");c.clearRect(0,0,320,200);S.G.forEach('
o3='c.fill()});\n  anim=requestAnimationFrame(step)};step()}'
n3='c.fill()})}\n  anim=requestAnimationFrame(step)};step()}'
for f in ['quiztoplasm.html','build/sims.js','build/sims_as1.js']:
    s=open(B+f,encoding='utf-8').read()
    for o,n in [(o1,n1),(o2,n2),(o3,n3)]:
        assert s.count(o)==1,(f,o[:30]);s=s.replace(o,n)
    open(B+f,'w',encoding='utf-8').write(s)
print('ok')
