import shutil
S='/tmp/claude-0/-home-user/22117770-6d9a-5f64-adda-5a0ecca8ce37/scratchpad/'
BIO='https://claude.ai/artifact/1bmrq61vRrKWHcCwrQiSLM'; CHEM='https://claude.ai/artifact/5jkpgBox9Ey3AnuWFttyVD'
def patch(fn,pairs):
    s=open(fn,encoding='utf-8').read()
    for a,b in pairs:
        assert s.count(a)==1,(fn,s.count(a),a[:80]); s=s.replace(a,b)
    open(fn,'w',encoding='utf-8').write(s)
REALM=lambda here:f'''<div class="realm"><div class="realm-k">THE SCIENCE REALMS</div><div class="realm-s"><a href="{BIO}" target="_blank" rel="noopener" {'aria-current="page"' if here=='bio' else ''}>BIOLOGY</a> · <a href="{CHEM}" target="_blank" rel="noopener" {'aria-current="page"' if here=='chem' else ''}>CHEMISTRY</a></div><div class="realm-m">Explore. Learn. Master.</div><div class="realm-c">Created and developed by Adrianna Kelly · 2026</div></div>'''
def ABOUT(games):
    return f'''<section class="about" aria-labelledby="about-h"><h2 id="about-h">About The Science Realms</h2>
<p><b>The Science Realms</b> is an interactive revision platform for CCEA AS Biology and AS Chemistry. It was created and developed by <b>Adrianna Kelly</b> as an independent project during a gap year in 2026.</p>
<h3>Why it was made</h3>
<p>I studied triple award science at GCSE and Biology, Chemistry and Psychology at A level. I know how it feels to work hard and still not get the grade you were aiming for. I built The Science Realms to help other students aim higher and reach their full potential, because nothing pays off more than results day.</p>
<h3>What it covers</h3>
<p>CCEA GCE AS Biology (Units AS 1 and AS 2) and CCEA GCE AS Chemistry (Units AS 1 and AS 2). Content is written to match the specifications, CCEA’s Clarification of Terms and Acceptable Colour Changes and Observations, and the style of recent papers and mark schemes. All questions are original.</p>
<h3>The aim</h3>
<p>To make challenging scientific concepts more accessible through interactive learning: practising with the exact CCEA terminology, exam technique and mark-scheme thinking rather than only reading notes.</p>
<h3>How the games help</h3><ul>{games}</ul>
<p class="small muted">The Science Realms is an independent educational project and is not affiliated with or endorsed by CCEA.</p></section>'''
CREDIT='<p class="credit">An educational project by Adrianna Kelly · 2026</p>'

