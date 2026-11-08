const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:900,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../quiztoplasm.html';
async function play(g,shots){
  for(let r=0;r<40;r++){
    if(await p.$('#gnext')){await p.click('#gnext');continue}
    if(await p.$('.result'))break;
    const opt=await p.$('.opt[data-act="opt"]');if(opt){if(shots.includes(r))await p.screenshot({path:__dirname+`/g-${g}-${r}.png`});await opt.click();continue}
    const ord=await p.$$('.opt[data-act="ord"]');if(ord.length){for(let i=0;i<ord.length;i++)await p.locator(".opt[data-act=ord]").nth(i).click();await p.click('[data-act="check"]');continue}
    const inp=await p.$('#gans');if(inp){if(shots.includes(r))await p.screenshot({path:__dirname+`/g-${g}-${r}.png`});await inp.fill('-500');await p.click('[data-act="num"]');continue}
    const sp=await p.$$('g[data-act="spot"]');if(sp.length){await p.evaluate(()=>{const gs=[...document.querySelectorAll("g[data-act=spot]")];gs[gs.length-1].dispatchEvent(new MouseEvent("click",{bubbles:true}))});const c=await p.$('[data-act="check"]:not([disabled])');if(c)await c.click();if(shots.includes(r))await p.screenshot({path:__dirname+`/g-${g}-${r}.png`});continue}
    const slots=await p.$$('[data-act="slot"]');
    if(slots.length){for(let i=0;i<slots.length;i++){if(!(await p.$(".tile")))break;await p.locator(".tile").first().click();await p.locator("[data-act=slot]").nth(i).click()}
      const c=await p.$('[data-act="check"]:not([disabled])');if(!c){console.log('cannot check',g,r);break}await c.click();if(shots.includes(r))await p.screenshot({path:__dirname+`/g-${g}-${r}.png`});continue}
    console.log('stuck',g,r);break}
  console.log(g,'finished:',!!(await p.$('.result')));
}
for(const g of ['molecules','dna','osmosis','surgery']){await p.goto(f+'#game-'+g);await p.waitForTimeout(400);await p.screenshot({path:__dirname+`/g-${g}-start.png`});await play(g,[2,4,6,10]);}
await p.goto(f+'#cellular-frontier');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/w1b.png',fullPage:true});
console.log(errs);await b.close()})();
