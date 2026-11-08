import shutil
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
shutil.copy(B+'quiztoplasm.html',B+'build/quiztoplasm-v20pre.bak')
head='const root=$$("#sim");let S=null,anim=null,sid=null;'
add='const store={get(k){try{return +localStorage.getItem(k)||0}catch(e){return 0}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};'
for f in [B+'quiztoplasm.html',B+'build/sims.js']:
    s=open(f,encoding='utf-8').read();assert s.count(head)==1
    if add not in s[s.index(head):s.index(head)+400]:
        s=s.replace(head,head+add)
    open(f,'w',encoding='utf-8').write(s)
print('ok')
