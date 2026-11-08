const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const F='file://'+__dirname+'/../quiztoplasm.html';
const p=await b.newPage({viewport:{width:1000,height:1100}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
for(const g of ['bloodfilm','heart','dnalab']){await p.goto(F+'#game-'+g);await p.waitForTimeout(400);let n=0;
 for(let i=0;i<120;i++){const t=await p.textContent('#gamewrap').catch(()=>'');if(/Play again/.test(t))break;
  const nx=await p.$('#gamewrap [data-act="next"]');if(nx){await nx.click();n++;if(n===1||n===6||n===13)await p.screenshot({path:__dirname+`/b2-${g}-${n}.png`,fullPage:true});continue}
  const chk=await p.$('#gamewrap [data-act="check"]:not([disabled])');if(chk){await chk.click();continue}
  const sp=await p.$('#gamewrap [data-act="spot"]');if(sp&&!(await p.$('#gamewrap [data-act="check"]'))){await p.locator('#gamewrap [data-act="spot"]').nth(1).click({force:true});continue}
  if(sp){await p.locator('#gamewrap [data-act="spot"]').nth(1).click({force:true});continue}
  const op=await p.$('#gamewrap [data-act="opt"]:not([disabled])');if(op){await op.click();continue}
  const od=await p.$('#gamewrap [data-act="ord"]:not([disabled]):not(.on)');if(od){await od.click();continue}
  const inp=await p.$('#gans');if(inp){await inp.fill('25');await p.click('#gamewrap [data-act="num"]');continue}
  console.log('stuck',g,i);await p.screenshot({path:__dirname+`/b2-stuck-${g}.png`,fullPage:true});break}
 console.log(g,'done',(await p.textContent('#gamewrap .big').catch(()=>'NO')))}
await p.goto(F+'#game-bloodfilm');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/b2-film.png',fullPage:true});
await p.goto(F+'#game-heart');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/b2-heart.png',fullPage:true});
const m=await b.newPage({viewport:{width:390,height:844}});for(const g of ['bloodfilm','heart','dnalab']){await m.goto(F+'#game-'+g);await m.waitForTimeout(300);console.log('mobile',g,await m.evaluate(()=>document.documentElement.scrollWidth))}
console.log(errs);await b.close()})();
