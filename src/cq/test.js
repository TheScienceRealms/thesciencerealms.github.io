const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1000,height:900}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
const f='file://'+__dirname+'/../chemquest.html';const shot=n=>p.screenshot({path:__dirname+'/s-'+n+'.png'});
await p.goto(f);await p.waitForTimeout(1500);await p.screenshot({path:__dirname+'/s-hub.png',fullPage:true});
await p.goto(f+'#elemental-frontier');await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/s-w1.png',fullPage:true});
// dash all for 1.2
await p.goto(f+'#dash-1-2-all');await p.waitForTimeout(500);await shot('dash');
for(let i=0;i<20;i++){if(await p.$('.result, .big'))break;const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o)await o.click();const n=await p.$('#nx');if(n)await n.click();}
console.log('dash done',!!(await p.$('.big')));
// fill
await p.goto(f+'#fill-as2-random');await p.waitForTimeout(400);
for(let i=0;i<60;i++){if(await p.$('.big'))break;
  if(await p.$('#nx')){await p.click('#nx');continue}
  const t=await p.$('.tilebtn');const g=await p.$('.gap:not(.filled)');
  if(t&&g){await p.locator('.tilebtn').first().click();await p.locator('.gap:not(.filled)').first().click();if(i===2)await shot('fill');continue}
  const c=await p.$('[data-act="fillcheck"]:not([disabled])');if(c){await c.click();continue}break}
console.log('fill done',!!(await p.$('.big')));
// colour
await p.goto(f+'#colour-1-10');await p.waitForTimeout(300);await shot('colour');
for(let i=0;i<40;i++){if(await p.$('.big'))break;const o=await p.$('.opt[data-act="mc"]:not([disabled])');if(o)await o.click();const n=await p.$('#nx');if(n)await n.click();}
console.log('colour done',!!(await p.$('.big')));
// flame
await p.goto(f+'#flame');await p.waitForTimeout(300);await p.click('.samp[data-k="K⁺"]');await p.click('input[data-act="cobalt"]');await shot('flame');
await p.goto(f+'#flame-test');await p.waitForTimeout(300);
for(let i=0;i<30;i++){if(await p.$('.big'))break;if(await p.$('#nx')){await p.click('#nx');continue}
 const o=await p.$('.opt[data-act="fpick"]');if(o){await o.click();continue}
 const s=await p.$$('.step[data-act="ford"]');if(s.length){for(let j=0;j<4;j++)await p.locator('.step[data-act="ford"]').nth(j).click();await p.click('[data-act="fordcheck"]');continue}break}
console.log('flame done',!!(await p.$('.big')));
// prac
await p.goto(f+'#prac-halo');await p.waitForTimeout(300);
const kb=await p.$$('.kitbtn');for(let j=0;j<4;j++)await p.locator('.kitbtn').nth(j).click();await p.click('[data-act="kitcheck"]');await shot('prac1');await p.click('[data-act="pnext"]');
for(let j=0;j<5;j++)await p.locator('.step[data-act="mstep"]').nth(j).click();await p.click('[data-act="mcheck"]');await shot('prac2');await p.click('[data-act="pnext"]');
for(let j=0;j<10;j++){if(!(await p.$('.tilebtn')))break;if(!(await p.$('.gap:not(.filled)')))break;await p.locator('.tilebtn').first().click();await p.locator('.gap:not(.filled)').first().click()}
await p.click('[data-act="pgcheck"]');await shot('prac3');await p.click('[data-act="pnext"]');
await p.fill('#ans','Place sodium bromide and butan-1-ol in a pear-shaped flask. Cool in ice. Add concentrated sulfuric acid slowly with swirling. Add anti-bumping granules and heat under reflux. Distil off the product. Wash with sodium hydrogencarbonate in a separating funnel.');
await p.click('[data-act="wmark"]');await p.screenshot({path:__dirname+'/s-prac4.png',fullPage:true});await p.click('[data-act="wdone"]');
console.log('prac done',!!(await p.$('.big')));
const m=await b.newPage({viewport:{width:390,height:844}});await m.goto(f);await m.waitForTimeout(1200);await m.screenshot({path:__dirname+'/s-mobile.png'});
const sw=await m.evaluate(()=>document.documentElement.scrollWidth);console.log('mobile scrollWidth',sw);
console.log(errs);await b.close()})();
