/* ================= TEACH: assignments through Google Classroom (no student data leaves the school) ================= */
const Teach=(()=>{
const C=TQ_CFG;const CAT={};C.cat.forEach(([h,t,u,code,topic,min])=>{CAT[h]={h,t,u,code,topic,min}});
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const b64e=s=>btoa(unescape(encodeURIComponent(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const b64d=s=>{s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return decodeURIComponent(escape(atob(s)))};
const fnv=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h};
const hid=(s,n)=>fnv(s).toString(36).toUpperCase().padStart(7,"0").slice(-n);
const clip=(s,n)=>String(s==null?"":s).slice(0,n);
const SALT="tsr-"+C.tag.toLowerCase()+"-2026",PRE="TSR-"+C.tag+"-",KP="tsr"+C.tag.toLowerCase();
const esc_=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const stars=f=>{const n=f>=1?3:f>=.67?2:f>=.34?1:0;return "★".repeat(n)+"☆".repeat(3-n)};
function dec(p){try{const o=JSON.parse(b64d(p));if(!o||!Array.isArray(o.s))return null;const set={t:clip(o.t,80)||"Assignment",c:clip(o.c,20),d:clip(o.d,30),s:o.s.filter(h=>CAT[h]).slice(0,12)};return set.s.length?set:null}catch(e){return null}}
const enc=set=>b64e(JSON.stringify({v:1,t:set.t,c:set.c,d:set.d,s:set.s}));
const setId=p=>hid(p,4);
const NAME=n=>String(n||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toUpperCase().replace(/[^A-Z0-9 ]/g," ").trim().replace(/\s+/g,".").slice(0,20)||"STUDENT";
const nice=N=>N.split(".").map(w=>w.length===1?w+".":w.charAt(0)+w.slice(1).toLowerCase()).join(" ");
const T=h=>CAT[h]?CAT[h].t:h,M=h=>CAT[h]?CAT[h].min:8;
function code(p,set,name,sc){const S=setId(p),N=NAME(name),scores=set.s.map(h=>sc[h]==null?"X":Math.round(sc[h])).join(".");return `${PRE}${S}-${N}-${scores}-${hid(S+"|"+N+"|"+scores+"|"+SALT,2)}`}
const RE=new RegExp(PRE+"([0-9A-Z]{4})-([A-Z0-9.]{1,20})-([0-9X.]+)-([0-9A-Z]{2})","g");
function parse(text){const out=[];let m;RE.lastIndex=0;while((m=RE.exec(String(text).toUpperCase()))){const [all,S,N,scores,chk]=m;out.push({raw:all,S,N,scores:scores.split(".").map(x=>x==="X"?null:Math.min(100,+x)),ok:hid(S+"|"+N+"|"+scores+"|"+SALT,2)===chk})}
 const other=String(text).toUpperCase().match(/TSR-[A-Z]-[0-9A-Z]{4}-[A-Z0-9.]{1,20}-[0-9X.]+-[0-9A-Z]{2}/g)||[];other.filter(o=>!o.startsWith(PRE)).forEach(o=>out.push({raw:o,S:"",N:"",scores:[],ok:false,wrongRealm:true}));return out}
const prog=S=>LS.get(KP+"-set-"+S,{name:"",sc:{}}),saveProg=(S,v)=>LS.set(KP+"-set-"+S,v);
const active=()=>{const p=LS.get(KP+"-active",null);const set=p&&dec(p);return set?{p,set}:null};
const link=(kind,p)=>location.origin+location.pathname+"#"+kind+"="+p;
const copyBtn=(txt,label,cls="tq-btn")=>`<button class="${cls}" data-tq="copy" data-txt="${esc_(txt)}">${label}</button>`;
const IMG=f=>"img/"+f;
let B={unit:C.units[0][0],sel:[],t:"",c:"",d:"",out:null},R={text:""},cur="";

function record(h,pct){const a=active();if(!a||!a.set.s.includes(h))return "";const S=setId(a.p),pr=prog(S);const prev=pr.sc[h];pr.sc[h]=prev==null?pct:Math.max(prev,pct);saveProg(S,pr);
 const done=a.set.s.filter(x=>pr.sc[x]!=null).length,n=a.set.s.length;
 return `<div class="tq-ban"><span>📌 Saved to your assignment <b>${esc_(a.set.t)}</b>: ${done} of ${n} task${n>1?"s":""} done${prev!=null&&pct<=prev?` (your best, ${prev}%, still counts)`:""}.</span><a class="tq-btn" href="#set=${a.p}">${done===n?"Get my completion code →":"Back to assignment →"}</a></div>`}

const privacy=t=>`<div class="tq-priv"><span class="tq-lock">🔒</span><div>${t}</div></div>`;
const steps=()=>`<div class="tq-steps">
 <div class="tq-step"><div class="tq-num">1</div><div class="tq-ic">🧪</div><b>Create an assignment</b><span>Tick the ${C.thing} you want, by ${C.board} spec topic. You get a link and ready-written instructions.</span><i class="tq-arr">➜</i></div>
 <div class="tq-step"><div class="tq-num">2</div><div class="tq-ic">📌</div><b>Post it in Google Classroom</b><span>Paste the link and instructions into a new assignment, like any other homework.</span><i class="tq-arr">➜</i></div>
 <div class="tq-step"><div class="tq-num">3</div><div class="tq-ic">🎓</div><b>Students complete it</b><span>At the end each student gets a completion code with their name and scores. They paste it as a private comment and turn in.</span><i class="tq-arr">➜</i></div>
 <div class="tq-step"><div class="tq-num">4</div><div class="tq-ic">📊</div><b>See the results</b><span>Paste the codes into Class results to get a colour-coded grid of every student and task, plus a CSV for your markbook.</span></div></div>`;
const faq=items=>`<div class="tq-faq">${items.map(([q,a])=>`<div class="tq-box"><b>${q}</b><span class="tq-mut">${a}</span></div>`).join("")}</div>`;
function pageTeachers(){const mine=LS.get(KP+"-mysets",[]);
 return `<div class="tq-hero"><div class="tq-col"><div class="tq-k">For teachers</div><h3 class="tq-h">Set ${C.name} work through your Google Classroom</h3>
  <p class="tq-lead">Choose ${C.thing} for your class, post one link, and get a results grid when the work is handed in. It works with the Google Classroom you already use. No accounts or sign-ups for you or your students.</p>
  <div class="tq-row"><a class="tq-btn" href="#teach-new">＋ Create an assignment</a><a class="tq-btn g" href="#results">▤ Class results</a><a class="tq-btn g" href="#students">🎓 For students</a></div></div>
  ${privacy(`<b>No student data leaves your school.</b><br>Names and scores travel only inside your Google Classroom. The Science Realms never receives or stores them, and results are worked out on your own computer.`)}</div>
 <div class="tq-k">How it works</div>${steps()}
 <div class="tq-k">What it looks like</div>
 <figure class="tq-fig"><img src="${IMG("teach-classroom.jpg")}" alt="Illustration of a Google Classroom assignment containing the ${C.name} link, with a student's completion code pasted as a private comment" loading="lazy"><figcaption><b>Step 2:</b> your assignment in Google Classroom, with the link attached. Students paste their code as a private comment, then click Turn in. <i>(Illustration)</i></figcaption></figure>
 <div class="tq-two"><figure class="tq-fig"><img src="${IMG("teach-student.jpg")}" alt="Two phone screens: a student opening the assignment and typing their name, then finishing and copying their completion code" loading="lazy"><figcaption><b>Step 3:</b> what students see. They type their name (it stays on their device), do the tasks, then copy their completion code.</figcaption></figure>
  <figure class="tq-fig"><img src="${IMG("teach-results.jpg")}" alt="The Class results page showing a colour-coded grid of student scores" loading="lazy"><figcaption><b>Step 4:</b> paste the codes into Class results. Each student’s best score on each task appears in one grid.</figcaption></figure></div>
 ${mine.length?`<div class="tq-k">Your assignments on this computer</div><div class="tq-list">${mine.slice(0,8).map(m=>`<div class="tq-item"><div><b>${esc_(m.t)}</b><span class="tq-mut">${esc_(m.c||"")} ${m.d?"· due "+esc_(m.d):""} · ${m.n} task${m.n>1?"s":""}</span></div><div class="tq-row">${copyBtn(link("set",m.p),"Copy student link","tq-btn g sm")}<a class="tq-btn sm" href="#results=${m.p}">Results</a></div></div>`).join("")}</div>`:""}
 <div class="tq-k">Questions</div>${faq([["Do students need an account?","No. They open the link and type their name, which stays on their own device and only appears inside their code."],["What if a student replays a task?","Their best score on each task is used. Progress is saved on the device they used."],["Can students fake a code?","Each code has a built-in check, so edited codes are flagged. It’s designed for homework, not formal assessment."],["Does it work with Teams?","Yes. Any platform where students can hand in a line of text works, including Teams and Google Forms."]])}`}
function pageStudents(){return `<div class="tq-hero"><div class="tq-col"><div class="tq-k">For students</div><h3 class="tq-h">Got an assignment link from your teacher?</h3><p class="tq-lead">Your teacher can set ${C.name} activities as homework through Google Classroom. Here’s exactly what to do.</p></div>
  ${privacy("<b>Your name stays on your device.</b><br>It’s only used to make your completion code. Nothing is sent to The Science Realms.")}</div>
 <div class="tq-two"><div class="tq-box tq-howto"><b>How to do an assignment</b><ol><li>Open the link in your Google Classroom assignment.</li><li>Type your name (as your teacher knows you) and press <b>Start</b>.</li><li>Complete each task. Your best score on each one is saved on your device.</li><li>When you’ve finished, press <b>Copy code</b>.</li><li>Go back to the assignment in Google Classroom, paste the code as a <b>private comment</b> and click <b>Turn in</b>.</li></ol></div>
  <figure class="tq-fig"><img src="${IMG("teach-student.jpg")}" alt="Phone screens showing the assignment start page and the completion code" loading="lazy"><figcaption>Start, then copy your completion code at the end.</figcaption></figure></div>
 <figure class="tq-fig"><img src="${IMG("teach-classroom.jpg")}" alt="Illustration of where to paste the code as a private comment in Google Classroom" loading="lazy"><figcaption>Paste your code under <b>Private comments</b>, then click <b>Turn in</b>. <i>(Illustration)</i></figcaption></figure>
 ${faq([["Can I redo a task?","Yes. Play it again from the assignment page and your best score counts."],["I closed the page. Have I lost my progress?","No. Open the same link on the same device and your progress will still be there."],["I used a different device.","Progress is saved per device, so finish on the one you started on, or redo the tasks."],["Is my teacher tracking what I do on the site?","No. Your teacher only sees what is in the code you hand in: your name and your scores."]])}
 <div class="tq-row"><a class="tq-btn g" href="#teachers">← For teachers</a></div>`}
function pageBuilder(){const items=C.cat.filter(x=>x[2]===B.unit);const groups=[];for(const it of items){const key=it[3]+" "+it[4];let g=groups.find(g=>g.key===key);if(!g){g={key,code:it[3],topic:it[4],ids:[]};groups.push(g)}g.ids.push(it[0])}
 const total=B.sel.reduce((a,h)=>a+M(h),0);
 return `<div class="tq-row sp"><div><div class="tq-k">For teachers</div><h3 class="tq-h sm">Create an assignment</h3></div><a class="tq-btn g" href="#teachers">← Teacher tools</a></div>
 <div class="tq-two w"><div class="tq-box"><div class="tq-row">${C.units.map(([u,l])=>`<button class="tq-chip ${B.unit===u?"on":""}" data-tq="unit" data-k="${u}">${l}</button>`).join("")}</div>
   ${groups.map(g=>`<div class="tq-grp">${esc_(g.code)} ${esc_(g.topic)}</div>${g.ids.map(h=>{const on=B.sel.includes(h);return `<button class="tq-task ${on?"on":""}" data-tq="pick" data-k="${h}" aria-pressed="${on}"><span class="tq-cb">${on?"✓":""}</span><span><b>${esc_(T(h))}</b><span class="tq-mut">about ${M(h)} min</span></span></button>`}).join("")}`).join("")}</div>
  <div class="tq-col"><div class="tq-box"><div class="tq-k">Details</div>
    <label class="tq-lab">Assignment title<input class="tq-in" id="tq-t" maxlength="80" value="${esc_(B.t)}" placeholder="${esc_(C.egTitle)}"></label>
    <div class="tq-two"><label class="tq-lab">Class<input class="tq-in" id="tq-c" maxlength="20" value="${esc_(B.c)}" placeholder="e.g. 13B"></label><label class="tq-lab">Due<input class="tq-in" id="tq-d" maxlength="30" value="${esc_(B.d)}" placeholder="e.g. Fri 28 Nov"></label></div>
    <div class="tq-mut">Selected: <b>${B.sel.length}</b> task${B.sel.length===1?"":"s"}${B.sel.length?` · about ${total} min`:""}${B.sel.length>=12?" (maximum 12)":""}</div>
    <button class="tq-btn" data-tq="make" ${B.sel.length?"":"disabled"}>Create link →</button></div>
   ${B.out?outBox(B.out):`<div class="tq-box tq-mut">Tick at least one activity, add a title, then press <b>Create link</b>.</div>`}</div></div>`}
function instr(set){const n=set.s.map(T),list=n.length>1?n.slice(0,-1).join(", ")+" and "+n[n.length-1]:n[0],m=set.s.reduce((a,h)=>a+M(h),0);
 return `Complete ${list} (about ${m} min) at the link below. At the end, copy your completion code and paste it as a private comment on this assignment, then click Turn in.`}
function outBox(p){const set=dec(p);return `<div class="tq-box tq-out"><div class="tq-k">Your link is ready</div><div class="tq-code" id="tq-link">${esc_(link("set",p))}</div><div class="tq-mut">Text to paste into Google Classroom:</div><div class="tq-in tq-ro">${esc_(instr(set))}</div>
 <div class="tq-row">${copyBtn(link("set",p),"Copy link")}${copyBtn(instr(set),"Copy instructions","tq-btn g")}<a class="tq-btn g" href="#set=${p}">Preview as student</a></div>
 <div class="tq-mut">Results page for this assignment: <a href="#results=${p}">open Class results</a>. It’s also saved under <b>Your assignments</b> on this computer.</div></div>`}
function pageSet(p){const set=dec(p);if(!set)return `<div class="tq-box"><b>This assignment link doesn’t work.</b><span class="tq-mut">Check you copied the whole link from Google Classroom, or ask your teacher for it again.</span></div>`;
 LS.set(KP+"-active",p);const S=setId(p),pr=prog(S),done=set.s.filter(h=>pr.sc[h]!=null).length,n=set.s.length,all=done===n,named=!!pr.name;
 const tasks=set.s.map((h,i)=>{const sc=pr.sc[h];return `<div class="tq-tk ${sc!=null?"done":""}"><div class="tq-num">${sc!=null?"✓":i+1}</div><b>${esc_(T(h))}</b>${sc!=null?`<span class="tq-sc">${sc}% ${stars(sc/100)}</span>`:`<span class="tq-chip">${M(h)} min</span>`}${named?`<a class="tq-btn sm ${sc!=null?"g":""}" href="#${h}">${sc!=null?"Redo":"Start"}</a>`:""}</div>`}).join("");
 const nextId=set.s.find(h=>pr.sc[h]==null),c=named&&done?code(p,set,pr.name,pr.sc):"";
 return `<div class="tq-stu"><div class="tq-k">Assignment from your teacher</div><h3 class="tq-h sm">${esc_(set.t)}</h3><div class="tq-mut">${[set.c,set.d?"due "+set.d:"",`${n} task${n>1?"s":""}`].filter(Boolean).map(esc_).join(" · ")}</div>
 ${all&&named?`<div class="tq-done"><div class="tq-party">🎉</div><b>All done, ${esc_(pr.name.split(" ")[0])}!</b></div>`:""}
 <div class="tq-col">${tasks}</div>
 ${named?(done?`<div class="tq-k">Your completion code</div><div class="tq-code big" id="tq-code">${c}</div>${copyBtn(c,"📋 Copy code","tq-btn big")}
   ${all?"":`<div class="tq-mut">You can hand this in now, but tasks you haven’t done will show as not started. ${nextId?`<a href="#${nextId}">Do the next task</a>.`:""}</div>`}
   <div class="tq-box"><b>How to hand it in</b><span>1. Go back to the assignment in Google Classroom.<br>2. Paste the code as a <b>private comment</b>.<br>3. Click <b>Turn in</b>.</span></div><div class="tq-mut">Not ${esc_(pr.name)}? <button class="tq-link" data-tq="rename">Change name</button></div>`
  :`<a class="tq-btn big" href="#${nextId}">Start the first task →</a><div class="tq-mut">Working as <b>${esc_(pr.name)}</b> · <button class="tq-link" data-tq="rename">Change name</button></div>`)
 :`<label class="tq-lab">Your name (so your teacher knows it’s you)<input class="tq-in" id="tq-name" maxlength="30" placeholder="e.g. Niamh O." autocomplete="off"></label>${privacy("Your name stays on this device. It only goes into the code you hand in.")}<button class="tq-btn big" data-tq="name" data-k="${p}">Start →</button>`}
 <div class="tq-mut"><a href="#students">How do assignments work?</a></div></div>`}
function pageResults(p){const mine=LS.get(KP+"-mysets",[]);let set=p?dec(p):null;const codes=parse(R.text);
 if(!set&&codes.length){const m=mine.find(m=>codes.some(c=>c.S===setId(m.p)));if(m){p=m.p;set=dec(p)}}
 const S=set?setId(p):null;let rows=[],flag=[];
 if(set){const by={},sum=a=>a.reduce((x,y)=>x+(y||0),0);for(const c of codes){if(c.S!==S||!c.ok||c.scores.length!==set.s.length){flag.push(c);continue}const prev=by[c.N];if(!prev||sum(c.scores)>=sum(prev.scores))by[c.N]=c}rows=Object.values(by).sort((a,b)=>a.N.localeCompare(b.N))}
 const pc=v=>v==null?"tq-h0":v>=85?"tq-h9":v>=70?"tq-h7":v>=55?"tq-h5":"tq-h3",avg=a=>{const b=a.filter(x=>x!=null);return b.length?Math.round(b.reduce((x,y)=>x+y,0)/b.length):null};
 const taskAvg=set?set.s.map((_,i)=>avg(rows.map(r=>r.scores[i]))):[],overall=avg(rows.map(r=>avg(r.scores)));
 const low=set&&rows.length?set.s.map((h,i)=>[h,taskAvg[i]]).filter(x=>x[1]!=null).sort((a,b)=>a[1]-b[1])[0]:null;
 return `<div class="tq-row sp"><div><div class="tq-k">Class results</div><h3 class="tq-h sm">${set?esc_([set.c,set.t].filter(Boolean).join(" · ")):"Paste your students’ codes"}</h3></div>${privacy("<b>Worked out on this computer. Nothing is uploaded.</b>")}</div>
 <div class="tq-two w2"><div class="tq-box"><div class="tq-k">Paste completion codes</div><textarea class="tq-in tq-ta" id="tq-codes" spellcheck="false" wrap="off" placeholder="Paste the codes here, one per line, or the whole column from a Google Form export">${esc_(R.text)}</textarea>
   <span class="tq-mut">Copy the private comments from Google Classroom, or paste a whole column. Anything that isn’t a code is ignored.</span><button class="tq-btn" data-tq="show" data-k="${p||""}">Show results</button>
   ${codes.length&&set?`<span class="tq-ok">✓ ${rows.length} student${rows.length===1?"":"s"} read${flag.length?` · <span class="tq-bad">${flag.length} flagged</span>`:""}</span>`:""}
   ${!set&&codes.length?`<span class="tq-bad">These codes are for an assignment that wasn’t created on this computer. Open the results link you got when you created it.</span>`:""}</div>
  <div class="tq-col">${set&&rows.length?`<div class="tq-stats">${[["Codes read",rows.length],["Class average",overall==null?"–":overall+"%"],["Lowest task",low?T(low[0])+" ("+low[1]+"%)":"–"]].map(([l,v])=>`<div class="tq-box"><div class="tq-k">${l}</div><b class="tq-big ${String(v).length>8?"sm":""}">${esc_(String(v))}</b></div>`).join("")}</div>
   <div class="tq-box tq-scroll"><table class="tq-tab"><tr><th>Student</th>${set.s.map(h=>`<th>${esc_(T(h))}</th>`).join("")}<th>Overall</th></tr>
   ${rows.map(r=>{const o=avg(r.scores);return `<tr><td class="n">${esc_(nice(r.N))}</td>${r.scores.map(x=>`<td class="${pc(x)}">${x==null?"not started":x+"%"}</td>`).join("")}<td class="${pc(o)}">${o==null?"–":o+"%"}</td></tr>`}).join("")}
   <tr><td class="n tq-gold">Class average</td>${taskAvg.map(a=>`<td class="${pc(a)} tq-avg">${a==null?"–":a+"%"}</td>`).join("")}<td class="${pc(overall)} tq-avg">${overall==null?"–":overall+"%"}</td></tr></table></div>
   ${flag.length?`<div class="tq-box"><b class="tq-bad">Flagged codes</b><span class="tq-mut">These were edited, damaged, from a different assignment, or from another Science Realms site:</span>${flag.map(f=>`<code class="tq-flag">${esc_(f.raw)}</code>`).join("")}</div>`:""}
   <div class="tq-row"><button class="tq-btn g" data-tq="csv" data-k="${p}">⤓ Download CSV for your markbook</button></div>`
  :`<div class="tq-box tq-mut">${set?`Assignment: <b>${esc_(set.t)}</b> · ${set.s.length} task${set.s.length>1?"s":""}. Paste codes and press <b>Show results</b>.`:mine.length?`Paste codes, or pick an assignment:<div class="tq-list">${mine.slice(0,8).map(m=>`<a class="tq-item" href="#results=${m.p}"><b>${esc_(m.t)}</b><span class="tq-mut">${esc_(m.c||"")}</span></a>`).join("")}</div>`:"Paste codes from an assignment you created on this computer, or open the results link you got when you created it."}</div>`}</div></div>`}
function csv(p){const set=dec(p);if(!set)return;const S=setId(p),by={};for(const c of parse(R.text))if(c.S===S&&c.ok&&c.scores.length===set.s.length)by[c.N]=c;
 const q=s=>`"${String(s).replace(/"/g,'""')}"`,lines=[["Student",...set.s.map(T),"Overall"].map(q).join(",")];
 for(const r of Object.values(by).sort((a,b)=>a.N.localeCompare(b.N))){const b=r.scores.filter(x=>x!=null);lines.push([nice(r.N),...r.scores.map(x=>x==null?"":x),b.length?Math.round(b.reduce((x,y)=>x+y,0)/b.length):""].map(q).join(","))}
 const blob=new Blob([lines.join("\r\n")],{type:"text/csv"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(set.c?set.c+" ":"")+set.t.replace(/[^\w ]+/g,"").slice(0,40)+" results.csv";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}

const handles=h=>["teachers","students","teach-new","results"].includes(h)||/^(results|set)=/.test(h);
function render(){const h=cur,isSet=h.startsWith("set="),isRes=h.startsWith("results");
 const body=h==="teachers"?pageTeachers():h==="students"?pageStudents():h==="teach-new"?pageBuilder():isSet?pageSet(h.slice(4)):h==="results"?pageResults(null):isRes?pageResults(h.slice(8)):pageTeachers();
 const title=isSet?"Assignment":isRes?"Class results":h==="students"?"For students":"For teachers";
 const [back,bl]=isSet?["students","Help"]:h==="teachers"?["","Home"]:["teachers","Teachers"];
 frame(C.name,title,back,bl,`<section class="panel tq-pg" id="tq-root">${body}</section>`)}
function route(h){if(h!==cur&&h.startsWith("results"))R.text="";cur=h;render()}
function sync(){const g=id=>{const e=document.querySelector(id);return e?e.value:null};const t=g("#tq-t"),c=g("#tq-c"),d=g("#tq-d"),x=g("#tq-codes");if(t!=null)B.t=t;if(c!=null)B.c=c;if(d!=null)B.d=d;if(x!=null)R.text=x}
document.addEventListener("click",e=>{const b=e.target.closest("#tq-root [data-tq]");if(!b||b.disabled)return;const a=b.dataset.tq,k=b.dataset.k;sync();
 if(a==="copy"){const txt=b.dataset.txt,done=()=>{const o=b.textContent;b.textContent="✓ Copied";setTimeout(()=>{b.textContent=o},1400)};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done,()=>prompt("Copy this:",txt));else prompt("Copy this:",txt);return}
 if(a==="unit")B.unit=k;
 if(a==="pick"){B.sel=B.sel.includes(k)?B.sel.filter(x=>x!==k):B.sel.length<12?[...B.sel,k]:B.sel;B.out=null}
 if(a==="make"&&B.sel.length){const set={t:B.t.trim()||C.name+" assignment",c:B.c.trim(),d:B.d.trim(),s:B.sel.slice()},p=enc(set);B.out=p;const mine=LS.get(KP+"-mysets",[]).filter(m=>m.p!==p);mine.unshift({p,t:set.t,c:set.c,d:set.d,n:set.s.length,at:Date.now()});LS.set(KP+"-mysets",mine.slice(0,30))}
 if(a==="name"){const i=document.querySelector("#tq-name"),v=i?i.value:"";if(!v.trim()){if(i){i.focus();i.classList.add("tq-err")}return}const S=setId(k),pr=prog(S);pr.name=v.trim().slice(0,30);saveProg(S,pr)}
 if(a==="rename"){const S=setId(cur.slice(4)),pr=prog(S);pr.name="";saveProg(S,pr)}
 if(a==="csv"){csv(k);return}
 render()});
document.addEventListener("input",e=>{if(e.target.id==="tq-name")e.target.classList.remove("tq-err")});
return {handles,route,record,_code:code,_enc:enc,_dec:dec,_setId:setId};
})();
