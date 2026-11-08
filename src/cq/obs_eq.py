# Adds a balanced equation (with the colour-causing product in <mark>) and tips to Colour Lab questions.
import json,re
p='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/cq/data.js'
s=open(p,encoding='utf-8').read()
ALPHA="Alphabet tip: <b>a</b>cid comes before <b>a</b>lkali, so pair the colours in alphabetical order too. Methyl orange: acid = <b>r</b>ed, alkali = <b>y</b>ellow (r before y). Phenolphthalein: acid = <b>c</b>olourless, alkali = <b>p</b>ink (c before p). At the end point the colour changes FROM the colour of what is in the flask TO the colour of what you are adding."
EQ={
 "Concentrated sulfuric acid is added to solid potassium chloride.":"KCl + H₂SO₄ → KHSO₄ + <mark>HCl</mark><br><span class='small'>The steamy fumes are HCl. Note the product is KHSO₄ (the hydrogensulfate), not K₂SO₄.</span>",
 "Concentrated sulfuric acid is added to solid potassium bromide.":"KBr + H₂SO₄ → KHSO₄ + <mark>HBr</mark><br>2HBr + H₂SO₄ → <mark>Br₂</mark> + SO₂ + 2H₂O<br><span class='small'>HBr gives the steamy fumes; Br₂ is the red-brown vapour.</span>",
 "Concentrated sulfuric acid is added to solid potassium iodide.":"KI + H₂SO₄ → KHSO₄ + <mark>HI</mark><br>6HI + H₂SO₄ → 3<mark>I₂</mark> + <mark>S</mark> + 4H₂O<br>8HI + H₂SO₄ → 4<mark>I₂</mark> + <mark>H₂S</mark> + 4H₂O<br><span class='small'>HI = steamy fumes · I₂ = violet/purple vapour and grey-black solid · S = yellow solid · H₂S = rotten eggs.</span>",
 "Concentrated phosphoric acid is added to solid potassium iodide.":"KI + H₃PO₄ → KH₂PO₄ + <mark>HI</mark>",
 "Methyl orange: acid is added to alkali.":ALPHA, "Methyl orange: alkali is added to acid.":ALPHA,
 "Phenolphthalein: acid is added to alkali.":ALPHA, "Phenolphthalein: alkali is added to acid.":ALPHA,
 "What is the test result for hydrogen?":"2H₂ + O₂ → 2<mark>H₂O</mark><br><span class='small'>The ‘pop’ is hydrogen burning rapidly.</span>",
 "What is the test result for chlorine?":"Cl₂ + H₂O ⇌ HCl + <mark>HClO</mark><br><span class='small'>Chloric(I) acid, HClO, is the bleaching agent.</span>",
 "Which test result for carbon dioxide is accepted?":"Ca(OH)₂ + CO₂ → <mark>CaCO₃</mark> + H₂O<br><span class='small'>Insoluble calcium carbonate makes the limewater milky.</span>",
 "What is the test for hydrogen chloride gas?":"NH₃ + HCl → <mark>NH₄Cl</mark><br><span class='small'>The white smoke is solid ammonium chloride.</span>",
 "What is the test for ammonia gas?":"NH₃ + HCl → <mark>NH₄Cl</mark><br><span class='small'>The white smoke is solid ammonium chloride.</span>",
 "How do you test for the ammonium ion?":"NH₄⁺ + OH⁻ → <mark>NH₃</mark> + H₂O",
 "Make a solution, then add barium chloride solution.":"Ba²⁺(aq) + SO₄²⁻(aq) → <mark>BaSO₄(s)</mark>",
 "A solution in dilute nitric acid gives this with silver nitrate solution.":"Ag⁺(aq) + Cl⁻(aq) → <mark>AgCl(s)</mark> (white)",
 "Which result shows a bromide?":"Ag⁺(aq) + Br⁻(aq) → <mark>AgBr(s)</mark> (cream)",
 "Which result shows an iodide?":"Ag⁺(aq) + I⁻(aq) → <mark>AgI(s)</mark> (yellow)",
 "How do you show a solid contains carbonate ions?":"CO₃²⁻ + 2H⁺ → H₂O + <mark>CO₂</mark><br>Ca(OH)₂ + CO₂ → <mark>CaCO₃</mark> + H₂O (milky)",
 "A hydrocarbon burns with a smoky/sooty flame.":"e.g. CH₄ + O₂ → <mark>C</mark> + 2H₂O<br><span class='small'>Soot is unburnt carbon from incomplete combustion.</span>",
 "Bromine water is shaken with an alkene.":"CH₂=CH₂ + <mark>Br₂</mark> → <mark>CH₂BrCH₂Br</mark><br><span class='small'>Coloured Br₂ is used up, forming colourless 1,2-dibromoethane.</span>",
 "How does an alcohol usually burn?":"C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
 "A small piece of sodium is added to ethanol.":"2C₂H₅OH + 2Na → 2C₂H₅ONa + <mark>H₂</mark><br><span class='small'>H₂ causes the fizzing.</span>",
 "Phosphorus pentachloride is added to ethanol.":"C₂H₅OH + PCl₅ → C₂H₅Cl + POCl₃ + <mark>HCl</mark><br><span class='small'>HCl is the steamy fumes.</span>",
 "A primary alcohol is heated with acidified potassium dichromate(VI).":"CH₃CH₂OH + [O] → CH₃CHO + H₂O<br><span class='small'>Orange Cr₂O₇²⁻ is reduced to green <mark>Cr³⁺</mark>.</span>",
 "Magnesium is added to cold water.":"Mg + 2H₂O → Mg(OH)₂ + <mark>H₂</mark>",
 "Calcium is added to water.":"Ca + 2H₂O → <mark>Ca(OH)₂</mark> + <mark>H₂</mark>",
 "Calcium is added to dilute sulfuric acid.":"Ca + H₂SO₄ → <mark>CaSO₄</mark> + H₂<br><span class='small'>Insoluble CaSO₄ coats the calcium and stops the reaction.</span>",
 "Magnesium burns in oxygen.":"2Mg + O₂ → 2<mark>MgO</mark>",
 "Calcium burns in oxygen.":"2Ca + O₂ → 2<mark>CaO</mark>",
 "What is seen when starch is added to a solution containing iodine?":"<span class='small'>Iodine forms a blue-black complex with starch.</span>",
 "Concentrated sulfuric acid is added to solid potassium chloride. What is observed?":None}
lines=s.split('\n');out=[];hit=0
for ln in lines:
    m=re.match(r'^ \["([\d.]+)","(.*?)",',ln)
    if m:
        q=m.group(2);eq=None
        for k,v in EQ.items():
            if v and q.startswith(k): eq=v;break
        if eq:
            assert ln.rstrip().endswith('],') or ln.rstrip().endswith(']')
            end=ln.rstrip(); comma=end.endswith(',')
            body=end[:-1] if comma else end
            body=body[:-1]+','+json.dumps(eq,ensure_ascii=False)+']'
            ln=body+(',' if comma else '');hit+=1
    out.append(ln)
open(p,'w',encoding='utf-8').write('\n'.join(out));print('added',hit)
