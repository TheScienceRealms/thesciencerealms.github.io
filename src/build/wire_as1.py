import shutil,re
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
shutil.copy(B+'quiztoplasm.html',B+'build/quiztoplasm-v21.bak')
mod=open(B+'build/sims_as1.js',encoding='utf-8').read()
css=open(B+'build/sims_as1.css',encoding='utf-8').read()
reg_old=' oxygen:{title:"Oxygen Delivery Simulator",topic:"h",blurb:"Dissociation curves, the Bohr effect and myoglobin.",start:oxStart,act:oxAct}};'
reg_new=reg_old[:-2]+''',
 molarch:{title:"Molecular Architect",topic:"m",blurb:"Build and break carbohydrates, lipids and proteins.",start:maStart,act:maAct},
 cell3d:{title:"3D Cell Explorer",topic:"c",blurb:"Rotate animal, plant and prokaryotic cells and find the organelles.",start:c3Start,act:c3Act},
 vesicle:{title:"Vesicle Voyage",topic:"c",blurb:"Follow a protein from the nucleus to exocytosis, then phagocytosis.",start:vvStart,act:vvAct},
 membrane:{title:"Membrane Crossing",topic:"p",blurb:"Fluid mosaic model, transport routes and water potential.",start:mcStart,act:mcAct},
 meiosis:{title:"Meiosis Mission",topic:"d",blurb:"Pair homologues, cross over, assort and make gametes.",start:mmStart,act:mmAct},
 cancer:{title:"Cancer Cell Crisis",topic:"d",blurb:"The cell cycle, lost checkpoints and anticancer drugs.",start:ccStart,act:ccAct},
 leaf:{title:"Leaf Anatomy Explorer",topic:"t",blurb:"Identify leaf tissues, their functions and stomata by day and night.",start:lfStart,act:lfAct}};'''
def patch(s):
    assert s.count(reg_old)==1
    assert 'function maStart' not in s
    s=s.replace(reg_old,reg_new)
    i=s.index('const SIMS={');s=s[:i]+mod+'\n'+s[i:]
    return s
j=open(B+'build/sims.js',encoding='utf-8').read();open(B+'build/sims.js','w',encoding='utf-8').write(patch(j))
h=open(B+'quiztoplasm.html',encoding='utf-8').read();h=patch(h)
h=h.replace('</style>',css+'</style>',1)
open(B+'quiztoplasm.html','w',encoding='utf-8').write(h)
# clash audit: every class used in the new module vs rules in the ORIGINAL page css
old=open(B+'build/old19.html',encoding='utf-8').read();oc=old[old.index('<style'):old.index('</style>')]
used=set()
for m in re.finditer(r'class="([^"$]*)',mod):used.update(m.group(1).split())
for m in re.finditer(r'class="[^"]*\$\{[^}]*\?"([^"]*)"',mod):used.update(m.group(1).split())
used.update(['sel','hl','fr','ext','gl','in','out','b0','b1','b2','b3','b4','G1','S','G2','M','G0','on'])
print('shared with page css:',sorted(k for k in used if re.search(r'\.'+re.escape(k)+r'(?![\w-])',oc)))
