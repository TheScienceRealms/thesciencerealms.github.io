import json,datetime
R='/home/user/thesciencerealms.github.io/'
U='https://thesciencerealms.github.io/'
P={
 'index.html':dict(url=U,img=U+'img/share.jpg',
   title='The Science Realms | Free CCEA & WJEC AS Biology, Chemistry and Psychology revision',
   desc='Free interactive AS revision for CCEA Biology, CCEA Chemistry and WJEC Psychology: over 300 hands-on labs, games, quizzes, notes and model essays. Made by a student in Northern Ireland.',
   ld={"@context":"https://schema.org","@type":"WebSite","name":"The Science Realms","url":U,"inLanguage":"en-GB",
       "description":"Free interactive AS revision for CCEA Biology, CCEA Chemistry and WJEC Psychology.",
       "creator":{"@type":"Person","name":"Adrianna Kelly"}}),
 'quiztoplasm/index.html':dict(url=U+'quiztoplasm/',img=U+'quiztoplasm/img/share.jpg',
   title='Quiztoplasm | Free CCEA AS Biology revision: labs, games and quizzes',
   desc='Free CCEA AS Biology revision: 23 hands-on labs, games, quick-fire quizzes and notes for every AS1 and AS2 topic, from food tests and meiosis to Simpson’s index.',
   ld={"@context":"https://schema.org","@type":"LearningResource","name":"Quiztoplasm: CCEA AS Biology revision","url":U+'quiztoplasm/',
       "educationalLevel":"AS level","teaches":"CCEA GCE AS Biology","inLanguage":"en-GB","isAccessibleForFree":True,"learningResourceType":["interactive resource","quiz","practice exercise"],
       "isPartOf":{"@type":"WebSite","name":"The Science Realms","url":U},"creator":{"@type":"Person","name":"Adrianna Kelly"}}),
 'chemquest/index.html':dict(url=U+'chemquest/',img=U+'chemquest/img/share.jpg',
   title='ChemQuest | Free CCEA AS Chemistry revision: practicals, mechanisms and quizzes',
   desc='Free CCEA AS Chemistry revision: topic quizzes, definition games, practicals, reaction mechanisms, titration and Hess’s law labs, and notes for every AS1 and AS2 topic.',
   ld={"@context":"https://schema.org","@type":"LearningResource","name":"ChemQuest: CCEA AS Chemistry revision","url":U+'chemquest/',
       "educationalLevel":"AS level","teaches":"CCEA GCE AS Chemistry","inLanguage":"en-GB","isAccessibleForFree":True,"learningResourceType":["interactive resource","quiz","practice exercise"],
       "isPartOf":{"@type":"WebSite","name":"The Science Realms","url":U},"creator":{"@type":"Person","name":"Adrianna Kelly"}}),
 'psycheverse/index.html':dict(url=U+'psycheverse/',img=U+'psycheverse/img/share.jpg',
   title='The Psycheverse | Free WJEC AS Psychology revision: approaches, debates and model essays',
   desc='Free WJEC AS Psychology revision: the five approaches, therapies, classic studies, research methods, contemporary debates with model essays, quizzes and answer builders.',
   ld={"@context":"https://schema.org","@type":"LearningResource","name":"The Psycheverse: WJEC AS Psychology revision","url":U+'psycheverse/',
       "educationalLevel":"AS level","teaches":"WJEC AS Psychology","inLanguage":"en-GB","isAccessibleForFree":True,"learningResourceType":["interactive resource","quiz","practice exercise"],
       "isPartOf":{"@type":"WebSite","name":"The Science Realms","url":U},"creator":{"@type":"Person","name":"Adrianna Kelly"}}),
}
for f,c in P.items():
    s=open(R+f,encoding='utf-8').read()
    if 'rel="canonical"' in s:print('skip',f);continue
    esc=lambda t:t.replace('&','&amp;').replace('"','&quot;')
    import re
    s=re.sub(r'<title>[^<]*</title>','<title>'+esc(c['title'])+'</title>',s,count=1)
    s=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="'+esc(c['desc'])+'">',s,count=1)
    s=re.sub(r'<meta property="og:description" content="[^"]*">','<meta property="og:description" content="'+esc(c['desc'])+'">',s,count=1)
    add=(f'<link rel="canonical" href="{c["url"]}">\n<meta property="og:url" content="{c["url"]}">\n<meta property="og:image" content="{c["img"]}">\n'
         f'<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:site_name" content="The Science Realms">\n<meta property="og:locale" content="en_GB">\n'
         f'<meta name="twitter:card" content="summary_large_image">\n<meta name="robots" content="index, follow">\n'
         f'<script type="application/ld+json">{json.dumps(c["ld"],ensure_ascii=False)}</script>\n')
    assert s.count('<meta property="og:type" content="website">')==1
    s=s.replace('<meta property="og:type" content="website">','<meta property="og:type" content="website">\n'+add.rstrip('\n'),1)
    if f=='chemquest/index.html':
        o='<div class="logo" role="img" aria-label="ChemQuest">'
        assert s.count(o)==1
        s=s.replace(o,'<h1 class="tq-sr">ChemQuest: CCEA AS Chemistry revision</h1>'+o,1)
        s=s.replace('</style>','.tq-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}</style>',1)
    open(R+f,'w',encoding='utf-8').write(s);print('updated',f)
today=datetime.date.today().isoformat()
open(R+'sitemap.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{c["url"]}</loc><lastmod>{today}</lastmod></url>\n' for c in P.values())+'</urlset>\n')
open(R+'robots.txt','w').write('User-agent: *\nAllow: /\nDisallow: /src/\n\nSitemap: '+U+'sitemap.xml\n')
print('sitemap + robots written')
