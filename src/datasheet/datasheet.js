/* ================= DATA SHEET: periodic table, constants and IR (values as on the CCEA Chemistry Data Sheet) ================= */
const DataSheet=(()=>{
const E=`1 H Hydrogen 1;2 He Helium 4;3 Li Lithium 7;4 Be Beryllium 9;5 B Boron 11;6 C Carbon 12;7 N Nitrogen 14;8 O Oxygen 16;9 F Fluorine 19;10 Ne Neon 20;11 Na Sodium 23;12 Mg Magnesium 24;13 Al Aluminium 27;14 Si Silicon 28;15 P Phosphorus 31;16 S Sulfur 32;17 Cl Chlorine 35.5;18 Ar Argon 40;19 K Potassium 39;20 Ca Calcium 40;21 Sc Scandium 45;22 Ti Titanium 48;23 V Vanadium 51;24 Cr Chromium 52;25 Mn Manganese 55;26 Fe Iron 56;27 Co Cobalt 59;28 Ni Nickel 59;29 Cu Copper 64;30 Zn Zinc 65;31 Ga Gallium 70;32 Ge Germanium 73;33 As Arsenic 75;34 Se Selenium 79;35 Br Bromine 80;36 Kr Krypton 84;37 Rb Rubidium 85;38 Sr Strontium 88;39 Y Yttrium 89;40 Zr Zirconium 91;41 Nb Niobium 93;42 Mo Molybdenum 96;43 Tc Technetium [98];44 Ru Ruthenium 101;45 Rh Rhodium 103;46 Pd Palladium 106;47 Ag Silver 108;48 Cd Cadmium 112;49 In Indium 115;50 Sn Tin 119;51 Sb Antimony 122;52 Te Tellurium 128;53 I Iodine 127;54 Xe Xenon 131;55 Cs Caesium 133;56 Ba Barium 137;57 La Lanthanum 139;58 Ce Cerium 140;59 Pr Praseodymium 141;60 Nd Neodymium 144;61 Pm Promethium 145;62 Sm Samarium 150;63 Eu Europium 152;64 Gd Gadolinium 157;65 Tb Terbium 159;66 Dy Dysprosium 162;67 Ho Holmium 165;68 Er Erbium 167;69 Tm Thulium 169;70 Yb Ytterbium 173;71 Lu Lutetium 175;72 Hf Hafnium 178;73 Ta Tantalum 181;74 W Tungsten 184;75 Re Rhenium 186;76 Os Osmium 190;77 Ir Iridium 192;78 Pt Platinum 195;79 Au Gold 197;80 Hg Mercury 201;81 Tl Thallium 204;82 Pb Lead 207;83 Bi Bismuth 209;84 Po Polonium [209];85 At Astatine [210];86 Rn Radon [222];87 Fr Francium [223];88 Ra Radium [226];89 Ac Actinium [227];90 Th Thorium 232;91 Pa Protactinium [231];92 U Uranium 238;93 Np Neptunium [237];94 Pu Plutonium [242];95 Am Americium [243];96 Cm Curium [247];97 Bk Berkelium [245];98 Cf Californium [251];99 Es Einsteinium [254];100 Fm Fermium [253];101 Md Mendelevium [256];102 No Nobelium [254];103 Lr Lawrencium [257];104 Rf Rutherfordium [261];105 Db Dubnium [262];106 Sg Seaborgium [266];107 Bh Bohrium [264];108 Hs Hassium [277];109 Mt Meitnerium [268];110 Ds Darmstadtium [271];111 Rg Roentgenium [272]`.split(";").map(s=>{const [z,sym,name,m]=s.split(" ");return {z:+z,sym,name,m}});
const pos=z=>z===1?[1,1]:z===2?[1,18]:z<=10?[2,z<=4?z-2:z+8]:z<=18?[3,z<=12?z-10:z]:z<=36?[4,z-18]:z<=54?[5,z-36]:z<=57?[6,z-54]:z<=71?[9,z-53]:z<=86?[6,z-68]:z<=89?[7,z-86]:z<=103?[10,z-85]:[7,z-100];
const blk=(r,c)=>r>=9?"f":c<=2?"s":c>=13?"p":"d";
const GROUP={1:"I",2:"II",13:"III",14:"IV",15:"V",16:"VI",17:"VII",18:"O"};
const CONST=[["1 tonne","10⁶ g"],["1 metre","10⁹ nm"],["One mole of any gas at 293 K and 1 atmosphere (10⁵ Pa) occupies","24 dm³"],["Avogadro constant","6.02 × 10²³ mol⁻¹"],["Planck constant","6.63 × 10⁻³⁴ J s"],["Specific heat capacity of water","4.2 J g⁻¹ K⁻¹"],["Speed of light","3 × 10⁸ m s⁻¹"]];
const IR=[["550–850","C–X (X = Cl, Br, I)","Haloalkanes"],["750–1100","C–C","Alkanes, alkyl groups"],["1000–1300","C–O","Alcohols, esters, carboxylic acids"],["1450–1650","C=C","Arenes"],["1600–1700","C=C","Alkenes"],["1650–1800","C=O","Carboxylic acids, esters, aldehydes, ketones, amides, acyl chlorides"],["2200–2300","C≡N","Nitriles"],["2500–3200","O–H","Carboxylic acids"],["2750–2850","C–H","Aldehydes"],["2850–3000","C–H","Alkanes, alkyl groups, alkenes, arenes"],["3200–3600","O–H","Alcohols"],["3300–3500","N–H","Amines, amides"]];
const LS={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let st={open:false,pinned:LS.get("ds-pinned",false),exam:LS.get("ds-exam",false),tab:LS.get("ds-tab","pt"),sel:null,visible:false};
const phone=()=>window.matchMedia("(max-width:759px)").matches;
const root=document.createElement("div");root.id="ds-root";document.body.appendChild(root);
function table(){let h="";for(let c=1;c<=18;c++)h+=`<div class="ds-gh" style="grid-row:1;grid-column:${c}">${GROUP[c]?`<b>${GROUP[c]}</b>`:""}<small>${c}</small></div>`;
 for(const e of E){const [r,c]=pos(e.z);h+=`<button type="button" class="ds-el ${blk(r,c)} ${st.sel===e.z?"on":""}" style="grid-row:${r+1};grid-column:${c}" data-ds="el" data-k="${e.z}" aria-label="${e.name}, atomic number ${e.z}, relative atomic mass ${e.m}"><span class="ds-m">${e.m}</span><b>${e.sym}</b><span class="ds-n">${e.name}</span><span class="ds-z">${e.z}</span></button>`}
 h+=`<div class="ds-key" style="grid-row:2/4;grid-column:3/13"><span class="ds-el d ds-demo" aria-hidden="true"><span class="ds-m">a</span><b>X</b><span class="ds-z">b</span></span><span>a = relative atomic mass (approx)<br>X = atomic symbol · b = atomic number</span></div>`;
 h+=`<div class="ds-note" style="grid-row:8;grid-column:12/19">Elements with atomic numbers 112–118 have been reported</div><div class="ds-lbl" style="grid-row:10;grid-column:1/5">* 58–71 Lanthanum series</div><div class="ds-lbl" style="grid-row:11;grid-column:1/5">† 90–103 Actinium series</div>`;
 return `<div class="ds-scroll"><div class="ds-pt">${h}</div></div>`}
function info(){const e=E.find(x=>x.z===st.sel);return e?`<div class="ds-info" aria-live="polite"><b class="ds-isym">${e.sym}</b><span><b>${e.name}</b><br>Atomic number ${e.z} · Relative atomic mass <b>${e.m}</b></span></div>`:`<div class="ds-info ds-hint" aria-live="polite">Tap an element to see its name, atomic number and relative atomic mass.</div>`}
function body(){if(st.tab==="c")return `<dl class="ds-const">${CONST.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>`;
 if(st.tab==="ir")return `<div class="ds-irwrap"><table class="ds-ir"><caption>Characteristic absorptions in IR spectroscopy</caption><thead><tr><th scope="col">Wavenumber / cm⁻¹</th><th scope="col">Bond</th><th scope="col">Compound</th></tr></thead><tbody>${IR.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
 return info()+table()}
function render(){
 const side=st.pinned&&!phone(),show=st.visible;
 document.documentElement.classList.toggle("ds-sided",show&&side);
 if(!show){root.innerHTML="";return}
 const tabs=`<div class="ds-tabs" role="tablist" aria-label="Data sheet sections">${[["pt","Periodic table"],["c","Constants"],["ir","IR (AS2)"]].map(([k,l])=>`<button type="button" role="tab" aria-selected="${st.tab===k}" class="${st.tab===k?"on":""}" data-ds="tab" data-k="${k}">${l}</button>`).join("")}</div>`;
 const tools=`<div class="ds-tools"><label class="ds-exam"><input type="checkbox" data-ds="exam" ${st.exam?"checked":""}> Exam view</label>${phone()?"":`<button type="button" class="ds-btn" data-ds="pin">${side?"⇤ Unpin":"Pin to side ⇥"}</button>`}${side?"":`<button type="button" class="ds-btn ds-close" data-ds="close" aria-label="Close data sheet">${phone()?"Done":"Hide ▾"}</button>`}</div>`;
 const head=`<div class="ds-head"><div class="ds-title">📋 Data sheet<small>Values as on the CCEA Chemistry Data Sheet</small></div>${tools}</div>${tabs}`;
 if(side){root.innerHTML=`<aside class="ds-side ${st.exam?"ds-plain":""}" aria-label="Data sheet">${head}<div class="ds-body">${body()}</div></aside>`;return}
 root.innerHTML=st.open?`<div class="ds-drawer ${phone()?"ds-phone":""} ${st.exam?"ds-plain":""}" role="dialog" aria-label="Data sheet"><div class="ds-grab" aria-hidden="true"></div>${head}<div class="ds-body">${body()}</div></div>`
  :`<button type="button" class="ds-tab" data-ds="open" aria-label="Open the data sheet">📋 ${phone()?"Periodic table":"Data sheet"} ▴</button>`}
function update(){const h=location.hash.slice(1),view=document.querySelector("#view");
 const isTeach=typeof Teach!=="undefined"&&Teach.handles(h),isWorld=typeof WORLDS!=="undefined"&&WORLDS.some(w=>w.hash===h);
 st.visible=!!(h&&view&&!view.hidden&&!/^notes-/.test(h)&&!isTeach&&!isWorld);if(!st.visible)st.open=false;render()}
root.addEventListener("click",e=>{const b=e.target.closest("[data-ds]");if(!b)return;const a=b.dataset.ds,k=b.dataset.k;
 if(a==="open")st.open=true;if(a==="close")st.open=false;if(a==="tab"){st.tab=k;LS.set("ds-tab",k)}
 if(a==="pin"){st.pinned=!st.pinned;st.open=!st.pinned?true:st.open;LS.set("ds-pinned",st.pinned)}
 if(a==="el")st.sel=+k;if(a==="exam")return;
 const sc=root.querySelector(".ds-scroll"),x=sc?sc.scrollLeft:0;render();const sc2=root.querySelector(".ds-scroll");if(sc2)sc2.scrollLeft=x;
 if(a==="open"){const f=root.querySelector(".ds-tabs .on");if(f)f.focus()}if(a==="close"){const t=root.querySelector(".ds-tab");if(t)t.focus()}});
root.addEventListener("change",e=>{if(e.target.dataset.ds==="exam"){st.exam=e.target.checked;LS.set("ds-exam",st.exam);render()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&st.open&&!(st.pinned&&!phone())){st.open=false;render()}});
window.addEventListener("hashchange",update);window.addEventListener("resize",()=>{clearTimeout(window._dsr);window._dsr=setTimeout(render,150)});
update();
return {update,_E:E};
})();
