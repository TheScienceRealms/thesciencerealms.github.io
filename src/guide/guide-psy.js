/* ================= TEACHER GUIDE: Mr Quigley and Mrs Byrne ================= */
const Guide=(()=>{
const ART=__GUIDE_ART__; // {quigley:{stand,explain,confused,excited}, byrne:{...}}
const NAMES={quigley:"Mr Quigley",byrne:"Mrs Byrne"},IDS=["quigley","byrne"];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const esc_=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const el=document.createElement("div");el.id="tg";el.setAttribute("aria-live","polite");document.body.appendChild(el);
let st={on:false,hidden:LS.get("tg-hidden",false),who:"quigley",pose:"stand",msg:"",btns:[],open:true,key:"",qi:-1,streak:0,idle:null,lastTop:null};
const hashNum=s=>{let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h};
const mcQ=()=>(typeof G!=="undefined"&&G&&Array.isArray(G.qs)&&G.qs[G.i]&&Array.isArray(G.qs[G.i].opts))?G.qs[G.i]:null;
const canHint=()=>{const q=mcQ();if(!q||G.answered)return false;const left=[...document.querySelectorAll('#view .opt')].filter((b,n)=>!q.opts[n].ok&&!b.classList.contains("tg-out")&&!b.disabled);const total=q.opts.filter(o=>!o.ok).length;return left.length>0&&(total-left.length)<Math.max(1,total-1)};
function render(){
 document.documentElement.classList.toggle("tg-pad",st.on&&!st.hidden);
 if(!st.on){el.innerHTML="";return}
 if(st.hidden){el.innerHTML=`<button type="button" class="tg-show" data-tg="show" aria-label="Show your teacher guide">🙋 Guide</button>`;return}
 const btns=st.btns.map(([k,l,g])=>`<button type="button" class="tg-b ${g?"g":""}" data-tg="${k}">${l}</button>`).join("");
 el.innerHTML=`${st.open&&st.msg?`<div class="tg-bub" role="status"><button type="button" class="tg-x" data-tg="close" aria-label="Close message">×</button><b class="tg-nm">${NAMES[st.who]}</b><div>${st.msg}</div>${btns?`<div class="tg-row">${btns}</div>`:""}</div>`:""}
 <button type="button" class="tg-who" data-tg="tap" aria-label="${NAMES[st.who]}, your teacher guide. Tap for help.">${ART[st.who][st.pose]}</button>
 <button type="button" class="tg-min" data-tg="hide" aria-label="Hide the guide">–</button>`}
function say(pose,msg,btns=[],who){if(who)st.who=who;st.pose=pose;st.msg=msg;st.btns=btns;st.open=true;render()}
function standMsg(){const hint=canHint();say("stand",hint?"Stuck? I can give you a clue for this one.":"I’m here if you need me. Take your time!",hint?[["hint","💡 Give me a hint"]]:[])}
function idleReset(){clearTimeout(st.idle);if(!st.on)return;st.idle=setTimeout(()=>{if(!st.on||st.pose==="excited")return;const hint=canHint();
 say("confused",hint?"Taking your time? That’s fine. Want a clue?":"Still thinking? Have another look at the question, you’ve got this.",hint?[["hint","💡 Yes, a hint please"],["close","I’m fine",1]]:[])},60000)}
function giveHint(){const q=mcQ();if(!q)return;const btns=[...document.querySelectorAll('#view .opt')];const cand=btns.map((b,n)=>[b,n]).filter(([b,n])=>!q.opts[n].ok&&!b.classList.contains("tg-out")&&!b.disabled);
 if(!cand.length)return standMsg();const [b,n]=cand[Math.floor(Math.random()*cand.length)];b.classList.add("tg-out");b.disabled=true;b.setAttribute("aria-label",(b.textContent||"")+" (ruled out by your guide)");
 const t=(q.opts[n].t||"").trim();say("explain",`Here’s a clue: it’s <b>not</b> “${esc_(t.length>70?t.slice(0,68)+"…":t)}”. Now look again at the key words in the question.`,canHint()?[["hint","Another hint",1]]:[]);idleReset()}
function onAnswer(ok){if(ok){st.streak=0;if(st.pose!=="stand"){st.pose="stand";st.open=false;st.msg="";render()}return}
 st.streak++;if(st.streak>=2)say("confused",`That’s ${st.streak} in a row, don’t worry! Read the explanation carefully, then try the next one. Each question gets you closer.`,[["close","Thanks",1]])}
function onResults(){const big=document.querySelector("#view .big");if(!big)return;const m=big.textContent.match(/(\d+)\s*\/\s*(\d+)/);const pct=m?(+m[1])/(+m[2]):0;clearTimeout(st.idle);
 if(pct>=.5)say("excited",pct===1?`Full marks, <b>${esc_(big.textContent.trim())}</b>! Amazing work!`:`Brilliant, <b>${esc_(big.textContent.trim())}</b>! You really know this. Play again to beat it?`);
 else say("stand",`<b>${esc_(big.textContent.trim())}</b>. Good effort! Have a look at the Mind Notes for this topic, then try again. You’ll beat it.`)}
function sync(){const view=document.querySelector("#view");const h=location.hash.slice(1);
 const show=!!(typeof G!=="undefined"&&G&&view&&!view.hidden&&!(typeof Teach!=="undefined"&&Teach.handles(h)));
 if(!show){if(st.on){st.on=false;clearTimeout(st.idle);render()}return}
 const key=h+"|"+(G&&G.key||"");const qi=(G&&typeof G.i==="number")?G.i:-1;
 if(!st.on||key!==st.key){st.on=true;st.key=key;st.qi=qi;st.streak=0;st.who=IDS[hashNum(h)%2];
  if(document.querySelector("#view .big"))return onResults();
  say("stand",`Hi, I’m ${NAMES[st.who]}! ${canHint()?"Stuck on a question? Tap the hint button.":"Tap me any time if you need encouragement."}`,canHint()?[["hint","💡 Give me a hint"]]:[]);setTimeout(()=>{if(st.pose==="stand"&&st.key===key){st.open=false;render()}},6000);idleReset();return}
 if(qi!==st.qi){st.qi=qi;if(qi>=0&&mcQ()){st.who=IDS[(hashNum(h)+qi)%2];if(st.pose!=="confused"||st.streak<2){st.pose="stand";st.open=false;st.msg=""}render()}idleReset()}}
// watch the activity for answers, results and screen changes
const mo=new MutationObserver(muts=>{if(!st.on){sync();return}
 let ok=false,bad=false,res=false;for(const m of muts)for(const n of m.addedNodes){if(n.nodeType!==1||n.closest&&n.closest("#tg"))continue;
  if(n.matches&&n.matches(".explain.ok")||n.querySelector&&n.querySelector(".explain.ok"))ok=true;
  if(n.matches&&n.matches(".explain.bad")||n.querySelector&&n.querySelector(".explain.bad"))bad=true;
  if(n.matches&&n.matches(".big")||n.querySelector&&n.querySelector(".big"))res=true}
 if(res){onResults();return}if(ok||bad)onAnswer(ok&&!bad);sync()});
mo.observe(document.body,{childList:true,subtree:true});
window.addEventListener("hashchange",()=>setTimeout(sync,0));
document.addEventListener("click",e=>{if(st.on&&!e.target.closest("#tg"))idleReset()},true);
el.addEventListener("click",e=>{const b=e.target.closest("[data-tg]");if(!b)return;const a=b.dataset.tg;
 if(a==="hint")return giveHint();
 if(a==="close"){st.open=false;if(st.pose==="confused")st.pose="stand";return render()}
 if(a==="tap"){if(st.open&&st.msg){st.open=false;return render()}return st.pose==="excited"?(st.open=true,render()):standMsg()}
 if(a==="hide"){st.hidden=true;LS.set("tg-hidden",true);return render()}
 if(a==="show"){st.hidden=false;LS.set("tg-hidden",false);return standMsg()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&st.on&&st.open){st.open=false;render()}});
setTimeout(sync,0);
return {sync,_st:()=>st};
})();
