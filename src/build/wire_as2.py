import shutil,re,json
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
shutil.copy(B+'quiztoplasm.html',B+'build/quiztoplasm-v22.bak')
mod=open(B+'build/sims_as2.js',encoding='utf-8').read();css=open(B+'build/sims_as2.css',encoding='utf-8').read()
reg_old=' leaf:{title:"Leaf Anatomy Explorer",topic:"t",blurb:"Identify leaf tissues, their functions and stomata by day and night.",start:lfStart,act:lfAct}};'
R=[("resp","Respirometer Simulator","x","RS","Measure O₂ uptake and CO₂ production with and without KOH."),("root","Root Journey","tp","RJ","Route water through the apoplast and symplast past the Casparian strip."),("transp","Transpiration Tower","tp","TT","Potometer: change the conditions and measure water uptake."),("phloem","Phloem Express","tp","PE","Sources, sinks, two-way flow and the evidence for translocation."),("clot","Clotting Crisis","h","CL","Build the clotting cascade and diagnose clotting problems."),("field","Fieldwork Explorer","a","FE","Choose sampling methods, place quadrats and estimate abundance."),("niche","Niche Wars","a","NW","Ecological factors, adaptations and competition."),("simpson","Biodiversity Detective","b","BD","Calculate Simpson’s index, then classify organisms."),("eutro","Eutrophication Emergency","hi","EU","Watch a lake collapse step by step, then prevent it."),("bod","Pollution Investigation","hi","PI","Sample a river below a slurry outflow: O₂, BOD and indicators."),("consv","Conservation Command","hi","CV","Balance biodiversity and profit on a Northern Ireland farm.")]
reg_new=reg_old[:-2]+',\n'+',\n'.join(f' {i}:{{title:"{t}",topic:"{tp}",blurb:"{bl}",start:{v}.start,act:{v}.act}}' for i,t,tp,v,bl in R)+'};'
def patch(s):
    assert s.count(reg_old)==1 and 'function gBody' not in s
    s=s.replace(reg_old,reg_new);i=s.index('const SIMS={');return s[:i]+mod+'\n'+s[i:]
j=open(B+'build/sims.js',encoding='utf-8').read();open(B+'build/sims.js','w',encoding='utf-8').write(patch(j))
h=patch(open(B+'quiztoplasm.html',encoding='utf-8').read());h=h.replace('</style>',css+'</style>',1)
TIPS={'x':["Respirometer: with KOH, movement = O₂ used. Without KOH, movement = O₂ used − CO₂ produced. Volume = πr²h."],
 'tp':["Casparian strip (suberin) blocks the apoplast at the endodermis, so water must enter the symplast.","Cohesion = water to water (hydrogen bonds). Adhesion = water to the xylem walls.","Translocation: learn the EVIDENCE (ringing, ¹⁴C tracers, metabolic inhibitors, aphid stylets). Theories of translocation are not required."],
 'h':["Clotting: thromboplastin + Ca²⁺, vitamin K and factors (VIII, Xa) turn prothrombin into thrombin; thrombin turns soluble fibrinogen into insoluble fibrin."],
 'a':["Density = mean per quadrat ÷ quadrat area. Frequency = % of quadrats the species occurs in.","Climatic = weather and light; edaphic = soil; biotic = other organisms."],
 'b':["Simpson’s: show Σn(n−1) and N(N−1), then give D to 2 d.p. Lower D = more diverse."],
 'hi':["BOD = oxygen used by microorganisms in a water sample over 5 days at 20 °C. Organic pollution raises it.","Indicator species: stonefly and mayfly nymphs = clean water; sludge worms and bloodworms = low oxygen."]}
a=h.index('const NOTES={')
for k,tips in TIPS.items():
    i=h.index('\n '+k+':{pts:',a);jx=h.index('tips:[',i)+6;h=h[:jx]+','.join(json.dumps(t,ensure_ascii=False) for t in tips)+','+h[jx:]
open(B+'quiztoplasm.html','w',encoding='utf-8').write(h)
bn=open(B+'build/bnotes.js',encoding='utf-8').read()
for k,tips in TIPS.items():
    i=bn.index('\n '+k+':{pts:');jx=bn.index('tips:[',i)+6;bn=bn[:jx]+','.join(json.dumps(t,ensure_ascii=False) for t in tips)+','+bn[jx:]
open(B+'build/bnotes.js','w',encoding='utf-8').write(bn)
old=open(B+'build/old19.html',encoding='utf-8').read();oc=old[old.index('<style'):old.index('</style>')]
used=set()
for m in re.finditer(r'class="([^"]*)"',mod):
    for c in re.sub(r'\$\{[^}]*\}',' ',m.group(1)).split():used.add(c)
for m in re.finditer(r'"([a-z0-9 -]+)"',mod):
    pass
used.update(['s-on','sel2','dash','dead','low','done','cur','m','p0','p1','p2','p3','n','a','c','small','endo','right','wrong','in','out'])
print('shared:',sorted(k for k in used if re.search(r'\.'+re.escape(k)+r'(?![\w-])',oc)))
print('ok')
