import re
S='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
BIO='https://claude.ai/artifact/1bmrq61vRrKWHcCwrQiSLM'; CHEM='https://claude.ai/artifact/5jkpgBox9Ey3AnuWFttyVD'
def realms(here):
    def item(key,realm,subj,url):
        cur=' aria-current="page"' if key==here else ''
        if url: return f'<a class="rl{" cur" if key==here else ""}" href="{url}" target="_blank" rel="noopener"{cur}><span>{realm}</span><b>{subj}</b></a>'
        return f'<span class="rl soon"><span>{realm}</span><b>{subj}</b><i>Coming soon</i></span>'
    return '<div class="realms">'+item('bio','THE LIVING REALM','BIOLOGY',BIO)+item('chem','THE ATOMIC REALM','CHEMISTRY',CHEM)+item('psy','THE MIND REALM','PSYCHOLOGY',None)+'</div>'
CSS={'bio':'''.realms{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0}
.rl{display:grid;gap:1px;text-decoration:none;border:1.5px solid var(--line);border-radius:10px;padding:6px 12px;background:var(--surface)}
.rl span{font:700 10.5px var(--mono);letter-spacing:.12em;color:var(--muted)} .rl b{font:700 14px var(--body);letter-spacing:.06em;color:var(--fg)}
.rl:hover{border-color:var(--gold)} .rl.cur{border-color:var(--green);background:var(--gold-soft)} .rl.cur b{color:var(--green)}
.rl.soon{opacity:.7} .rl i{font:500 10px var(--mono);color:var(--muted);font-style:normal}
''','chem':'''.realms{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0}
.rl{display:grid;gap:1px;text-decoration:none;border:1.5px solid rgba(76,201,240,.45);border-radius:10px;padding:6px 12px;background:rgba(11,37,69,.55)}
.rl span{font:700 10.5px var(--mono);letter-spacing:.12em;color:#9cc9e3} .rl b{font:700 14px var(--body);letter-spacing:.06em;color:#fff}
.rl:hover{border-color:var(--yellow)} .rl.cur{border-color:var(--yellow)} .rl.cur b{color:var(--yellow)}
.rl.soon{opacity:.65} .rl i{font:500 10px var(--mono);color:#9cc9e3;font-style:normal}
'''}
for fn,key in [(S+'quiztoplasm.html','bio'),(S+'cq/shell.html','chem')]:
    s=open(fn,encoding='utf-8').read()
    s,n=re.subn(r'<div class="realm-s">.*?</div>(?=<div class="realm-m">)',lambda m:realms(key),s,flags=re.S);assert n==1,(fn,n)
    s=s.replace('/* brand */','/* brand */\n'+CSS[key],1)
    if key=='bio':
        assert s.count('The Living Frontier')==2; s=s.replace('The Living Frontier','The Natural Frontier')
    else:
        assert s.count('The Molecular Realm')==1; s=s.replace('The Molecular Realm','The Molecular Frontier')
    open(fn,'w',encoding='utf-8').write(s)
d=open(S+'cq/data.js',encoding='utf-8').read();assert d.count('The Molecular Realm')==1
open(S+'cq/data.js','w',encoding='utf-8').write(d.replace('The Molecular Realm','The Molecular Frontier'))
print('ok')
