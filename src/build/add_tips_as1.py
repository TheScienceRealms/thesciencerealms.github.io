import json
B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
TIPS={
 'm':["Water count: one water per bond. Condensation releases it and hydrolysis uses it, so 3 monomers → 2 bonds → 2 H₂O.","Triglyceride = glycerol + 3 fatty acids, joined by 3 ester bonds (not glycosidic).","Cellulose: every other β-glucose is flipped 180°. That's what makes the chains straight."],
 'c':["Secretion route: nucleus → ribosomes on RER → transport vesicle → Golgi → secretory vesicle → exocytosis.","Lysosomes are made by the Golgi apparatus.","Prokaryotes: naked circular DNA, small (70S) ribosomes, possibly plasmids, a cell wall. No nucleus, mitochondria or ER."],
 'p':["Route check: small or fat-soluble → bilayer; ions → channel; large polar down the gradient → carrier; against the gradient → carrier + ATP.","Glycoproteins act as receptors, antigens and recognition features. Cholesterol gives stability.","ψcell = ψs + ψp. Keep the minus sign, and water moves to the more negative ψ."],
 'd':["Meiosis I separates homologous chromosomes; meiosis II separates sister chromatids.","Variation: crossing over at chiasmata (prophase I) AND independent assortment (metaphase I). 2ⁿ combinations.","Vincristine = mitotic poison (no spindle, so M phase is blocked). 5′-fluorouracil = antimetabolite (no DNA synthesis, so S phase is blocked)."],
 't':["Leaf from top to bottom: cuticle, upper epidermis, palisade, spongy mesophyll (vascular bundle: xylem above phloem), lower epidermis with stomata and guard cells, cuticle.","Leaf drawings are block diagrams: tissue layers only, no individual cells, and label lines must not cross."]}
for f in ['quiztoplasm.html','build/bnotes.js']:
    s=open(B+f,encoding='utf-8').read()
    if 'Water count: one water per bond' in s:print('already',f);continue
    a=s.index('const NOTES={') if f.endswith('html') else 0
    for k,tips in TIPS.items():
        i=s.index('\n '+k+':{pts:',a);j=s.index('tips:[',i)+len('tips:[')
        s=s[:j]+','.join(json.dumps(t,ensure_ascii=False) for t in tips)+','+s[j:]
    open(B+f,'w',encoding='utf-8').write(s)
print('ok')
