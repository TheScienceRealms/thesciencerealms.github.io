import os,re,shutil,urllib.parse
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
OUT='/home/user/thesciencerealms.github.io/'
if os.path.isdir(OUT):shutil.rmtree(OUT)
os.makedirs(OUT)
ART={'7zQafH3KN4pFKvkcYsVba5':'/','1bmrq61vRrKWHcCwrQiSLM':'/quiztoplasm/','5jkpgBox9Ey3AnuWFttyVD':'/chemquest/','17JzTr6j3QcqEJLs42DF2t':'/psycheverse/'}
def icon(svg):return 'data:image/svg+xml,'+urllib.parse.quote(svg)
ICON={
 'hub':icon("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#1f3322'/><circle cx='32' cy='32' r='22' fill='#e2bd5a' stroke='#8a6a1c' stroke-width='3'/><path d='M32,17 l4.6,9.4 l10.4,1.3 l-7.6,7.1 l2,10.3 l-9.4,-5.1 l-9.4,5.1 l2,-10.3 l-7.6,-7.1 l10.4,-1.3 z' fill='#fbf8f1'/></svg>"),
 'bio':icon("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#2a1526'/><rect x='10' y='14' width='44' height='36' rx='11' fill='#bbf7d0' stroke='#6abf69' stroke-width='3'/><ellipse cx='36' cy='32' rx='9' ry='7' fill='#7c3aed'/><circle cx='20' cy='24' r='3' fill='#16a34a'/><circle cx='22' cy='40' r='3' fill='#16a34a'/></svg>"),
 'chem':icon("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#10213a'/><path d='M26,10 h12 M28,10 v16 L14,50 a4,4 0 0 0 4,6 h28 a4,4 0 0 0 4,-6 L36,26 V10' fill='none' stroke='#e2e8f0' stroke-width='3.5' stroke-linejoin='round'/><path d='M20,42 h24 l5,9 a3,3 0 0 1 -3,4 h-28 a3,3 0 0 1 -3,-4 z' fill='#38bdf8'/></svg>"),
}
META={
 'hub':('index.html','The Science Realms','Free interactive AS revision for Biology, Chemistry and Psychology, in the style of CCEA and WJEC. Made by a student in Northern Ireland.','hub'),
 'quiztoplasm':('quiztoplasm/index.html','Quiztoplasm','Free interactive AS Biology revision in the style of CCEA: hands-on labs, games, quizzes and notes.','bio'),
 'chemquest':('chemquest/index.html','ChemQuest','Free interactive AS Chemistry revision in the style of CCEA: labs, mechanisms, calculations and notes.','chem'),
 'psycheverse':('psycheverse/index.html','The Psycheverse','Free interactive AS Psychology revision in the style of WJEC: approaches, research methods, debates and notes.',None),
}
SRC={'hub':'science-realms.html','quiztoplasm':'quiztoplasm.html','chemquest':'chemquest.html','psycheverse':'psycheverse.html'}
CREDIT='An educational project by Adrianna Kelly · 2026'
for k,(path,title,desc,ic) in META.items():
    s=open(B+SRC[k],encoding='utf-8').read()
    # links between realms: same site, same tab
    for aid,url in ART.items():
        s=re.sub(r'href="https://claude\.ai/artifact/'+aid+r'"(\s+target="_blank")?(\s+rel="noopener(?: noreferrer)?")?','href="'+url+'"',s)
        s=s.replace('https://claude.ai/artifact/'+aid,url)
    assert 'claude.ai/artifact' not in s,k
    s=s.replace('<meta name="claude:viewport-fit-sides" content="cover">','')
    assert s.count(CREDIT)==1,k
    s=s.replace(CREDIT,CREDIT+' · Independent project, not affiliated with CCEA or WJEC')
    head=('<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
          f'<meta name="description" content="{desc}">\n<meta property="og:title" content="{title}">\n<meta property="og:description" content="{desc}">\n<meta property="og:type" content="website">\n'
          +(f'<link rel="icon" href="{ICON[ic]}">\n' if ic else ''))
    s=head+s.lstrip()
    os.makedirs(os.path.dirname(OUT+path) or OUT,exist_ok=True);open(OUT+path,'w',encoding='utf-8').write(s)
open(OUT+'.nojekyll','w').write('')
# source code needed to rebuild/edit (no screenshots, backups or bundled libraries)
skip=re.compile(r'(\.png|\.jpg|\.bak|bak|\.log|\.pyc)$',re.I)
for d in ['build','cq','psy','realms','chem']:
    for root,dirs,files in os.walk(B+d):
        dirs[:]=[x for x in dirs if x not in ('__pycache__','node_modules')]
        for f in files:
            if skip.search(f) or f.startswith('_'):continue
            rel=os.path.relpath(os.path.join(root,f),B);dst=OUT+'src/'+rel;os.makedirs(os.path.dirname(dst),exist_ok=True);shutil.copy(os.path.join(root,f),dst)
for f in ['quiztoplasm.html','chemquest.html','psycheverse.html','science-realms.html','spec-as.txt','spec-chem.txt']:
    if os.path.exists(B+f):os.makedirs(OUT+'src/artifact-versions',exist_ok=True);shutil.copy(B+f,OUT+'src/artifact-versions/'+f) if f.endswith('.html') else shutil.copy(B+f,OUT+'src/'+f)
open(OUT+'README.md','w',encoding='utf-8').write('''# The Science Realms

Free interactive AS revision for **Biology**, **Chemistry** and **Psychology**, in the style of the CCEA (Biology, Chemistry) and WJEC (Psychology) AS specifications. Hands-on labs, games, quizzes and notes.

**Live site:** https://thesciencerealms.github.io

| Realm | Subject | Page |
|---|---|---|
| The Science Realms | Home | `index.html` |
| Quiztoplasm | AS Biology (CCEA style) | `quiztoplasm/index.html` |
| ChemQuest | AS Chemistry (CCEA style) | `chemquest/index.html` |
| The Psycheverse | AS Psychology (WJEC style) | `psycheverse/index.html` |

An educational project by Adrianna Kelly · 2026.
Independent project, not affiliated with or endorsed by CCEA or WJEC. All questions are original.

## How the site is built

Each realm is one self-contained HTML page (no server needed). The `src/` folder holds the working files used to build and edit them:

- `src/build/` – Quiztoplasm lab and game modules (`sims*.js`, `*.css`), patch scripts and Playwright play-through tests (`t*.js`).
- `src/cq/` – ChemQuest modules; `build.py` assembles them.
- `src/psy/` – Psycheverse data, notes and app; `build.py` assembles them.
- `src/realms/` – the Science Realms home page.
- `src/artifact-versions/` – the pages as published on claude.ai before moving here.

To change something, open a Claude Code session with this repository and describe the change.
''')
total=sum(os.path.getsize(os.path.join(r,f)) for r,_,fs in os.walk(OUT) for f in fs)
print('site ready',round(total/1e6,1),'MB')
