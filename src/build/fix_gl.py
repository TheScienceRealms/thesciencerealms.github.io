B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
for f in ['quiztoplasm.html','build/sims.js','build/sims_as1.js','build/sims_as1.css']:
    s=open(B+f,encoding='utf-8').read()
    s=s.replace('class="mc-head gl"','class="mc-head mc-gl"').replace('.mc-head.gl{','.mc-head.mc-gl{')
    open(B+f,'w',encoding='utf-8').write(s)
print('ok')
