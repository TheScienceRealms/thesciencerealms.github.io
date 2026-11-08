import sys
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
R=[('<span class="rl soon"><span>THE MIND REALM</span><b>PSYCHOLOGY</b><i>Coming soon</i></span>',
    '<a class="rl" href="https://claude.ai/artifact/17JzTr6j3QcqEJLs42DF2t" target="_blank" rel="noopener"><span>THE MIND REALM</span><b>PSYCHOLOGY</b></a>'),
   ('Mrs C Devine</b> and <b>Ms C Barr</b> for','Mrs C Devine</b>, <b>Ms C Barr</b> and <b>Mr J Quigley</b> for'),
   ('is an interactive revision platform for CCEA AS Biology and AS Chemistry.','is an interactive revision platform for CCEA AS Biology, CCEA AS Chemistry and WJEC AS Psychology.'),
   ('CCEA GCE AS Chemistry (Units AS 1 and AS 2). Content is written to match the specifications','CCEA GCE AS Chemistry (Units AS 1 and AS 2), plus WJEC GCE AS Psychology (Units 1 and 2) in The Psycheverse. Content is written to match the specifications'),
   ('not affiliated with or endorsed by CCEA','not affiliated with or endorsed by CCEA or WJEC')]
for f in ['quiztoplasm.html','cq/shell.html']:
    s=open(B+f,encoding='utf-8').read()
    for o,n in R:
        assert s.count(o)==1,(f,o)
        s=s.replace(o,n)
    open(B+f,'w',encoding='utf-8').write(s)
print('ok')
