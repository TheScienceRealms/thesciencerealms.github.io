import shutil
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/ptable/'
F='/home/user/thesciencerealms.github.io/chemquest/index.html'
shutil.copy(F,D+'chemquest-before.html')
s=open(F,encoding='utf-8').read();assert 'const DataSheet=' not in s
js=open(D+'datasheet.js',encoding='utf-8').read();css=open(D+'datasheet.css',encoding='utf-8').read()
o='window.addEventListener("hashchange",route);'
assert s.count(o)==1
# insert after route() has been called at end of script: find the "route();" call that follows
i=s.index(o);j=s.index('\nroute();',i)+len('\nroute();')
s=s[:j]+'\n'+js+s[j:]
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('wired')
