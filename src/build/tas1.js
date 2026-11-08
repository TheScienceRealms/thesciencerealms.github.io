const {chromium}=require('playwright');
const F='file://'+__dirname+'/../quiztoplasm.html';
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const W=ms=>p.waitForTimeout(ms);const has=async s=>!!(await p.$(s));const big=async()=>p.textContent('#sim .big').catch(()=>'NO');
const shot=n=>p.screenshot({path:__dirname+'/a1-'+n+'.png',fullPage:true});
const nextBtn=async()=>{for(const a of ['next','manext']){const e=await p.$(`#sim [data-act="${a}"]`);if(e){await e.click();await W(60);return true}}return false};
const mcqFirst=async()=>{const o=await p.$('#sim .opt:not([disabled])');if(o){await o.click();await W(40);return true}return false};
const ok=async()=>has('#sim .explain.ok');
async function tapLoop(sel){const keys=await p.$$eval(sel,d=>[...new Set(d.map(x=>x.dataset.k))]);for(const k of keys){if(await ok())return true;const el=p.locator(`${sel}[data-k="${k}"]`).first();try{await el.click({timeout:700})}catch(e){FB.add(sel.match(/act="(\w+)/)[1]+':'+k);await el.dispatchEvent('click')}await W(40)}return ok()}
const shots={};const FB=new Set();const snap=async(n,cond)=>{if(!shots[n]&&cond){shots[n]=1;await shot(n)}};
// MOLECULAR ARCHITECT
await p.goto(F+'#sim-molarch');await W(300);await shot('molarch-0');
const MA={maltose:[['ag','ag'],'c',0,1],sucrose:[['ag','fr'],'c',2,1],starch:[['ag','ag','ag'],'c',0,2],cellulose:[['bg','bg','bg'],'c',1,2],triglyceride:[['gl','fa','fa','fa'],'c',3,3],dipeptide:[['aa','aa'],'c',4,1]};
for(let i=0;i<40;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;if(await has('#sim [data-act="marun"]')){const t=await p.textContent('#sim .qbox2');let key=Object.keys(MA).find(k=>t.toLowerCase().includes(k));let [m,rx,bd,w]=MA[key];if(/Hydrolyse/.test(t))rx='h';
  for(const k of m)await p.click(`#sim [data-act="mapick"][data-k="${k}"]`);await p.click(`#sim [data-act="marx"][data-k="${rx}"]`);await p.click(`#sim [data-act="mabond"][data-k="${bd}"]`);for(let j=0;j<w;j++)await p.click('#sim [data-act="maw"][data-k="1"]');await p.click('#sim [data-act="marun"]');await W(50);
  if(!(await ok()))console.log('MA wrong on',key,await p.textContent('#sim .explain'));await snap('molarch-'+key+(rx),true);continue}
 if(await mcqFirst())continue;break}
console.log('molarch',await big());
// VESICLE
await p.goto(F+'#sim-vesicle');await W(300);
const VO=["The cell surface membrane extends","The bacterium is enclosed","Lysosomes fuse","Hydrolytic enzymes digest"];
for(let i=0;i<40;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim [data-act="vv"]')){await tapLoop('#sim svg [data-act="vv"]');await W(1000);await snap('vesicle-path',true);continue}
 if(await has('#sim [data-act="vvo"]')){for(const t of VO){const e=p.locator('#sim [data-act="vvo"]',{hasText:t});if(await e.count()){await e.first().click();await W(40)}}await snap('vesicle-ord',true);continue}
 if(await mcqFirst())continue;break}
console.log('vesicle',await big());
// MEMBRANE
await p.goto(F+'#sim-membrane');await W(300);
for(let i=0;i<60;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim svg [data-act="mct"]')&&!(await has('#sim [data-act="mcr"]'))){await tapLoop('#sim svg [data-act="mct"]');await snap('membrane-id',true);continue}
 if(await has('#sim [data-act="mcr"]:not([disabled])')){for(const k of ['bil','chn','car','act','endo','exo']){if(await ok())break;await p.click(`#sim [data-act="mcr"][data-k="${k}"]`);await W(40)}await W(1500);await snap('membrane-tr',true);continue}
 if(await has('#sim #mcin:not([disabled])')){const t=await p.textContent('#sim .qbox2');const n=[...t.matchAll(/([−\-+]?\d+) kPa/g)].map(x=>+x[1].replace('−','-'));await p.fill('#mcin',String(n[0]+n[1]));await p.click('#sim [data-act="mcw"]');await W(40);if(!(await ok()))console.log('wp wrong',t,n);continue}
 if(await mcqFirst())continue;break}
console.log('membrane',await big());
// MEIOSIS
await p.goto(F+'#sim-meiosis');await W(300);await shot('meiosis-0');
for(let i=0;i<60;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim [data-act="mmc"]')){for(const k of ['Am','Ap','Bm','Bp']){const e=await p.$(`#sim [data-act="mmc"][data-k="${k}"]`);if(e){await e.click();await W(40)}}await shot('meiosis-pair');continue}
 if(await has('#sim [data-act="mmx"]')){await p.locator('#sim [data-act="mmx"]').nth(1).click();await W(50);await shot('meiosis-cross');continue}
 if(await has('#sim [data-act="mmf"]')&&!shots.mf){shots.mf=1;await p.click('#sim [data-act="mmf"][data-k="A"]');await p.click('#sim [data-act="mmf"][data-k="B"]');await shot('meiosis-meta');continue}
 if(await has('#sim #mmin:not([disabled])')){const t=await p.textContent('#sim');await p.fill('#mmin',/different gametes/.test(t)?'4':'2');await p.click('#sim [data-act="mmn"]');await W(40);if(!(await ok()))console.log('mm num wrong');await shot(/different/.test(t)?'meiosis-gam':'meiosis-telo');continue}
 if(await mcqFirst()){if(await has('#sim .figbox .mm-svg')&&/Name the stage/.test(await p.textContent('#sim')))await snap('meiosis-id',true);continue}break}
console.log('meiosis',await big());
// CANCER
await p.goto(F+'#sim-cancer');await W(300);
for(let i=0;i<60;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim [data-act="ccw"]')&&!(await ok())){await tapLoop('#sim svg [data-act="ccw"]');await snap('cancer-wheel',true);continue}
 if(await has('#sim [data-act="ccmut"]')){await p.click('#sim [data-act="ccmut"]');for(let j=0;j<60&&!(await has('#sim [data-act="next"]'));j++)await W(500);await shot('cancer-tumour');continue}
 if(await has('#sim [data-act="ccd"]:not([disabled])')){await p.click('#sim [data-act="ccd"][data-k="fu"]');await p.click('#sim [data-act="ccd"][data-k="vin"]');await W(4000);await shot('cancer-drug');console.log('mutants after drug',await p.textContent('#ccn'));continue}
 if(await mcqFirst())continue;break}
console.log('cancer',await big());
// LEAF
await p.goto(F+'#sim-leaf');await W(300);await shot('leaf-0');
for(let i=0;i<60;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim [data-act="lfd"]')&&!shots.dn){shots.dn=1;await p.click('#sim [data-act="lfd"][data-k="1"]');await shot('leaf-night');continue}
 if(await has('#sim [data-act="lfo"]')){for(const t of ["Waxy cuticle","Upper epidermis","Palisade mesophyll","Spongy mesophyll","Lower epidermis"]){const e=p.locator('#sim [data-act="lfo"]',{hasText:t});if(await e.count()){await e.first().click();await W(40)}}await shot('leaf-block');continue}
 if(await has('#sim .opt:not([disabled])')){await mcqFirst();continue}
 if(await has('#sim svg [data-act="lft"]')&&!(await ok())){await tapLoop('#sim svg [data-act="lft"]');continue}
 break}
console.log('leaf',await big());
// 3D CELL
await p.goto(F+'#sim-cell3d');await W(300);await shot('cell3d-0');
for(let i=0;i<60;i++){if(await has('#sim .big'))break;if(await nextBtn())continue;
 if(await has('#sim .opt:not([disabled])')){await mcqFirst();continue}
 if(await has('#sim svg [data-act="c3"]')&&!(await ok())){let good=await tapLoop('#sim svg [data-act="c3"]');for(let r=0;r<4&&!good;r++){await p.click('#sim [data-act="c3r"][data-k="1"]');good=await tapLoop('#sim svg [data-act="c3"]')}if(!good)console.log('c3 stuck',await p.textContent('#sim .qbox2'));const t=await p.textContent('#sim .qbox2');await snap(/Plant/.test(t)?'cell3d-plant':/Prok/.test(t)?'cell3d-prok':'cell3d-animal',true);continue}
 break}
// drag test
console.log('cell3d',await big());
await p.goto(F+'#cellular-frontier');await W(200);await p.goto(F+'#sim-cell3d');await W(300);const bx=await p.locator('#c3svg').boundingBox();const before=await p.getAttribute('#c3l g:first-child','transform');
await p.mouse.move(bx.x+20,bx.y+20);await p.mouse.down();await p.mouse.move(bx.x+120,bx.y+60,{steps:5});await p.mouse.up();console.log('drag changed',before!==await p.getAttribute('#c3l g:first-child','transform'));
await p.goto(F+'#cellular-frontier');await W(300);console.log('lab links',(await p.$$('a[href^="#sim-"]')).length);
const m=await b.newPage({viewport:{width:390,height:844}});m.on('pageerror',e=>errs.push(e.message));for(const h of ['molarch','vesicle','membrane','meiosis','cancer','leaf','cell3d']){await m.goto(F+'#sim-'+h);await m.waitForTimeout(400);console.log('mobile',h,await m.evaluate(()=>document.documentElement.scrollWidth));if(h==='molarch'||h==='meiosis')await m.screenshot({path:__dirname+'/a1-m-'+h+'.png',fullPage:true})}
console.log('fallback clicks',[...FB]);console.log('errors',errs);await b.close()})();
