import re,glob,os
D='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/wjec-pp/pdf/'
out=[]
for f in sorted(glob.glob(D+'*-QP.txt')):
    t=open(f,encoding='utf-8',errors='ignore').read()
    t=re.sub(r'©.*|Turn over|\(\d{4}U\d+-\d\)|PMT','',t)
    lines=[re.sub(r'\s+',' ',l).strip() for l in t.split('\n')]
    lines=[l for l in lines if l]
    out.append('### '+os.path.basename(f)[:-4])
    buf=''
    for l in lines:
        buf=(buf+' '+l).strip()
        if re.search(r'\[\d+\]\s*$',l):
            q=buf
            if len(q)>12 and not q.lower().startswith('total'):
                out.append('  '+q[-230:])
            buf=''
        elif len(buf)>1200: buf=buf[-600:]
open(D+'../question-index.txt','w',encoding='utf-8').write('\n'.join(out))
print(len(out))
