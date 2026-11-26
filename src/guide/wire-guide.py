import json,re,shutil
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/chars/'
F='/home/user/thesciencerealms.github.io/psycheverse/index.html'
shutil.copy(F,D+'psycheverse-before-guide.html')
s=open(F,encoding='utf-8').read();assert 'const Guide=' not in s
art={}
for who in ['quigley','byrne']:
    art[who]={}
    for pose in ['stand','explain','confused','excited']:
        v=open(f'{D}poses/{who}-{pose}.svg',encoding='utf-8').read()
        v=re.sub(r'<svg [^>]*>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 560" aria-hidden="true" focusable="false">',v,count=1)
        # make gradient/pattern ids unique to the guide
        v=re.sub(r'id="([^"]+)"',lambda m:f'id="tg-{m.group(1)}"',v)
        v=re.sub(r'url\(#([^)]+)\)',lambda m:f'url(#tg-{m.group(1)})',v)
        art[who][pose]=v
js=open(D+'guide-psy.js',encoding='utf-8').read().replace('__GUIDE_ART__',json.dumps(art))
css=open(D+'guide-psy.css',encoding='utf-8').read()
o='\nroute();\n</script>'
assert s.count(o)==1
s=s.replace(o,'\nroute();\n'+js+'\n</script>')
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('wired',len(js)//1024,'KB')
