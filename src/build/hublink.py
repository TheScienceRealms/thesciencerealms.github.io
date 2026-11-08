import re
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
HUB='https://claude.ai/artifact/7zQafH3KN4pFKvkcYsVba5'
SITES={'quiztoplasm.html':('Quiztoplasm','CCEA AS Biology'),'cq/shell.html':('ChemQuest','CCEA AS Chemistry'),'psy/shell.html':('The Psycheverse','WJEC AS Psychology')}
for f,(name,subj) in SITES.items():
    s=open(B+f,encoding='utf-8').read()
    o='<div class="realm-k">THE SCIENCE REALMS</div>'
    assert s.count(o)==1,f
    s=s.replace(o,f'<a class="realm-k" href="{HUB}" target="_blank" rel="noopener" style="text-decoration:none">THE SCIENCE REALMS ↗</a>')
    a=s.index('aria-labelledby="about-h"');st=s.rindex('<section',0,a);en=s.index('</section>',a)
    sec=s[st:en]
    hg=sec.index('<h3>How the games help</h3>')
    lst=sec[hg:]
    lst=re.sub(r'<p class="small muted">The Science Realms is an independent.*?</p>','',lst,flags=re.S)
    new=(sec[:sec.index('<h2')]+'<h2 id="about-h">About The Science Realms</h2>\n'
         f'<p><b>{name}</b> is part of <b>The Science Realms</b>, an interactive revision platform I created and developed during my 2026–2027 gap year. It covers CCEA AS Biology, CCEA AS Chemistry and WJEC AS Psychology. This site is the {subj} realm.</p>\n'
         f'<p><a href="{HUB}" target="_blank" rel="noopener" style="font-weight:700">Read about the project and visit all three realms ↗</a></p>\n'
         +lst+'\n<p class="small muted">The Science Realms is an independent educational project and is not affiliated with or endorsed by CCEA or WJEC.</p>')
    s=s[:st]+new+s[en:]
    open(B+f,'w',encoding='utf-8').write(s)
    print(f,'ok')
