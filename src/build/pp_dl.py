import json,re,subprocess,os,sys
D='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/wjec-pp/'
rows=json.load(open(D+'pp-list.json'))
os.makedirs(D+'pdf',exist_ok=True)
got=[]
for y,ser,kind,name,url in rows:
    if kind not in ('Past Paper','Mark Scheme'): continue
    m=re.search(r'Unit (1|2)\b',name)
    if not m: continue
    fn=f"{y}-U{m.group(1)}-{'MS' if kind=='Mark Scheme' else 'QP'}.pdf"
    out=D+'pdf/'+fn
    r=subprocess.run(['curl','-sS','-L','-A','Mozilla/5.0','-o',out,'-w','%{http_code}',url.replace(' ','%20')],capture_output=True,text=True)
    ok=r.stdout.strip()=='200' and os.path.getsize(out)>5000
    got.append((fn,r.stdout.strip(),os.path.getsize(out) if os.path.exists(out) else 0))
    if ok: subprocess.run(['pdftotext','-layout',out,out[:-4]+'.txt'],capture_output=True)
for g in got: print(*g)
