import json
base='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
shell=open(base+'cq/shell.html',encoding='utf-8').read()
font=open(base+'cq/bpmol.b64').read().strip()
defs=json.load(open(base+'chem/definitions.json',encoding='utf-8'))
defs={k:defs[k] for k in ('AS1','AS2')}
tiles=[('C','Curiosium','12.07'),('H','Heartium','8.31'),('E','Effortium','5.62'),('M','Masterium','13.44'),('Q','Questium','17.09'),('U','Unstoppium','21.58'),('E','Energium','5.26'),('S','Successium','19.73'),('T','Triumphium','20.15')]
cells=[f'<div class="el{" q" if i>=4 else ""}" aria-hidden="true"><span class="n">{i+1}</span><span class="m">{m}</span><span class="s">{s}</span><span class="w">{w}</span></div>' for i,(s,w,m) in enumerate(tiles)]
th='<div class="word">'+''.join(cells[:4])+'</div><div class="word">'+''.join(cells[4:])+'</div>'
data=open(base+'cq/data.js',encoding='utf-8').read().replace('/*@@DEFS@@*/',json.dumps(defs,ensure_ascii=False))
app=open(base+'cq/app.js',encoding='utf-8').read()+'\n'+open(base+'cq/ionic.js',encoding='utf-8').read()+'\n'+open(base+'cq/shapes.js',encoding='utf-8').read()+'\n'+open(base+'cq/polar.js',encoding='utf-8').read()+'\n'+open(base+'cq/bank.js',encoding='utf-8').read()+'\n'+open(base+'cq/notes.js',encoding='utf-8').read()+'\n'+open(base+'cq/realm.js',encoding='utf-8').read()+'\n'+open(base+'cq/realm2.js',encoding='utf-8').read()+'\n'+open(base+'cq/realm3.js',encoding='utf-8').read()+'\n'+open(base+'cq/realm5.js',encoding='utf-8').read()+'\nroute();'
out=shell.replace('/*@@FONT@@*/',font).replace('/*@@TILES@@*/',th).replace('/*@@SCRIPT@@*/',data+'\n'+app)
open(base+'chemquest.html','w',encoding='utf-8').write(out)
print(len(out))
