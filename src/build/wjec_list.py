import re,html,sys
s=open(sys.argv[1],encoding='utf-8',errors='ignore').read()
parts=s.split('ResourceSingle.aspx?rIid=')[1:]
seen={}
for p in parts:
    m=re.match(r'(\d+)',p);rid=m.group(1)
    chunk=re.sub(r"title='[^']*'",'',p[:3000])
    txt=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',chunk))).strip()
    txt=re.sub(r"^\d+['\"]>",'',txt).strip()
    if rid not in seen and txt: seen[rid]=txt[:90]
for k,v in seen.items(): print(k,'|',v)
