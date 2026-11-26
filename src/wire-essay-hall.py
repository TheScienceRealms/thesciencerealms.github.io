import shutil,re
R='/home/user/thesciencerealms.github.io/'
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/eh/'
F=R+'quiztoplasm/index.html'
shutil.copy(F,D+'quiztoplasm-before-eh.html')
s=open(F,encoding='utf-8').read();assert 'const EH=' not in s
def rep(a,b,txt=None):
    global s
    t=s if txt is None else txt
    assert t.count(a)==1,(a[:70],t.count(a))
    t=t.replace(a,b)
    if txt is None: s=t
    return t
# ---- prion: mad cow disease (same edits in src/prion.js) ----
P=[('<b>BSE</b>, Bovine Spongiform Encephalopathy (cattle), in animals. <b>CJD</b>, Creutzfeldt–Jakob Disease, in humans."]',
    '<b>BSE</b>, Bovine Spongiform Encephalopathy, better known as <b>“mad cow disease”</b> (cattle), in animals. <b>CJD</b>, Creutzfeldt–Jakob Disease, in humans. A form called <b>variant CJD (vCJD)</b> has been linked to eating beef products from cattle with BSE."]'),
   ('["What does BSE stand for, and which animal does it affect?","Bovine Spongiform Encephalopathy, in cattle"]',
    '["What does BSE stand for, and which animal does it affect?","Bovine Spongiform Encephalopathy, in cattle"],["What is the common name for BSE?","Mad cow disease"]'),
   ('"Each abnormal prion converts more normal prions, so the damage builds up."]];',
    '"Each abnormal prion converts more normal prions, so the damage builds up."],\n ["What is ‘mad cow disease’?","BSE, a prion disease of cattle",["A viral infection of cattle","A bacterial disease of sheep","CJD in humans"],"Mad cow disease is the common name for BSE (Bovine Spongiform Encephalopathy). Eating infected beef products has been linked to variant CJD (vCJD) in humans."]];')]
pj=open(R+'src/prion.js',encoding='utf-8').read()
for a,b in P: rep(a,b); pj=rep(a,b,pj)
open(R+'src/prion.js','w',encoding='utf-8').write(pj)
rep('Linked to scrapie, BSE and CJD.</p>','Linked to scrapie, BSE (“mad cow disease”) and CJD.</p>')
# ---- essay hall ----
data=open(R+'src/essays-games.js',encoding='utf-8').read()+open(R+'src/essay-hall.js',encoding='utf-8').read()
rep('\nfunction goBack(){',data+'\nfunction goBack(){')
rep('"simwrap","teachwrap"].forEach','"simwrap","teachwrap","essaywrap"].forEach')
rep('  else if(["teachers","students","teach-new","results"].includes(h)','  else if(EH.ok(h)){show("essaywrap");EH.route(h)}\n  else if(["teachers","students","teach-new","results"].includes(h)')
rep('  <div id="noteswrap" hidden></div>\n','  <div id="noteswrap" hidden></div>\n  <div id="essaywrap" hidden></div>\n')
rep('<p class="es-count">${e.p.length} points · you need 11+ for the top band</p></details>','<p class="es-count">${e.p.length} points · you need 11+ for the top band</p>${EH.planBtns(id,i)}</details>')
rep('  ${ESSAYS[id]?essayHTML(id):""}\n','  ${ESSAYS[id]?essayHTML(id):""}\n  ${EH.topicExtras(id)}\n')
rep('<p class="es-lead">Section B is one 15-mark essay','<p class="es-lead"><a href="#essays" style="font-weight:700">Open the Essay Hall: every essay and CCEA past paper in one place →</a></p><p class="es-lead">Section B is one 15-mark essay')
rep('''      <section class="tqhome" aria-labelledby="tqhome-h">''','''      <section class="tqhome eh-home" aria-labelledby="ehhome-h">
        <div class="tqhome-ic" aria-hidden="true">📝</div>
        <div><div class="kicker">Section B · 15-mark essays</div><h2 id="ehhome-h">Essay Hall</h2>
          <p>Every 15/15 essay plan plus the CCEA Section B questions from 2022–2026 and the specimen papers, with true or false, drag the key words, and an examiner game that marks your answer.</p></div>
        <div class="tqhome-b"><a class="play" href="#essays">Open the Essay Hall →</a></div>
      </section>

      <section class="tqhome" aria-labelledby="tqhome-h">''')
rep('<li><b>Slide Notes</b> give concise key points, exam tips and common mistakes for every topic.</li>','<li><b>Slide Notes</b> give concise key points, exam tips and common mistakes for every topic.</li>\n<li><b>Essay Hall</b> collects every 15-mark Section B essay plan and CCEA past paper question, with games to learn the mark-scheme points.</li>')
css=open(D+'eh.css',encoding='utf-8').read()
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('ok')
