const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../chemquest.html';
const ids=['1-1','1-2','1-3','1-4','1-5','1-6','1-7','1-8','1-9','1-10','2-1','2-2','2-3','2-4','2-5','2-6','2-7','2-8','2-9','2-10','2-11'];
for(const id of ids){await p.goto(f+'#notes-'+id);await p.waitForTimeout(150);if(['1-2','1-9','2-9','2-7','1-6'].includes(id))await p.screenshot({path:__dirname+`/n-${id}.png`,fullPage:true});}
await p.goto(f+'#ionic');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/i-0.png',fullPage:true});await p.click('[data-act=istart]');
for(let r=0;r<6;r++){
  await p.locator('.spc[data-act=isplit]').first().click();await p.click('[data-act=is1]');
  await p.locator('.spc[data-act=ispec]').first().click();await p.click('[data-act=is2]');
  if(r===0)await p.screenshot({path:__dirname+'/i-1.png',fullPage:true});
  await p.locator('.opt[data-act=ipick]').first().click();if(r===0)await p.screenshot({path:__dirname+'/i-2.png',fullPage:true});await p.click('#nx');}
console.log('ionic done',!!(await p.$('.big')));
await p.goto(f+'#colour-1-8');await p.waitForTimeout(300);
for(let i=0;i<12;i++){const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o)await o.click();if(await p.$('.eqbox')){await p.screenshot({path:__dirname+'/c-eq.png',fullPage:true});break}await p.click('#nx')}
await p.goto(f+'#elemental-frontier');await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/w1b.png'});
console.log(errs);await b.close()})();