# ---- Chemistry (source files, then rebuild) ----
CG='''<li><b>Definition Dash and Definition Builder</b> drill CCEA’s exact definitions, from recognising them at speed to filling the key words.</li>
<li><b>Colour Lab, Flame Test Lab and the Ionic Equation Builder</b> teach precise observations and the equations behind them.</li>
<li><b>Practical Builder and Mark Scheme Mechanic</b> build 6-mark answers step by step and mark them against indicative content and CCEA bands.</li>
<li><b>Shape Shifter, Electron Pair Escape, Bond Angle Blitz and Dipole Detective</b> use rotatable 3D molecules to teach shapes and polarity.</li>
<li><b>Topic Quizzes and the Section A Bank</b> give CCEA-style multiple-choice practice, and the <b>Lab Book</b> pages give concise notes and exam tips for every topic.</li>'''
patch(S+'cq/shell.html',[
 ('<div class="tag">CCEA AS CHEMISTRY</div>','<div class="tag">CCEA AS CHEMISTRY</div>\n        '+REALM('chem')),
 ('      <footer>\n        <p>Definitions follow','      '+ABOUT(CG)+'\n      <footer>\n        <p>Definitions follow'),
 ('  <section id="view" hidden></section>','  <section id="view" hidden></section>\n  '+CREDIT),
 ('/* shapes, polarity, mnemonic */','''/* brand */
.realm{display:grid;gap:4px;border-left:4px solid var(--yellow);padding-left:14px;margin-top:6px}
.realm-k{font:700 clamp(18px,3vw,24px)/1.1 var(--body);letter-spacing:.18em;color:#fff}
.realm-s{font:700 13px var(--mono);letter-spacing:.14em;color:var(--cyanl)} .realm-s a{color:inherit;text-decoration:none} .realm-s a:hover{text-decoration:underline} .realm-s a[aria-current]{color:var(--yellow)}
.realm-m{font:700 15px var(--body);color:var(--green)}
.realm-c{font-size:13px;color:#cfe6f2}
.about{background:var(--panel);border-radius:16px;padding:clamp(16px,3.4vw,26px);display:grid;gap:8px;max-width:820px;box-shadow:0 14px 30px -16px rgba(0,20,50,.7)}
.about h2{margin:0;font:700 24px var(--body);color:var(--navy)} .about h3{margin:8px 0 0;font:700 16px var(--body);color:var(--blue)} .about ul{margin:0;padding-left:20px;display:grid;gap:6px}
.credit{text-align:center;font-size:12.5px;color:#e3f4fb;margin:4px 0 0;text-shadow:0 1px 2px rgba(0,0,0,.3)}
/* shapes, polarity, mnemonic */'''),
])
# keep the central atom label above lone pairs
patch(S+'cq/shapes.js',[('${m.c}</text>${front}`;','${m.c}</text>${front}<text x="0" y="5" class="atl" style="font-size:13px;fill:${["C","N","Cl"].includes(m.c)?"#fff":"#0b2545"}">${m.c}</text>`;')])

# ---- Biology (single file) ----
shutil.copy(S+'quiztoplasm.html',S+'build/quiztoplasm-v7.bak')
BG='''<li><b>Slide Run</b> gives fast, timed multiple-choice practice for every topic, with an explanation after each answer.</li>
<li><b>Slide Lab</b> uses exam-style and colour diagrams for labelling, sequencing, graph reading and magnification.</li>
<li><b>Molecule Match-Up, DNA Detective, Osmosis Challenge and Cell Surgery</b> make key ideas hands-on: building glucose, pairing bases, calculating water potential and finding faults in cells.</li>
<li><b>Slide Notes</b> give concise key points, exam tips and common mistakes for every topic.</li>'''
patch(S+'quiztoplasm.html',[
 ('<p class="tagline">Revision games for CCEA AS Biology</p>','<p class="tagline">Revision games for CCEA AS Biology</p>\n          '+REALM('bio')),
 ('      <footer>\n        <p>Questions and exam-style diagrams','      '+ABOUT(BG)+'\n      <footer>\n        <p>Questions and exam-style diagrams'),
 ('  <div id="noteswrap" hidden></div>','  <div id="noteswrap" hidden></div>\n  '+CREDIT.replace('<p class="credit">','<p class="credit" id="credit">')),
 ('/* factfiles */','''/* brand */
.realm{display:grid;gap:3px;border-left:4px solid var(--gold);padding-left:12px;margin-top:4px}
.realm-k{font:400 clamp(16px,2.6vw,20px)/1.1 var(--display);letter-spacing:.08em;color:var(--green)}
.realm-s{font:700 12px var(--mono);letter-spacing:.14em;color:var(--muted)} .realm-s a{color:inherit;text-decoration:none} .realm-s a:hover{text-decoration:underline} .realm-s a[aria-current]{color:var(--gold)}
.realm-m{font:700 14px var(--body);color:var(--gold)}
.realm-c{font-size:13px;color:var(--muted)}
.about{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:clamp(16px,3vw,26px);display:grid;gap:8px}
.about h2{margin:0;font:400 26px var(--display);color:var(--green)} .about h3{margin:8px 0 0;font:700 16px var(--body);color:var(--green-deep)} .about ul{margin:0;padding-left:20px;display:grid;gap:6px}
.credit{text-align:center;font-size:12.5px;color:var(--muted);margin:6px 0 0}
/* factfiles */'''),
])
print('branded')
