import os
d=os.path.dirname(os.path.abspath(__file__))+'/'
r=lambda f:open(d+f,encoding='utf-8').read()
js='\n'.join(r(f) for f in ['data1.js','data2.js','data3.js','data4.js','notes.js','app.js'])+'\nroute();'
out=r('shell.html').replace('/*@@FONT@@*/',r('sb.b64').strip()).replace('/*@@SCRIPT@@*/',js)
open(d+'../psycheverse.html','w',encoding='utf-8').write(out);print(len(out))
