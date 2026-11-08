/* ---------- Inside the Ileum ---------- */
function ileumWall(Rd){return `<svg viewBox="0 0 460 280" class="film" role="img" aria-label="Section through the ileum wall">
 <text x="10" y="18" class="hlbl">LUMEN</text>
 ${org(Rd,"muc",`<path d="M0,120 ${Array.from({length:9},(_,i)=>`L${10+i*50},120 L${14+i*50},40 Q${30+i*50},22 ${46+i*50},40 L${50+i*50},120`).join(" ")} L460,120 L460,150 L0,150 Z" class="ilm"/>`)}
 ${org(Rd,"crypt",`<path d="M58,150 L58,132 Q65,124 72,132 L72,150 Z M208,150 L208,132 Q215,124 222,132 L222,150 Z M358,150 L358,132 Q365,124 372,132 L372,150 Z" class="ilcr"/>`)}
 ${org(Rd,"mm",`<rect x="0" y="150" width="460" height="12" class="ilmm"/>`)}
 ${org(Rd,"sub",`<rect x="0" y="162" width="460" height="46" class="ilsub"/><circle cx="90" cy="185" r="8" class="ilart"/><circle cx="112" cy="185" r="9" class="ilvein"/><circle cx="300" cy="186" r="7" class="ilart"/><circle cx="322" cy="186" r="9" class="ilvein"/>`)}
 ${org(Rd,"me",`<rect x="0" y="208" width="460" height="22" class="ilme1"/><rect x="0" y="230" width="460" height="22" class="ilme2"/>`)}
 ${org(Rd,"ser",`<rect x="0" y="252" width="460" height="10" class="ilser"/>`)}
</svg>`}
function villusSVG(Rd){return `<svg viewBox="0 0 460 300" class="film" role="img" aria-label="A single villus">
 ${org(Rd,"epi",`<path d="M150,290 L150,80 Q230,0 310,80 L310,290 L292,290 L292,86 Q230,26 168,86 L168,290 Z" class="ilepi"/>${Array.from({length:14},(_,i)=>`<line x1="${152+i*11}" y1="${70-Math.sin(i/13*Math.PI)*40}" x2="${152+i*11}" y2="${62-Math.sin(i/13*Math.PI)*40}" class="mv"/>`).join("")}`)}
 ${org(Rd,"gob",`<path d="M154,150 Q150,128 160,118 Q170,128 166,150 Z" class="ilgob"/><path d="M294,200 Q290,178 300,168 Q310,178 306,200 Z" class="ilgob"/>`)}
 ${org(Rd,"cap",`<path d="M190,290 L190,110 Q230,70 270,110 L270,290" class="ilcap"/><path d="M200,290 L200,116 Q230,86 260,116 L260,290" class="ilcap thin"/>`)}
 ${org(Rd,"lac",`<path d="M222,290 L222,120 Q230,108 238,120 L238,290 Z" class="illac"/>`)}
 ${org(Rd,"crypt",`<path d="M120,290 L120,250 Q130,236 140,250 L140,290 Z M320,290 L320,250 Q330,236 340,250 L340,290 Z" class="ilcr"/><circle cx="130" cy="282" r="4" class="ilpan"/><circle cx="330" cy="282" r="4" class="ilpan"/>`)}
 <text x="320" y="40" class="hlbl">microvilli (brush border)</text></svg>`}
function makeIleum(){const R=[];
 const wall=(id,name,why)=>R.push({kind:"spot",title:"Inside the Ileum · tissue layers",prompt:`Tap the ${name}.`,ans:[id],view:Rd=>`<div class="diagram narrow">${ileumWall(Rd)}</div>`,explain:why});
 [["muc","mucosa","The mucosa is the innermost layer, folded into villi."],["mm","muscularis mucosa","A thin layer of smooth muscle that moves the villi, improving contact with digested food."],["sub","submucosa","The submucosa contains blood and lymphatic vessels."],["me","muscularis externa","Circular and longitudinal muscle: peristalsis, pendular movements and local constrictions."],["ser","serosa","The outer protective and supportive layer."]].forEach(([i,n,w])=>wall(i,n,w));
 const vil=(id,name,why)=>R.push({kind:"spot",title:"Inside the Ileum · zoom into a villus",prompt:`Tap the ${name}.`,ans:[id],view:Rd=>`<div class="diagram narrow">${villusSVG(Rd)}</div>`,explain:why});
 vil("lac","lacteal","The lacteal absorbs fats (as lipids) into the lymphatic system.");vil("cap","blood capillaries","Amino acids and monosaccharides enter the blood capillaries.");vil("gob","goblet cells","Goblet cells secrete mucus.");vil("crypt","crypts of Lieberkühn","At the base of the crypts, Paneth cells protect the dividing stem cells.");vil("epi","columnar epithelium","Columnar epithelial cells with microvilli absorb the products of digestion.");
 const ch=(prompt,opts,explain)=>R.push({kind:"choice",title:"Inside the Ileum · absorption",prompt,opts,ans:0,explain});
 ch("Where are fats absorbed into?",["Lacteals","Blood capillaries","Goblet cells","Crypts of Lieberkühn"],"Monosaccharides and amino acids go into the blood capillaries; fats go into the lacteals.");
 ch("Why do the epithelial cells have numerous mitochondria?",["To release ATP for active transport of digested products","To make mucus","To digest fats","To increase the surface area"],"Absorption uses diffusion, active transport and pinocytosis. Active transport needs ATP.");
 ch("What is the function of Paneth cells?",["An antimicrobial role, protecting the dividing stem cells at the base of the crypts","Secreting mucus","Absorbing fats","Contracting to move food"],"Learn this one: it is specific to CCEA.");
 ch("Which feature increases the surface area for absorption the most at cell level?",["A brush border of microvilli","The serosa","The muscularis externa","Goblet cells"],"Villi increase the surface area at tissue level; microvilli at cell level.");
 R.push({kind:"order",title:"Inside the Ileum · trace a glucose molecule",prompt:"Put the route of a glucose molecule in order, from the lumen to the blood.",items:["Lumen of the ileum","Brush border of microvilli","Columnar epithelial cell (absorbed by diffusion and active transport)","Out of the epithelial cell into the villus","Blood capillary in the villus"],explain:"Fats take a different route: into the lacteal."});
 return R}
