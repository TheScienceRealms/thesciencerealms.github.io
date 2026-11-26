import shutil
F='/home/user/thesciencerealms.github.io/psycheverse/index.html'
D='/tmp/claude-0/-home-user-thesciencerealms-github-io/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/chars/'
shutil.copy(F,D+'psycheverse-before-notes.html')
s=open(F,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:70],s.count(a));s=s.replace(a,b)
# 1. teacher tip box on every Mind Notes page
rep('''  ${N.tips?`<div class="panel tipbox"><h3>Exam tips</h3><ul class="kp">${N.tips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}${extra}''',
'''  ${N.tips?noteTips(tid,N.tips):""}${extra}''')
# 2. extra debate tips (teacher + Adrianna's own experience)
rep('''    extra=`<h3 class="sech">Exam technique for the 20-mark essay</h3>${tipsHTML()}''',
'''    extra=`<h3 class="sech">Exam technique for the 20-mark essay</h3>${debTips()}${tipsHTML()}''')
rep('function renderNotes(tid){','''const TGN={quigley:"Mr Quigley",byrne:"Mrs Byrne"};
const tgWho=(k,flip)=>{let h=0;for(const c of String(k))h=(h*31+c.charCodeAt(0))>>>0;return ["quigley","byrne"][(h+(flip?1:0))%2]};
const tgArt=(w,p)=>typeof Guide!=="undefined"&&Guide.art?Guide.art(w,p):"";
function noteTips(tid,tips){const w=tgWho(tid),a=tgArt(w,"explain");
  return `<div class="panel tipbox tg-tips">${a?`<div class="tg-av" aria-hidden="true">${a}</div>`:""}<div><h3>${a?TGN[w]+"’s exam tips":"Exam tips"}</h3><ul class="kp">${tips.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`}
function debTips(){const w=tgWho("deb",true),a=tgArt(w,"excited");
  return `<div class="panel tipbox tg-tips">${a?`<div class="tg-av" aria-hidden="true">${a}</div>`:""}<div><h3>${a?TGN[w]+" says: two tips for the 20-marker":"Two tips for the 20-marker"}</h3><ul class="kp">
  <li><b>Running out of time? Add a counter-argument.</b> If you’re stuck for time, a quick counter-argument is one of the best ways to secure extra marks. WJEC love counter-arguments: they show you can evaluate (AO3), not just describe.</li>
  <li><b>Learn a model debate, then make it fit the question.</b> You can learn any of the model essays, as long as on exam day you find a way to relate every point to the exact question asked, and keep the debate accurate and balanced.</li></ul>
  <div class="tg-quote"><b>How I did it:</b> I learned the positive approach model essay from these Mind Notes and, on the day, wrote it almost word for word for <i>the relevance of positive psychology in today’s society</i>. To make it fit, I linked it to today: Gen Z’s self-care culture (matcha and Pilates), workplaces allowing annual leave and maternity leave, and companies offering gym memberships for wellbeing. It worked because every example was relevant and debated accurately. <span class="tg-sig">Adrianna, 20/20 on this question</span></div></div></div>`}
function renderNotes(tid){''')
# 3. let the notes use the guide's drawings, and redraw a notes page once the guide has loaded
rep('return {sync,_st:()=>st};','return {sync,art:(w,p)=>ART[w]&&ART[w][p]||"",_st:()=>st};')
rep('setTimeout(sync,0);\nreturn {sync,art','if(/^notes-/.test(location.hash.slice(1)))setTimeout(route,0);\nsetTimeout(sync,0);\nreturn {sync,art')
css='''
.tg-tips{display:grid;grid-template-columns:118px minmax(0,1fr);gap:18px;align-items:start}
.tg-av{width:118px;height:254px;align-self:end}.tg-av svg{width:118px;height:254px;display:block;filter:drop-shadow(0 6px 10px rgba(29,11,61,.22))}
.tg-tips h3{margin-top:0}
.tg-quote{margin-top:10px;padding:12px 14px;border-left:4px solid #ff7ac6;background:rgba(255,122,198,.08);border-radius:10px;line-height:1.5}
.tg-sig{display:block;margin-top:6px;font-weight:700;color:#c2307f}
@media (max-width:640px){.tg-tips{grid-template-columns:72px minmax(0,1fr);gap:12px}.tg-av,.tg-av svg{width:72px;height:155px}}
'''
s=s.replace('</style>',css+'</style>',1)
open(F,'w',encoding='utf-8').write(s);print('ok')
