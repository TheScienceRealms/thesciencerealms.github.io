B='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
R=[
 # keep typed answers visible
 ('<input id="mcin" class="numin" inputmode="decimal" ${S.ok1?"disabled":""}>','<input id="mcin" class="numin" inputmode="decimal" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}>'),
 ('const v=numv(root.querySelector("#mcin").value);if(isNaN(v))return;','const v=numv(root.querySelector("#mcin").value);if(isNaN(v))return;S.lastv=v;'),
 ('<input id="mmin" class="numin sm2" inputmode="numeric" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"")}',
  '<input id="mmin" class="numin sm2" inputmode="numeric" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next"):"")}'),
 ('<input id="mmin" class="numin sm2" inputmode="numeric" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next","Next: name the stage"):"")}',
  '<input id="mmin" class="numin sm2" inputmode="numeric" value="${S.ok1?S.lastv:""}" ${S.ok1?"disabled":""}>${S.ok1?"":`<button class="primary" data-act="mmn">Check</button>`}</div>`+fbx(S.fb)+(S.ok1?nextRow("next","Next: name the stage"):"")}'),
 ('const v=numv(root.querySelector("#mmin").value);if(isNaN(v))return;','const v=numv(root.querySelector("#mmin").value);if(isNaN(v))return;S.lastv=v;'),
 # leaf: fill the epidermis gaps either side of the guard cells
 ('.filter(x=>x<316||x>370).map(x=>`<rect x="${x}" y="222" width="40" height="19" class="lf-epi"/>`).join("")}',
  '.filter(x=>x<316||x>370).map(x=>`<rect x="${x}" y="222" width="40" height="19" class="lf-epi"/>`).join("")}<rect x="320" y="222" width="10" height="19" class="lf-epi"/><rect x="378" y="222" width="22" height="19" class="lf-epi"/>'),
 # fatty acid C=O double bond
 ('<text x="${x+10}" y="${y-9}" class="ma-oh" text-anchor="middle">O</text>','<path d="M${x+8},${y-7} v-4 M${x+12},${y-7} v-4" class="ma-st"/><text x="${x+10}" y="${y-13}" class="ma-oh" text-anchor="middle">O</text>'),
]
for f in ['quiztoplasm.html','build/sims.js','build/sims_as1.js']:
    s=open(B+f,encoding='utf-8').read()
    for o,n in R:
        assert s.count(o)==1,(f,o[:50]);s=s.replace(o,n)
    open(B+f,'w',encoding='utf-8').write(s)
print('ok')
