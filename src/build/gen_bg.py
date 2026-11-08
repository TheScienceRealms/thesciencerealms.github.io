"""Seamless plant-cell tile: jittered honeycomb whose lattice AND jitter are periodic in (W,H)."""
import math,re,urllib.parse,shutil,sys
W,H=480,400;COLS,ROWS=4,4;cw=W/COLS;rh=H/ROWS;a=26  # cell width, row height, hex peak
def h(x,y,s):  # deterministic periodic pseudo-random in [-1,1]
    x=round(x)%W;y=round(y)%H;v=math.sin(x*12.9898+y*78.233+s*37.719)*43758.5453;return (v-math.floor(v))*2-1
def J(x,y):return (round(x+h(x,y,1)*14,1),round(y+h(x,y,2)*11,1))
edges=set();lines=[];nuc=[]
for r in range(-1,ROWS+1):
    for c in range(-1,COLS+1):
        x0=c*cw+(r%2)*cw/2;y0=r*rh
        P=[(x0,y0+a),(x0+cw/2,y0),(x0+cw,y0+a),(x0+cw,y0+rh),(x0+cw/2,y0+rh+a),(x0,y0+rh)]
        Q=[J(*p) for p in P]
        for i in range(6):
            p,q=Q[i],Q[(i+1)%6];k=tuple(sorted([p,q]))
            if k in edges:continue
            edges.add(k)
            if max(p[0],q[0])<-15 or min(p[0],q[0])>W+15 or max(p[1],q[1])<-15 or min(p[1],q[1])>H+15:continue
            lines.append(f'M{p[0]},{p[1]}L{q[0]},{q[1]}')
        cx,cy=x0+cw/2,y0+rh/2+a/2
        nx,ny=cx+h(cx,cy,3)*18,cy+h(cx,cy,4)*13;rr=11+round((h(cx,cy,5)+1))
        if -20<nx<W+20 and -20<ny<H+20 and h(cx,cy,6)>-0.35:nuc.append((round(nx,1),round(ny,1),rr,h(cx,cy,7)>0.55))
svg=(f"<svg xmlns='http://www.w3.org/2000/svg' width='{W}' height='{H}'><path fill='none' stroke='#5aa8ff' stroke-opacity='.17' stroke-width='2' stroke-linejoin='round' stroke-linecap='round' d='{''.join(lines)}'/>"
     f"<g fill='#9b6bff' fill-opacity='.16'>{''.join(f'<circle cx={chr(39)}{x}{chr(39)} cy={chr(39)}{y}{chr(39)} r={chr(39)}{r}{chr(39)}/>' for x,y,r,_ in nuc)}</g>"
     f"<g fill='#d0c0ff' fill-opacity='.45'>{''.join(f'<circle cx={chr(39)}{x+2}{chr(39)} cy={chr(39)}{y-2}{chr(39)} r={chr(39)}3{chr(39)}/>' for x,y,r,d in nuc if d)}</g></svg>")
enc=urllib.parse.quote(svg,safe='')
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
if len(sys.argv)>1 and sys.argv[1]=='apply':
    f=B+'quiztoplasm.html';shutil.copy(f,B+'build/quiztoplasm-v23pre-bg.bak');s=open(f,encoding='utf-8').read()
    m=re.search(r'(html body\{background-image:url\("data:image/svg\+xml,)(.*?)("\))',s,re.S);assert m
    s=s[:m.start(2)]+enc+s[m.end(2):];open(f,'w',encoding='utf-8').write(s);print('applied',len(lines),'edges',len(nuc),'nuclei')
else:
    open(B+'build/bgtile.svg','w').write(svg);print('written',len(lines),len(nuc))
