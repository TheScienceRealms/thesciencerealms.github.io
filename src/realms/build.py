B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
s=open(B+'realms/hub.html',encoding='utf-8').read().replace('/*@@SB@@*/',open(B+'psy/sb.b64').read().strip())
open(B+'science-realms.html','w',encoding='utf-8').write(s);print(len(s))
